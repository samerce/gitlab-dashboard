import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { kGitLabTokenKey } from '../hooks/useAuth'

const httpLink = createHttpLink({
	uri: 'https://gitlab.com/api/graphql/',
})
  
const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem(kGitLabTokenKey)
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		}
	}
})

export default new ApolloClient({
	ssrMode: true,
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
})
