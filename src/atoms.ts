import { atom } from 'recoil'
import config from './config'
import { Homework, News, Recovery, Schedule, SchoolDay } from './types'

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

export const announcementAtom = atom({
	key: 'announcementAtom',
	default:
		config.announcementIndex !==
		Number(localStorage.getItem(`${config.appPrefix}-announcementIndex`))
})
