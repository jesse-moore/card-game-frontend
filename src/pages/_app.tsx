import { AppProps } from 'next/app';
import React from 'react';
import { ProvideAuth } from '../lib/context/useAuth';

import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ProvideAuth>
            <Component {...pageProps} />
        </ProvideAuth>
    );
}
