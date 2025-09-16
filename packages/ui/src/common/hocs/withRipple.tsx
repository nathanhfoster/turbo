import { useRipple, RippleOptions } from '../../hooks/useRipple';
import type { ComposableComponent } from '../../types';
import { combineClassNames } from '@nathanhfoster/utils';

const withRipple = <T extends HTMLElement, P extends ComposableComponent & RippleOptions<T>>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const componentName = Component.displayName || Component.name || 'Component';

  const RippleComponent: React.FC<P> = ({
    className,
    ripple = true,
    disabled,
    onClick,
    ...props
  }) => {
    const { elementRef, handleClick } = useRipple({
      disabled,
      ripple,
      onClick,
    });

    const combinedClassName = combineClassNames(className, ripple && 'relative overflow-hidden');

    return (
      <Component
        {...(props as P)}
        ref={elementRef}
        className={combinedClassName}
        onClick={handleClick}
        disabled={disabled}
        ripple={ripple}
      />
    );
  };

  RippleComponent.displayName = `withRipple(${componentName})`;
  return RippleComponent;
};

export default withRipple;
