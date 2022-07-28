import useFilters from '../containers/useFilters'
import useReviews from '../containers/useReviews'
import Icon from 'supercons'

export default function Header() {
  const {fetch, loading} = useReviews()

	return (
		<header className={cn.header}>
      <h1 className='text-4xl font-extralight justify-self-start grow leading-none -mt-1'>
        <span className='translate-y-[2px] inline-block pr-1'>🦄 </span>code review
      </h1>

      <span className='grow shrink' />

      <FilterButton id='assignedToMe'>assigned to me</FilterButton>
      <FilterButton id='reviewsForMe'>reviews for me</FilterButton>
      <VSeparator />

      <FilterRadioButtonGroup ids={['open', 'merged', 'closed']} />
      <VSeparator />

      <button onClick={fetch} className={cn.button}>
        <Icon glyph='view-reload' size={20} className={loading ? 'animate-spin' : undefined} />
      </button>
    </header>
	)
}

function VSeparator() {
  return <div className='grow-0 shrink-0 basis-[1px] h-full bg-main-lt mx-1' />
}

function FilterButton(p) {
  const {filters, setFilters} = useFilters()
  const cx = filters[p.id]? ' bg-main-lt text-main ' : ' text-main-lt '
  const onClick = () => setFilters(oldFilters => ({...oldFilters, [p.id]: !oldFilters[p.id]}))

	return (
		<button className={cn.button + cx} onClick={p.onClick || onClick}>
		  {p.children}
		</button>
	)
}

function FilterRadioButtonGroup(p) {
  const {setFilters} = useFilters()

  const onClick = (clickedId) => {
    setFilters(oldFilters => {
      const newFilters = {...oldFilters}
      p.ids.forEach(id => { if (id !== clickedId) newFilters[id] = false })
      return {...newFilters, [clickedId]: !oldFilters[clickedId]}
    })
  }

  return p.ids.map(id => (
    <FilterButton key={id} id={id} onClick={() => onClick(id)}>
      {id}
    </FilterButton>
  ))
}

var cn = {
  header: 'flex w-full items-center justify-end space-between my-2 py-3 px-4 bg-main rounded-md border-sexy',
  button: 'flex items-center justify-center px-3 py-1 mx-1 border border-main-lt rounded-xl max-w-[154px] text-[14px]',
}