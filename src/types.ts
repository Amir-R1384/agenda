export type Day = 'we' | 'c' | 'jp' | number | undefined
export type Subject = string | null

export interface Config {
	times: string[]
	beginingDay: string
	subjects: Subject[][]
	days: ('c' | 'we' | 'jp' | number)[]
}
