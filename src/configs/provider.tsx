import {
  createTheme,
  DefaultMantineColor,
  MantineColorsTuple,
  MantineProvider,
  NavLink,
} from "@mantine/core";
import "@mantine/dates/styles.css";
import "mantine-react-table/styles.css";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Notifications, showNotification } from "@mantine/notifications";
import { AxiosError } from "axios";
import { ModalsProvider } from "@mantine/modals";
import "@mantine/carousel/styles.css";
import "@mantine/dropzone/styles.css";
import "../global.css";

const theme = createTheme({
  primaryColor: "gray",
  primaryShade: 6,
  colors: {
    primary: [
      "#e6f0ff",
      "#b3d1ff",
      "#80b3ff",
      "#4d94ff",
      "#002147",
      "#003366",
      "#004080",
      "#1a5276",
      "#154360",
      "#0d2d47",
    ],
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

type ExtendedCustomColors = "primary" | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
}

export function Provider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        onError: (error: Error) => {
          if (error instanceof AxiosError) {
            const errorMessage =
              error.response?.data?.error?.message ||
              "Something went wrong. Please try again.";
            const errorCode = error.response?.data?.error?.code || "";
            showNotification({
              color: "red",
              title: errorCode ?? "Error",
              message: errorMessage,
            });
          }
        },
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <ModalsProvider>
          <Notifications position="top-right" />
          {children}
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}
