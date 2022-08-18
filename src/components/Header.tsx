import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import DayInfo from './DayInfo'

export default function Header() {
	return (
		<header className="fixed top-0 z-10 flex flex-col w-full px-3 pt-1 pb-3 -translate-x-1/2 bg-white border-b shado border-neutral-400 gap-y-3 backdrop-blur-xl left-1/2">
			<nav className="flex items-center justify-between w-full">
				<Link to="/">
					<h1 className="text-2xl font-semibold text-neutral-800 drop-shadow-md notranslate">
						Egenda
					</h1>
				</Link>
				<Link to="/settings" className="icon noSelect">
					<FontAwesomeIcon icon={faGear} className="w-full h-full" />
				</Link>
			</nav>
			<DayInfo />
		</header>
	)
}
