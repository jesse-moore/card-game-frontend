import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

export const useWarningOnExit = (
    shouldWarn: boolean,
    message: string,
    id: string,
    onUnload?: (id: string) => void
) => {
    const Router = useRouter();
    const [isChangeRoute, setIsChangeRoute] = useState<boolean>(false);
    const lastHistoryState = useRef(global.history?.state);
    useEffect(() => {
        const storeLastHistoryState = () => {
            lastHistoryState.current = history.state;
        };
        Router.events.on('routeChangeComplete', storeLastHistoryState);
        return () => {
            Router.events.off('routeChangeComplete', storeLastHistoryState);
        };
    }, []);

    useEffect(() => {
        let isWarned = false;

        const routeChangeStart = (url: string) => {
            setIsChangeRoute(true);
            if (Router.asPath !== url && shouldWarn && !isWarned) {
                isWarned = true;
                if (window.confirm(message)) {
                    Router.push(url);
                } else {
                    setIsChangeRoute(false);
                    isWarned = false;
                    Router.events.emit('routeChangeError');

                    // HACK
                    const state = lastHistoryState.current;
                    if (state != null && history.state != null && state.idx !== history.state.idx) {
                        history.go(state.idx < history.state.idx ? -1 : 1);
                    }
                }
            }
            setIsChangeRoute(false);
        };

        const beforeUnload = (e: BeforeUnloadEvent) => {
            if (shouldWarn && !isWarned) {
                const event = e || window.event;
                event.returnValue = message;
                return message;
            }
            //TODO DELETE GAME
            onUnload(id);
            console.log('DELETE GAME');
            return null;
        };

        Router.events.on('routeChangeStart', routeChangeStart);
        window.addEventListener('beforeunload', beforeUnload);

        return () => {
            Router.events.off('routeChangeStart', routeChangeStart);
            window.removeEventListener('beforeunload', beforeUnload);
        };
    }, [message, shouldWarn]);
    return isChangeRoute;
};
