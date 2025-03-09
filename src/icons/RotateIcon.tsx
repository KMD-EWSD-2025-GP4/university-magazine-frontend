interface RotateIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  size?: number | string;
}

export function RotateIcon({ size, style, ...others }: RotateIconProps) {
  return (
    <svg
      width="28"
      height="29"
      viewBox="0 0 28 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: size, ...style }}
      {...others}
    >
      <path
        d="M10.5 5.80836C12.8051 4.88011 15.3846 4.90559 17.671 5.87922C19.9574 6.85285 21.7634 8.69486 22.6916 11C23.6199 13.3052 23.5944 15.8847 22.6208 18.1711C21.6471 20.4575 19.8051 22.2634 17.5 23.1917M17.5 18V23.8334H23.3333M6.5683 8.85343V8.8651M4.73669 13.3334V13.3451M5.40163 18.1167V18.1284M8.35333 21.9317V21.9434M12.8333 23.7633V23.775"
        stroke="#1F2937"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
