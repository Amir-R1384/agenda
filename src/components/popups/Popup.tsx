import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { useEffect, useRef } from 'react'

interface Props {
	visible: boolean
	setVisible: Dispatch<SetStateAction<boolean>>
	children?: ReactNode
	fullScreen?: boolean
}

export default function Popout({ visible, setVisible, children, fullScreen = false }: Props) {
	const popupRef = useRef<HTMLDivElement | null>(null)

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
		setTimeout(() => {
			if (visible) {
				document
					.querySelector('meta[name="theme-color"]')
					?.setAttribute('content', '#7F7F7F')
			} else {
				document.querySelector('meta[name="theme-color"]')?.setAttribute('content', 'white')
			}
		}, 0)
	}, [visible])

	return (
		<>
			<div className={`absolute top-0 bottom-0 left-0 right-0 ${!visible && 'hidden'}`}></div>
			<div
				ref={popupRef}
				style={{
					transition: 'box-shadow 200ms ease-out, height 600ms'
				}}
				className={`fixed max-w-screen-sm mx-auto bottom-0 overflow-scroll left-0 right-0 bg-popup rounded-t-3xl ${
					visible
						? `${
								fullScreen ? 'h-[95%]' : 'h-4/5'
						  } shadow-[0_0_0_1000px_rgba(0,0,0,0.5)]`
						: 'h-0 shadow-[0_0_0_1000px_rgba(0,0,0,0)]'
				}`}>
				<div>{children}</div>
			</div>
		</>
	)
}
