export default function inRange(num: number, min: number, max: number, include = true) {
	if (include) {
		if (num >= min && num <= max) return true
	} else {
		if (num > min && num < max) return true
	}
	return false
}
