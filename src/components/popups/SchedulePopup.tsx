import React, { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Popup, Loading, Accordion } from '../'
import { loadingAtom, scheduleAtom } from '../../atoms'
import { Schedule } from '../../types'
import { generateEmptySchedule, getPeriod } from '../../util'
import config from '../../config'
import { getData, saveData } from '../../lib'

interface Params {
	visible: boolean
	setVisible: React.Dispatch<React.SetStateAction<boolean>>
	changing?: boolean
}

export default function SchedulePopup({ visible, setVisible, changing }: Params) {
	const { t } = useTranslation()
	const [loading, setLoading] = useRecoilState(loadingAtom)
	const [inputs, setInputs] = useState<Schedule<string>>(generateEmptySchedule<string>())
	const [errors, setErrors] = useState(generateEmptySchedule<boolean>(true))
	const [accordions, setAccordions] = useState<boolean[]>(new Array(9).fill(false))
	const setSchedule = useSetRecoilState(scheduleAtom)

	useEffect(() => {
		// Filling in the forms if there is a existing schedule
		if (changing) {
			getData('schedule').then((data: Schedule<string>) => {
				for (let i = 0; i < 9; i++) {
					for (let j = 0; j < 9; j++) {
						if (data[i][j] === null) {
							data[i][j] = {
								subject: 'default',
								roomNumber: ''
							}
						}
					}
				}
				setInputs(data)
			})
		}
	}, [])

	function onInputChange(
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		i: number,
		j: number,
		inputType: 'roomNumber' | 'subject'
	) {
		setInputs(prev => {
			prev[i][j]![inputType] = e.target.value
			return { ...prev }
		})
	}

	async function onSubmit() {
		setLoading(true)
		setErrors(generateEmptySchedule<boolean>(true))

		const finalSchedule = generateEmptySchedule<string>()

		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				const { subject, roomNumber } = inputs[i][j]!

				if (subject === 'default' && roomNumber.trim() === '') {
					finalSchedule[i][j] = null
				} else if (subject !== 'default' && roomNumber.trim() !== '') {
					finalSchedule[i][j]!.subject = subject
					finalSchedule[i][j]!.roomNumber = roomNumber
				} else {
					const newAccordions = new Array(9).fill(false)
					newAccordions[i] = true
					setAccordions(newAccordions)

					const problem = subject === 'default' ? 'subject' : 'roomNumber'

					setErrors(prev => {
						prev[i][j]![problem] = true
						return { ...prev }
					})

					setLoading(false)
					return
				}
			}
		}

		await saveData('schedule', finalSchedule)
		setSchedule(finalSchedule)
		setLoading(false)
		setVisible(false)
	}

	useEffect(() => {
		setTimeout(() => {}, 2000)
	}, [])

	return (
		<Popup visible={visible} fullScreen onSubmit={onSubmit}>
			{Array(9)
				.fill(null)
				.map((el, i) => (
					// * 1 Accordion
					<Accordion
						key={i}
						index={i}
						open={accordions[i]}
						setAccordions={setAccordions}
						title={`${t('day')} ${i + 1}`}>
						<div className="flex flex-col w-full gap-y-5">
							{Array(9)
								.fill(null)
								.map((el, j) => (
									// * 1 Period
									<div
										key={j}
										className="flex flex-col w-full p-2 px-3 rounded-lg bg-neutral-200 gap-y-2">
										<div className="font-medium text-neutral-500">
											{t(getPeriod(j).type)} {getPeriod(j).number}
										</div>
										<div className="flex items-stretch justify-between w-full gap-2">
											{/* Subject input */}
											<select
												value={inputs[i][j]?.subject}
												onChange={e => onInputChange(e, i, j, 'subject')}
												className={`input !text-base font-normal ${
													errors[i][j]!.subject && 'error'
												}`}>
												<option value="default">{t('subject')}</option>
												{config.subjects.map((subject, k) => (
													<option key={k} value={subject}>
														{t(subject)}
													</option>
												))}
											</select>
											{/* Room number input */}
											<input
												value={inputs[i][j]?.roomNumber || ''}
												onChange={e => onInputChange(e, i, j, 'roomNumber')}
												type="text"
												className={`input !text-sm  ${
													errors[i][j]!.roomNumber && 'error'
												}`}
												placeholder={t('roomNumber')}
											/>
										</div>
									</div>
								))}
						</div>
					</Accordion>
				))}
			<div className="flex items-center justify-between w-full mt-2">
				<button type="button" onClick={() => setVisible(false)} className="button">
					{t('cancel')}
				</button>

				{loading && <Loading forPopup={true} />}

				<button type="submit" className="button">
					{t(changing ? 'save' : 'add')}
				</button>
			</div>
		</Popup>
	)
}
