import { useTranslation } from 'react-i18next'
import { CardContainer, Menu } from '../components'
import { CarrotSvg, FishSvg, PVTSvg } from '../components/svgs'
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
				<div className="p-3 mt-3 space-y-3 rounded-lg bg-neutral-200 dark:bg-neutral-800">
					<div className="flex-space-between gap-x-2">
						<CarrotSvg className="w-8 h-7" />
						<div className="text-xs text-right text-secondary">{t('vege')}</div>
					</div>
					<div className="flex-space-between gap-x-2">
						<FishSvg className="w-8 h-7" />
						<div className="text-xs text-right text-secondary">
							{t('fishOrSeafood')}
						</div>
					</div>

					<div className="flex-space-between gap-x-2">
						<PVTSvg className="w-8 h-7" />
						<div className="text-xs text-right text-secondary">{t('PVT')}</div>
					</div>
				</div>
			</div>
		</CardContainer>
	)
}
