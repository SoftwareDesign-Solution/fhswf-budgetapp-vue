import Expense from "@/models/Expense";

export default class Budget {
    id: string = '';
    name: string = '';
    amount: number = 0;
    max: number = 0;
    expenses: Expense[] = [];
}