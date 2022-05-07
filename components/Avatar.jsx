export default function Avatar(p) {
	let avatarUrl = p.author?.avatarUrl
	if (!avatarUrl?.includes('http')) avatarUrl = 'https://gitlab.com/' + avatarUrl

	return (
		<div className={cn.avatar + p.className} style={{
			backgroundImage: `url(${avatarUrl})`,
			backgroundSize: 'cover',
		}} title={p.author.name} />
	)
}

var cn = {
	avatar: 'rounded-full bg-main-lt shrink-0 grow-0 border-sexy ',
}
