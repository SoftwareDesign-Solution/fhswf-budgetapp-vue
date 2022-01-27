<template>
  <b-modal title="Kosten anlegen" cancel-title="Abbrechen" ok-title="Speichern" :modelValue="modelValue" @hide="$emit('update:modelValue', false)" @ok="onSaveClick">

    <form @submit.prevent="onSubmit">

      <b-form-group
          id="field-1"
          label="Name"
          label-for="input-1"
      >
        <b-form-input id="input-1" v-model="name"></b-form-input>
      </b-form-group>

      <b-form-group
          id="field-2"
          label="Betrag"
          label-for="input-2"
      >
        <b-form-input id="input-2" v-model="amount"></b-form-input>
      </b-form-group>

      <b-form-group
          id="field-2"
          label="Budget"
          label-for="select-1"
      >
        <b-form-select id="select-1" v-model="budgetId">

          <b-form-select-option v-for="budget in budgets" :key="budget.id" :value="budget.id">
            {{ budget.name }}
          </b-form-select-option>

        </b-form-select>
      </b-form-group>

      <div>
        {{ budgetId }}
      </div>

    </form>

  </b-modal>
</template>

<script lang="ts">
import { Prop, Vue } from 'vue-property-decorator';
import { v4 as uuidv4 } from 'uuid';
import Budget from "@/models/Budget";
import Expense from "@/models/Expense";

export default class AddExpenseModal extends Vue {

  name: string = '';
  amount: number = 0;
  budgetId: string = '';

  @Prop({required: true})
  modelValue: boolean = false;

  @Prop({required: true})
  budgets: Budget[] = [];

  @Prop()
  budget?: Budget;

  updated(): void {
    this.budgetId = this.budget?.id || '';
  }

  private onSaveClick(): void {

    console.log(this.budgetId);

    const expense: Expense = {
      id: uuidv4(),
      budgetId: this.budgetId,
      name: this.name,
      amount: this.amount
    };

    this.name = '';
    this.amount = 0;

    console.log(expense);

    this.$emit('onExpenseSave', expense);

  }

}
</script>

<style lang="scss">

</style>