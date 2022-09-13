export type SchoolDay = 'we' | 'c' | 'jp' | number | undefined

export type Day = 'c' | 'we' | 'jp' | number
export type Schedule<T> = { [key: number]: (null | { subject: T; roomNumber: T })[] }
export type Page = 0 | 1 | 2 // Yesterday, today, tomorrow (for the schedule page)

export type Homework = {
	id: number
	timestamp: number
	period: number
	subject: string
	body: string
}
export type Recovery = {
	id: number
	roomNumber: string
	subject: string
	day: number
}

export interface Meal {
	body: string
	type?: 'PVT' | 'vegan' | 'fish'
}

export interface Config {
	appPrefix: string
	times: string[]
	beginingDay: string
	subjects: string[]
	classes: number[]
	daysInWeek: string[]
	months: string[]
	menu: Meal[][][]
	days: Day[]
}

export interface HomeworkInputs {
	date: string
	periodOrSubject: string
	body: string
}

export interface RecoveryInputs {
	subject: string
	roomNumber: string
	day: string
}

export interface Popup {
	visible: boolean
	children: JSX.Element[]
}
