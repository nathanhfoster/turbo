export const isMobile = (userAgent: string) =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent,
  );

export const isTablet = (userAgent: string) => /iPad|Android/i.test(userAgent);

export const isDesktop = (userAgent: string) =>
  !isMobile(userAgent) && !isTablet(userAgent);
