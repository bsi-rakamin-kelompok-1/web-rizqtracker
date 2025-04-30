import { create } from 'zustand'
import { persist } from 'zustand/middleware';

type TopupNoPinStore = {
    topup_method: string;
    amount: string;
    notes: string;
    pin: string;
    setTopupNoPin : (topupNoPin: Partial<TopupNoPinStore>) => void;
};

const initialState = {
    topup_method: "",
    amount: "",
    notes: "",
    pin: "",

};

export const useTopupNoPinStore = create<TopupNoPinStore>()(
    persist(
        (set) => ({
            ...initialState,
            setTopupNoPin: (topupNoPin) => set(topupNoPin),
        }),
        { name: "topupnopin-store" }
    )
)