import React from 'react'
import { FiltersProvider } from './useFilters'
import { ReviewsProvider } from './useReviews'

var providers = [
	ReviewsProvider,
	FiltersProvider,
]
  
export default React.memo(({ children }) => {
	let current = children

	providers.reverse().forEach(Provider => {
		current = <Provider>{current}</Provider>
	})

	return current
})
  