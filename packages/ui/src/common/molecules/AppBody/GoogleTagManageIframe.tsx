const GoogleTagManageIframe = () => {
  if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <iframe
      src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
      height="0"
      width="0"
      style={{ display: "none", visibility: "hidden" }}
    />
  );
};

export default GoogleTagManageIframe;



