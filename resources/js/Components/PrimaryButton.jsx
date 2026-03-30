export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-xl border border-transparent bg-gradient-to-r from-pens-600 to-pens-700 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:from-pens-700 hover:to-pens-800 focus:outline-none focus:ring-2 focus:ring-pens-500 focus:ring-offset-2 shadow-md ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
