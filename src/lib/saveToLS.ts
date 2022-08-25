import config from '../config'

export default function saveToLS(key: string, value: any) {
	const { appPrefix } = config

	localStorage.setItem(`${appPrefix}-${key}`, JSON.stringify(value))
}
