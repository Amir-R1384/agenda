import { signOut as FB_signOut } from 'firebase/auth'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { auth } from '../api/firebase'
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

	return (
		<div
			style={{
				...style
			}}
			className={
				className +
				' overflow-hidden absolute duration-700 left-0 right-0 transition-all ease-in-out z-10 bg-white top-[calc(100%+1px)]'
			}>
			<div className="flex flex-col w-full max-w-screen-sm p-5 mx-auto gap-y-5">
				<button className="button-outline !py-2" onClick={() => setSchedulePopup(true)}>
					{t('changeSchedule')}
				</button>
				<button
					onClick={signOut}
					className="button-filled !bg-red-500 !border-red-500 !py-2">
					{t('signOut')}
				</button>
			</div>

			<SchedulePopup visible={schedulePopup} setVisible={setSchedulePopup} />
		</div>
	)
}
