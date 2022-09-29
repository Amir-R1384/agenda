import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { signOut as FB_signOut } from 'firebase/auth'
import { auth } from '../api'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { useState } from 'react'
import SchedulePopup from '../components/popups/SchedulePopup'

export default function Settings() {
	const navigate = useNavigate()
	const { t } = useTranslation()
	const [schedulePopup, setSchedulePopup] = useState(false)

	function signOut() {
		FB_signOut(auth)
		window.location.assign('/')
	}

	return (
		<>
			<div className="flex items-center w-full px-3 pt-2 pb-1 mb-10 bg-white border-b border-neutral-400 gap-x-5">
				<button onClick={() => navigate(-1)}>
					<FontAwesomeIcon icon={faAngleLeft as IconProp} className="icon" />
				</button>
				<div className="text-xl font-semibold text-neutral-700 -translate-y-0.5">
					{t('settings')}
				</div>
			</div>

			<div className="flex flex-col max-w-screen-sm px-3 mx-auto gap-y-5">
				<button className="button !py-2" onClick={() => setSchedulePopup(true)}>
					{t('changeSchedule')}
				</button>
				<button onClick={signOut} className="button !bg-red-500 !py-2">
					{t('signOut')}
				</button>
			</div>

			{schedulePopup && (
				<SchedulePopup visible={schedulePopup} setVisible={setSchedulePopup} />
			)}
		</>
	)
}
