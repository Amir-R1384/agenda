import {
	faCalendar,
	faChalkboardUser,
	faHouse,
	faPencil,
	faUtensils
} from '@fortawesome/free-solid-svg-icons'
import NavbarLink from '../components/NavbarLink'

export default function Footer() {
	return (
		<footer className="flex justify-between w-full px-5 pt-2 bg-white border-t sm:px-3 sm:py-5 shrink-0 sm:w-auto sm:border-t-0 sm:border-r sm:translate-x-0 sm:static sm:flex-col sm:left-0 border-neutral-400 backdrop-blur-lg">
			<NavbarLink to="/app/cafeteria" icon={faUtensils} className="sm:order-4" />
			<NavbarLink to="/app/schedule" icon={faCalendar} className="sm:order-2" />
			<NavbarLink to="/app/" icon={faHouse} className="!w-7 sm:order-1" />
			<NavbarLink to="/app/homeworks" icon={faPencil} className="sm:order-3" />
			<NavbarLink to="/app/recoveries" icon={faChalkboardUser} className="!w-7 sm:order-5" />
		</footer>
	)
}
