import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

interface Params {
	onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export default function AddButton({ onClick }: Params) {
	return (
		<button
			onClick={onClick}
			className="button !shadow-lg !rounded-2xl !px-10 grid place-items-center">
			<FontAwesomeIcon icon={faPlus} className="bg-transparent text-neutral-200 h-7" />
		</button>
	)
}
