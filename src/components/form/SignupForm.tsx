import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAuth } from '../../lib/useAuth';
import { useCreateUserMutation } from '../../graphql/queries';
import { CloseButton } from './CloseButton';

export const SignupForm = ({ handleClose }: { handleClose: () => void }) => {
    const [createUser] = useCreateUserMutation();
    const [error, setError] = useState<string | null>(null);
    const auth = useAuth();
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email is invalid'),
        username: Yup.string().required('Username is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 8 characters')
            .max(40, 'Password must not exceed 40 characters')
            .matches(/[A-Z]/, 'Password must contain an uppercase letter')
            .matches(/[a-z]/, 'Password must contain a lowercase letter')
            .matches(/[0-9]/, 'Password must contain a number')
            .matches(/[@$!%*?&]/, 'Password must contain a special character'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
        acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    type FormValues = {
        email: string;
        password: string;
        username: string;
    };

    const onSubmit: SubmitHandler<FormValues> = async ({ email, password, username }) => {
        await auth.signup(email, password, username);
        const user = await auth.signin(username, password);
        await createUser();
        if (user !== null) {
            handleClose();
        }
        // TODO handle errors
    };

    return (
        <div className="register-form bg-blueGray-400 shadow-md px-6 pt-8 relative w-72">
            <div className="absolute right-0 top-0">
                <CloseButton onClick={handleClose} />
            </div>
            <span className="text-red-800 font-semibold">{error}</span>
            <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label className="block text-lg font-semibold">Email</label>
                    <input
                        type="text"
                        {...register('email')}
                        className={`form-control mt-1 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                            errors.email ? 'border-red-600' : 'border-gray-300'
                        }`}
                    />
                    <div className="text-red-700 font-semibold">{errors.email?.message}</div>
                </div>
                <div className="form-group">
                    <label className="block text-lg font-semibold">Username</label>
                    <input
                        type="text"
                        {...register('username')}
                        className={`form-control mt-1 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                            errors.email ? 'border-red-600' : 'border-gray-300'
                        }`}
                    />
                    <div className="text-red-700 font-semibold">{errors.username?.message}</div>
                </div>

                <div className="form-group">
                    <span className="text-blue-900 font-semibold">
                        Password Complexity - One Uppercase letter, one lowercase letter, one
                        number, one special character
                    </span>
                    <label className="block text-lg font-semibold">Password</label>
                    <input
                        type="password"
                        {...register('password')}
                        className={`form-control mt-1 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                            errors.password ? 'border-red-600' : 'border-gray-300'
                        }`}
                    />
                    <div className="text-red-700 font-semibold">{errors.password?.message}</div>
                </div>

                <div className="form-group">
                    <label className="block text-lg font-semibold">Confirm Password</label>
                    <input
                        type="password"
                        {...register('confirmPassword')}
                        className={`form-control mt-1 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                            errors.confirmPassword ? 'border-red-600' : 'border-gray-300'
                        }`}
                    />
                    <div className="text-red-700 font-semibold">
                        {errors.confirmPassword?.message}
                    </div>
                </div>

                <div className="form-group mb-4 flex flew-row justify-center">
                    <button
                        type="submit"
                        className="focus:outline-none bg-blue-400 hover:bg-blue-500 rounded-md py-2 px-3 w-48"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};
