<template>
  <b-card no-body :class="{ 'bg-light': gray, 'bg-danger bg-opacity-10': (amount > max), '': (amount < max) }">

    <b-card-body>

      <div class="d-flex justify-content-between align-items-baseline fw-normal mb-3">
        <div class="float-start">{{ name }}</div>
        <div class="float-end">{{ amount }} EUR / {{ max }} EUR</div>
      </div>

      <b-progress :value="amount" :max="max" :variant="getProgressBarVariant(5, 100)"></b-progress>

      <div class="d-flex float-end mt-4" v-if="!hideButtons">
        <b-button class="m-2" variant="outline-primary" @click="$emit('onAddExpenseClick')">Kosten hinzufügen</b-button>
        <b-button class="m-2" variant="outline-secondary" @click="$emit('onViewExpensesClick')">Kosten auflisten</b-button>
      </div>

    </b-card-body>

  </b-card>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-inferrable-types */
import {Options, Prop, Vue} from 'vue-property-decorator';

@Options({})
export default class BudgetCard extends Vue {

  @Prop()
  name: string = '';

  @Prop()
  amount: number = 0;

  @Prop()
  max: number = 0;

  @Prop({default: false, type: Boolean})
  readonly gray: boolean = false;

  @Prop({default: false, type: Boolean})
  readonly hideButtons: boolean = false;

  getProgressBarVariant(amount: number, max: number): string {
    const ratio = amount / max
    if (ratio < 0.5) return "primary"
    if (ratio < 0.75) return "warning"
    return "danger"
  }

}
</script>

<style lang="scss">

</style>