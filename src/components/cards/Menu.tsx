import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarrot, faFish } from '@fortawesome/free-solid-svg-icons'
import PVT from '../../assets/images/PVT.svg'
import { Meal } from '../../types'
import config from '../../config'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface Params {
	index: number
	meals: Meal[]
}

export default function Menu({ index, meals }: Params) {
	const { t } = useTranslation()

	return (
		<div className="card">
			<div className="card-sub">{t(config.daysInWeek[index + 1])}</div>
			<div className="space-y-1">
				{meals.map(({ body, type }, i) => (
					<div
						key={i}
						className="flex items-center text-lg font-semibold text-white gap-x-2">
						<div className="card-main !font-medium">{body}</div>
						{type === 'vegan' ? (
							<FontAwesomeIcon
								icon={faCarrot as IconProp}
								className="!text-neutral-600 icon"
							/>
						) : type === 'fish' ? (
							<FontAwesomeIcon
								icon={faFish as IconProp}
								className="!text-neutral-600 icon translate-y-px"
							/>
						) : type === 'PVT' ? (
							<img src={PVT} className="w-10 translate-y-px" />
						) : (
							''
						)}
					</div>
				))}
			</div>
		</div>
	)
}
