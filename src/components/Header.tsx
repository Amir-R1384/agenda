import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import DayInfo from './DayInfo'
import title from '../assets/images/title.png'
import { useRecoilValue } from 'recoil'
import { viewportAtom } from '../atoms'

export default function Header() {
	const viewport = useRecoilValue(viewportAtom)

	return (
		<header className="flex flex-col w-full px-3 pt-1 pb-3 bg-white border-b sm:py-2 sm:justify-between sm:flex-row border-neutral-400 gap-y-3 shrink-0">
			<nav className="flex items-center justify-between w-full">
				<Link to="/app/">
					<img src={title} className="h-8 translate-y-1" />
				</Link>
				{viewport === 'desktop' && <DayInfo />}
				<Link to="/settings" className="icon noSelect">
					<FontAwesomeIcon icon={faGear as IconProp} className="w-full h-full" />
				</Link>
			</nav>
			{viewport === 'mobile' && <DayInfo />}
		</header>
	)
}
