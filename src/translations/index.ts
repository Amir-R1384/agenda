import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import config from '../config'

import en from './en'
import fr from './fr'

i18n.use(initReactI18next).init({
	resources: { en, fr },
	lng: window.navigator?.language,
	fallbackLng: config.fallbackLng,
	supportedLngs: config.supportedLngs,
	nonExplicitSupportedLngs: true
})

export default i18n
