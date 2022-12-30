import { useTranslation } from 'react-i18next'
import carrot from '../assets/images/carrot.svg'
import fish from '../assets/images/fish.svg'
import PVT from '../assets/images/PVT.svg'
import { CardContainer, Menu } from '../components'
import config from '../config'
import { getDaysDiff } from '../util'

export default function Cafeteria() {
	const { t } = useTranslation()
	const daysDiff = getDaysDiff(new Date())
	const weekIndex = Math.floor(daysDiff / 7)
	const menuIndex = Math.floor(weekIndex % 4)

	const meals = config.menu[menuIndex]

	return (
		<CardContainer heading="cafeMenu">
			<div className="custom-grid">
				{/* Menu */}
				{[0, 1, 2, 3, 4].map(i => (
					<Menu key={i} index={i} meals={meals[i]} />
				))}
				{/* Reference */}
				<div className="p-3 mt-3 space-y-3 rounded-lg bg-neutral-200">
					<div className="flex-space-between gap-x-2">
						<img src={carrot} className="w-8" />
						<div className="text-xs text-right text-neutral-500">{t('vege')}</div>
					</div>
					<div className="flex-space-between gap-x-2">
						<img src={fish} className="w-8" />
						<div className="text-xs text-right text-neutral-500">
							{t('fishOrSeafood')}
						</div>
					</div>

					<div className="flex-space-between gap-x-2">
						<img src={PVT} className="w-8" />
						<div className="text-xs text-right text-neutral-500">{t('PVT')}</div>
					</div>
				</div>
			</div>
		</CardContainer>
	)
}
