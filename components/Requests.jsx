import React, { useMemo, useRef, useEffect } from 'react'
import SectionHeader from './SectionHeader'
import Avatar from './Avatar'
import MessageBubble from './MessageBubble'
import useReviews from '../containers/useReviews'

export default function Requests() {
	const {reviews} = useReviews()

	return (
		<div className={cn.root}>
			<SectionHeader>Requests</SectionHeader>

			<div className={cn.scrollRoot}>
				{reviews?.map(mr => <ReviewItem {...mr} key={mr.id} />)}
			</div>
		</div>
	)
}

function ReviewItem(p) {
	const scrollRootRef = useRef()

	const notes = useMemo(() => (
		p.discussions?.nodes?.map(d => d.notes?.nodes)
			.flat()
			.sort((a, b) => Date.parse(a.updatedAt) - Date.parse(b.updatedAt))
	), [p.discussions])

	useEffect(() => {
		if (notes?.length && scrollRootRef?.current) {
			scrollRootRef.current.scrollTop = scrollRootRef.current.scrollHeight
		}
	}, [notes, scrollRootRef])

	return (
		<div className={cn.reviewItem}>
			<a className='flex w-full p-2 items-center' href={p.webUrl} target='_blank'>
				<Avatar author={p.author} className='w-9 h-9 mr-2' />

				<div className='flex-col w-full text-black'>
					<div className='font-medium truncate text-[14px] w-full'>{p.title}</div>
					<div className='text-[12px]'>{p.author.name}</div>
				</div>
			</a>

			<div className={cn.noteListRoot} ref={scrollRootRef}>
				{notes?.map(n => (
					<MessageBubble {...n} key={n.id} left={p.author.name === n.author.name} />
				))}
			</div>
		</div>
	)
}

var cn = {
	root: 'flex flex-col items-center justify-start grow max-h-full min-w-[70%] max-w-[1024px]',

	scrollRoot: 'flex flex-wrap w-full items-start justify-start h-full overflow-scroll pt-3 pr-[9px]',
	
	reviewItem: 'flex flex-col items-center grow shrink basis-[432px] max-w-1/2 overflow-hidden bg-main-lt mx-1.5 mb-3 rounded-xl border-sexy relative',

	noteListRoot: 'flex-col w-full max-h-[324px] overflow-y-scroll border-red-300 border-t py-2',
}
