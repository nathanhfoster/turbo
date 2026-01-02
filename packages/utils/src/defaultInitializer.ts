/**
 * Default initializer function for state reducers
 * @param initializerArg The initial state value
 * @returns The initialized state
 */
const defaultInitializer = <S>(initializerArg: S): S => {
  return initializerArg;
};

export default defaultInitializer;
