"use client"

import { db } from "@/lib/firebase"
import { MoveTypes, TagTypes } from "@/lib/types"
import { QuerySnapshot, collection, getDocs, onSnapshot } from "@firebase/firestore"
import { createContext, useContext, useEffect, useState } from "react"

// Definisci il tipo per il contesto
interface FirebaseCollectionsContextType {
  moves: MoveTypes[]
  tags: TagTypes[]
  loadingData: boolean
}

// Crea un context con il tipo appropriato
const FirebaseCollectionsContext = createContext<FirebaseCollectionsContextType | undefined>(undefined)

// Hook custom per accedere al context
export const useFirebaseCollections = () => {
  const context = useContext(FirebaseCollectionsContext)
  if (!context) {
    throw new Error("useFirebaseCollection deve essere utilizzato all'interno di un FirebaseCollectionProvider")
  }
  return context
}

// Provider che gestisce la lettura dei dati dalla collezione Firebase
interface Props {
  children: React.ReactNode
}

export const FirebaseCollectionsProvider = ({ children }: Props) => {
  const [moves, setMoves] = useState<MoveTypes[]>([])
  const [tags, setTags] = useState<TagTypes[]>([])
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    const movesRef = collection(db, "moves")
    const tagsRef = collection(db, "tags")

    const loadCollectionsFromFirebase = (movesSnapshot: QuerySnapshot, tagsSnapshot: QuerySnapshot) => {
      const newMoves: MoveTypes[] = movesSnapshot.docs.map(
        (doc: any) => ({ id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis()) } as MoveTypes)
      )
      const newTags: TagTypes[] = tagsSnapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() } as TagTypes))

      setMoves(newMoves)
      setTags(newTags)
      setLoadingData(false)

      writeToCache(newMoves, newTags)
    }

    const writeToCache = (newMoves: MoveTypes[], newTags: TagTypes[]) => {
      localStorage.setItem("movesData", JSON.stringify(newMoves))
      localStorage.setItem("tagsData", JSON.stringify(newTags))
    }

    const unsubscribeMovesSnapshot = onSnapshot(movesRef, async (snapshot) => {
      // Solo le modifiche effettuate saranno ricevute in tempo reale
      loadCollectionsFromFirebase(snapshot, await getDocs(tagsRef))
    })

    const unsubscribeTagsSnapshot = onSnapshot(tagsRef, async (snapshot) => {
      // Solo le modifiche effettuate saranno ricevute in tempo reale
      loadCollectionsFromFirebase(await getDocs(movesRef), snapshot)
    })

    // Pulisci i listener quando il componente si smonta
    return () => {
      unsubscribeMovesSnapshot()
      unsubscribeTagsSnapshot()
    }
  }, [])

  // Il contesto contiene i dati e lo stato di caricamento
  const contextValue: FirebaseCollectionsContextType = {
    moves,
    tags,
    loadingData,
  }

  return <FirebaseCollectionsContext.Provider value={contextValue}>{children}</FirebaseCollectionsContext.Provider>
}
