import { useTranslation } from 'react-i18next'
import config from '../config'
import { Subject } from '../types'
import inRange from '../util/inRange'

interface Params {
	index: number
	subject: Subject
}

export default function Period({ index, subject }: Params) {
	const { t } = useTranslation()

	const isPeriod = inRange(index, 3, 6)
	const indexToBavette: { [key: number]: number } = {
		0: 1,
		1: 2,
		2: 3,
		7: 4,
		8: 5
	}
	const periodNumber = isPeriod ? index - 2 : indexToBavette[index]

	return (
		<div className="flex flex-col w-full p-3 bg-gray-400 shadow-md rounded-xl">
			<div className="flex items-center gap-x-5">
				<div className="text-lg font-medium text-slate-100">
					{isPeriod ? t('period') : t('bavette')} {periodNumber}
				</div>
				<div className="text-base font-medium text-slate-200">{config.times[index]}</div>
			</div>
			<div className="py-5 text-3xl font-semibold text-gray-700 drop-shadow-md">
				{subject}
			</div>
		</div>
	)
}
