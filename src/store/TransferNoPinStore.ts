import { create } from 'zustand'
import { persist } from 'zustand/middleware';

type TransferNoPinStore = {
    recipient_account_number: string;
    transfer_category: string;
    amount: string;
    pin: string;
    notes: string;
    setTransferNoPin : (transferNoPin: Partial<TransferNoPinStore>) => void;
    // setTransferNoPin : (transferNoPin: TransferNoPinStore) => void;
};

const initialState = {
    recipient_account_number: "",
    transfer_category: "",
    amount: "",
    pin: "",
    notes: "",
};

export const useTransferNoPinStore = create<TransferNoPinStore>()(
    persist(
        (set) => ({
            ...initialState,
            setTransferNoPin: (transferNoPin) => set(transferNoPin),
        }),
        { name: "transfernopin-store" }
    )
)