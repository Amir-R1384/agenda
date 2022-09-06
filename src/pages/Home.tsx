import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'
import { homeworksAtom, loadingAtom } from '../atoms'
import { Heading, Homework, Loading } from '../components'
import { getToday } from '../util'

export default function Home() {
	const homeworks = useRecoilValue(homeworksAtom)
	const loading = useRecoilValue(loadingAtom)
	const { t } = useTranslation()

	const todayTimeStamp = new Date(getToday()).valueOf()
	const upcomingHomeworks = homeworks
		.filter(homework => homework.timestamp > todayTimeStamp)
		.sort((a, b) => a.timestamp - b.timestamp)
		.slice(0, 5)

	return (
		<>
			<Heading title="upComing" />
			{loading ? (
				<Loading />
			) : upcomingHomeworks.length ? (
				upcomingHomeworks.map((homework, i) => <Homework key={i} {...homework} />)
			) : (
				<div className="no-data">{t('noHomework1')}</div>
			)}
		</>
	)
}
