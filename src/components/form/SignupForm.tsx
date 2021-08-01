import React from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { CloseButton } from './CloseButton';
import { useAuth } from '../../lib/context/useAuth';

export const SignupForm = ({ handleClose }: { handleClose: () => void }) => {
    const router = useRouter();
    const auth = useAuth();
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email is invalid'),
        username: Yup.string().required('Username is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
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
        const user = await auth.signup(email, password, username);
        if (user !== null) {
            handleClose();
        }
        // TODO handle errors
    };

    return (
        <div className="register-form bg-blueGray-400 shadow-md px-6 pt-8 relative">
            <div className="absolute right-0 top-0">
                <CloseButton onClick={handleClose} />
            </div>
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
