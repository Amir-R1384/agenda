export type Day = 'we' | 'c' | 'jp' | number | undefined

export interface Config {
	times: string[]
	beginingDay: string
	subjects: string[][]
	days: ('c' | 'we' | 'jp' | number)[]
}

export type Lang = 'en' | 'fr'
