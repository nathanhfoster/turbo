import { Context, useContextSelector } from 'use-context-selector';

type InferStateFromContext<C> = C extends Context<infer T> ? T : never;
type ComponentPropsType = Record<string, any>;

const createUseSelectorHook = <C extends Context<any>>(context: C) => {
  /**
   * This hook simulates Redux's useSelector hook
   * Only updates when the selected state changes, not when the whole state changes
   */
  const useSelector = <
    SelectedState = unknown,
    Props extends ComponentPropsType = Record<string, unknown>,
  >(
    mapStateToSelector: (state: InferStateFromContext<C>, props?: Props) => SelectedState,
    props?: Props
  ) => {
    const selectedState = useContextSelector<InferStateFromContext<C>, SelectedState>(
      context,
      (state) => {
        const result = mapStateToSelector(state, props);
        return result;
      }
    );

    return selectedState;
  };

  return useSelector;
};

export default createUseSelectorHook;
