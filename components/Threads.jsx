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

		setThreads(threadItems.sort((a, b) => a.updatedAt - b.updatedAt))
	}
	useEffect(processThreads, [reviews])
	
	return (
		<div className={cn.root}>
			<SectionHeader>Threads</SectionHeader>
			<div className='grow-0 shrink-0 basis-3' />
			{threads.map(t => <ThreadItem {...t} key={t.id} />)}
		</div>
	)
}

function ThreadItem(p) {
	return (
	  <a className='flex-col items-center text-white w-full bg-main-lt rounded-xl mb-3' href={p.url} target='_blank' key={p.url}>
		<h3 className={cn.threadTitle}>
			{p.mr.title}
		</h3>

		{p.inReplyTo &&
			<MessageBubble 
				{...p.inReplyTo} 
				left={p.inReplyTo.author === p.mr.author}
				noLink
			/>
		}

		<MessageBubble {...p} left={p.author.name === p.mr.author.name} noLink />
	  </a>
	)
  }

  var cn = {
	  root: 'flex flex-col items-center justify-start grow min-w-[216px] max-w-[648px] h-full overflow-scroll pr-[12px]',

	  threadTitle: 'font-medium w-full py-1 px-2 truncate text-[12px] text-center text-black border-b border-red-300 mb-2'
  }
	
