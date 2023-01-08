export type SchoolDay = 'we' | 'c' | 'jp' | number | undefined

export type Day = 'c' | 'we' | 'jp' | number
export type Schedule<T> = { [key: number]: (null | { subject: T; roomNumber: T })[] }

export type Homework = {
	id: number
	timestamp: number
	period: number
	subject: string
	name: string
	description: string
}
export type Recovery = {
	id: number
	roomNumber: string
	subject: string
	days: number[]
}

export interface Meal {
	body: string
	type?: 'PVT' | 'vegan' | 'fish'
}

export interface Config {
	appPrefix: string
	times: string[]
	announcementIndex: number
	sanityProjectId: string
	beginingDay: string
	fallbackLng: string
	supportedLngs: string[]
	subjects: string[]
	classes: number[]
	daysInWeek: string[]
	months: string[]
	menu: Meal[][][]
	days: Day[]
}

export interface HomeworkInputs {
	periodOrSubject: string
	date: string
	name: string
	description: string
}

export interface RecoveryInputs {
	subject: string
	roomNumber: string
	days: boolean[]
}

export interface Popup {
	visible: boolean
	children: JSX.Element[]
}

export interface News {
	title: string
	content: string
	image: string
	date: string
}
