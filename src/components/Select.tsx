import { ChevronUpDownOutline } from '@graywolfai/react-heroicons'
import { ChangeEventHandler, ReactNode } from 'react'

interface Props {
	id: string
	value: any
	onChange: ChangeEventHandler<HTMLSelectElement>
	children: ReactNode
	error: boolean
	className?: string
}

export default function Select({ id, value, onChange, children, error, className }: Props) {
	return (
		<label
			htmlFor={id}
			className={`relative flex-space-between ${className} ${error && 'error'}`}>
			<select
				id={id}
				value={value}
				className={`z-10 w-full px-5 py-2 bg-transparent outline-none appearance-none cursor-pointer`}
				onChange={onChange}>
				{children}
			</select>
			<ChevronUpDownOutline className="absolute z-0 w-7 right-main" />
		</label>
	)
}
