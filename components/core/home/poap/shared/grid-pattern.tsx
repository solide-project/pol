export function GridPattern() {
    return (
        <svg
            aria-hidden="true"
            className="pointer-events-none absolute !m-0 p-2 rounded-lg flex items-center justify-center inset-0 h-full w-full fill-primary z-[-100]"
        >
            <defs>
                <pattern
                    id=":Rjkba:"
                    width={24}
                    height={24}
                    patternUnits="userSpaceOnUse"
                    patternContentUnits="userSpaceOnUse"
                    x={0}
                    y={0}
                >
                    <circle id="pattern-circle" cx={1} cy={1} r={1} />
                </pattern>
            </defs>
            <rect
                width="100%"
                height="100%"
                strokeWidth={0}
                fill="url(#:Rjkba:)"
            />
        </svg>
    );
}
