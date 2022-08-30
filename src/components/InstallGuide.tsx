import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { iphone1, iphone2, iphone2Fr } from '../assets/images/installGuide/iphone'
import { android1, android2, android2Fr } from '../assets/images/installGuide/android'

interface Params {
	setPopup: React.Dispatch<React.SetStateAction<boolean>>
}

export default function InstallGuide({ setPopup }: Params) {
	const { t } = useTranslation()
	const [browser, setBrowser] = useState<'iphone' | 'android' | 'other' | null>(null)

	useEffect(() => {
		if (/Android/i.test(navigator.userAgent)) {
			setBrowser('android')
		} else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
			setBrowser('iphone')
		} else {
			setBrowser('other')
		}
	}, [])

	return (
		<div className="popup-bg !justify-start">
			<div className="space-y-5 popup-fg text-neutral-700 drop-shadow-md">
				{browser === 'other' ? (
					<div>{t('wrongBrowser')}</div>
				) : browser === 'iphone' ? (
					<>
						<div className="space-y-2">
							<div>1. {t('clickOnShare')}</div>
							<img src={iphone1} className="installGuide-img" />
						</div>
						<div className="space-y-2">
							<div>2. {t('addToHome')}</div>
							{/^fr\b/.test(navigator.language) ? (
								<img src={iphone2Fr} className="installGuide-img" />
							) : (
								<img src={iphone2} className="installGuide-img" />
							)}
						</div>
						<div>3. {t('clickAddAndDone')}</div>
					</>
				) : browser === 'android' ? (
					<>
						<div className="space-y-2">
							<div>1. {t('clickOn3Dots')}</div>
							<img src={android1} className="installGuide-img" />
						</div>
						<div className="space-y-2">
							<div>2. {t('addToHome')}</div>
							{/^fr\b/.test(navigator.language) ? (
								<img src={android2Fr} className="installGuide-img" />
							) : (
								<img src={android2} className="installGuide-img" />
							)}
						</div>
						<div>3. {t('clickAddAndDone')}</div>
					</>
				) : (
					''
				)}
				<button onClick={() => setPopup(false)} className="button">
					{t('close')}
				</button>
			</div>
		</div>
	)
}
