<template>
  <div class="hstack ps-1">
    <div class="me-auto fs-4">{{ expense.name}}</div>
    <div class="fs-5">{{ expense.amount }} EUR</div>
    <b-button class="ms-2" size="sm" variant="outline-danger" @click="onExpenseDeleteClick(expense)">
      &times;
    </b-button>
  </div>
</template>

<script lang="ts">
import { Prop, Vue } from 'vue-property-decorator';
import Expense from "@/models/Expense";

export default class ExpenseItem extends Vue {

  @Prop()
  expense: Expense | null = null;

  onExpenseDeleteClick(expense: Expense): void {
    this.$emit('onExpenseDelete', expense);
  }

}
</script>

<style lang="scss">

</style>