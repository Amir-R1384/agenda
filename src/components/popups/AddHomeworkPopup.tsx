import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Popup from './Popup'
import { getSchoolDay, getToday } from '../../util'
import { HomeworkInputs } from '../../types'
import config from '../../config'

interface Params {
	visible: boolean
	setVisible: React.Dispatch<React.SetStateAction<boolean>>
	inputs: HomeworkInputs
	setInputs: React.Dispatch<React.SetStateAction<HomeworkInputs>>
	addHomework: () => Promise<void>
	defaultInputs: HomeworkInputs
}

export default function AddHomeworkPopup(props: Params) {
	const today = getToday()
	const { t } = useTranslation()
	const [errors, setErrors] = useState({
		date: false,
		periodOrSubject: false,
		body: false
	})

	function checkInputs() {
		const schoolDay = getSchoolDay(props.inputs.date.replaceAll('-', '/'))

		const date = typeof schoolDay !== 'number'
		const periodOrSubject = props.inputs.periodOrSubject === 'default' ? true : false
		const body = props.inputs.body === '' ? true : false

		setErrors({
			date,
			periodOrSubject,
			body
		})

		if (!date && !periodOrSubject && !body) {
			props
				.addHomework()
				.then(() => {
					props.setInputs(props.defaultInputs)
					props.setVisible(false)
				})
				.catch(reason => {
					if (reason === 'periodOrSubject') {
						setErrors(prev => ({ ...prev, periodOrSubject: true }))
					}
				})
		}
	}

	return (
		<Popup onSubmit={checkInputs} visible={props.visible}>
			<input
				className={`bg-white input ${errors.date && 'error'}`}
				type="date"
				// min={today}
				value={props.inputs.date}
				onChange={e => {
					const todayDate = new Date(today).valueOf()
					const selectedDate = new Date(e.target.value).valueOf()

					// if (todayDate <= selectedDate)
					props.setInputs(prev => ({ ...prev, date: e.target.value }))
				}}
			/>
			<div
				className={`input !pl-1 !pr-2.5 flex flex-col ${
					errors.periodOrSubject && 'error'
				}`}>
				<select
					onChange={e =>
						props.setInputs(prev => ({ ...prev, periodOrSubject: e.target.value }))
					}
					className="w-full font-medium bg-white rounded-none">
					<option value="default">{t('periodOrSubject')}</option>
					<option value="0">Bavette 1 -- {config.times[0]}</option>
					<option value="1">Bavette 2 -- {config.times[1]}</option>
					<option value="2">Bavette 3 -- {config.times[2]}</option>
					<option value="3">
						{t('period')} 1 -- {config.times[3]}
					</option>
					<option value="4">
						{t('period')} 2 -- {config.times[4]}
					</option>
					<option value="5">
						{t('period')} 3 -- {config.times[5]}
					</option>
					<option value="6">
						{t('period')} 4 -- {config.times[6]}
					</option>
					<option value="7">Bavette 4 -- {config.times[7]}</option>
					<option value="8">Bavette 5 -- {config.times[8]}</option>
					<option value="math">{t('math')}</option>
					<option value="science">{t('science')}</option>
					<option value="french">{t('french')}</option>
					<option value="history">{t('history')}</option>
					<option value="english">{t('english')}</option>
					<option value="ECR">{t('ECR')}</option>
					<option value="PE">{t('PE')}</option>
					<option value="dramaticArt">{t('dramaticArt')}</option>
				</select>
			</div>

			<textarea
				value={props.inputs.body}
				onChange={e => props.setInputs(prev => ({ ...prev, body: e.target.value }))}
				className={`resize-y input ${errors.body && 'error'}`}
				placeholder={t('homeworkDescription')}
				maxLength={200}
			/>
			<div className="flex justify-between w-full">
				<button
					type="button"
					onClick={() => {
						props.setInputs(props.defaultInputs)
						props.setVisible(false)
						setErrors({
							date: false,
							periodOrSubject: false,
							body: false
						})
					}}
					className="button">
					{t('cancel')}
				</button>
				<button type="submit" className="button">
					{t('add')}
				</button>
			</div>
		</Popup>
	)
}
