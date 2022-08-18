import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useTranslation } from 'react-i18next'
import { groupNumberAtom, homeworksAtom } from '../atoms'
import { Heading, Homework, AddHomeworkPopup, AddButton } from '../components'
import { getToday, getSchoolDay } from '../util'
import { HomeworkInputs } from '../types'
import config from '../config'

export default function Homeworks() {
	const { t } = useTranslation()
	const today = getToday()

	const defaultInputs = {
		date: today,
		periodOrSubject: 'default',
		body: ''
	}

	const [homeworks, setHomeworks] = useRecoilState(homeworksAtom)
	const [popup, setPopup] = useState(false)
	const [inputs, setInputs] = useState<HomeworkInputs>(defaultInputs)
	const groupNumber = useRecoilValue(groupNumberAtom)

	function addHomework() {
		return new Promise<void>((resolve, reject) => {
			const { date: fullDate, periodOrSubject, body } = inputs
			const dateObj = new Date(fullDate.replaceAll('-', '/'))

			const schoolDay = getSchoolDay(dateObj)

			let period: number, subject: string

			if (/\d/.test(periodOrSubject)) {
				// If the user has given the period number
				period = Number(periodOrSubject)
				subject = config.subjects[groupNumber][(schoolDay as number) - 1][period]!
			} else {
				// If the user has given the subject name
				subject = periodOrSubject
				period = config.subjects[groupNumber][(schoolDay as number) - 1].indexOf(subject)
			}

			// Making sure the subject or the period matches with the day
			if (period == -1 || subject == null) return reject('periodOrSubject')

			setHomeworks(prev => {
				return [
					...prev,
					{
						id: Date.now(),
						timestamp: dateObj.valueOf(),
						period,
						subject,
						body
					}
				]
			})

			resolve()
		})
	}

	return (
		<>
			<Heading title="homeworks" />

			{homeworks.length ? (
				[...homeworks]
					.sort((a, b) => a.timestamp - b.timestamp)
					.map((homework, i) => <Homework key={i} {...homework} />)
			) : (
				<div className="no-data">{t('noHomework2')}</div>
			)}
			<AddButton onClick={() => setPopup(true)} />
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
