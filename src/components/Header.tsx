import { Bars3Outline } from '@graywolfai/react-heroicons'
import { useEffect, useRef, useState } from 'react'
import DayInfo from './DayInfo'
import Settings from './Settings'

export default function Header() {
	const headerRef = useRef<HTMLElement | null>(null)
	const [settingsOpen, setSettingsOpen] = useState(false)
	const [settingsHeight, setSettingsHeight] = useState(0)

	useEffect(() => {
		const windowHeight = window.innerHeight
		const headerHeight = headerRef.current?.getBoundingClientRect().height!
		setSettingsHeight(windowHeight - headerHeight)
	}, [])

	return (
		<header
			ref={headerRef}
			className="relative py-2 transition-all duration-700 bg-white border-b dark:border-neutral-700 dark:bg-neutral-800 px-main flex-space-between border-neutral-200">
			<DayInfo />
			<button onClick={() => setSettingsOpen(prev => !prev)}>
				<Bars3Outline className="icon" />
			</button>

			<Settings
				style={{ height: settingsOpen ? `${settingsHeight}px` : '0px' }}
				className={`${!settingsOpen && ''}`}
			/>
		</header>
	)
}
