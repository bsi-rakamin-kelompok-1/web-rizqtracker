import { create } from 'zustand'
import { persist } from 'zustand/middleware';

type Needs = {
    transaction_id: string,
    recipient_full_name: string,
    recipient_account_number: number,
    amount: number,
    notes: string,
    created_at: Date
}

type Bills = {
    transaction_id: string,
    recipient_full_name: string,
    recipient_account_number: number,
    amount: number,
    notes: string,
    created_at: Date
}

type Shopping = {
    transaction_id: string,
    recipient_full_name: string,
    recipient_account_number: number,
    amount: number,
    notes: string,
    created_at: Date
}

type Transport = {
    transaction_id: string,
    recipient_full_name: string,
    recipient_account_number: number,
    amount: number,
    notes: string,
    created_at: Date
}

type TransgerOfWealth = {
    transaction_id: string,
    recipient_full_name: string,
    recipient_account_number: number,
    amount: number,
    notes: string,
    created_at: Date
}

type IncomeHistoryStore = {
    needs: Needs[],
    bills: Bills[],
    shopping: Shopping[],
    transport: Transport[],
    transfer_of_wealth: TransgerOfWealth[]
    setExpenseHistory: (trx: IncomeHistoryStore) => void;
}

const initialState = {
    needs: [],
    bills: [],
    shopping: [],
    transport: [],
    transfer_of_wealth: []
}

export const useExpenseHistoryStore = create<IncomeHistoryStore>()(
    persist(
        (set) => ({
            ...initialState,
            setExpenseHistory: (trx) => set(trx),
        }),
        { name: "expense-history-store" }
    )
)