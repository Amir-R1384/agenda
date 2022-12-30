import { useTranslation } from 'react-i18next'
import carrot from '../../assets/images/carrot.svg'
import fish from '../../assets/images/fish.svg'
import PVT from '../../assets/images/PVT.svg'
import config from '../../config'
import { Meal } from '../../types'

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
							<img src={carrot} className="w-8 translate-y-px" />
						) : type === 'fish' ? (
							<img src={fish} className="w-8 translate-y-px" />
						) : type === 'PVT' ? (
							<img src={PVT} className="w-8 translate-y-px" />
						) : (
							''
						)}
					</div>
				))}
			</div>
		</div>
	)
}
