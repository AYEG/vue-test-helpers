import { expect } from 'chai'
import sinon, { SinonSpy } from 'sinon'
import { addQuasarToVue, mockVueI18n } from '../../src/setup-vue'

export interface IFakeMockI18nOptions {
  Vue: { directive: SinonSpy }
  testUtilsConfig: {
    // tslint:disable-next-line:no-any
    mocks: Record<string, any>,
  }
}

describe('setup-vue', () => {
  function fakeMockVueI18n(): IFakeMockI18nOptions {
    const options: IFakeMockI18nOptions = {
      testUtilsConfig: {
        mocks: {},
      },
      Vue: { directive: sinon.fake() },
    }

    // @ts-ignore: give a fake instead of Vue
    mockVueI18n(options)
    return options
  }

  it('add Quasar with options to vue', () => {
    const Vue = { use: sinon.fake() }
    const quasarConfig = {
      iconSet: { name: 'my-icon-set' },
      lang: { isoName: 'my-lang' },
    }
    // @ts-ignore: give a fake instead of Vue
    addQuasarToVue({
      quasarConfig,
      Vue,
    })

    expect(Vue.use).to.have.been.calledOnce
    expect(Vue.use.args[0][1]).to.equal(quasarConfig)
  })

  it('mocks vue i18n functions', () => {
    const options = fakeMockVueI18n()
    expect(options.testUtilsConfig.mocks!.$t).not.undefined
    expect(options.testUtilsConfig.mocks!.$tc).not.undefined
    expect(options.testUtilsConfig.mocks!.$n).not.undefined

    expect(options.Vue.directive).to.have.been.calledOnce
    expect(options.Vue.directive.firstCall.args[0]).to.equal('t')
  })

  it('mock functions returns path and params', () => {
    const options = fakeMockVueI18n()

    const $t = options.testUtilsConfig.mocks!.$t
    const $tc = options.testUtilsConfig.mocks!.$tc
    const $n = options.testUtilsConfig.mocks!.$n
    expect($t('params1', ['param2']))
      .to.equal('params1_["param2"]')
    expect($tc('params1', { key: 'param2' }))
      .to.equal('params1_{"key":"param2"}')
    expect($n('params1', { key: 'param2' }))
      .to.equal('params1_{"key":"param2"}')
  })

  it('v-t directive sets path and params to the textContent', () => {
    const options = fakeMockVueI18n()

    const directive = options.Vue.directive.firstCall.args[1]
    const htmlElement = { textContent: '' }
    const binding = { value: { path: 'foo' } }
    directive.bind(htmlElement, binding)

    expect(htmlElement.textContent).to.equal('{"path":"foo"}')
  })
})
