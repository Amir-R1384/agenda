import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'
import { recoveriesAtom } from '../atoms'
import { Heading, AddButton, AddRecoveryPopup, Recovery } from '../components'
import { RecuperationInputs } from '../types'

export default function Recuperations() {
	const { t } = useTranslation()
	const [popup, setPopup] = useState(false)
	const [inputs, setInputs] = useState<RecuperationInputs>({
		subject: '',
		day: ''
	})
	const [recoveries, setRecoveries] = useRecoilState(recoveriesAtom)

	function addRecuperation() {
		setRecoveries(prev => [...prev, inputs])
	}

	return (
		<>
			<Heading title="recuperations" />
			{recoveries.length ? (
				recoveries.map((recovery, i) => <Recovery key={i} {...recovery} />)
			) : (
				<div className="no-data">{t('noRecovery')}</div>
			)}
			<AddButton onClick={() => setPopup(true)} />
			<AddRecoveryPopup
				visible={popup}
				setVisible={setPopup}
				inputs={inputs}
				setInputs={setInputs}
				addRecuperation={addRecuperation}
			/>
		</>
	)
}
