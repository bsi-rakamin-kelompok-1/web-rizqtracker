import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware';

type Account = {
    account_number: string;
    balance: number;
};
  
type UserStore = {
    email: string;
    full_name: string;
    phone_number: string;
    avatar_url: null;
    created_at: Date;
    updated_at: Date;
    account: Account;
    setUser: (user: UserStore) => void;
};

const userInitialState = {
    email: '',
    full_name: '',
    phone_number: '',
    avatar_url: null,
    created_at: new Date(),
    updated_at: new Date(),
    account: {
        account_number: '',
        balance: 0
    }
};

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            ...userInitialState,
            setUser: (user) => set(user),
        }),
        { name: "user-store" }
    )
)