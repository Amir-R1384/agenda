import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Loading, Popup } from '..'
import { homeworksAtom, loadingAtom } from '../../atoms'
import config from '../../config'
import { saveData } from '../../lib'
import { Homework } from '../../types'
import { getPeriod } from '../../util'

interface Props {
	visible: boolean
	setVisible: Dispatch<SetStateAction<boolean>>
	homeworkInfo: Homework
	onEdit: () => void
}

export default function HomeworkPopup({ visible, setVisible, homeworkInfo, onEdit }: Props) {
	const { id, name, description, period, subject, timestamp } = homeworkInfo

	const [homeworks, setHomeworks] = useRecoilState(homeworksAtom)
	const setLoading = useSetRecoilState(loadingAtom)
	const { t } = useTranslation()

	const dateObj = new Date(timestamp)
	const date = dateObj.getDate()
	const day = dateObj.getDay()
	const month = dateObj.getMonth()

	const { type: PeriodType, number: periodNumber } = getPeriod(period)

	async function deleteHomework() {
		setLoading(true)
		const newHomeworks = [...homeworks]

		const currentHomework = newHomeworks.find(obj => obj.id === id)!
		newHomeworks.splice(newHomeworks.indexOf(currentHomework), 1)

		await saveData('homeworks', newHomeworks)
		setHomeworks(newHomeworks)
		setLoading(false)
		setVisible(false)
	}

	return (
		<Popup visible={visible} setVisible={setVisible}>
			<div className="pr-5 flex-space-between">
				<div className="p-5 mb-5 text-xl text-primary">{name}</div>
				<Loading />
			</div>

			{/* Tags */}
			<div className="space-y-3 !py-3 outline-container outline-spacing">
				<div className="tag">{t(subject)}</div>
				<div className="flex items-center gap-x-5">
					<div className="tag">
						{t(config.daysInWeek[day])}, {t(config.months[month])} {date}
					</div>
					<div className="tag">
						{t(PeriodType)} {periodNumber}
					</div>
				</div>
			</div>

			{/* Description */}
			{description && (
				<div className="outline-container !border-t-0 outline-spacing text-secondary !py-4 whitespace-pre">
					{description}
				</div>
			)}

			{/* Button */}
			<div className="flex mt-10 outline-container">
				<button
					type="button"
					onClick={deleteHomework}
					className="flex-1 text-red-500 transition-all outline-spacing outline-hover">
					{t('delete')}
				</button>
				<div className="w-px py-5 bg-outline"></div>
				<button
					onClick={onEdit}
					className="flex-1 transition-all outline-spacing text-primary outline-hover">
					{t('edit')}
				</button>
			</div>
		</Popup>
	)
}
