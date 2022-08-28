import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Popup from './Popup'
import { RecoveryInputs } from '../../types'
import Loading from '../Loading'
import { useRecoilValue } from 'recoil'
import { loadingAtom } from '../../atoms'

interface Params {
	visible: boolean
	setVisible: React.Dispatch<React.SetStateAction<boolean>>
	inputs: RecoveryInputs
	setInputs: React.Dispatch<React.SetStateAction<RecoveryInputs>>
	addRecovery: () => Promise<void>
}

export default function AddRecoveryPopup({
	visible,
	setVisible,
	inputs,
	setInputs,
	addRecovery
}: Params) {
	const { t } = useTranslation()

	const [errors, setErrors] = useState({
		subject: false,
		classNumber: false,
		day: false
	})
	const loading = useRecoilValue(loadingAtom)

	function checkDayInput(num: string) {
		return num === '' || (Number(num) >= 1 && Number(num) <= 9)
	}

	function clearInputs() {
		setInputs({
			subject: '',
			classNumber: '',
			day: ''
		})
	}

	function clearErrors() {
		setErrors({
			subject: false,
			classNumber: false,
			day: false
		})
	}

	function checkInputs() {
		return new Promise<void>((resolve, reject) => {
			if (inputs.subject === '') return reject('subject')
			if (!checkDayInput(inputs.day) || inputs.day === '') return reject('day')
			resolve()
		})
	}

	function onSubmit() {
		clearErrors()
		checkInputs()
			.then(() => {
				addRecovery().then(() => {
					setVisible(false)
					clearInputs()
				})
			})
			.catch(error => {
				setErrors(prev => ({ ...prev, [error]: true }))
			})
	}

	return (
		<Popup onSubmit={onSubmit} visible={visible}>
			<input
				className={`input ${errors.subject && 'error'}`}
				placeholder={t('subject')}
				value={inputs.subject}
				onChange={e => setInputs(prev => ({ ...prev, subject: e.target.value }))}
			/>
			<input
				className={`input ${errors.classNumber && 'error'}`}
				placeholder={t('classNumber')}
				value={inputs.classNumber}
				onChange={e => setInputs(prev => ({ ...prev, classNumber: e.target.value }))}
			/>
			<input
				className={`input ${errors.day && 'error'}`}
				placeholder={t('day')}
				value={inputs.day}
				onChange={e => {
					if (checkDayInput(e.target.value)) {
						setInputs(prev => ({ ...prev, day: e.target.value }))
					}
				}}
			/>
			<div className="flex justify-between w-full">
				<button
					type="button"
					onClick={() => {
						clearInputs()
						clearErrors()
						setVisible(false)
					}}
					className="button">
					{t('cancel')}
				</button>

				{loading && <Loading forPopup={true} />}

				<button type="submit" className="button">
					{t('add')}
				</button>
			</div>
		</Popup>
	)
}
