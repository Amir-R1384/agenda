import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useRecoilValue } from 'recoil'
import { homeworksAtom, loadingAtom, newsAtom } from '../atoms'
import { Heading, Homework, Loading, News } from '../components'
import { getToday } from '../util'
import { sanityClient, newsQuery } from '../api/sanity'

export default function Home() {
	const homeworks = useRecoilValue(homeworksAtom)
	const loading = useRecoilValue(loadingAtom)
	const [news, setNews] = useRecoilState(newsAtom)
	const { t } = useTranslation()

	const todayTimeStamp = new Date(getToday()).valueOf()
	const upcomingHomeworks = homeworks
		.filter(homework => homework.timestamp > todayTimeStamp)
		.sort((a, b) => {
			if (a.timestamp !== b.timestamp) {
				return a.timestamp - b.timestamp
			} else {
				return a.period - b.period
			}
		})
		.slice(0, 4)

	useEffect(() => {
		if (news === null) {
			sanityClient.fetch(newsQuery).then(result => {
				setNews(result)
			})
		}
	}, [news])

	return (
		<>
			<Heading title="recentNews" />
			{news?.length ? (
				<div className="custom-grid">
					{news.map((news, i) => (
						<News key={i} {...news} />
					))}
				</div>
			) : (
				!loading && <div className="no-data">{t('noNews')}</div>
			)}
			<Heading title="upComing" />
			{loading ? (
				<Loading />
			) : upcomingHomeworks.length ? (
				<div className="custom-grid">
					{upcomingHomeworks.map((homework, i) => (
						<Homework key={i} {...homework} />
					))}
				</div>
			) : (
				<div className="no-data">{t('noHomework1')}</div>
			)}
			<div></div>
		</>
	)
}
