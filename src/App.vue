<template>

  <!--
  <b-container>
    <b-button variant="primary" @click="showModal">Hello World</b-button>

    {{ modal }}

    <div class="mt-5">

      <b-progress :value="'50'" :max="'100'"></b-progress>

    </div>

    <div class="mt-5">

      <b-form-group
        id="field-1"
        description="Feld"
        label="Eingabe"
        label-for="input-1"
      >
        <b-form-input id="input-1" v-model="name"></b-form-input>
      </b-form-group>

      {{ name }}

    </div>

    <div class="hstack gap-5">
      <div class="bg-light border">First item</div>
      <div class="bg-light border">Second item</div>
      <div class="bg-light border">Third item</div>
    </div>

    <b-card no-body>

      <b-card-header>
        <div class="float-start">Titel</div>
        <div class="float-end"> 15 %</div>
      </b-card-header>
      <b-card-body>

        <div class="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div class="float-start">Titel</div>
          <div class="float-end"> 15 %</div>
        </div>

        <b-progress :value="'50'" :max="'100'"></b-progress>

        <div class="d-flex float-end mt-4">
          <b-button class="m-2" variant="outline-primary">Add Expense</b-button>
          <b-button class="m-2" variant="outline-secondary">View Expenses</b-button>
        </div>

      </b-card-body>

    </b-card>

  </b-container>
  -->

  <b-container class="my-4">

    <div class="d-flex mb-4 gap-2">
      <h1 class="me-auto">FHSWF Vue Kostenplaner</h1>
      <b-button variant="primary" @click="onAddBudgetClick">Budget hinzufügen</b-button>
      <b-button variant="outline-primary" @click="onAddExpenseClick">Kosten hinzufügen</b-button>
    </div>

    <div class="d-grid gap-2 align-items-start" style="gridTemplateColumns: repeat(auto-fill, minmax(300px, 1fr))">

      <budget-card v-for="budget in budgets"
                   v-bind:key="budget"
                   :name="budget.name"
                   :amount="budget.amount"
                   :max="budget.max"
                   @onAddExpenseClick="onAddExpenseClick(budget)"
                   @onViewExpensesClick="onViewExpensesClick(budget)"
      >

      </budget-card>

      <total-budget-card :amount="budgets.reduce((total, item) => (total + (+item.amount)), 0)"
                         :max="budgets.reduce((total, item) => (total + (+item.max)), 0)"></total-budget-card>

      <!--
      <b-card no-body>

        <b-card-header>
          <div class="float-start">Titel</div>
          <div class="float-end"> 15 %</div>
        </b-card-header>
        <b-card-body>

          <div class="d-flex justify-content-between align-items-baseline fw-normal mb-3">
            <div class="float-start">Titel</div>
            <div class="float-end"> 50 %</div>
          </div>

          <b-progress :value="'50'" :max="'100'" :variant="getProgressBarVariant(50, 100)"></b-progress>

          <div class="d-flex float-end mt-4">
            <b-button class="m-2" variant="outline-primary">Add Expense</b-button>
            <b-button class="m-2" variant="outline-secondary">View Expenses</b-button>
          </div>

        </b-card-body>

      </b-card>

      <b-card no-body>

        <b-card-header>
          <div class="float-start">Titel</div>
          <div class="float-end"> 15 %</div>
        </b-card-header>
        <b-card-body>

          <div class="d-flex justify-content-between align-items-baseline fw-normal mb-3">
            <div class="float-start">Titel</div>
            <div class="float-end"> 95 %</div>
          </div>

          <b-progress :value="'95'" :max="'100'" :variant="getProgressBarVariant(95, 100)"></b-progress>

          <div class="d-flex float-end mt-4">
            <b-button class="m-2" variant="outline-primary">Add Expense</b-button>
            <b-button class="m-2" variant="outline-secondary">View Expenses</b-button>
          </div>

        </b-card-body>

      </b-card>

      <b-card no-body>

        <b-card-header>
          <div class="float-start">Titel</div>
          <div class="float-end"> 15 %</div>
        </b-card-header>
        <b-card-body>

          <div class="d-flex justify-content-between align-items-baseline fw-normal mb-3">
            <div class="float-start">Titel</div>
            <div class="float-end"> 15 %</div>
          </div>

          <b-progress :value="'50'" :max="'100'"></b-progress>

          <div class="d-flex float-end mt-4">
            <b-button class="m-2" variant="outline-primary">Add Expense</b-button>
            <b-button class="m-2" variant="outline-secondary">View Expenses</b-button>
          </div>

        </b-card-body>

      </b-card>
      -->

    </div>

    <div>
      {{ this.budgets }}
    </div>

    <add-budget-modal v-model="showAddBudgetModal" @onBudgetSave="onBudgetSave"></add-budget-modal>

    <add-expense-modal v-model="showAddExpenseModal" :budgets="budgets" :budget="selectedBudget" @onExpenseSave="onExpenseSave"></add-expense-modal>

    <view-expenses-modal v-model="showViewExpensesModal" :budget="selectedBudget" @onExpenseDelete="onExpenseDelete"></view-expenses-modal>

  </b-container>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { v4 as uuidv4 } from 'uuid';
import AddBudgetModal from '@/components/AddBudgetModal.vue';
import AddExpenseModal from "@/components/AddExpenseModal.vue";
import BudgetCard from './components/BudgetCard.vue'
import TotalBudgetCard from "@/components/TotalBudgetCard.vue";
import ViewExpensesModal from "@/components/ViewExpensesModal.vue";
import Budget from "@/models/Budget";
import Expense from "@/models/Expense";

@Options({
  components: {
    AddBudgetModal,
    AddExpenseModal,
    BudgetCard,
    TotalBudgetCard,
    ViewExpensesModal
  }
})
export default class App extends Vue {

  showAddBudgetModal: boolean = false;
  showAddExpenseModal: boolean = false;
  showViewExpensesModal: boolean = false;

  budgets: Budget[] = [];

  selectedBudget?: Budget = undefined;

  mounted(): any {

    this.budgets = [
        {
          id: uuidv4(),
          name: "Budget 1",
          max: 500,
          amount: 0,
          expenses: []
        },
        {
          id: uuidv4(),
          name: "Budget 2",
          max: 500,
          amount: 450,
          expenses: [
            {
              id: uuidv4(),
              budgetId: '',
              name: 'Kosten 2.1',
              amount: 100
            },
            {
              id: uuidv4(),
              budgetId: '',
              name: 'Kosten 2.2',
              amount: 100
            },
            {
              id: uuidv4(),
              budgetId: '',
              name: 'Kosten 2.3',
              amount: 100
            },
            {
              id: uuidv4(),
              budgetId: '',
              name: 'Kosten 2.4',
              amount: 100
            },
            {
              id: uuidv4(),
              budgetId: '',
              name: 'Kosten 2.5',
              amount: 50
            }
          ]
        }
    ];

  }

  onAddBudgetClick(): void {
    this.showAddBudgetModal = true;
  }

  onAddExpenseClick(budget?: Budget): void {
    this.selectedBudget = budget;
    this.showAddExpenseModal = true;
  }

  onBudgetSave(name: string, amount: number): void {

    const budget: Budget = {
      id: uuidv4(),
      name: name,
      max: amount,
      amount: 0,
      expenses: []
    };

    this.budgets.push(budget);

  }

  onExpenseSave(expense: Expense): void {

    let index = this.budgets.findIndex(item => item.id === expense.budgetId);

    this.budgets[index].expenses.push(expense);

    let total: number = this.budgets[index].expenses.reduce((total, current) => (total + (+current.amount)), 0);

    this.budgets[index].amount = total;

  }

  onViewExpensesClick(budget?: Budget): void {

    if (budget === undefined) return;

    this.selectedBudget = budget;
    this.showViewExpensesModal = true;

  }

  getProgressBarVariant(amount: number, max: number): string {
    const ratio = amount / max
    if (ratio < 0.5) return "primary"
    if (ratio < 0.75) return "warning"
    return "danger"
  }

  onExpenseDelete(expense: Expense): void {

    console.log(expense);

    let index = this.budgets.findIndex(item => item.id === expense.budgetId);

    const expenses = this.budgets[index].expenses.filter(item => item.id !== expense.id);

    this.budgets[index].expenses = expenses;

    let total: number = this.budgets[index].expenses.reduce((total, current) => (total + (+current.amount)), 0);

    this.budgets[index].amount = total;

  }

}
</script>

<style lang="scss">
</style>
