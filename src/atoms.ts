import { atom } from 'recoil'
import { Homework, Recovery, SchoolDay, Schedule } from './types'

export const schoolDayAtom = atom<SchoolDay>({
	key: 'schoolDayAtom',
	default: undefined
})

export const scheduleAtom = atom<Schedule<string>>({
	key: 'scheduleAtom',
	default: []
})

export const homeworksAtom = atom<Homework[]>({
	key: 'homeworksAtom',
	default: []
})

export const recoveriesAtom = atom<Recovery[]>({
	key: 'recoveriesAtom',
	default: []
})

export const loadingAtom = atom({
	key: 'loading',
	default: false
})
