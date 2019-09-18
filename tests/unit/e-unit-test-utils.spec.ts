import { createLocalVue } from '@vue/test-utils'
import { expect } from 'chai'
import { QSelect } from 'quasar'
import { eMount, IEWrapper } from 'src/e-unit-test-utils'
import { Vue } from 'vue-property-decorator'
import EWrapperHelper from '../helpers/EWrapperHelper.vue'

const localVue = createLocalVue()

let wrapper: IEWrapper<Vue>
describe('e-unit-test-utils', (): void => {
  beforeEach(() => {
    wrapper = eMount(EWrapperHelper, {
      sync: false,
      localVue,
    })
  })

  it('returns menu autofill options from a qselect components', async () => {
    const testData = [{
      label: 'Neo',
      value: 'Neo',
    },
    {
      label: 'Morph',
      value: 'Morph',
    },
    {
      label: 'Smith',
      value: 'Smith',
    }]

    document.body.innerHTML = ''

    const qSelectWrapper = eMount(QSelect, {
      sync: false,
      propsData: {
        options: testData,
        useInput: true,
        value: '',
      },
      localVue,
    })
    const res = await wrapper.getMenuFromBody(qSelectWrapper)
    expect(res.html()).does.contain('Morph')
  })

  it('can get element by data-name', (): void => {
    expect(wrapper.getByName('my-data-name-element').text()).to.equal('data-name content')
  })

  it('can set an input value', async (): Promise<void> => {
    wrapper.setInputValue('my-input', 'foo bar')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.value).to.eql('foo bar')
  })

  it('can set a q-select value', async (): Promise<void> => {
    wrapper.setSelectValue('my-select', ['Apple', 'Oracle'])
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.selectValue).to.eql(['Apple', 'Oracle'])
  })

  it('can get text from an input', (): void => {
    wrapper.setInputValue('my-input', 'Text')
    wrapper.vm.$nextTick()

    expect(wrapper.getTextFromInput('my-input')).to.equal('Text')
  })

  it('can get int from an input', (): void => {
    wrapper.setInputValue('my-input', '100')
    wrapper.vm.$nextTick()

    expect(wrapper.getIntFromInput('my-input')).to.equal(100)
  })

  it('can get a validation error', async () => {
    wrapper.setInputValue('my-input', '')
    await wrapper.vm.$nextTick()

    await wrapper.vm.$validator.validateAll()

    expect(wrapper.getValidationError('my-input')).to.equal('The my-input value is not valid')
  })

  it('can get chip values from q-select', async (): Promise<void> => {
    wrapper.setSelectValue('my-chips-select', ['Google', 'Facebook'])
    await wrapper.vm.$nextTick()

    expect(wrapper.getQSelectChipValues('my-chips-select')).to.eql(['Google', 'Facebook'])
  })

  it('can get select values from q-select', async (): Promise<void> => {
    wrapper.setSelectValue('my-select', 'Facebook')
    await wrapper.vm.$nextTick()

    expect(wrapper.getSelectValue('my-select')).to.eql('Facebook')
  })

  it('can get multi select values from q-select', async (): Promise<void> => {
    wrapper.setSelectValue('my-multi-select', ['Facebook', 'Apple'])
    await wrapper.vm.$nextTick()

    expect(wrapper.getMultiSelectValue('my-multi-select')).to.eql(['Facebook', 'Apple'])
  })

  it('can toggle a checkbox', () => {
    const checkbox = wrapper.toggleCheckbox('my-checkbox')
    expect(checkbox.emitted('input')[0]).to.eql([true])
  })

  it('can get a q-select', () => {
    const select = wrapper.getQSelect('my-select')
    expect(select).not.to.be.null
  })
})
