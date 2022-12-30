export default function getBrowser(navigator: Navigator) {
	if (/Android/i.test(navigator.userAgent)) {
		return 'android'
	} else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
		return 'iphone'
	} else {
		return 'other'
	}
}
