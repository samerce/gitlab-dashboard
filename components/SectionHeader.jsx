export default function SectionHeader(p) {
	return (
		<h2 className={'bg-main w-full text-center rounded-md py-1 text-sm uppercase font-light sticky top-0 border-sexy ' + p.className} style={{
			boxShadow: '0 4px 9px rgba(24,11,11, .27)',
		}}>
			{p.children}
		</h2>
	)
}