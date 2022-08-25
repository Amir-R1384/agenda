import React, { useEffect } from 'react'
import { getData } from '../lib'
import { useSetRecoilState } from 'recoil'
import { groupNumberAtom, homeworksAtom, recoveriesAtom } from '../atoms'

export default function useLoadData(
	dataName: string,
	setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) {
	const setGroupNumber = useSetRecoilState(groupNumberAtom)
	const setHomeworks = useSetRecoilState(homeworksAtom)
	const setRecoveries = useSetRecoilState(recoveriesAtom)

	useEffect(() => {
		if (setLoading) setLoading(true)

		getData(dataName).then(data => {
			switch (dataName) {
				case 'groupNumber':
					setGroupNumber(data)
					break

				case 'homeworks':
					setHomeworks(data)
					break

				case 'recoveries':
					setRecoveries(data)
					break

				default:
					console.error('Undefined data name at useLoadData hook')
					break
			}

			if (setLoading) setLoading(false)
		})
	}, [])
}
