import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { loadingAtom, recoveriesAtom } from '../../atoms'
import { saveData } from '../../lib'
import { Recovery as RecoveryType } from '../../types'

export default function Recovery({ id, day, subject }: RecoveryType) {
	const { t } = useTranslation()

	const menuBtnRef = useRef<HTMLDivElement>(null)
	const [menuOpen, setMenuOpen] = useState(false)
	const [recoveries, setRecoveries] = useRecoilState(recoveriesAtom)
	const setLoading = useSetRecoilState(loadingAtom)

	useEffect(() => {
		function listener(e: MouseEvent) {
			if (menuOpen && !menuBtnRef.current!.contains(e.target as Node)) {
				setMenuOpen(false)
			}
		}
		window.addEventListener('click', listener)
		return () => window.removeEventListener('click', listener)
	}, [menuOpen])

	async function deleteRecovery() {
		setLoading(true)
		const newRecoveries = [...recoveries]

		const currentRecovery = newRecoveries.find(obj => obj.id === id)!
		newRecoveries.splice(newRecoveries.indexOf(currentRecovery), 1)

		await saveData('recoveries', newRecoveries)
		setRecoveries(newRecoveries)
		setLoading(false)
	}

	return (
		<div className="relative card">
			<div className="card-main">{subject}</div>
			<div className="!text-base font-medium card-sub">
				{t('day')} {day}
			</div>
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
						onClick={deleteRecovery}
						className="px-3 py-1 font-medium text-white bg-red-500">
						Delete
					</button>
				</div>
			</div>
		</div>
	)
}
