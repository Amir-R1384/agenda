import React from 'react'
import { useTranslation } from 'react-i18next'

interface Params {
	setPopup: React.Dispatch<React.SetStateAction<boolean>>
}

export default function InstallNotice({ setPopup }: Params) {
	const { t } = useTranslation()

	return (
		<>
			<div className="popup-bg"></div>
			<div className="popup-parent">
				<div className="break-words whitespace-pre-wrap popup-fg">
					<div className="text-lg font-medium drop-shadow-md">{t('welcome')}</div>
					<div className=" text-neutral-700 drop-shadow-md">{t('installNotice')}</div>
					<button onClick={() => setPopup(false)} className="button">
						{t('close')}
					</button>
				</div>
			</div>
		</>
	)
}
