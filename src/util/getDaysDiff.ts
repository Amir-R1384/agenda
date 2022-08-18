import config from '../config'

export default function getDaysDiff(date: Date | string) {
	const begining = new Date(config.beginingDay).valueOf()
	const now = new Date(date).valueOf()
	const daysDiff = Math.floor((now - begining) / 1000 / 60 / 60 / 24)

	return daysDiff
}
