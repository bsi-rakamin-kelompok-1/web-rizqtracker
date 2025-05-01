import { create } from 'zustand'
import { persist } from 'zustand/middleware';


  
type ReceiptTransferStore = {
        id: string,
        transaction_type: string,
        sender_account_number: number,
        recipient_account_number: number,
        transfer_category: string,
        amount: number,
        notes: string,
        reference_number: string,
        "created_at": Date,  
        setReceiptTransfer : (receiptTransfer: ReceiptTransferStore) => void
  };

  const initialState = {
    id: "",
    transaction_type: "",
    sender_account_number: 0,
    recipient_account_number: 0,
    transfer_category: "",
    amount: 0,
    notes: "",
    reference_number: "",
    created_at: new Date() // Inisialisasi dengan instance Date
  };


export const useReceiptTrasferStore = create<ReceiptTransferStore>()(
    persist(
        (set) => ({
            ...initialState,
            setReceiptTransfer: (receiptTransfer) => set(receiptTransfer),
        }),
        { name: "receipttransfer-store" }
    )
)