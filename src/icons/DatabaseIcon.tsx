interface DatabaseIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  size?: number | string;
}

export function DatabaseIcon({ size, style, ...others }: DatabaseIconProps) {
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
        d="M4 6C4 6.79565 4.84285 7.55871 6.34315 8.12132C7.84344 8.68393 9.87827 9 12 9C14.1217 9 16.1566 8.68393 17.6569 8.12132C19.1571 7.55871 20 6.79565 20 6M4 6C4 5.20435 4.84285 4.44129 6.34315 3.87868C7.84344 3.31607 9.87827 3 12 3C14.1217 3 16.1566 3.31607 17.6569 3.87868C19.1571 4.44129 20 5.20435 20 6M4 6V12M20 6V12M4 12C4 12.7956 4.84285 13.5587 6.34315 14.1213C7.84344 14.6839 9.87827 15 12 15C14.1217 15 16.1566 14.6839 17.6569 14.1213C19.1571 13.5587 20 12.7956 20 12M4 12V18C4 18.7956 4.84285 19.5587 6.34315 20.1213C7.84344 20.6839 9.87827 21 12 21C14.1217 21 16.1566 20.6839 17.6569 20.1213C19.1571 19.5587 20 18.7956 20 18V12"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
