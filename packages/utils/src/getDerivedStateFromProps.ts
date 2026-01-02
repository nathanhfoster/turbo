/**
 * Merges props into state, similar to React.Component.getDerivedStateFromProps
 * @param state Current state object
 * @param props Props to merge into state
 * @returns Merged state object
 */
const getDerivedStateFromProps = <S extends Record<string, any>>(
  state: S,
  props: Partial<S> = {},
): S => {
  return { ...state, ...props };
};

export default getDerivedStateFromProps;
