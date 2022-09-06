import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactNode, useEffect, useState } from 'react'

interface Params {
	index: number
	open: boolean
	setAccordions: React.Dispatch<React.SetStateAction<boolean[]>>
	title: string
	children?: ReactNode
}

export default function Accordion({ index, open, setAccordions, title, children }: Params) {
	function toggleAccordion() {
		setAccordions(prev => {
			const newAccordions = [...prev]
			newAccordions[index] = !prev[index]
			return newAccordions
		})
	}

	return (
		<div className="flex flex-col w-full px-4 py-2 transition-all bg-white border rounded-lg shadow-md border-neutral-700">
			<button
				type="button"
				onClick={toggleAccordion}
				className="flex items-center justify-between w-full">
				<div className="text-lg font-semibold text-neutral-700">{title}</div>
				<FontAwesomeIcon
					icon={faAngleDown as IconProp}
					className={`${!open && '-rotate-90'} transition-transform duration-500`}
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
