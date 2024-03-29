import { useTranslation } from 'react-i18next'
import config from '../../config'
import { getPeriod } from '../../util'

interface Props {
	index: number
	subject: string
	roomNumber: string
}

export default function Period({ index, subject, roomNumber }: Props) {
	const { t } = useTranslation()

	const { type, number } = getPeriod(index)

	return (
		<div className="card">
			<div className="flex items-center justify-between w-full">
				<div className="card-sub">
					{t(type)} {number}
				</div>
				<div className="card-sub">{config.times[index]}</div>
			</div>
			<div className="flex items-center justify-between w-full">
				<div className="card-main">{t(subject)}</div>
				<div className="card-sub">{roomNumber}</div>
			</div>
		</div>
	)
}
