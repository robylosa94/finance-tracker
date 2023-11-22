export interface MoveTypes {
  type: MoveTypeTypes
  isRecurrent: boolean
  tag: {
    color: string
    name: string
  }
  amount: number
}

export type MoveTypeTypes = "expense" | "income" | string
