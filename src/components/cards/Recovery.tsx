import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Recovery as RecoveryType } from '../../types'

interface Props extends RecoveryType {
	onClick: () => void
}

export default function Recovery({ id, days, roomNumber, subject, onClick }: Props) {
	const { t } = useTranslation()

	const menuBtnRef = useRef<HTMLDivElement>(null)
	const [menuOpen, setMenuOpen] = useState(false)

	useEffect(() => {
		function listener(e: MouseEvent) {
			if (menuOpen && !menuBtnRef.current!.contains(e.target as Node)) {
				setMenuOpen(false)
			}
		}
		window.addEventListener('click', listener)
		return () => window.removeEventListener('click', listener)
	}, [menuOpen])

	return (
		<div onClick={onClick} className="card hover">
			<div className="card-sub flex-space-between">
				<div>{t(subject)}</div>
				{roomNumber && (
					<div>
						{t('class')} {roomNumber}
					</div>
				)}
			</div>
			<div className="card-main">
				{t('day')}s {days.join(' , ')}
			</div>
		</div>
	)
}
