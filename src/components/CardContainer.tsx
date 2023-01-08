import { PlusOutline } from '@graywolfai/react-heroicons'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
	heading: string
	children: ReactNode
	includeAddButton?: boolean
	callBack?: () => void
}

export default function CardContainer({
	heading,
	children,
	includeAddButton = false,
	callBack
}: Props) {
	const { t } = useTranslation()

	return (
		<div className="w-full mb-5">
			<div className="mb-1 flex-space-between">
				<div className="w-full text-lg text-primary">{t(heading)}</div>
				{includeAddButton && (
					<button onClick={callBack}>
						<PlusOutline className="icon !w-7" />
					</button>
				)}
			</div>

			{children}
		</div>
	)
}
