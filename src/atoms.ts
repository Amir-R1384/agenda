import { atom } from 'recoil'
import { SchoolDay, Homework, RecuperationInputs } from './types'

export const schoolDayAtom = atom<SchoolDay>({
	key: 'schoolDayAtom',
	default: undefined
})

export const homeworksAtom = atom<Homework[]>({
	key: 'homeworksAtom',
	default: []
})

export const recoveriesAtom = atom<RecuperationInputs[]>({
	key: 'recoveriesAtom',
	default: []
})

export const groupNumberAtom = atom<string>({
	key: 'groupNumberAtom',
	default: localStorage.groupNumber || ''
})
