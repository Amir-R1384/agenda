import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useTranslation } from 'react-i18next'
import { homeworksAtom, loadingAtom, scheduleAtom } from '../atoms'
import { Heading, Homework, AddHomeworkPopup, AddButton, Loading } from '../components'
import { getToday, getSchoolDay } from '../util'
import { HomeworkInputs } from '../types'
import { saveData } from '../lib'

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
	const schedule = useRecoilValue(scheduleAtom)

	function addHomework() {
		return new Promise<void>(async (resolve, reject) => {
			setLoading(true)

			const { date: fullDate, periodOrSubject, body } = inputs
			const dateObj = new Date(fullDate.replaceAll('-', '/'))

			const schoolDay = getSchoolDay(dateObj)

			let period: number, subject: string | undefined

			if (/\d/.test(periodOrSubject)) {
				// If the user has given the period number
				period = Number(periodOrSubject)
				subject = schedule[(schoolDay as number) - 1][period]?.subject
			} else {
				// If the user has given the subject name
				subject = periodOrSubject
				const periods = schedule[(schoolDay as number) - 1]
				period = periods.indexOf(periods.find(period => period?.subject === subject)!)
			}

			// Making sure the subject or the period matches with the day
			if (period == -1 || subject == undefined) {
				setLoading(false)
				reject('periodOrSubject')
				return
			}

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
				<div className="custom-grid">
					{[...homeworks]
						.sort((a, b) => {
							if (a.timestamp !== b.timestamp) {
								return a.timestamp - b.timestamp
							} else {
								return a.period - b.period
							}
						})
						.map((homework, i) => (
							<Homework key={i} {...homework} />
						))}
				</div>
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
