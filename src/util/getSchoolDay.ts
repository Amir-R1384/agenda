import config from '../config'
import getDaysDiff from './getDaysDiff'

export default function getSchoolDay(date: Date | string = new Date()) {
	const daysDiff = getDaysDiff(date)

	const schoolDay = config.days[daysDiff]
	return schoolDay
}
