import { create } from 'zustand'
import { persist } from 'zustand/middleware';

type Income = {
    total_topup: number;
    total_transfer: number;
}

type Expense = {
    total_needs: number,
    total_bills: number,
    total_shopping: number,
    total_transport: number,
    total_transfer_of_wealth: number
}

type CashflowSummaryStore = {
    income: Income;
    expense: Expense;
    total_income: number;
    total_expense: number;
    diff: number;
    setCashflow: (cashflow: {
        income: Income;
        expense: Expense;
    }) => void;
}

const initialState = {
    income: {
      total_topup: 0,
      total_transfer: 0,
    },
    expense : {
      total_needs: 0,
      total_bills: 0,
      total_shopping: 0,
      total_transport: 0,
      total_transfer_of_wealth: 0
    }
};

const initialTotalIncome = initialState.income.total_topup + initialState.income.total_transfer;

const intialTotalExpense = initialState.expense.total_bills + initialState.expense.total_needs + initialState.expense.total_shopping + initialState.expense.total_transport + initialState.expense.total_transfer_of_wealth;

const initialDiff = initialTotalIncome - intialTotalExpense;

export const useCashflowSummaryStore = create<CashflowSummaryStore>()(
    persist(
        (set) => ({
            ...initialState,
            total_income: initialTotalIncome,
            total_expense: intialTotalExpense,
            diff: initialDiff,
            setCashflow: ({income, expense}) => {
                const total_income = income.total_topup + income.total_transfer;
                const total_expense = expense.total_needs + expense.total_bills + expense.total_shopping + expense.total_transfer_of_wealth + expense.total_transport;
                const diff = total_income - total_expense;
                set({
                    income,
                    expense,
                    total_income,
                    total_expense,
                    diff
                });
            },
        }),
        { name: "cashflow-store"}
    )
)
