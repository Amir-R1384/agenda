import config from '../config'

export default function getDaysDiff(date: Date | string) {
	const begining = new Date(config.beginingDay)
	const now = new Date(date)

	now.setHours(0)
	now.setMinutes(0)
	now.setSeconds(0)

	const daysDiff = Math.floor((now.valueOf() - begining.valueOf()) / 1000 / 60 / 60 / 24)

	return daysDiff
}
