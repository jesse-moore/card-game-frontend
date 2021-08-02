import { AppProps } from 'next/app';
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apollo';
import { ProvideAuth } from '../lib/useAuth';

import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
    const apolloClient = useApollo({});
    return (
        <ApolloProvider client={apolloClient}>
            <ProvideAuth>
                <Component {...pageProps} />
            </ProvideAuth>
        </ApolloProvider>
    );
}
