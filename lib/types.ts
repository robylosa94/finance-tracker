export interface MoveTypes {
  type: MoveTypeTypes
  amount: number
  tag: {
    color: string
    name: string
  }
  isRecurrent?: boolean | undefined
  createdAt: Date
}

export type MoveTypeTypes = "uscita" | "entrata" | string
