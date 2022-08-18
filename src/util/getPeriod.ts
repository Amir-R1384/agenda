import inRange from './inRange'

export default function getPeriod(periodIndex: number): {
	type: 'period' | 'bavette'
	number: number
} {
	const isPeriod = inRange(periodIndex, 3, 6)
	const indexToBavette: { [key: number]: number } = {
		0: 1,
		1: 2,
		2: 3,
		7: 4,
		8: 5
	}
	const periodNumber = isPeriod ? periodIndex - 2 : indexToBavette[periodIndex]

	return {
		type: isPeriod ? 'period' : 'bavette',
		number: periodNumber
	}
}
