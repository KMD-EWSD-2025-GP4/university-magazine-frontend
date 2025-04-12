export function detectBrowser() {
  const userAgent = navigator.userAgent.toLowerCase();

  // Check for Brave first (it usually has 'chrome' in userAgent too)
  if (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    navigator.brave ||
    (userAgent.includes("brave") && !userAgent.includes("opr"))
  ) {
    return "brave";
  }
  // Opera detection (must come before Chrome)
  else if (userAgent.includes("opr") || userAgent.includes("opera")) {
    return "opera";
  }
  // Firefox
  else if (userAgent.includes("firefox")) {
    return "firefox";
  }
  // Safari (and not Chrome)
  else if (userAgent.includes("safari") && !userAgent.includes("chrome")) {
    return "safari";
  }
  // Chrome (must come after Brave and Opera checks)
  else if (userAgent.includes("chrome")) {
    return "chrome";
  }
  // Edge (if you want to include it later)
  // else if (userAgent.includes('edg')) {
  //   return 'edge';
  // }
  // Everything else
  else {
    return "other";
  }
}
