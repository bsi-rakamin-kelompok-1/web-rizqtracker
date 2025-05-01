import { create } from 'zustand'
import { persist } from 'zustand/middleware';


  
type ReceiptTopupStore = {
        id: string,
        transaction_type: string,
        sender_account_number: number,
        topup_method: string,
        amount: number,
        notes: string,
        reference_number: string,
        "created_at": Date,  
        setReceiptTopup : (receiptTopup: ReceiptTopupStore) => void
  };

  const initialState = {
    id: "",
    transaction_type: "",
    sender_account_number: 0,
    topup_method: "",
    amount: 0,
    notes: "",
    reference_number: "",
    created_at: new Date() // Inisialisasi dengan instance Date
  };


export const useReceiptTopupStore = create<ReceiptTopupStore>()(
    persist(
        (set) => ({
            ...initialState,
            setReceiptTopup: (receiptTopup) => set(receiptTopup),
        }),
        { name: "receipttopup-store" }
    )
)