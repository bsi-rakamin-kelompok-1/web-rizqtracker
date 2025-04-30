import { create } from 'zustand'
import { persist } from 'zustand/middleware';


  
type ReceiptTopupStore = {
        id: String,
        transaction_type: String,
        sender_account_number: Number,
        topup_method: String,
        amount: Number,
        notes: String,
        reference_number: String,
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