import React, { useMemo, useRef, useEffect } from 'react'
import SectionHeader from './SectionHeader'
import Avatar from './Avatar'
import MessageBubble from './MessageBubble'
import useReviews from '../containers/useReviews'
import moment from 'moment'
import Icon from 'supercons'

export default function Requests() {
	const {reviews, approvedReviews, staleReviews, freshReviews} = useReviews()

	return (
		<div className={cn.root}>
			<SectionHeader>Merge Requests</SectionHeader>

			<div className={cn.scrollRoot}>
				<ReviewGroup title='Stale Requests' reviews={staleReviews} />
				<ReviewGroup title='Fresh Requests' reviews={freshReviews} />
				<ReviewGroup title='Approved Requests' reviews={approvedReviews} />
			</div>
		</div>
	)
}

function ReviewGroup({ title, reviews }) {
	if (!reviews || reviews.length === 0) return null;

	return (
		<>
			<GroupHeader>{title}</GroupHeader>
			{reviews?.map(mr => <ReviewItem {...mr} key={mr.id} />)}
		</>
	)
}

function ReviewItem(p) {
	// const scrollRootRef = useRef()

	const notes = useMemo(() => (
		p.discussions?.nodes?.map(d => d.notes?.nodes)
			.flat()
			.sort((a, b) => Date.parse(a.updatedAt) - Date.parse(b.updatedAt))
	), [p.discussions])

	// useEffect(() => {
	// 	if (notes?.length && scrollRootRef?.current) {
	// 		scrollRootRef.current.scrollTop = scrollRootRef.current.scrollHeight
	// 	}
	// }, [notes, scrollRootRef])

	return (
		<div className={cn.reviewItem}>
			<a className='flex w-full p-2 items-center relative' href={p.webUrl} target='_blank'>
				<Avatar author={p.author} className='w-12 h-12 mr-2' />

				<div className='flex-col grow shrink text-white'>
					<div className='truncate text-sm leading-loose'>{p.title}</div>
					<div className='text-xs text-main-lt leading-loose flex items-center'>
						{p.author.name} <VSeparator /> <i className='text-main-lt'>created {moment(p.createdAt).fromNow()}</i>
					</div>
				</div>

				<div className='flex text-main-lt text-sm'>
	        <Icon glyph='message-simple' size={20} className='mr-1' />
					{notes.filter(n => !n.system && !n.author.name.includes('codecov')).length}
				</div>

				<VSeparator />

				<div className={`flex-col items-center ${p.approved ? 'text-green' : 'text-main-lt'}`}>
					<Icon glyph={p.approved ? 'checkmark' : 'clock'} size={20} />
				</div>

				<VSeparator />

				<div className='text-sm text-main-lt flex-col items-center basis-[108px]'>
					<i className='text-xs'>updated</i>
					{moment(p.updatedAt).fromNow()}
				</div>
			</a>

			{/*<div className={cn.noteListRoot} ref={scrollRootRef}>
				{notes?.map(n => (
					<MessageBubble {...n} key={n.id} left={p.author.name === n.author.name} />
				))}
				</div>*/}
		</div>
	)
}

function GroupHeader({ children }) {
	return <div className='text-xs text-main-lt uppercase ml-3 my-3'>{children}</div>
}

function VSeparator() {
	return <div className='mx-3 bg-tpWhite h-full w-[1px]'>&nbsp;</div>
}

var cn = {
	root: 'flex flex-col items-center justify-start grow max-h-full min-w-[972px]',

	scrollRoot: 'flex-col flex-wrap w-full items-start justify-start h-full overflow-scroll pr-[9px]',
	
	reviewItem: 'flex flex-col items-center w-full overflow-hidden bg-main-dk mx-1.5 mb-3 rounded-xl border-sexy relative',

	noteListRoot: 'flex-col w-full max-h-[324px] overflow-y-scroll border-tpWhite border-t py-2',
}
