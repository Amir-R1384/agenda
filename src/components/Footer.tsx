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
		<footer className="fixed bottom-0 z-10 flex justify-between w-full px-5 pt-2 -translate-x-1/2 bg-white bg-opacity-75 border-t border-neutral-400 backdrop-blur-lg left-1/2">
			<NavbarLink to="/app/cafeteria" icon={faUtensils} />
			<NavbarLink to="/app/schedule" icon={faCalendar} />
			<NavbarLink to="/app/" icon={faHouse} className="!w-7" />
			<NavbarLink to="/app/homeworks" icon={faPencil} />
			<NavbarLink to="/app/recoveries" icon={faChalkboardUser} className="!w-7" />
		</footer>
	)
}
