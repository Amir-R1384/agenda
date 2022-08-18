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
		<form
			onSubmit={onFormSubmit}
			className="absolute top-0 left-0 z-20 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50">
			<div className="flex flex-col items-start w-11/12 max-w-md p-3 rounded-lg bg-neutral-100 gap-y-4">
				{children}
			</div>
		</form>
	) : (
		<div></div>
	)
}
