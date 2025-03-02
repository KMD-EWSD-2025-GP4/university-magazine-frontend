interface CalendarIcon2Props extends React.ComponentPropsWithoutRef<"svg"> {
  size?: number | string;
}

export function CalendarIcon2({ size, style, ...others }: CalendarIcon2Props) {
  return (
    <svg
      width="23"
      height="22"
      viewBox="0 0 23 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: size, ...style }}
      {...others}
    >
      <path
        d="M17.5837 3.66675H4.75033C3.7378 3.66675 2.91699 4.48756 2.91699 5.50008V18.3334C2.91699 19.3459 3.7378 20.1667 4.75033 20.1667H17.5837C18.5962 20.1667 19.417 19.3459 19.417 18.3334V5.50008C19.417 4.48756 18.5962 3.66675 17.5837 3.66675Z"
        stroke="#868E96"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.8336 1.83325V5.49992"
        stroke="#868E96"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.50034 1.83325V5.49992"
        stroke="#868E96"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2.91699 9.16675H19.417"
        stroke="#868E96"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
