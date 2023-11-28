export interface MoveTypes {
  type: MoveTypeTypes
  amount: number
  tag: TagTypes
  isRecurrent?: boolean | undefined
  createdAt: Date
}

export type MoveTypeTypes = "uscita" | "entrata" | string

export interface TagTypes {
  color: string
  name: string
  type: MoveTypeTypes
}
