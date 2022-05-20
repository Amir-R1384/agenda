import config from '../config.json'

interface Params {
	index: number
	subject: string
}

export default function Period({ index, subject }: Params) {
	return (
		<div className="flex flex-col w-full p-3 bg-gray-400 shadow-md rounded-xl">
			<div className="flex items-center gap-x-5">
				<div className="text-lg font-medium text-slate-100">Period {index + 1}</div>
				<div className="text-base font-medium text-slate-200">{config.times[index]}</div>
			</div>
			<div className="py-5 text-3xl font-semibold text-gray-700 drop-shadow-md">
				{subject}
			</div>
		</div>
	)
}
