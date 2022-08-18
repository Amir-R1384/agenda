import { FormEvent, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { useTranslation } from 'react-i18next'
import { groupNumberAtom } from '../atoms'
import config from '../config'

export default function Setup() {
	const setGroupNumber = useSetRecoilState(groupNumberAtom)
	const [value, setValue] = useState('')
	const [error, setError] = useState(false)
	const { t } = useTranslation()

	function onSubmit(e: FormEvent) {
		e.preventDefault()
		setError(false)
		if (!value || !config.classes.includes(Number(value))) return setError(true)
		setGroupNumber(value)
	}

	return (
		<div className="flex flex-col items-center justify-around min-h-full bg-white">
			<div className="text-3xl font-semibold  text-neutral-800 drop-shadow-md">Egenda</div>
			<form onSubmit={onSubmit} className="flex flex-col items-stretch gap-y-3">
				<input
					value={value}
					onChange={e => {
						if (!isNaN(Number(e.target.value))) {
							setValue(e.target.value)
						}
					}}
					className={`text-center input ${error && 'error'}`}
					placeholder={t('groupNumber')}
				/>
				<button type="submit" className="!py-1.5 button">
					{t('access')}
				</button>
			</form>
			<div className="text-sm text-neutral-500">École secondaire Pierre-Laporte</div>
		</div>
	)
}
