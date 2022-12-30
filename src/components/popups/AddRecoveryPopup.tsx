import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { loadingAtom, recoveriesAtom } from '../../atoms'
import config from '../../config'
import { defaultRecoveryInputs } from '../../config/defaults'
import { saveData } from '../../lib'
import i18n from '../../translations'
import { RecoveryInputs } from '../../types'
import Loading from '../Loading'
import Select from '../Select'
import Popup from './Popup'

interface Props {
	visible: boolean
	setVisible: React.Dispatch<React.SetStateAction<boolean>>
	inputs: RecoveryInputs
	setInputs: React.Dispatch<React.SetStateAction<RecoveryInputs>>
	addRecovery: () => Promise<void>
	editMode: boolean
	currentRecoveryId: number
}

export default function AddRecoveryPopup({
	visible,
	setVisible,
	inputs,
	setInputs,
	addRecovery,
	editMode,
	currentRecoveryId
}: Props) {
	const { t } = useTranslation()

	const [errors, setErrors] = useState({
		subject: false,
		roomNumber: false,
		days: false
	})

	function clearErrors() {
		setErrors({
			subject: false,
			roomNumber: false,
			days: false
		})
	}

	const [recoveries, setRecoveries] = useRecoilState(recoveriesAtom)
	const setLoading = useSetRecoilState(loadingAtom)

	function checkInputs() {
		return new Promise<void>((resolve, reject) => {
			if (inputs.subject === 'default') return reject('subject')
			if (inputs.days.every(day => day === false)) {
				reject('days')
			}
			resolve()
		})
	}

	function onSubmit() {
		clearErrors()
		checkInputs()
			.then(() => {
				addRecovery().then(() => {
					setVisible(false)
					setInputs(defaultRecoveryInputs)
				})
			})
			.catch(error => {
				setErrors(prev => ({ ...prev, [error]: true }))
			})
	}

	async function deleteRecovery() {
		setLoading(true)
		const newRecoveries = [...recoveries]

		const currentRecovery = newRecoveries.find(obj => obj.id === currentRecoveryId)!
		newRecoveries.splice(newRecoveries.indexOf(currentRecovery), 1)

		await saveData('recoveries', newRecoveries)
		setRecoveries(newRecoveries)
		setLoading(false)
		setVisible(false)
	}

	return (
		<Popup visible={visible} setVisible={setVisible}>
			<div className="pr-3 flex-space-between">
				<div className="form-title">
					{editMode ? t('edit') : t('add')}{' '}
					{i18n.language.slice(0, 2) === 'fr' && t('a_f')} {t('recovery')}
				</div>
				<Loading />
			</div>
			<div className="flex flex-col gap-y-5">
				{/* Subject */}
				<div>
					<div className="form-label">{t('subject')}</div>
					<div className={`outline-container outline-hover ${errors.subject && 'error'}`}>
						<Select
							id="periodOrSubject"
							value={inputs.subject}
							error={errors.subject}
							onChange={e =>
								setInputs(prev => ({
									...prev,
									subject: e.target.value
								}))
							}>
							<option value="default">Select subject</option>
							{config.subjects.map((subject, i) => (
								<option key={i} value={subject}>
									{t(subject)}
								</option>
							))}
						</Select>
					</div>
				</div>
				{/* Room number */}
				<div>
					<div className="form-label">
						{t('roomNumber')} ({t('optional')})
					</div>
					<div className={`outline-container ${errors.roomNumber && 'error'}`}>
						<input
							type="text"
							value={inputs.roomNumber}
							onChange={e =>
								setInputs(prev => ({ ...prev, roomNumber: e.target.value }))
							}
							placeholder="Ex: A-3282"
							className="w-full outline-spacing outline-hover"
						/>
					</div>
				</div>
				{/* Days */}
				<div>
					<div className="form-label">{t('day')}s</div>
					<div
						className={`grid grid-cols-5 gap-3 outline-container outline-spacing ${
							errors.days && 'error'
						}`}>
						{Array(9)
							.fill(null)
							.map((el, i) => (
								<label
									key={i}
									htmlFor={i.toString()}
									className={`px-5 text-center transition-[filter] border ${
										inputs.days[i] && '!brightness-90'
									} rounded cursor-pointer border-neutral-500 bg-popup text-dark-1 days-checkbox active:translate-y-px`}>
									{i + 1}
									<input
										className="absolute appearance-none"
										checked={inputs.days[i]}
										onChange={() => {
											setInputs(prev => {
												const newDays = [...prev.days]
												newDays[i] = !newDays[i]
												return {
													...prev,
													days: newDays
												}
											})
										}}
										key={i}
										type="checkbox"
										id={i.toString()}
									/>
								</label>
							))}
					</div>
				</div>
				{/* Buttons */}
				<div className="mt-6">
					<div className="flex outline-container">
						<button
							type="button"
							onClick={() => {
								setInputs(defaultRecoveryInputs)
								clearErrors()
								setVisible(false)
							}}
							className="flex-1 transition-all outline-spacing outline-hover">
							{t('cancel')}
						</button>
						<div className="w-px py-5 bg-neutral-400"></div>
						<button
							onClick={onSubmit}
							className="flex-1 transition-all outline-spacing outline-hover">
							{editMode ? t('save') : t('add')}
						</button>
					</div>
				</div>
				{editMode && (
					<button
						onClick={deleteRecovery}
						className="text-red-500 outline-container outline-hover outline-spacing">
						{t('delete')}
					</button>
				)}
			</div>
		</Popup>
	)
}
