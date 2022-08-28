import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'
import { loadingAtom, recoveriesAtom } from '../atoms'
import { Heading, AddButton, AddRecoveryPopup, Recovery } from '../components'
import { saveData } from '../lib'
import { RecoveryInputs } from '../types'
import { useLoadData } from '../hooks'
import { Loading } from '../components'

export default function Recoveries() {
	const { t } = useTranslation()
	const [popup, setPopup] = useState(false)
	const [inputs, setInputs] = useState<RecoveryInputs>({
		subject: '',
		classNumber: '',
		day: ''
	})
	const [recoveries, setRecoveries] = useRecoilState(recoveriesAtom)
	const [loading, setLoading] = useRecoilState(loadingAtom)

	useLoadData('recoveries', setLoading)

	async function addRecovery() {
		setLoading(true)
		const newRecoveries = [
			...recoveries,
			{
				id: Date.now(),
				subject: inputs.subject,
				classNumber: inputs.classNumber,
				day: Number(inputs.day)
			}
		]

		await saveData('recoveries', newRecoveries)
		setRecoveries(newRecoveries)
		setLoading(false)
	}

	return (
		<>
			<Heading title="recoveries" />
			{loading && !popup ? (
				<Loading />
			) : recoveries.length ? (
				recoveries.map((recovery, i) => <Recovery key={i} {...recovery} />)
			) : (
				<div className="no-data">{t('noRecovery')}</div>
			)}
			{(!loading || popup) && <AddButton onClick={() => setPopup(true)} />}
			<AddRecoveryPopup
				visible={popup}
				setVisible={setPopup}
				inputs={inputs}
				setInputs={setInputs}
				addRecovery={addRecovery}
			/>
		</>
	)
}
