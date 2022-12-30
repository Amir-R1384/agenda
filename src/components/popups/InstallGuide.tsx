import { useTranslation } from 'react-i18next'
import { Popup } from '..'
import { android1, android2, android2Fr } from '../../assets/images/installGuide/android'
import { iphone1, iphone2, iphone2Fr } from '../../assets/images/installGuide/iphone'
import { getBrowser } from '../../util'

interface Props {
	visible: boolean
	setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function InstallGuide({ visible, setVisible }: Props) {
	const { t } = useTranslation()
	const browser = getBrowser(navigator)

	return (
		<Popup visible={visible} setVisible={setVisible} fullScreen>
			<div className="flex flex-col p-5 gap-y-2 text-dark-1">
				{browser === 'other' ? (
					<div className="p-5 text-center">{t('wrongBrowser')}</div>
				) : browser === 'iphone' ? (
					<>
						<div>1. {t('clickOnShare')}</div>
						<img src={iphone1} className="installGuide-img" />
						<div>2. {t('addToHome')}</div>
						{/^fr\b/.test(navigator.language) ? (
							<img src={iphone2Fr} className="installGuide-img" />
						) : (
							<img src={iphone2} className="installGuide-img" />
						)}
						<div>3. {t('clickAddAndDone')}</div>
					</>
				) : browser === 'android' ? (
					<>
						<div>1. {t('clickOn3Dots')}</div>
						<img src={android1} className="installGuide-img" />
						<div>2. {t('addToHome')}</div>
						{/^fr\b/.test(navigator.language) ? (
							<img src={android2Fr} className="installGuide-img" />
						) : (
							<img src={android2} className="installGuide-img" />
						)}
						<div>3. {t('clickAddAndDone')}</div>
					</>
				) : (
					''
				)}
			</div>
			<button
				onClick={() => setVisible(false)}
				className="!mb-10 mt-5 outline-container outline-spacing outline-hover">
				{t('close')}
			</button>
		</Popup>
	)
}
