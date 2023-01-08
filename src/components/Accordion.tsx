import { ChevronDownOutline } from '@graywolfai/react-heroicons'
import React, { ReactNode } from 'react'

interface Props {
	index: number
	open: boolean
	setAccordions: React.Dispatch<React.SetStateAction<boolean[]>>
	title: string
	children?: ReactNode
}

export default function Accordion({ index, open, setAccordions, title, children }: Props) {
	function toggleAccordion() {
		setAccordions(prev => {
			const newAccordions = [...prev]
			newAccordions[index] = !prev[index]
			return newAccordions
		})
	}

	return (
		<div
			className={`flex flex-col transition-all outline-container outline-spacing ${
				!open && 'outline-hover'
			} `}>
			<button
				type="button"
				onClick={toggleAccordion}
				className={`rounded flex-space-between`}>
				<div className="text-lg font-medium text-primary">{title}</div>
				<ChevronDownOutline
					className={`${
						!open && '-rotate-90'
					} icon !w-6 transition-transform duration-500`}
				/>
			</button>
			<div
				className={`${
					!open && '!max-h-0 duration-[400ms]'
				} max-h-[1000px] overflow-hidden transition-all duration-700`}>
				<div className="mt-5"></div>
				{children}
				<div className="mb-5"></div>
			</div>
		</div>
	)
}
