export type Dictionary<T> = {
  [key: string]: T
}

export type AppendDictionary<T> = T | Dictionary<T>
