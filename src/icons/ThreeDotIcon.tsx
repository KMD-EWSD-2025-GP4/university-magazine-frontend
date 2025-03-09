interface ThreeDotsProps extends React.ComponentPropsWithoutRef<"svg"> {
  size?: number | string;
}

export function ThreeDotsIcon({ size, style, ...others }: ThreeDotsProps) {
  return (
    <svg
      width="18"
      height="4"
      viewBox="0 0 18 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: size, ...style }}
      {...others}
    >
      <path
        d="M1 2C1 2.26522 1.0997 2.51957 1.27717 2.70711C1.45464 2.89464 1.69534 3 1.94632 3C2.1973 3 2.438 2.89464 2.61547 2.70711C2.79294 2.51957 2.89264 2.26522 2.89264 2C2.89264 1.73478 2.79294 1.48043 2.61547 1.29289C2.438 1.10536 2.1973 1 1.94632 1C1.69534 1 1.45464 1.10536 1.27717 1.29289C1.0997 1.48043 1 1.73478 1 2Z"
        stroke="#1F2937"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.62425 2C7.62425 2.26522 7.72396 2.51957 7.90143 2.70711C8.0789 2.89464 8.3196 3 8.57058 3C8.82156 3 9.06226 2.89464 9.23973 2.70711C9.4172 2.51957 9.5169 2.26522 9.5169 2C9.5169 1.73478 9.4172 1.48043 9.23973 1.29289C9.06226 1.10536 8.82156 1 8.57058 1C8.3196 1 8.0789 1.10536 7.90143 1.29289C7.72396 1.48043 7.62425 1.73478 7.62425 2Z"
        stroke="#1F2937"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.2485 2C14.2485 2.26522 14.3482 2.51957 14.5257 2.70711C14.7031 2.89464 14.9439 3 15.1948 3C15.4458 3 15.6865 2.89464 15.864 2.70711C16.0415 2.51957 16.1412 2.26522 16.1412 2C16.1412 1.73478 16.0415 1.48043 15.864 1.29289C15.6865 1.10536 15.4458 1 15.1948 1C14.9439 1 14.7031 1.10536 14.5257 1.29289C14.3482 1.48043 14.2485 1.73478 14.2485 2Z"
        stroke="#1F2937"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
