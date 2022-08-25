import { useTranslation } from 'react-i18next'
import { useRecoilState, useRecoilValue } from 'recoil'
import { homeworksAtom, loadingAtom } from '../atoms'
import { Heading, Homework, Loading } from '../components'
import { useLoadData } from '../hooks'
import { getToday } from '../util'

export default function Home() {
	const homeworks = useRecoilValue(homeworksAtom)
	const [loading, setLoading] = useRecoilState(loadingAtom)
	const { t } = useTranslation()

	useLoadData('homeworks', setLoading)

	const todayTimeStamp = new Date(getToday()).valueOf()
	const upcomingHomeworks = homeworks
		.filter(homework => homework.timestamp > todayTimeStamp)
		.sort((a, b) => a.timestamp - b.timestamp)
		.slice(0, 3)

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
