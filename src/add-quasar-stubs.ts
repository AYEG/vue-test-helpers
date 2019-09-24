import { VueConstructor } from 'vue'
import { QDialogStub } from './stubs/QDialogStub'
import { QTooltipStub } from './stubs/QTooltipStub'

export function addQuasarStubs(Vue: VueConstructor): void {
  Vue.component('q-tooltip', QTooltipStub)
  Vue.component('q-dialog', QDialogStub)
}
