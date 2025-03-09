interface CalendarIcon3Props extends React.ComponentPropsWithoutRef<"svg"> {
  size?: number | string;
}

export function CalendarIcon3({ size, style, ...others }: CalendarIcon3Props) {
  return (
    <svg
      width="54"
      height="54"
      viewBox="0 0 54 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: size, ...style }}
      {...others}
    >
      <path
        d="M26.5388 47.25H11.25C10.0565 47.25 8.91193 46.7759 8.06802 45.932C7.22411 45.0881 6.75 43.9435 6.75 42.75V15.75C6.75 14.5565 7.22411 13.4119 8.06802 12.568C8.91193 11.7241 10.0565 11.25 11.25 11.25H38.25C39.4435 11.25 40.5881 11.7241 41.432 12.568C42.2759 13.4119 42.75 14.5565 42.75 15.75V24.75H6.75M33.75 6.75V15.75M15.75 6.75V15.75M40.5 37.1162V40.5002L42.75 42.7502M31.5 40.5C31.5 42.8869 32.4482 45.1761 34.136 46.864C35.8239 48.5518 38.1131 49.5 40.5 49.5C42.8869 49.5 45.1761 48.5518 46.864 46.864C48.5518 45.1761 49.5 42.8869 49.5 40.5C49.5 38.1131 48.5518 35.8239 46.864 34.136C45.1761 32.4482 42.8869 31.5 40.5 31.5C38.1131 31.5 35.8239 32.4482 34.136 34.136C32.4482 35.8239 31.5 38.1131 31.5 40.5Z"
        stroke="#1F2937"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
