import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import DayInfo from './DayInfo'
import title from '../assets/images/title.png'

export default function Header() {
	return (
		<header className="fixed top-0 z-10 flex flex-col w-full px-3 pt-1 pb-3 -translate-x-1/2 bg-white border-b shado border-neutral-400 gap-y-3 backdrop-blur-xl left-1/2">
			<nav className="flex items-center justify-between w-full">
				<Link to="/app/">
					<img src={title} className="h-8 translate-y-1" />
				</Link>
				<Link to="/settings" className="icon noSelect">
					<FontAwesomeIcon icon={faGear as IconProp} className="w-full h-full" />
				</Link>
			</nav>
			<DayInfo />
		</header>
	)
}
