interface MessageIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  size?: number | string;
}

export function MessageIcon({ size, style, ...others }: MessageIconProps) {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: size, ...style }}
      {...others}
    >
      <path
        d="M3.39453 20.0001L4.69453 16.1001C3.57098 14.4384 3.16452 12.4705 3.55075 10.5624C3.93697 8.65427 5.08959 6.93575 6.7943 5.72635C8.499 4.51696 10.6398 3.89898 12.8186 3.98732C14.9975 4.07566 17.0661 4.86431 18.6398 6.20664C20.2136 7.54896 21.1854 9.35362 21.3746 11.2851C21.5638 13.2165 20.9575 15.1433 19.6684 16.7072C18.3793 18.2711 16.4952 19.3657 14.3663 19.7874C12.2375 20.2092 10.0087 19.9294 8.09453 19.0001L3.39453 20.0001Z"
        stroke="#1F2937"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
