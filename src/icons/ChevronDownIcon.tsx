interface ChevronDownIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  size?: number | string;
}

export function ChevronDownIcon({
  size,
  style,
  ...others
}: ChevronDownIconProps) {
  return (
    <svg
      width="11"
      height="6"
      viewBox="0 0 11 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: size, ...style }}
      {...others}
    >
      <path
        d="M1 1L5.5 5L10 1"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
