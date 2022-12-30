import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'
import { loadingAtom, recoveriesAtom } from '../atoms'
import { AddRecoveryPopup, CardContainer, Loading, Recovery } from '../components'
import { defaultRecoveryInputs } from '../config/defaults'
import { saveData } from '../lib'
import { Recovery as RecoveryType, RecoveryInputs } from '../types'

export default function Recoveries() {
	const { t } = useTranslation()
	const [popup, setPopup] = useState(false)
	const [inputs, setInputs] = useState<RecoveryInputs>(defaultRecoveryInputs)
	const [recoveries, setRecoveries] = useRecoilState(recoveriesAtom)
	const [loading, setLoading] = useRecoilState(loadingAtom)

	const [editMode, setEditMode] = useState(false)
	const [currentRecoveryId, setCurrentRecoveryId] = useState(0)

	async function addRecovery() {
		setLoading(true)

		const newRecoveries = [...recoveries]

		if (editMode) {
			const targetRecovery = newRecoveries.find(el => el.id === currentRecoveryId)!
			newRecoveries.splice(newRecoveries.indexOf(targetRecovery), 1)
		}

		newRecoveries.push({
			id: editMode ? currentRecoveryId : Date.now(),
			subject: inputs.subject,
			roomNumber: inputs.roomNumber,
			days: inputs.days
				.map((day, i) => (day === true ? i + 1 : day))
				.filter(day => day !== false)
		} as RecoveryType)

		await saveData('recoveries', newRecoveries)
		setRecoveries(newRecoveries as RecoveryType[])
		setEditMode(false)
		setLoading(false)
	}

	return (
		<>
			<CardContainer
				heading="recoveries"
				includeAddButton
				callBack={() => {
					setInputs(defaultRecoveryInputs)
					setEditMode(false)
					setPopup(true)
				}}>
				{loading && !popup ? (
					<Loading />
				) : recoveries.length ? (
					<div className="custom-grid">
						{recoveries.map((recovery, i) => (
							<Recovery
								key={i}
								{...recovery}
								onClick={() => {
									setCurrentRecoveryId(recovery.id)
									setInputs({
										subject: recovery.subject,
										roomNumber: recovery.roomNumber,
										days: Array(9)
											.fill(false)
											.map((day, i) =>
												recovery.days.includes(i + 1) ? true : false
											)
									})
									setEditMode(true)
									setPopup(true)
								}}
							/>
						))}
					</div>
				) : (
					<div className="no-data">{t('noRecovery')}</div>
				)}
			</CardContainer>

			<AddRecoveryPopup
				visible={popup}
				setVisible={setPopup}
				inputs={inputs}
				setInputs={setInputs}
				addRecovery={addRecovery}
				editMode={editMode}
				currentRecoveryId={currentRecoveryId}
			/>
		</>
	)
}
