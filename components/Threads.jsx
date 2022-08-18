import { useEffect, useState } from 'react'
import SectionHeader from "./SectionHeader"
import useReviews from "../containers/useReviews"
import MessageBubble from './MessageBubble'

export default function Threads() {
	const [threads, setThreads] = useState([])
	const {reviews} = useReviews()

	const processThreads = () => {
		const threadItems = []

		reviews?.forEach(mr => {
			mr.discussions?.nodes?.forEach(t => {
				const humanComments = t.notes?.nodes?.filter(n => !n.system && !n.author?.name?.includes('codecov'))
				const numComments = humanComments?.length ?? 0
				if (!numComments) return

				threadItems.push({
					...humanComments[numComments - 1],
					inReplyTo: numComments > 1 && humanComments[numComments - 2],
					mr,
				})
			})
		})

		setThreads(threadItems.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)))
	}
	useEffect(processThreads, [reviews])
	
	return (
		<div className={cn.root}>
			<SectionHeader>Threads</SectionHeader>
			<div className={cn.scrollRoot}>
				{threads.map(t => <ThreadItem {...t} key={t.url} />)}
			</div>
		</div>
	)
}

function ThreadItem(p) {
	return (
	  <div className={cn.threadRoot}>
			<h3 className={cn.threadTitle}>
				{p.mr.title}
			</h3>

			<div className='flex-col items-center text-white w-full relative overflow-hidden'>
					{p.inReplyTo &&
						<MessageBubble 
							{...p.inReplyTo} 
							left={p.inReplyTo.author.name === p.mr.author.name}
							noLink
						/>
					}

					<MessageBubble {...p} left={p.author.name === p.mr.author.name} noLink />
				</div>

			<a href={p.url} target='_blank' className='absolute-full' />
	  </div>
	)
}

var cn = {
	root: 'flex flex-col items-center justify-start min-w-[216px] max-w-[648px] h-full',

	scrollRoot: 'flex-col w-full items-start justify-start basis-full overflow-y-scroll overflow-x-hidden pr-3 pt-3',

	threadRoot: 'flex-col items-center text-white w-full mb-5 relative',

	threadTitle: 'w-full p-2 truncate text-xs text-center text-main-lt mb-3 uppercase border-sexy rounded-lg bg-main-dk sticky top-0 z-10'
}
	
