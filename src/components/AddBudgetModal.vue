<template>
  <b-modal title="Budget anlegen" cancel-title="Abbrechen" ok-title="Speichern" :modelValue="modelValue" @hide="$emit('update:modelValue', false)" @ok="onSaveClick">

    <form>

      <b-form-group
          id="field-1"
          label="Name"
          label-for="input-1"
      >
        <b-form-input id="input-1" type="text" v-model="name"></b-form-input>
      </b-form-group>

      <b-form-group
          id="field-2"
          label="Betrag"
          label-for="input-2"
      >
        <b-form-input id="input-2" type="number" v-model="amount"></b-form-input>
      </b-form-group>

    </form>

  </b-modal>
</template>

<script lang="ts">
import { Prop, Vue } from 'vue-property-decorator';

export default class AddBudgetModal extends Vue {

  name: string = '';
  amount: number = 0;

  @Prop()
  modelValue: boolean = false;

  onSaveClick(): void {
    this.$emit('onBudgetSave', this.name, this.amount);
  }

}
</script>

<style lang="scss">

</style>