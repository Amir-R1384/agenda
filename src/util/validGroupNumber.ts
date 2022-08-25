import config from '../config'

export default function validGroupNumber(groupNumber: number) {
	return config.classes.includes(groupNumber)
}
