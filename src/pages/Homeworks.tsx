import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useRecoilValue } from 'recoil'
import { homeworksAtom, loadingAtom, scheduleAtom } from '../atoms'
import { AddHomeworkPopup, CardContainer, Homework, HomeworkPopup, Loading } from '../components'
import { defaultHomeworkInputs, emptyHomework } from '../config/defaults'
import { saveData } from '../lib'
import { Homework as HomeworkType, HomeworkInputs } from '../types'
import { convertToYMD, getSchoolDay } from '../util'

export default function Homeworks() {
	const { t } = useTranslation()

	const [loading, setLoading] = useRecoilState(loadingAtom)
	const [homeworks, setHomeworks] = useRecoilState(homeworksAtom)

	const [inputs, setInputs] = useState<HomeworkInputs>(defaultHomeworkInputs)
	const schedule = useRecoilValue(scheduleAtom)

	const [cardPopup, setCardPopup] = useState(false)
	const [currentHomework, setCurrentHomework] = useState<HomeworkType>(emptyHomework)

	const [addHomeworkPopup, setAddHomeworkPopup] = useState(false)
	const [editMode, setEditMode] = useState(false)

	function addHomework() {
		return new Promise<void>(async (resolve, reject) => {
			setLoading(true)

			const { date: fullDate, periodOrSubject, name, description } = inputs
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

			const newHomeworks = [...homeworks]

			if (editMode) {
				const targetHomework = newHomeworks.find(({ id }) => id === currentHomework.id)!

				newHomeworks.splice(newHomeworks.indexOf(targetHomework), 1)

				const newHomework = {
					id: currentHomework.id,
					timestamp: dateObj.valueOf(),
					period,
					subject,
					name,
					description
				}

				newHomeworks.push(newHomework)
			} else {
				newHomeworks.push({
					id: Date.now(),
					timestamp: dateObj.valueOf(),
					period,
					subject,
					name,
					description
				})
			}

			await saveData('homeworks', newHomeworks)
			setHomeworks(newHomeworks)
			setEditMode(false)

			setLoading(false)
			resolve()
		})
	}

	return (
		<>
			<CardContainer
				heading="homeworks"
				includeAddButton
				callBack={() => {
					setInputs(defaultHomeworkInputs)
					setAddHomeworkPopup(true)
				}}>
				{loading && !addHomeworkPopup ? (
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
								<Homework
									key={i}
									{...homework}
									onClick={() => {
										setCurrentHomework(homework)
										setCardPopup(true)
									}}
								/>
							))}
					</div>
				) : (
					<div className="no-data">{t('noHomework2')}</div>
				)}
			</CardContainer>

			<AddHomeworkPopup
				visible={addHomeworkPopup}
				setVisible={setAddHomeworkPopup}
				inputs={inputs}
				setInputs={setInputs}
				addHomework={addHomework}
				defaultInputs={defaultHomeworkInputs}
				editMode={editMode}
			/>

			<HomeworkPopup
				visible={cardPopup}
				setVisible={setCardPopup}
				homeworkInfo={currentHomework}
				onEdit={() => {
					setCardPopup(false)
					setTimeout(() => {
						setEditMode(true)
						setAddHomeworkPopup(true)
						setInputs({
							name: currentHomework.name,
							description: currentHomework.description,
							date: convertToYMD(currentHomework.timestamp),
							periodOrSubject: currentHomework.period.toString()
						})
					}, 400)
				}}
			/>
		</>
	)
}
