/**
 * removes `undefined` and `null` form a union type
 */
export type Defined<T> = Exclude<T, undefined | null>
