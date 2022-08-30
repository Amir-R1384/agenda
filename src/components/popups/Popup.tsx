import { FormEvent } from 'react'

interface Params {
	visible: boolean
	children: JSX.Element[]
	onSubmit: (e: FormEvent) => void
}

export default function Popout({ visible, children, onSubmit }: Params) {
	function onFormSubmit(e: FormEvent) {
		e.preventDefault()
		onSubmit(e)
	}

	return visible ? (
		<form onSubmit={onFormSubmit} className="popup-bg">
			<div className="popup-fg">{children}</div>
		</form>
	) : (
		<div></div>
	)
}
