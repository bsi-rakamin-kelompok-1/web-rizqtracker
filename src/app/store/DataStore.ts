import { create } from 'zustand'

type Account = {
    account_number: number;
    balance: number;
  };
  
  type Data = {
        id: string,
        transaction_type: string,
        sender_account_number: number,
        recipient_account_number: number,
        transfer_category: string,
        amount: number,
        notes: string,
        reference_number: string,
        created_at: string  // changed from string to Date
  };

  interface Store {
    data: Data | null
    setData: (data: Data) => void
  }

  export const dataStore = create<Store>((set) => ({
    data: null,
    setData: (data) => set({data}),
  }))