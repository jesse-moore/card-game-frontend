// import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
// import { toggleSignupForm, toggleLoginForm } from '../../lib/redux/reducers/ui';
// import { signout } from '../../lib/redux/reducers/user';
// import { logout } from '../../lib/cognito';
// import { apolloClient } from '../../lib/graphql/apollo';
// import { Button } from './Button';
import { Dispatch } from 'react';
import { HomeIcon } from './HomeIcon';
import { SettingsIcon } from './SettingsIcon';
// import { ButtonLink } from './ButtonLink';
// import { RootState } from '../../lib/redux/reducers';

export const NarBar = () => {
    // const dispatch = useDispatch();
    // const { user } = useSelector((state: RootState) => state.user);
    const user = {};
    const handleLogout = () => {
        // logout();
        // dispatch(signout());
        // apolloClient?.clearStore();
        // Router.push('/');
    };

    return (
        <div className="w-full py-1 px-4 flex flex-row items-center bg-white sticky top-0 z-20">
            <div className="container mx-auto flex flex-row relative">
                <Link href="/">
                    <button className="mr-auto text-xl cursor-pointer px-4 py-2 hover:shadow-md border-2 border-white hover:border-lightBlue-700 focus:outline-none active:shadow-inner rounded">
                        <HomeIcon />
                    </button>
                </Link>

                {/* {user ? (
				<AuthenticatedUserNavLinks handleLogout={handleLogout} />
				) : (
					<UnauthenticatedUserNavLinks dispatch={dispatch} />
				)} */}
                <button className="text-xl cursor-pointer px-4 py-2 hover:shadow-md border-2 border-white hover:border-lightBlue-700 focus:outline-none active:shadow-inner rounded">
                    <SettingsIcon />
                </button>
                <div className="absolute bg-white h-36 w-48 right-0 top-12"></div>
            </div>
        </div>
    );
};

const AuthenticatedUserNavLinks = ({ handleLogout }: { handleLogout: any }) => {
    return (
        <>
            {/* <Button name="Logout" onClick={() => handleLogout()} />
            <Link href="/app" passHref>
                <ButtonLink name="Go to console" color="blue" />
            </Link> */}
        </>
    );
};

const UnauthenticatedUserNavLinks = ({ dispatch }: { dispatch: Dispatch<any> }) => {
    return (
        <>
            {/* <Button name="Login" onClick={() => dispatch(toggleLoginForm())} /> */}
            {/* <Button name="Signup" color="blue" onClick={() => dispatch(toggleSignupForm())} /> */}
        </>
    );
};
