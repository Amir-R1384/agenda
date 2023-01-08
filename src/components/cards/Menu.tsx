import { useTranslation } from 'react-i18next'
import config from '../../config'
import { Meal } from '../../types'
import { CarrotSvg, FishSvg, PVTSvg } from '../svgs'

interface Props {
	index: number
	meals: Meal[]
}

export default function Menu({ index, meals }: Props) {
	const { t } = useTranslation()

	return (
		<div className="card">
			<div className="card-sub">{t(config.daysInWeek[index + 1])}</div>
			<div>
				{meals.map(({ body, type }, i) => (
					<div key={i} className="flex items-center gap-x-2">
						<div className="card-main">{t(body)}</div>
						{type === 'vegan' ? (
							<CarrotSvg className="w-8" />
						) : type === 'fish' ? (
							<FishSvg className="w-8" />
						) : type === 'PVT' ? (
							<PVTSvg className="w-8" />
						) : (
							''
						)}
					</div>
				))}
			</div>
		</div>
	)
}
