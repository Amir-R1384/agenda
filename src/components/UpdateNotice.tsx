import { useTranslation } from 'react-i18next'

export default function UpdateNotice({ className = '' }: { className?: string }) {
	const { t } = useTranslation()

	return (
		<div
			className={`${className} w-full tracking-wider p-3 text-lg font-medium text-center text-white bg-neutral-800`}>
			{t('updateNotice')}
			<a
				target="_blank"
				href="https://egenda.app"
				className="text-blue-400 underline hover:text-blue-500">
				Egenda.app
			</a>
			{t('inYourBrowser')}
		</div>
	)
}
