export default function getTomorrow(today: Date) {
	const tomorrow = new Date(today)

	// For some reason, when u pass the input to 'today', you add 2 instead of 1
	tomorrow.setDate(today.getDate() + 1)
	return tomorrow
}
