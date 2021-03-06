import { createContainer } from '../util/container'
import { useEffect, useLayoutEffect, useState } from 'react'
import { gql, NetworkStatus, useQuery } from '@apollo/client'
import useFilters from './useFilters'
import { useInterval } from '../util/useInterval'
import { uniqBy } from 'lodash'
import moment from 'moment'

const container = createContainer(() => {
	const [reviews, setReviews] = useState([])
	const [approvedReviews, setApprovedReviews] = useState([])
	const [staleReviews, setStaleReviews] = useState([])
	const [freshReviews, setFreshReviews] = useState([])

	const {filters} = useFilters()
	const {data, error, networkStatus, refetch} = useQuery(ReviewsQuery, {
		variables: {
			assignedToMe: filters.assignedToMe,
			reviewsForMe: filters.reviewsForMe,
			state: filters.open ? 'opened' : filters.closed ? 'closed' : filters.merged ? 'merged' : null,
		},
		fetchPolicy: 'cache-and-network',
		pollInterval: 5000,
		notifyOnNetworkStatusChange: true,
	})

	const fetch = () => { refetch() }

	const processReviews = () => {
		const assignedToMe = data?.currentUser?.assignedMergeRequests?.nodes || []
		const reviewsForMe = data?.currentUser?.reviewRequestedMergeRequests?.nodes || []
		const allReviews = [...assignedToMe, ...reviewsForMe]
		const dedupedReviews = uniqBy(allReviews, (r) => r.id)
		const sortedReviews = dedupedReviews.sort((a, b) => moment(a.updatedAt).diff(moment(b.updatedAt)))

		setReviews(sortedReviews)

		const approved = []
		const stale = []
		const fresh = []
		const fourDaysAgo = moment().subtract(4, 'days')

		sortedReviews.forEach(r => {
			if (r.approved) {
				approved.unshift(r);
			} else if (moment(r.createdAt).isBefore(fourDaysAgo)) {
				stale.unshift(r)
			} else {
				fresh.unshift(r)
			}
		})

		setApprovedReviews(approved)
		setStaleReviews(stale)
		setFreshReviews(fresh)
	}

	useEffect(processReviews, [data])
	useEffect(fetch, [filters])
	useInterval(30000, fetch)

	return {
		reviews, error, fetch, approvedReviews, staleReviews, freshReviews,
		loading: networkStatus !== NetworkStatus.ready,
	}
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
			id
			title
			webUrl
			updatedAt
			createdAt
			approved
			headPipeline {
				status
			}
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