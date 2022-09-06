import { Schedule } from '../types'

export default function generateEmptySchedule<T>(errors: boolean = false) {
	const schedule: Schedule<unknown> = {}

	for (let i = 0; i < 9; i++) {
		schedule[i] = []
		for (let j = 0; j < 9; j++) {
			schedule[i].push({
				subject: errors ? false : 'default',
				roomNumber: errors ? false : ''
			})
		}
	}

	return schedule as Schedule<T>
}
