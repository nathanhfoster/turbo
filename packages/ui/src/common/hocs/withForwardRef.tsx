import { forwardRef, ComponentType } from "react";

const withForwardRef = <P extends object, R = any>(
  Component: ComponentType<P>,
) => {
  const ForwardedComponent = forwardRef<R, P>((props, ref) => {
    return <Component {...(props as P)} ref={ref} />;
  });

  ForwardedComponent.displayName = `Forwarded(${Component.displayName || Component.name || "Component"})`;
  return ForwardedComponent;
};

export default withForwardRef;
