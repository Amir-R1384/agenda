import { faCarrot, faFish } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'
import { Heading, Menu } from '../components'
import PVT from '../assets/images/PVT.svg'
import { getDaysDiff } from '../util'
import config from '../config'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

export default function Cafeteria() {
	const { t } = useTranslation()
	const daysDiff = getDaysDiff('6/20/2022')
	const weekIndex = Math.floor(daysDiff / 7)
	const menuIndex = Math.floor(weekIndex % 4)

	const meals = config.menu[menuIndex]

	return (
		<>
			<Heading title="cafeMenu" />
			{[0, 1, 2, 3, 4].map(i => (
				<Menu key={i} index={i} meals={meals[i]} />
			))}

			<div className="flex flex-col w-full p-3 mt-5 mb-5 border shadow border-neutral-400 bg-neutral-100 rounded-xl gap-y-3">
				<div className="flex items-center justify-between w-full gap-x-2">
					<FontAwesomeIcon
						icon={faCarrot as IconProp}
						className="!text-neutral-600 h-7"
					/>
					<div className="text-xs text-right text-neutral-500">{t('vege')}</div>
				</div>
				<div className="flex items-center justify-between w-full gap-x-2">
					<FontAwesomeIcon icon={faFish as IconProp} className="!text-neutral-600 h-6" />
					<div className="text-xs text-right text-neutral-500">{t('fishOrSeafood')}</div>
				</div>

				<div className="flex items-center justify-between w-full gap-x-2 mt-0.5">
					<img src={PVT} className="h-4" />
					<div className="text-xs text-right text-neutral-500">{t('PVT')}</div>
				</div>
			</div>
		</>
	)
}
