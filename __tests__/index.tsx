import ReduxWrapper from "@/components/ReduxWrapper";
import { MantineProvider } from "@mantine/core";
import { render as testingLibraryRender } from "@testing-library/react";

/* 
    Custom render function to add wrapper for Mantine and Redux
*/
export const render = (ui: React.ReactNode) => {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MantineProvider>
        <ReduxWrapper>{children}</ReduxWrapper>
      </MantineProvider>
    ),
  });
};
