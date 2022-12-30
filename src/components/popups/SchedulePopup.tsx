import React, { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Accordion, Popup, Select } from '../'
import { loadingAtom, scheduleAtom } from '../../atoms'
import config from '../../config'
import { getData, saveData } from '../../lib'
import { Schedule } from '../../types'
import { generateEmptySchedule, getPeriod } from '../../util'

interface Props {
	visible: boolean
	setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SchedulePopup({ visible, setVisible }: Props) {
	const { t } = useTranslation()
	const [loading, setLoading] = useRecoilState(loadingAtom)
	const [inputs, setInputs] = useState<Schedule<string>>(generateEmptySchedule<string>())
	const [errors, setErrors] = useState(generateEmptySchedule<boolean>(true))
	const [accordions, setAccordions] = useState<boolean[]>(new Array(9).fill(false))
	const setSchedule = useSetRecoilState(scheduleAtom)

	useEffect(() => {
		// Filling in the forms if there is a existing schedule
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

				if (subject === 'default' && roomNumber!.trim() === '') {
					finalSchedule[i][j] = null
				} else if (subject !== 'default') {
					finalSchedule[i][j]!.subject = subject
					finalSchedule[i][j]!.roomNumber = roomNumber
				} else {
					const newAccordions = new Array(9).fill(false)
					newAccordions[i] = true
					setAccordions(newAccordions)

					setErrors(prev => {
						prev[i][j]!.subject = true
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
		<Popup visible={visible} setVisible={setVisible} fullScreen>
			<div className="pt-10 space-y-3">
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
											className={`overflow-hidden border rounded ${
												(errors[i][j]?.subject ||
													errors[i][j]?.roomNumber) &&
												'!border-red-500'
											} outline-container border-neutral-500`}>
											<div className="py-1 pl-5 text-lg text-dark-1">
												{t(getPeriod(j).type)} {getPeriod(j).number}
											</div>
											<div className="flex outline-container !border-b-0">
												{/* Subject input */}
												<Select
													id={`subject${j}`}
													value={inputs[i][j]?.subject}
													onChange={e =>
														onInputChange(e, i, j, 'subject')
													}
													className="flex-1 outline-hover"
													error={errors[i][j]!.subject}>
													<option value="default">{t('subject')}</option>
													{config.subjects.map((subject, k) => (
														<option key={k} value={subject}>
															{t(subject)}
														</option>
													))}
												</Select>
												<div className="w-px py-5 bg-neutral-400"></div>

												{/* Room number input */}
												<input
													value={inputs[i][j]?.roomNumber || ''}
													onChange={e =>
														onInputChange(e, i, j, 'roomNumber')
													}
													type="text"
													className={`outline-hover max-w-[50%] pl-5 ${
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
			</div>

			<div className="flex mt-6 mb-20 outline-container">
				<button
					type="button"
					onClick={() => setVisible(false)}
					className="flex-1 transition-all outline-spacing outline-hover">
					{t('cancel')}
				</button>
				<div className="w-px py-5 bg-neutral-400"></div>
				<button
					onClick={onSubmit}
					className="flex-1 transition-all outline-spacing outline-hover">
					{t('save')}
				</button>
			</div>
		</Popup>
	)
}
