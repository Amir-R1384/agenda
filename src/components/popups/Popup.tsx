import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { useEffect, useRef } from 'react'

interface Props {
	visible: boolean
	setVisible: Dispatch<SetStateAction<boolean>>
	children?: ReactNode
	fullScreen?: boolean
}

export default function Popout({ visible, setVisible, children, fullScreen = false }: Props) {
	const popupRef = useRef<HTMLDivElement | null>(null)
	const [removeBg, setRemoveBg] = useState(false)

	useEffect(() => {
		if (visible === false) {
			window.removeEventListener('click', listener)
		} else {
			setTimeout(() => {
				window.addEventListener('click', listener)
			}, 100)
		}

		function listener(e: globalThis.MouseEvent) {
			if (!popupRef.current!.contains(e.target as Node)) {
				setVisible(false)
			}
		}

		return () => window.removeEventListener('click', listener)
	}, [visible])

	useEffect(() => {
		if (visible) {
			setRemoveBg(false)

			document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#7F7F7F')
		} else {
			document.querySelector('meta[name="theme-color"]')?.setAttribute('content', 'white')
			setTimeout(() => setRemoveBg(true), 500)
		}
	}, [visible])

	return (
		<>
			<div
				className={`fixed bg-black transition-opacity duration-700 bottom-0 top-0  left-0 right-0  ${
					visible ? 'opacity-50' : 'opacity-0'
				} ${removeBg && 'invisible'}`}></div>
			<div
				ref={popupRef}
				className={`fixed max-w-screen-sm transition-transform duration-500 mx-auto bottom-0 overflow-scroll left-0 right-0 bg-popup rounded-t-3xl ${
					visible ? `translate-y-0 ` : 'translate-y-[100vh]'
				} ${fullScreen ? 'h-[95%]' : 'h-[80%]'}`}>
				{children}
			</div>
		</>
	)
}
