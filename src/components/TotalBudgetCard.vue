<template>
  <budget-card name="Gesamt" :amount="this.amount" :max="this.max" hide-buttons></budget-card>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import BudgetCard from './BudgetCard.vue'
import {Prop} from "vue-property-decorator";

@Options({
  components: {
    BudgetCard
  }
})
export default class TotalBudgetCard extends Vue {

  @Prop()
  amount: number = 0;

  @Prop()
  max: number = 0;

}
</script>

<style lang="scss">

</style>