interface HistogramIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  size?: number | string;
}

export function HistogramIcon({ size, style, ...others }: HistogramIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: size, ...style }}
      {...others}
    >
      <path
        d="M3 3V21H21M20 18V21M16 16V21M12 13V21M8 16V21M3 11C9 11 8 6 12 6C16 6 15 11 21 11"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
