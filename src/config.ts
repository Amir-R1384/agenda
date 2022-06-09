import { Config } from './types'

const config: Config = {
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
	beginingDay: '5/19/2022',
	subjects: [
		[null, null, null, 'math', 'science', 'history', 'french', null, null],
		[null, null, null, 'dramaticArt', 'science', 'PE', 'english', null, null],
		[null, null, null, 'french', 'math', 'science', 'history', null, null],
		[null, null, null, 'french', 'math', 'science', 'ECR', null, null],
		[null, null, null, 'english', 'french', 'math', 'science', null, null],
		[null, null, null, 'history', 'french', 'dramaticArt', 'science', null, null],
		[null, null, null, 'PE', 'english', 'french', 'math', null, null],
		[null, null, null, 'science', 'history', 'french', 'math', null, null],
		[null, null, null, 'science', 'ECR', 'english', 'french', null, null]
	],
	days: [
		4,
		5,
		'we',
		'we',
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
