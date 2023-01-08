import { signOut as FB_signOut } from 'firebase/auth'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { auth } from '../api/firebase'
import config from '../config'
import { getAppearance } from '../util'
import SchedulePopup from './popups/SchedulePopup'

interface Props {
	style?: object
	className?: string
}

export default function Settings({ style, className }: Props) {
	const { t } = useTranslation()
	const [schedulePopup, setSchedulePopup] = useState(false)

	function signOut() {
		FB_signOut(auth)
		window.location.assign('/')
	}

	function toggleDarkMode() {
		const oldAppearance = getAppearance()
		const newAppearance = oldAppearance === 'light' ? 'dark' : 'light'

		localStorage.setItem(`${config.appPrefix}-appearance`, newAppearance)

		document.documentElement.classList.toggle('dark')
		document
			.querySelector('meta[name="theme-color"]')
			?.setAttribute('content', newAppearance === 'light' ? 'white' : '#262626')
	}

	return (
		<div
			style={{
				...style
			}}
			className={
				className +
				' overflow-hidden absolute duration-700 left-0 right-0 transition-all ease-in-out z-10 bg-white dark:bg-neutral-800 top-[calc(100%+1px)]'
			}>
			<div className="flex flex-col w-full max-w-screen-sm p-5 mx-auto gap-y-5">
				<button onClick={toggleDarkMode} className="button-outline">
					{t('toggleDarkMode')}
				</button>
				<button className="button-outline" onClick={() => setSchedulePopup(true)}>
					{t('changeSchedule')}
				</button>
				<button
					onClick={signOut}
					className="button-filled !bg-red-500 !text-white !border-red-500">
					{t('signOut')}
				</button>
			</div>

			<SchedulePopup visible={schedulePopup} setVisible={setSchedulePopup} />
		</div>
	)
}
