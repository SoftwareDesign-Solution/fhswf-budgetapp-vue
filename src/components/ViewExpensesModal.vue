<template>
  <b-modal :title="budget?.name + ' - Kosten'" :modelValue="modelValue" @hide="$emit('update:modelValue', false)" hide-footer>

    <ExpenseItem v-for="expense in budget?.expenses"
                 :key="expense.id"
                 :expense="expense"
                 @onExpenseDelete="onExpenseDelete"
    ></ExpenseItem>

    <!--
    <div class="d-flex pb-3" v-for="expense in budget?.expenses" :key="expense">

      <div className="me-auto fs-4">{{ expense.name}}</div>
      <div className="fs-5">{{ expense.amount }} EUR</div>
      <b-button class="ms-2" size="sm" variant="outline-danger" @click="onExpenseDelete(budget.id, expense.id)">
        &times;
      </b-button>

    </div>
    -->

  </b-modal>
</template>

<script lang="ts">
import { Options, Prop, Vue } from 'vue-property-decorator';
import Budget from "@/models/Budget";
import ExpenseItem from "@/components/ExpenseItem.vue";
import Expense from "@/models/Expense";

@Options({
  components: {
    ExpenseItem
  }
})
export default class ViewExpensesModal extends Vue {

  @Prop()
  modelValue: boolean = false;

  @Prop()
  budget: Budget | null = null;

  onExpenseDelete(expense: Expense): void {
    this.$emit('onExpenseDelete', expense);
  }

}
</script>

<style lang="scss">

</style>