import { useRecoilValue } from 'recoil'
import { loadingAtom } from '../atoms'

interface Props {
	forPopup?: boolean
	className?: string
}

export default function Loading({ className }: Props) {
	const loading = useRecoilValue(loadingAtom)

	return (
		<div
			className={`w-5 border-2 border-primary border-b-transparent rounded-full animate-spin loader aspect-square ${className} ${
				!loading && 'opacity-0'
			}`}></div>
	)
}
