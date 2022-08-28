export type SchoolDay = 'we' | 'c' | 'jp' | number | undefined
export type Homework = {
	id: number
	timestamp: number
	period: number
	subject: string
	body: string
}
export type Recovery = {
	id: number
	classNumber: string
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
	classes: number[]
	subjects: { [key: number]: (string | null)[][] }
	daysInWeek: string[]
	months: string[]
	menu: Meal[][][]
	days: ('c' | 'we' | 'jp' | number)[]
}

export interface HomeworkInputs {
	date: string
	periodOrSubject: string
	body: string
}

export interface RecoveryInputs {
	subject: string
	classNumber: string
	day: string
}

export interface Popup {
	visible: boolean
	children: JSX.Element[]
}
