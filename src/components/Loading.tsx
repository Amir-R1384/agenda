import spinner from '../assets/images/spinner.svg'

interface Params {
	forPopup?: boolean
}

export default function Loading({ forPopup = false }: Params) {
	return (
		<img
			src={spinner}
			alt="Loading..."
			className={`${forPopup ? 'w-10' : 'w-20 mt-10'} mx-auto`}
		/>
	)
}
