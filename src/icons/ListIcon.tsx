interface ListIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  size?: number | string;
}

export function ListIcon({ size, style, ...others }: ListIconProps) {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: size, ...style }}
      {...others}
    >
      <path
        d="M13.6494 5.5H21.6494M13.6494 9.5H18.6494M13.6494 15.5H21.6494M13.6494 19.5H18.6494M3.64941 5.5C3.64941 5.23478 3.75477 4.98043 3.94231 4.79289C4.12984 4.60536 4.3842 4.5 4.64941 4.5H8.64941C8.91463 4.5 9.16898 4.60536 9.35652 4.79289C9.54406 4.98043 9.64941 5.23478 9.64941 5.5V9.5C9.64941 9.76522 9.54406 10.0196 9.35652 10.2071C9.16898 10.3946 8.91463 10.5 8.64941 10.5H4.64941C4.3842 10.5 4.12984 10.3946 3.94231 10.2071C3.75477 10.0196 3.64941 9.76522 3.64941 9.5V5.5ZM3.64941 15.5C3.64941 15.2348 3.75477 14.9804 3.94231 14.7929C4.12984 14.6054 4.3842 14.5 4.64941 14.5H8.64941C8.91463 14.5 9.16898 14.6054 9.35652 14.7929C9.54406 14.9804 9.64941 15.2348 9.64941 15.5V19.5C9.64941 19.7652 9.54406 20.0196 9.35652 20.2071C9.16898 20.3946 8.91463 20.5 8.64941 20.5H4.64941C4.3842 20.5 4.12984 20.3946 3.94231 20.2071C3.75477 20.0196 3.64941 19.7652 3.64941 19.5V15.5Z"
        stroke="#002147"
        stroke-width="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
