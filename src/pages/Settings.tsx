import React, { FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { signOut as FB_signOut } from 'firebase/auth'
import { auth } from '../api'
import { groupNumberAtom } from '../atoms'
import { validGroupNumber } from '../util'
import { saveData } from '../lib'

interface Inputs {
	groupNumber: string
}

export default function Settings() {
	const { t } = useTranslation()
	const navigate = useNavigate()
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

	async function saveGroupNumber(e: FormEvent) {
		e.preventDefault()
		setErrors(prev => ({ ...prev, groupNumber: false }))

		const groupNumber = Number(inputs.groupNumber)

		if (validGroupNumber(groupNumber)) {
			await saveData('groupNumber', groupNumber)
			setGroupNumber(groupNumber)
			showSaveMessage()
		} else {
			setErrors(prev => ({ ...prev, groupNumber: true }))
		}
	}

	function signOut() {
		FB_signOut(auth)
		window.location.assign('/')
	}

	return (
		<>
			<div className="flex items-center w-full px-3 pt-2 pb-1 mb-10 bg-white border-b border-neutral-400 gap-x-5">
				<Link to="/app/">
					<FontAwesomeIcon icon={faAngleLeft} className="icon" />
				</Link>
				<div className="text-xl font-semibold text-neutral-700 -translate-y-0.5">
					{t('settings')}
				</div>
			</div>

			<div className="flex flex-col px-3 gap-y-10">
				<form onSubmit={saveGroupNumber} className="flex flex-col w-full gap-y-5">
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

				<button onClick={signOut} className="button !bg-red-500">
					{t('signOut')}
				</button>
			</div>

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
