
interface ModalProps {
    children?: React.ReactNode;
    title?: string;
    closeHandler?: React.MouseEventHandler<HTMLDivElement>;
    loadingOverlay?: React.ReactNode;
}

export function Modal({ children, title, closeHandler, loadingOverlay = null }: ModalProps) {
    const handleClose = () => {};

    return (
        <div className="absolute top-0 h-full w-full z-20">
            <div className="min-h-full blur w-full bg-gray-800 bg-opacity-60" />
            <div className="fixed top-1/4 w-full">
                <div className="relative bg-gray-100 bg-opacity-80 rounded-md w-500 mx-auto shadow-md overflow-hidden w-max">
                    {/* {loadingOverlay} */}
                    {children}
                </div>
            </div>
        </div>
    );
}
