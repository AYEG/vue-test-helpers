import chai from 'chai'
import sinonChai from 'sinon-chai'
import VeeValidate from 'vee-validate'
import Vue from 'vue'
import { addQuasarToVue } from '../../src/setup-vue'

Vue.use(VeeValidate, {
  locale: 'nl',
})

chai.use(sinonChai)
addQuasarToVue()
