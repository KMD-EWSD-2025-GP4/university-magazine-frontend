interface MCContributionIconProps
  extends React.ComponentPropsWithoutRef<"svg"> {
  size?: number | string;
}

export function MCContributionIcon({
  size,
  style,
  ...others
}: MCContributionIconProps) {
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
        d="M3 17L12 22L21 17V14L12 19L3 14V11L12 16L21 11V8L12 13L3 8L12 3L17.418 6.01"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
