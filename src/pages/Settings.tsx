import React, { FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { groupNumberAtom } from '../atoms'
import config from '../config'

interface Inputs {
	groupNumber: string
}

export default function Settings() {
	const { t } = useTranslation()
	const [inputs, setInputs] = useState<Inputs>({
		groupNumber: ''
	})
	const [errors, setErrors] = useState({
		groupNumber: false
	})
	const [saveMsg, setSaveMsg] = useState(false)
	const [hidden, setHidden] = useState(false)
	const setGroupNumber = useSetRecoilState(groupNumberAtom)

	function onChange(e: React.ChangeEvent<HTMLInputElement>) {
		setInputs(prev => ({
			...prev,
			[e.target.id]: e.target.value
		}))
	}

	function showSaveMessage() {
		setHidden(false)
		setTimeout(() => {
			setSaveMsg(true)
		}, 1)

		setTimeout(() => {
			setSaveMsg(false)
		}, 2700)
	}

	useEffect(() => {
		if (saveMsg === false) {
			setTimeout(() => setHidden(true), 700)
		}
	}, [saveMsg])

	function saveGroupNumber(e: FormEvent) {
		e.preventDefault()
		setErrors(prev => ({ ...prev, groupNumber: false }))
		if (
			inputs.groupNumber &&
			!isNaN(Number(inputs.groupNumber)) &&
			config.classes.includes(Number(inputs.groupNumber))
		) {
			setGroupNumber(inputs.groupNumber)
			showSaveMessage()
		} else {
			setErrors(prev => ({ ...prev, groupNumber: true }))
		}
	}

	return (
		<>
			<div className="flex items-center w-full px-3 pt-2 pb-1 mb-10 bg-white border-b border-neutral-400 gap-x-5">
				<Link to="/">
					<FontAwesomeIcon icon={faAngleLeft} className="icon" />
				</Link>
				<div className="text-xl font-semibold text-neutral-700 -translate-y-0.5">
					{t('settings')}
				</div>
			</div>

			<form onSubmit={saveGroupNumber} className="flex flex-col w-full px-3 mb-3 gap-y-5">
				<div className="flex items-center justify-between w-full">
					<label htmlFor="groupNumber" className="label">
						{t('groupNumber')}:
					</label>
					<input
						type="number"
						id="groupNumber"
						onChange={onChange}
						value={inputs.groupNumber}
						className={`!w-1/4 input ${errors.groupNumber && 'error'}`}
					/>
				</div>
				<button type="submit" className="w-full button">
					{t('save')}
				</button>
			</form>

			<div className="absolute top-0 w-full max-w-md px-3 pt-2 -translate-x-1/2 left-1/2">
				<div
					className={`${!saveMsg && 'opacity-0'} ${
						hidden && 'hidden'
					} w-full py-3 font-medium text-center text-white duration-700 transition-opacity bg-green-600 shadow-md rounded-xl`}>
					{t('settingsSaved')}
				</div>
			</div>
		</>
	)
}
