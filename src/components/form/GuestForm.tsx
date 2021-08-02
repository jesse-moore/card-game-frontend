import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { CloseButton } from './CloseButton';
import { useAuth } from '../../lib/useAuth';

export const GuestForm = ({ handleClose }: { handleClose: () => void }) => {
    const router = useRouter();
    const [username, setUsername] = useState('');

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div className="bg-blueGray-400 shadow-md px-6 pt-8 relative">
            <div className="absolute right-0 top-0">
                <CloseButton onClick={handleClose} />
            </div>
            <form className="grid grid-cols-1 gap-6" onSubmit={handleLogin}>
                <label className="block">
                    <span className="text-lg font-semibold">Username</span>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        className="border-gray-300 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </label>
                <div className="flex flew-row justify-center mb-4">
                    <button
                        className="focus:outline-none bg-blue-400 hover:bg-blue-500 rounded-md py-2 px-3 w-48"
                        type="submit"
                    >
                        Play
                    </button>
                </div>
            </form>
        </div>
    );
};
