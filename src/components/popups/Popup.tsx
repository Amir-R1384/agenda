import { FormEvent, ReactNode } from 'react'

interface Params {
	visible: boolean
	children: ReactNode
	fullScreen?: boolean
	onSubmit: (e: FormEvent) => void
}

export default function Popout({ visible, children, fullScreen, onSubmit }: Params) {
	function onFormSubmit(e: FormEvent) {
		e.preventDefault()
		onSubmit(e)
	}

	return visible ? (
		<>
			<div className="popup-bg !fixed"></div>
			<form
				onSubmit={onFormSubmit}
				className={`popup-parent ${fullScreen && '!justify-start'}`}>
				<div className="popup-fg">{children}</div>
			</form>
		</>
	) : (
		<div></div>
	)
}
