interface PlaneIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  size?: number | string;
}

export function PlaneIcon({ size, style, ...others }: PlaneIconProps) {
  return (
    <svg
      width="27"
      height="26"
      viewBox="0 0 27 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: size, ...style }}
      {...others}
    >
      <path
        d="M11.181 15.1837L25.9992 1.07446M11.181 15.1837L15.8953 24.1623C15.9544 24.2851 16.0493 24.3892 16.1687 24.4621C16.2881 24.5351 16.427 24.5739 16.5689 24.5739C16.7107 24.5739 16.8496 24.5351 16.969 24.4621C17.0884 24.3892 17.1833 24.2851 17.2424 24.1623L25.9992 1.07446M11.181 15.1837L1.75061 10.6944C1.62163 10.6381 1.51234 10.5478 1.43572 10.4341C1.35909 10.3204 1.31836 10.1882 1.31836 10.0531C1.31836 9.91799 1.35909 9.78574 1.43572 9.67206C1.51234 9.55837 1.62163 9.46802 1.75061 9.41174L25.9992 1.07446"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
