import Markdown from 'markdown-to-jsx'
import Avatar from "./Avatar"

export default function MessageBubble(p) {
	const textDirection = p.left ? '' : ' '
	const bodyCN = 'text-[12px] rounded-xl p-2 border-sexy break-word ' + textDirection +
		(p.left? 'bg-main-md mr-auto' : 'bg-main-md-lt ml-auto')
	const avatarCN = 'w-[36px] h-[36px] ' + 
		(p.left? 'order-first mr-1' : 'order-last ml-1')

	return (
		<div className='flex items-end w-full mb-2 px-2'>
			<Avatar author={p.author} className={avatarCN} />
			<a className={bodyCN} href={p.noLink? undefined : p.url} target='_blank'>
				<Markdown className={textDirection}>
					{p.body}
				</Markdown>
			</a>
		</div>
	)
  }