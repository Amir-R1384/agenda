import config from '../config'

export default function getAppearance() {
	const appearance =
		localStorage.getItem(`${config.appPrefix}-appearance`) === 'dark' ? 'dark' : 'light'
	return appearance
}
