import { createTheme, MantineProvider } from '@mantine/core';
import { ReactNode } from 'react';

const theme = createTheme({
});

export function Provider({ children }: { children: ReactNode}) {
  return (
    <MantineProvider theme={theme}>
      {children}
    </MantineProvider>
  );
}
