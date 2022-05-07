import { ApolloProvider } from '@apollo/client'
import apolloClient from '../gql/apolloClient'
import ContainerProviders from '../containers'
import '../styles/globals.css'

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  )
}

export default function GLDashboard({ Component, pageProps }) {
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
