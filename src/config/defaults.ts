import { Homework, Recovery } from '../types'
import { convertToYMD } from '../util'

export const defaultHomeworkInputs = {
	date: convertToYMD(new Date()),
	periodOrSubject: 'default',
	name: '',
	description: ''
}

export const emptyHomework: Homework = {
	name: '',
	description: '',
	id: 0,
	timestamp: 0,
	subject: 'math',
	period: 0
}

export const defaultRecoveryInputs = {
	subject: 'default',
	roomNumber: '',
	days: Array(9).fill(false)
}

export const emptyRecovery: Recovery = {
	subject: 'default',
	days: [1],
	id: 0,
	roomNumber: ''
}
