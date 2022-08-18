export default function getToday() {
	const today = new Date()

	const year = today.getFullYear()
	const month = make2digits(today.getMonth() + 1)
	const date = make2digits(today.getDate())

	return `${year}-${month}-${date}`
}

// If a number is one digit, add a 0 before it to make 2 characters
function make2digits(input: number) {
	if (input < 10) {
		return `0${input}`
	}
	return input
}
