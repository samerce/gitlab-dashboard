import { useState } from "react"
import { createContainer } from "../util/container"

const container = createContainer(() => {
	const [filters, setFilters] = useState({
		assignedToMe: true,
		reviewsForMe: true,
		open: true,
		merged: false,
		closed: false,
	})

	return {filters, setFilters}
})

export default container.useContainer
export const FiltersProvider = container.Provider
