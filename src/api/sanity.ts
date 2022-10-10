import sanityClient from '@sanity/client'
import config from '../config'

// Wether to use the cdn or live api for the news
const lastCdnFetch = localStorage.getItem(`${config.appPrefix}-lastCdnFetch`) || '0'
let useCdn: boolean

if (Date.now() - Number(lastCdnFetch) < 300000) {
	useCdn = true
} else {
	useCdn = false
	localStorage.setItem(`${config.appPrefix}-lastCdnFetch`, JSON.stringify(Date.now()))
}

const client = sanityClient({
	projectId: config.sanityProjectId,
	dataset: 'production',
	apiVersion: '2021-10-21',
	token: import.meta.env.VITE_SANITY_TOKEN,
	ignoreBrowserTokenWarning: true,
	useCdn
})

const browserLanguage = navigator.language.slice(0, 2)
const lang = config.supportedLngs.includes(browserLanguage) ? browserLanguage : config.fallbackLng

const newsQuery = `*[_type == 'news'] {"title":title.${lang}, "content": content.${lang}, "image": image.asset._ref, date}`

export { client as sanityClient, newsQuery }
