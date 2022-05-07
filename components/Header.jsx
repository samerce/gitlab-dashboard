import useFilters from '../containers/useFilters'

export default function Header() {
	return (
		<header className={cn.header}>
      <h1 className='text-4xl font-extralight justify-self-start grow leading-none -mt-1'>
        code review
      </h1>

      <span className='grow shrink' />
      <span className='bg-gradient-to-r from-transparent to-white grow-0 mr-9' />

      <FilterButton id='assignedToMe'>assigned to me</FilterButton>
      <FilterButton id='reviewsForMe'>reviews for me</FilterButton>
      <FilterButton id='open'>open</FilterButton>
      <FilterButton id='merging'>merged</FilterButton>
      <FilterButton id='closed'>closed</FilterButton>
    </header>
	)
}

function FilterButton(p) {
  const {filters, setFilters} = useFilters()
  const cx = filters[p.id]? ' bg-main-lt text-main ' : ' text-main-lt '
  const onClick = () => setFilters(oldFilters => ({...oldFilters, [p.id]: !oldFilters[p.id]}))

	return (
		<button className={cn.filterButton + cx} onClick={onClick}>
		  {p.children}
		</button>
	)
}

var cn = {
  header: 'flex w-full items-center justify-end space-between mt-1 mb-3 py-3 px-4 bg-main rounded-md border-sexy',
  filterButton: 'flex items-center justify-center px-4 py-1 mx-1 border border-main-lt rounded-xl max-w-[154px] text-[14px]',
}