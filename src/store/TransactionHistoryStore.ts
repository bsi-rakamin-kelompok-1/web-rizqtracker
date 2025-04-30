import { create } from 'zustand'
import { persist } from 'zustand/middleware';

type TopupData = {
    transaction_id: string;
    topup_method: string;
    amount: number,
    notes: string;
    created_at: Date,
    sender_full_name: null,
}

type TransferData = {
    transaction_id: string,
    transaction_category: string,
    sender_full_name: string,
    sender_account_number: number,
    amount: number,
    notes: string,
    created_at: Date,
    topup_method: null;
}

type TransactionHistoryStore = {
    topup_data: TopupData[],
    transfer_data: TransferData[]
    setTransactionHistory: (trx: {
        topup_data: TopupData[],
        transfer_data: TransferData[]
    }) => void;
}

const initialState = {
    topup_data: [],
    transfer_data: []
}

export const useTransactionHistoryStore = create<TransactionHistoryStore>()(
    persist(
        (set) => ({
            ...initialState,
            setTransactionHistory: ({topup_data, transfer_data}) => {
                set({
                    topup_data,
                    transfer_data
                })
            }
        }),
        { name: "transaction-history-store"}
    )
)