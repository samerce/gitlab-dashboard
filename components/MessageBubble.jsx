import Avatar from "./Avatar"

export default function MessageBubble(p) {
	const bodyCN = 'text-[12px] rounded-xl p-2 ' + 
		(p.left? 'bg-main mr-auto' : 'bg-main-dk ml-auto text-right')
	const avatarCN = 'w-8 h-8 ' + 
		(p.left? 'order-first mr-1' : 'order-last ml-1')

	return (
		<a className='flex items-end w-full mb-2 px-2' href={p.url} target='_blank' disabled={p.noLink}>
			<Avatar author={p.author} className={avatarCN} />
			<p className={bodyCN}>{p.body}</p>
		</a>
	)
  }