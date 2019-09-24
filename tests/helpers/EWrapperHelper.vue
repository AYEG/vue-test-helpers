<template>
  <div>
    <q-checkbox v-model="checked" data-name="my-checkbox" />
    <uw-input v-model="value" v-validate="'required'" name="my-input" />
    <q-select v-model="selectValue" :options="options" name="my-select" />
    <q-select
      v-model="multiSelectValue"
      :options="options"
      multiple
      name="my-multi-select"
    />
    <q-select
      v-model="chipsValue"
      :options="options"
      use-chips
      multiple
      name="my-chips-select"
    />
    <div data-name="my-data-name-element">
      data-name content
    </div>
  </div>
</template>

<script lang="ts">
import { UwInput } from '@laura-wert/vue-helpers'
import { QCheckbox } from 'quasar/src/components/checkbox'
import { QSelect } from 'quasar/src/components/select'
import { Validator } from 'vee-validate'
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component({
  components: { QCheckbox, UwInput, QSelect },
})
export default class EWrapperHelper extends Vue {
  @Provide() public parentValidator: Validator = this.$validator
  public value: string = ''
  public selectValue: string = ''
  public multiSelectValue: string[] = []
  public chipsValue: string[] = []
  public checked: boolean = false
  public options: string[] = [
    'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle',
  ]
}
</script>
