import { create } from 'zustand'
import { persist } from 'zustand/middleware';

type Meta = {
    total: number,
    total_page: number,
    current_page: number,
    size: number,
    has_next: boolean,
    has_previous: boolean
}

type Transaction = {
    id: string,
    sender_full_name: string,
    sender_account_number: number,
    recipient_full_name: string | null,
    recipient_account_number: number | null,
    transaction_type: string,
    transfer_category: string | null,
    topup_method: string | null,
    amount: number,
    notes: string,
    reference_number: string,
    "created_at": Date
}

type Data = {
    transactions: Transaction[],
}

type AllTransactionsStore = {
    meta: Meta,
    data: Data,
    setAllTransactions: (transactions: {
        meta: Meta;
        data: Data;
    }) => void;
}

const initialState = {
    meta: {
        total: 0,
        total_page: 0,
        current_page: 0,
        size: 10,
        has_next: false,
        has_previous: false
    },
    data: {
        transactions: []
    }
}

export const useAllTransactionsStore = create<AllTransactionsStore>()(
    persist(
        (set) => ({
            ...initialState,
            setAllTransactions: ({meta, data}) => {
                set({
                    meta,
                    data
                });
            },
        }),
        { name: "all-transactions-store"}
    )
)