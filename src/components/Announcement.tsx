import { XMarkOutline } from '@graywolfai/react-heroicons'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'
import { announcementAtom } from '../atoms'
import config from '../config'

export default function Announcement() {
	const setAnnouncement = useSetRecoilState(announcementAtom)
	const { t } = useTranslation()

	function closeAnnouncement() {
		localStorage.setItem(
			`${config.appPrefix}-announcementIndex`,
			config.announcementIndex.toString()
		)
		setAnnouncement(false)
	}

	return (
		<div className="flex items-center justify-between w-full mb-5 !py-2 !px-3 font-semibold text-left bg-white text-neutral-900 dark:text-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-500 shadow-[0px_0_10px_0_rgba(0,0,0,0.10)] rounded-xl">
			<div>{t('announcement')}</div>
			<button onClick={closeAnnouncement}>
				<XMarkOutline className="h-7 w-7 icon" />
			</button>
		</div>
	)
}
