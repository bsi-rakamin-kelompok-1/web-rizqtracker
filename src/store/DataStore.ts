import { create } from 'zustand'

type Account = {
    account_number: number;
    balance: number;
  };
  
  type Data = {
    email: string;
    full_name: string;
    phone_number: string;
    avatar_url: string | null;
    created_at: Date;       // changed from string to Date
    updated_at: Date;       // changed from string to Date
    account: Account;
  };

  interface Store {
    data: Data | null
    setData: (data: Data) => void
  }

  export const dataStore = create<Store>((set) => ({
    data: null,
    setData: (data) => set({data}),
  }))