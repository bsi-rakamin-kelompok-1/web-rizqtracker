import { create } from 'zustand'

type Account = {
    account_number: number;
    balance: number;
  };
  
  type Data = {
        id: String,
        transaction_type: String,
        sender_account_number: Number,
        recipient_account_number: Number,
        transfer_category: String,
        amount: Number,
        notes: String,
        reference_number: String,
        created_at: String  // changed from string to Date
  };

  interface Store {
    data: Data | null
    setData: (data: Data) => void
  }

  export const dataStore = create<Store>((set) => ({
    data: null,
    setData: (data) => set({data}),
  }))