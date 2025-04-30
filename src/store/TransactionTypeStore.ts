import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware';

type TransactionTypeStore = {
    type: string | undefined,
    setType: (type: string) => void;
}

export const useTransactionTypeStore = create<TransactionTypeStore>()(
    persist(
        (set) => ({
            type: undefined,
            setType: (type: string) => set({type}),
        }),
        { name: "transaction-type-store" }
    )
)