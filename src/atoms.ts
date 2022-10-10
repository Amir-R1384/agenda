import { atom } from 'recoil'
import { Homework, Recovery, SchoolDay, Schedule, News } from './types'

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

export const newsAtom = atom<News[] | null>({
	key: 'newsAtom',
	default: null
})

export const loadingAtom = atom({
	key: 'loading',
	default: false
})

export const viewportAtom = atom<'mobile' | 'desktop'>({
	key: 'viewportAtom',
	default: 'mobile'
})
