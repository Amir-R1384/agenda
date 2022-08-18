import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'
import { homeworksAtom } from '../atoms'
import { Heading, Homework } from '../components'
import { getToday } from '../util'

export default function Home() {
	const homeworks = useRecoilValue(homeworksAtom)
	const { t } = useTranslation()

	const todayTimeStamp = new Date(getToday()).valueOf()
	const filteredHomeworks = homeworks
		.filter(homework => homework.timestamp > todayTimeStamp)
		.slice(0, 3)

	return (
		<>
			<Heading title="upComing" />
			{filteredHomeworks.length ? (
				filteredHomeworks.map((homework, i) => <Homework key={i} {...homework} />)
			) : (
				<div className="no-data">{t('noHomework1')}</div>
			)}
		</>
	)
}
