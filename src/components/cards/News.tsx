import { ArrowLongRightOutline } from '@graywolfai/react-heroicons'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Popup } from '..'
import config from '../../config'
import { News as Props } from '../../types'

export default function News({ title, content, image, date }: Props) {
	const { t } = useTranslation()

	const shortenedContent = content.split(' ').slice(0, 15).join(' ') + '...'

	const [, imageID, imageSize, imageFormat] = image.split('-')

	const [popup, setPopup] = useState(false)

	return (
		<>
			<div className="bg-white card">
				<div className="space-y-2">
					<div className="card-main">{title}</div>
					<div className="card-sub">{shortenedContent}</div>
					<button
						onClick={() => setPopup(true)}
						className="flex items-center self-start w-auto transition-all duration-300 border-b gap-x-1 hover:gap-x-3 border-neutral-400 text-neutral-600">
						<div className="text-sm font-semibold">{t('moreInfo')}</div>
						<ArrowLongRightOutline className="w-6 mt-px" />
					</button>
				</div>
			</div>

			<Popup visible={popup} setVisible={setPopup} fullScreen>
				<div
					style={{
						backgroundImage: `url(https://cdn.sanity.io/images/${config.sanityProjectId}/production/${imageID}-${imageSize}.${imageFormat})`
					}}
					className="w-full bg-center bg-cover shadow rounded-t-3xl aspect-video "></div>
				<div className="p-5 space-y-3">
					<div className="text-2xl">{title}</div>
					<div className="!mt-1 !mb-5 text-xs font-medium uppercase  text-neutral-500">
						{new Date(date).toLocaleString()}
					</div>
					<div>{content}</div>
				</div>
				<button
					onClick={() => setPopup(false)}
					className="outline-container outline-spacing outline-hover">
					{t('close')}
				</button>
			</Popup>
		</>
	)
}
