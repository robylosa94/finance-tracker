import { MoveTypes } from "@/lib/types"
import MovesCard from "./card"

interface Props {
  moves: MoveTypes[]
}

export default function MovesList({ moves }: Props) {
  return (
    <div>
      {moves.length > 0 ? (
        <ul>
          {moves.map((item, idx) => (
            <li key={idx} className="mb-4 last:mb-0">
              <MovesCard data={item} />
            </li>
          ))}
        </ul>
      ) : (
        <small className="text-gray-400 mt-7 block">Non ci sono movimenti disponibili</small>
      )}
    </div>
  )
}
