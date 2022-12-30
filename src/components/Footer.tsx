import {
	CakeOutline,
	CakeSolid,
	CalendarOutline,
	CalendarSolid,
	HomeOutline,
	HomeSolid,
	PencilOutline,
	PencilSolid,
	UsersOutline,
	UsersSolid
} from '@graywolfai/react-heroicons'
import { Link, useLocation } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { viewportAtom } from '../atoms'

export default function Footer() {
	const location = useLocation()
	const pathname = location.pathname.replace('/app', '')

	const viewport = useRecoilValue(viewportAtom)

	return (
		<footer
			className={`pt-2 bg-white border-t px-main justify-between border-neutral-200 ${
				viewport === 'desktop'
					? 'flex flex-col h-full justify-between border-t-0 border-r !py-10'
					: 'flex-space-between'
			}`}>
			<Link to="/app/cafeteria">
				{pathname === '/cafeteria' ? (
					<CakeSolid className="icon" />
				) : (
					<CakeOutline className="icon" />
				)}
			</Link>
			<Link to="/app/schedule">
				{pathname === '/schedule' ? (
					<CalendarSolid className="icon" />
				) : (
					<CalendarOutline className="icon" />
				)}
			</Link>
			<Link to="/app/">
				{pathname === '/' ? (
					<HomeSolid className="icon" />
				) : (
					<HomeOutline className="icon" />
				)}
			</Link>
			<Link to="/app/homeworks">
				{pathname === '/homeworks' ? (
					<PencilSolid className="icon" />
				) : (
					<PencilOutline className="icon" />
				)}
			</Link>
			<Link to="/app/recoveries">
				{pathname === '/recoveries' ? (
					<UsersSolid className="icon" />
				) : (
					<UsersOutline className="icon" />
				)}
			</Link>
		</footer>
	)
}
