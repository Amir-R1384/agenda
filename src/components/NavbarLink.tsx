import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Params {
	to: string
	icon: any
	className?: string
}

export default function NavbarLink({ to, icon, className }: Params) {
	return (
		<NavLink
			to={to}
			className={({ isActive }) => {
				return `icon noSelect ${className} ${isActive && 'selected'}`
			}}>
			<FontAwesomeIcon icon={icon} className="w-full h-full" />
		</NavLink>
	)
}
