import { ApolloProvider } from '@apollo/client'
import apolloClient from '../gql/apolloClient'
import ContainerProviders from '../containers'
import '../styles/globals.css'
import useAuth from '../hooks/useAuth'

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  )
}

export default function GLDashboard({ Component, pageProps }) {
  useAuth()

  return (
    <SafeHydrate>
      <ApolloProvider client={apolloClient}>
        <ContainerProviders>
          <Component {...pageProps} />
        </ContainerProviders>
      </ApolloProvider>
    </SafeHydrate>
  )
}
