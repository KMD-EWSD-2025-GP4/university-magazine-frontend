import { unstable_usePrompt } from "react-router";

export default function usePrompt(block: boolean) {
  unstable_usePrompt({
    message:
      "Are you sure you want to leave? Any unsaved changes will be lost.",
    when: ({ currentLocation, nextLocation }) =>
      block && currentLocation.pathname !== nextLocation.pathname,
  });
}
