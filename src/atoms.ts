import { atom } from 'recoil'
import { Homework, Recovery, SchoolDay } from './types'

export const schoolDayAtom = atom<SchoolDay>({
	key: 'schoolDayAtom',
	default: undefined
})

export const homeworksAtom = atom<Homework[]>({
	key: 'homeworksAtom',
	default: []
})

export const recoveriesAtom = atom<Recovery[]>({
	key: 'recoveriesAtom',
	default: []
})

export const groupNumberAtom = atom<number | null>({
	key: 'groupNumberAtom',
	default: null
})

export const loadingAtom = atom({
	key: 'loading',
	default: false
})
