import { createContainer } from '../util/container'
import { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import useFilters from './useFilters'

const container = createContainer(() => {
	const [reviews, setReviews] = useState([])
	const {filters} = useFilters()
	const {data, loading, error, refetch} = useQuery(ReviewsQuery, {
		variables: {
			assignedToMe: filters.assignedToMe,
			reviewsForMe: filters.reviewsForMe,
			state: filters.open ? 'opened' : filters.closed ? 'closed' : filters.merged ? 'merged' : null,
		},
		pollInterval: 10000
	})

	const processReviews = () => {
		console.log(data)
		const assignedToMe = data?.currentUser?.assignedMergeRequests?.nodes || []
		const reviewsForMe = data?.currentUser?.reviewRequestedMergeRequests?.nodes || []
		const allReviews = [...assignedToMe, ...reviewsForMe]
		console.log(allReviews)
		setReviews(allReviews.sort((a, b) => a.updatedAt - b.updatedAt))
	}

	useEffect(processReviews, [data])
	useEffect(refetch, [filters])

	return {reviews, loading, error}
})

var ReviewsQuery = gql`
	query Reviews($assignedToMe: Boolean = false, $reviewsForMe: Boolean = false, $state: MergeRequestState) {
		currentUser {
			id

			assignedMergeRequests(state: $state, last: 27) @include(if: $assignedToMe) {
				...reviewFields
			}
			
			reviewRequestedMergeRequests(state: $state, last: 27) @include(if: $reviewsForMe) {
				...reviewFields
			}
		}
	}

	fragment reviewFields on MergeRequestConnection {
		nodes {
			title
			webUrl
			updatedAt
			author {
				avatarUrl
				name
			}
			discussions {
				nodes {
					notes {
						nodes {
							id
							author {
								avatarUrl
								name
							}
							body
							bodyHtml
							url
							updatedAt
							system
						}
					}
				}
			}
		}
	}
`

export default container.useContainer
export const ReviewsProvider = container.Provider