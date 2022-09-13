export default function getOtherDay(which: 'tomorrow' | 'yesterday') {
	const other = new Date()

	if (which === 'tomorrow') {
		other.setDate(other.getDate() + 1)
	} else {
		other.setDate(other.getDate() - 1)
	}

	return other
}
