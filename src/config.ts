import { Config } from './types'

const config: Config = {
	appPrefix: 'egenda',
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
	],
	beginingDay: '5/23/2022',
	classes: [401],
	subjects: {
		401: [
			[null, null, null, 'math', 'science', 'history', 'french', null, null],
			[null, null, null, 'dramaticArt', 'science', 'PE', 'english', null, null],
			[null, null, null, 'french', 'math', 'science', 'history', null, null],
			[null, null, null, 'french', 'math', 'science', 'ECR', null, null],
			[null, null, null, 'english', 'french', 'math', 'science', null, null],
			[null, null, null, 'history', 'french', 'dramaticArt', 'science', null, null],
			[null, null, null, 'PE', 'english', 'french', 'math', null, null],
			[null, null, null, 'science', 'history', 'french', 'math', null, null],
			[null, null, null, 'science', 'ECR', 'english', 'french', null, null]
		]
	},
	daysInWeek: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
	months: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
	menu: [
		[
			[{ body: 'Burger', type: 'PVT' }, { body: 'Ham' }],
			[{ body: 'fish', type: 'fish' }],
			[{ body: 'salad', type: 'vegan' }],
			[{ body: 'pizza' }],
			[{ body: 'fish', type: 'fish' }]
		],
		[
			[{ body: 'Burger' }, { body: 'Ham' }],
			[{ body: 'fish', type: 'fish' }],
			[{ body: 'salad', type: 'vegan' }],
			[{ body: 'pizza' }],
			[{ body: 'fish', type: 'fish' }]
		],
		[
			[{ body: 'Burger' }, { body: 'Ham' }],
			[{ body: 'fish', type: 'fish' }],
			[{ body: 'salad', type: 'vegan' }],
			[{ body: 'pizza' }],
			[{ body: 'fish', type: 'fish' }]
		],
		[
			[{ body: 'Burger' }, { body: 'Ham' }],
			[{ body: 'fish', type: 'fish' }],
			[{ body: 'salad', type: 'vegan' }],
			[{ body: 'pizza' }],
			[{ body: 'fish', type: 'fish' }]
		],
		[
			[{ body: 'Burger' }, { body: 'Ham' }],
			[{ body: 'fish', type: 'fish' }],
			[{ body: 'salad', type: 'vegan' }],
			[{ body: 'pizza' }],
			[{ body: 'fish', type: 'fish' }]
		]
	],
	days: [
		'c',
		7,
		8,
		9,
		6,
		'we',
		'we',
		1,
		2,
		3,
		4,
		5,
		'we',
		'we',
		6,
		7,
		8,
		9,
		2,
		'we',
		'we',
		1,
		2,
		3,
		4,
		5,
		'we',
		'we',
		6,
		7
	]
}

export default config
