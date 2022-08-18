import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'
import { homeworksAtom } from '../../atoms'
import { getPeriod, getToday } from '../../util'
import { Homework as Params } from '../../types'
import config from '../../config'

export default function Homework({ id, timestamp, period, subject, body }: Params) {
	const { t } = useTranslation()

	const dateObj = new Date(timestamp)
	const date = dateObj.getDate()
	const day = dateObj.getDay()
	const month = dateObj.getMonth()

	const { type: PeriodType, number: periodNumber } = getPeriod(period)

	const setHomeworks = useSetRecoilState(homeworksAtom)
	const [menuOpen, setMenuOpen] = useState(false)

	const menuBtnRef = useRef<HTMLDivElement>(null)

	const pastDueDate = timestamp <= new Date(getToday()).valueOf()

	useEffect(() => {
		function listener(e: MouseEvent) {
			if (menuOpen && !menuBtnRef.current!.contains(e.target as Node)) {
				setMenuOpen(false)
			}
		}
		window.addEventListener('click', listener)
		return () => window.removeEventListener('click', listener)
	}, [menuOpen])

	function deleteHomework() {
		setHomeworks(prev => {
			const newArr = [...prev]

			const currentHomework = newArr.find(obj => obj.id === id)!
			newArr.splice(newArr.indexOf(currentHomework), 1)

			return [...newArr]
		})
	}

	return (
		<div className={`relative card ${pastDueDate && 'mb-2'}`}>
			<div className="flex items-center justify-between w-full">
				<div className="card-sub">{t(subject)}</div>
				<div className="!text-xs card-sub">
					{t(config.daysInWeek[day])}, {t(config.months[month])} {date} - {t(PeriodType)}{' '}
					{periodNumber}
				</div>
			</div>
			<div className="w-full pr-10 !text-lg break-words card-main">{body}</div>
			{/* Button */}
			<div
				ref={menuBtnRef}
				onClick={() => setMenuOpen(prev => !prev)}
				className="absolute px-2 text-white rounded-md shadow-md cursor-pointer right-2 bg-neutral-500 bottom-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="w-4 scale-125"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={2}>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
					/>
				</svg>
				<div
					hidden={!menuOpen}
					onClick={e => e.stopPropagation()}
					className="absolute right-0 z-20 mt-1 overflow-hidden rounded-md shadow-md bg-neutral-100 top-full hover:brightness-100">
					<button
						onClick={deleteHomework}
						className="px-3 py-1 font-medium text-white bg-red-500">
						Delete
					</button>
				</div>
			</div>
			{/* Past due date alert */}
			{pastDueDate && (
				<div className="absolute left-0 mt-0.5 ml-2 text-xs text-red-500 top-full">
					{t('pastDueDate')}
				</div>
			)}
		</div>
	)
}
