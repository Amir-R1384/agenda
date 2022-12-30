import make2digits from './make2digits'

export default function convertToYMD(input: Date | number): string {
	const dateObj = new Date(input)

	const date = make2digits(dateObj.getDate())
	const month = make2digits(dateObj.getMonth() + 1)
	const year = dateObj.getFullYear()

	return `${year}-${month}-${date}`
}
