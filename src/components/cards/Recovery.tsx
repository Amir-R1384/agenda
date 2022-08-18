import { useTranslation } from 'react-i18next'
import { RecuperationInputs } from '../../types'

export default function Recuperation({ day, subject }: RecuperationInputs) {
	const { t } = useTranslation()

	return (
		<div className="flex items-center justify-between card !flex-row">
			<div className="card-main">{subject}</div>
			<div className="!text-base font-medium card-sub">
				{t('day')} {day}
			</div>
		</div>
	)
}
