import { Config } from '../types'
import days from './days'
import menu from './menu'

const config: Config = {
	appPrefix: 'egenda',
	beginingDay: '8/29/2022',

	announcementIndex: 3,

	sanityProjectId: 'sq5zpcem',
	fallbackLng: 'en',
	supportedLngs: ['en', 'fr'],

	daysInWeek: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
	months: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
	subjects: [
		'french',
		'english',
		'math',
		'science',
		'history',
		'geography',
		'PE',
		'ECR',
		'dramaticArt',
		'plasticArt',
		'chemistry',
		'physics',
		'mondeEducF',
		'psychology',
		'entrepreneurship',
		'artMultiMedia',
		'spanish',
		'music',
		'choir',
		'musicTheory'
	],
	classes: [401],

	days,
	menu,

	times: [
		'7:30 - 8:00',
		'8:00 - 8:15',
		'8:15 - 8:45',
		'8:55 - 10:10',
		'10:20 - 11:35',
		'12:35 - 13:50',
		'14:00 - 15:15',
		'15:20 - 15:50',
		'15:50 - 16:35'
	]
}

export default config
