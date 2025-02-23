import { createTheme, MantineProvider, NavLink } from "@mantine/core";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Notifications } from "@mantine/notifications";

const theme = createTheme({
  primaryColor: "gray",
  primaryShade: 6,
  colors: {
    gray: [
      "#f1f1f1",
      "#e7e7e7",
      "#cdcdcd",
      "#b2b2b2",
      "#9a9a9a",
      "#8b8b8b",
      "#848484",
      "#717171",
      "#656565",
      "#5c5557",
    ],
  },
  components: {
    NavLink: NavLink.extend({
      defaultProps: {
        styles: {
          root: {
            color: "#000000",
          },
        },
      },
    }),
  },
});

export function Provider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Notifications position="top-right" />
        {children}
      </MantineProvider>
    </QueryClientProvider>
  );
}
