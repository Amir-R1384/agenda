export type SchoolDay = 'we' | 'c' | 'jp' | number | undefined
export type Homework = {
	id: number
	timestamp: number
	period: number
	subject: string
	body: string
}

export interface Meal {
	body: string
	type?: 'PVT' | 'vegan' | 'fish'
}

export interface Config {
	times: string[]
	beginingDay: string
	classes: number[]
	subjects: { [key: string]: (string | null)[][] }
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

export interface RecuperationInputs {
	subject: string
	day: string
}

export interface Popup {
	visible: boolean
	children: JSX.Element[]
}
