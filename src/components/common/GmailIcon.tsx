import React from 'react';

export const GmailIcon = (props: { width?: number; height?: number; color?: string }) => {
    let height = props.width && !props.height ? props.width : props.height;
    let width = !props.width && props.height ? props.height : props.width;
    return (
        <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...{ ...props, height, width }}
            className="hover:fill-current text-gmail"
        >
            <title>{'Gmail'}</title>
            <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
        </svg>
    );
};
