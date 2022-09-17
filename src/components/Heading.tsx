import { useTranslation } from 'react-i18next'

interface Params {
	title: string
}

export default function Heading({ title }: Params) {
	const { t } = useTranslation()

	return (
		<div className="w-full mt-5 -mb-2 text-xl font-medium drop-shadow-md text-neutral-700">
			{t(title)}
		</div>
	)
}
