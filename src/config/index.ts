import days from './days'
import subjects from './subjects'
import menu from './menu'
import { Config } from '../types'

const config: Config = {
	appPrefix: 'egenda',
	beginingDay: '5/23/2022',

	daysInWeek: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
	months: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],

	classes: [401],

	subjects,
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