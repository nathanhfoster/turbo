import type { ComposableComponent } from '../../types';
import { combineClassNames } from '@monkey-tilt/utils';
import { useMemo } from 'react';

const withBaseTheme = <P extends ComposableComponent>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const componentName = Component.displayName || Component.name || 'Component';

  const ThemedComponent: React.FC<P> = ({ className, ...props }) => {
    const combinedClassName = useMemo(() => {
      const names = [
        className,
        // 'dark:bg-background-dark',
        // 'dark:text-foreground-dark'
      ];

      if (className?.includes('hover:shadow')) {
        names.push(
          'transition-shadow duration-200 ease-in-out dark:hover:shadow-[0_0_15px_rgba(245,245,245,0.3)]'
        );
      }

      return combineClassNames(...names);
    }, [className]);

    return <Component {...(props as P)} className={combinedClassName} />;
  };

  ThemedComponent.displayName = `withBaseTheme(${componentName})`;
  return ThemedComponent;
};

export default withBaseTheme;
