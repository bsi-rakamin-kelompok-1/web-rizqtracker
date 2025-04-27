import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware';

type AuthDataStore = {
    token: string | undefined,
    setToken: (token: string) => void;
}

export const useAuthDataStore = create<AuthDataStore>()(
    persist(
        (set) => ({
            token: undefined,
            setToken: (token: string) => set({token}),
        }),
        { name: "auth-store" }
    )
)