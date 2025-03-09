interface PlusIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  size?: number | string;
}

export function PlusIcon({ size, style, ...others }: PlusIconProps) {
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
        d="M12.2832 5.5V19.5M5.2832 12.5H19.2832"
        stroke="#F8F9FA"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
