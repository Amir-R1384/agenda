import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'
import { scheduleAtom } from '../../atoms'
import config from '../../config'
import i18n from '../../translations'
import { HomeworkInputs } from '../../types'
import { convertToYMD, getSchoolDay, getTomorrow, isSubjectInSchedule } from '../../util'
import Loading from '../Loading'
import Select from '../Select'
import Popup from './Popup'

interface Props {
	visible: boolean
	setVisible: React.Dispatch<React.SetStateAction<boolean>>
	inputs: HomeworkInputs
	setInputs: React.Dispatch<React.SetStateAction<HomeworkInputs>>
	addHomework: () => Promise<void>
	defaultInputs: HomeworkInputs
	editMode: boolean
}

export default function AddHomeworkPopup({
	visible,
	setVisible,
	inputs,
	setInputs,
	addHomework,
	defaultInputs,
	editMode
}: Props) {
	const today = convertToYMD(new Date())
	const schedule = useRecoilValue(scheduleAtom)

	const { t } = useTranslation()
	const [errors, setErrors] = useState({
		periodOrSubject: false,
		date: false,
		name: false
	})

	function clearErrors() {
		setErrors({
			date: false,
			periodOrSubject: false,
			name: false
		})
	}

	function checkInputs() {
		const schoolDay = getSchoolDay(inputs.date.replaceAll('-', '/'))

		const date = typeof schoolDay !== 'number'
		const periodOrSubject = inputs.periodOrSubject === 'default' ? true : false
		const name = inputs.name === '' ? true : false

		setErrors({
			date,
			periodOrSubject,
			name
		})

		if (!date && !periodOrSubject && !name) {
			clearErrors()
			addHomework()
				.then(() => {
					setInputs(defaultInputs)
					setVisible(false)
				})
				.catch(reason => {
					if (reason === 'periodOrSubject') {
						setErrors(prev => ({ ...prev, periodOrSubject: true }))
					}
				})
		}
	}

	function selectNextCourse() {
		setErrors(prev => ({ ...prev, periodOrSubject: false }))
		// Making sure the periodOrSubject is actually a subject and the subject exists in the schedule
		if (
			!isNaN(Number(inputs.periodOrSubject)) ||
			!isSubjectInSchedule(inputs.periodOrSubject, schedule)
		) {
			return setErrors(prev => ({ ...prev, periodOrSubject: true }))
		}

		let tomorrow = getTomorrow(new Date())
		let newDate = ''

		while (true) {
			const tomorrowSchoolDay = getSchoolDay(tomorrow)

			if (typeof tomorrowSchoolDay !== 'number') {
				tomorrow = getTomorrow(tomorrow)
				continue
			}

			for (let period of schedule[tomorrowSchoolDay - 1]) {
				if (period?.subject === inputs.periodOrSubject) {
					newDate = convertToYMD(tomorrow)
					break
				}
			}

			if (newDate) {
				break
			} else {
				tomorrow = getTomorrow(tomorrow)
			}
		}

		setInputs(prev => ({ ...prev, date: newDate }))
	}

	return (
		<Popup visible={visible} setVisible={setVisible}>
			<div className="pr-3 flex-space-between">
				<div className="form-title">
					{editMode ? t('edit') : t('add')}{' '}
					{i18n.language.slice(0, 2) === 'fr' && t('a_m')} {t('homework')}
				</div>
				<Loading />
			</div>

			<div className="flex flex-col gap-y-5">
				{/* Subject */}
				<div>
					<div className="form-label">{t('subject')}</div>
					<div
						className={`outline-container outline-hover ${
							errors.periodOrSubject && 'error'
						}`}>
						<Select
							id="periodOrSubject"
							value={inputs.periodOrSubject}
							error={errors.periodOrSubject}
							onChange={e =>
								setInputs(prev => ({
									...prev,
									periodOrSubject: e.target.value
								}))
							}>
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
							{/* Options for courses */}
							{config.subjects.map((subject, i) => (
								<option key={i} value={subject}>
									{t(subject)}
								</option>
							))}
						</Select>
					</div>
				</div>

				{/* Date */}
				<div>
					<div className="form-label">Date</div>
					<div
						className={`flex items-stretch outline-container ${
							errors.date && 'error'
						}`}>
						<input
							type="date"
							min={today}
							value={inputs.date}
							onChange={e => setInputs(prev => ({ ...prev, date: e.target.value }))}
							className={`flex-1 transition-all outline-spacing outline-hover ${
								errors.date && 'error'
							}`}
						/>
						<div className="w-px py-5 bg-neutral-400"></div>
						<button
							onClick={selectNextCourse}
							className="flex-1 transition-all outline-spacing outline-hover">
							{t('nextClass')}
						</button>
					</div>
				</div>

				{/* Info */}
				<div>
					<div className="form-label">Info</div>
					<div className={`outline-container ${errors.name && 'error'}`}>
						<input
							type="text"
							value={inputs.name}
							onChange={e => setInputs(prev => ({ ...prev, name: e.target.value }))}
							placeholder={t('name')}
							className="w-full outline-spacing outline-hover"
						/>
					</div>
					<textarea
						value={inputs.description}
						onChange={e =>
							setInputs(prev => ({ ...prev, description: e.target.value }))
						}
						placeholder={`Description (${t('optional')})`}
						className="w-full pr-5 border-b resize-y outline-spacing outline-hover border-neutral-400"
						maxLength={200}
						rows={3}
					/>
				</div>

				{/* Buttons */}
				<div className="mt-6">
					<div className="flex outline-container">
						<button
							type="button"
							onClick={() => {
								setInputs(defaultInputs)
								setVisible(false)
								clearErrors()
							}}
							className="flex-1 transition-all outline-spacing outline-hover">
							{t('cancel')}
						</button>
						<div className="w-px py-5 bg-neutral-400"></div>
						<button
							onClick={checkInputs}
							className="flex-1 transition-all outline-spacing outline-hover">
							{editMode ? t('save') : t('add')}
						</button>
					</div>
				</div>
			</div>
		</Popup>
	)
}
