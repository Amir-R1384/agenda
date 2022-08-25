import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useTranslation } from 'react-i18next'
import { groupNumberAtom, homeworksAtom, loadingAtom } from '../atoms'
import { Heading, Homework, AddHomeworkPopup, AddButton, Loading } from '../components'
import { getToday, getSchoolDay } from '../util'
import { HomeworkInputs } from '../types'
import config from '../config'
import { saveData } from '../lib'
import { useLoadData } from '../hooks'

export default function Homeworks() {
	const { t } = useTranslation()
	const today = getToday()

	const defaultInputs = {
		date: today,
		periodOrSubject: 'default',
		body: ''
	}

	const [loading, setLoading] = useRecoilState(loadingAtom)
	const [homeworks, setHomeworks] = useRecoilState(homeworksAtom)
	const [popup, setPopup] = useState(false)
	const [inputs, setInputs] = useState<HomeworkInputs>(defaultInputs)
	const groupNumber = useRecoilValue(groupNumberAtom)

	useLoadData('homeworks', setLoading)

	function addHomework() {
		return new Promise<void>(async (resolve, reject) => {
			setLoading(true)

			const { date: fullDate, periodOrSubject, body } = inputs
			const dateObj = new Date(fullDate.replaceAll('-', '/'))

			const schoolDay = getSchoolDay(dateObj)

			let period: number, subject: string

			if (/\d/.test(periodOrSubject)) {
				// If the user has given the period number
				period = Number(periodOrSubject)
				subject = config.subjects[groupNumber!][(schoolDay as number) - 1][period]!
			} else {
				// If the user has given the subject name
				subject = periodOrSubject
				period = config.subjects[groupNumber!][(schoolDay as number) - 1].indexOf(subject)
			}

			// Making sure the subject or the period matches with the day
			if (period == -1 || subject == null) return reject('periodOrSubject')

			const newHomeworks = [
				...homeworks,
				{
					id: Date.now(),
					timestamp: dateObj.valueOf(),
					period,
					subject,
					body
				}
			]

			await saveData('homeworks', newHomeworks)
			setHomeworks(newHomeworks)

			setLoading(false)
			resolve()
		})
	}

	return (
		<>
			<Heading title="homeworks" />
			{loading && !popup ? (
				<Loading />
			) : homeworks.length ? (
				[...homeworks]
					.sort((a, b) => a.timestamp - b.timestamp)
					.map((homework, i) => <Homework key={i} {...homework} />)
			) : (
				<div className="no-data">{t('noHomework2')}</div>
			)}
			{(!loading || popup) && <AddButton onClick={() => setPopup(true)} />}

			<AddHomeworkPopup
				visible={popup}
				setVisible={setPopup}
				inputs={inputs}
				setInputs={setInputs}
				addHomework={addHomework}
				defaultInputs={defaultInputs}
			/>
		</>
	)
}
