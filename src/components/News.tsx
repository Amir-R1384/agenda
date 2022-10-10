import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { News as Params } from '../types'
import config from '../config'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function News({ title, content, image, date }: Params) {
	const shortenedContent = content.split(' ').slice(0, 15).join(' ') + '...'

	const [, imageID, imageSize, imageFormat] = image.split('-')

	const [expanded, setExpanded] = useState(false)
	const { t } = useTranslation()

	return (
		<>
			<div className="card !bg-neutral-50 !shadow !border-neutral-300 !gap-y-2 !flex-row gap-x-2 items-center">
				<div className="flex-1 space-y-2">
					<div className="text-lg font-semibold text-neutral-700 drop-shadow-md">
						{title}
					</div>
					<div className="text-sm text-neutral-500">{shortenedContent}</div>
					<button
						onClick={() => setExpanded(true)}
						className="flex items-center self-start w-auto transition-all duration-300 border-b gap-x-0 hover:gap-x-2 border-neutral-400 text-neutral-600">
						<div className="self-start text-sm font-semibold">More info</div>
						<FontAwesomeIcon icon={faArrowRightLong as IconProp} className="ml-2" />
					</button>
				</div>
			</div>
			{expanded && (
				<>
					<div className="popup-bg !fixed"></div>
					<div className="popup-parent !justify-start !pt-20">
						<div className="popup-fg">
							<div
								style={{
									backgroundImage: `url(https://cdn.sanity.io/images/${config.sanityProjectId}/production/${imageID}-${imageSize}.${imageFormat})`
								}}
								className="w-full bg-center bg-cover rounded-md shadow aspect-video"></div>
							<div className="text-xl font-semibold text-neutral-700">{title}</div>
							<div className="text-xs uppercase text-neutral-500 font-medium !-my-2">
								{new Date(date).toLocaleString()}
							</div>
							<div className="text-neutral-500">{content}</div>
							<button onClick={() => setExpanded(false)} className="button">
								{t('close')}
							</button>
						</div>
					</div>
				</>
			)}
		</>
	)
}
