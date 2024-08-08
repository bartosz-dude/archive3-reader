/**
 * Return type of the useState hook, assumes an initial value
 */
export type State<T> = [T, React.Dispatch<React.SetStateAction<T>>]
