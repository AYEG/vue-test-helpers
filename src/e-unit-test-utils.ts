import { createWrapper, mount, MountOptions, shallowMount, Wrapper } from '@vue/test-utils'
import { VueConstructor } from 'vue'
import { Vue } from 'vue/types/vue'
import ChaiExpect = Chai.ExpectStatic

export function eMount<V extends Vue>(component: VueConstructor<V>, options?: MountOptions<V>): IEWrapper<V> {
  return extendWrapper(mount(component, options))
}

export function eShallow<V extends Vue>(component: VueConstructor<V>, options?: MountOptions<V>): IEWrapper<V> {
  return extendWrapper(shallowMount(component, options))
}

export function extendWrapper<V extends Vue>(wrapper: Wrapper<V>): IEWrapper<V> {
  // @ts-ignore Ewrapper implements Wrapper through the proxy
  return new EWrapper(wrapper) as IEWrapper<V>
}

class EWrapper<V extends Vue> {
  private readonly wrapper: Wrapper<V>

  constructor(wrapper: Wrapper<V>) {
    this.wrapper = wrapper

    return new Proxy(this, {
      // tslint:disable-next-line:no-any
      get: (eWrapper: EWrapper<V>, field: string): any => {
        if (field in eWrapper) {
          // @ts-ignore - element implicitly has an 'any' type
          return eWrapper[field]
        }

        // @ts-ignore - element implicitly has an 'any' type
        return this.wrapper[field]
      },
    })
  }

  public getInput(name: string): Wrapper<Vue> {
    return this.getByName(name)
  }

  public getByName(name: string): Wrapper<Vue> {
    return this.wrapper.find(`[name="${name}"], [data-name="${name}"]`)
  }

  public getQInput(name: string): Wrapper<Vue> {
    const el = this.getByName(name).element
      .parentElement!.parentElement!.parentElement!.parentElement as HTMLElement
    if (!el || !el.classList.contains('q-input')) {
      throw new Error('q-input not found')
    }

    return createWrapper(el.__vue__)
  }

  public getQSelect(name: string): Wrapper<Vue> {
    try {
      const el = this.getByName(name).element
        .parentElement!.parentElement!.parentElement!.parentElement as HTMLElement
      if (!el || !el.classList.contains('q-select')) {
        throw new Error('q-select not found')
      }

      return createWrapper(el.__vue__)
    } catch (e) {
      throw new Error('q-select not found')
    }
  }

  // tslint:disable-next-line:no-any
  public setInputValue(name: string, value: any): void {
    const input: Wrapper<Vue> = this.getInput(name)
    const el = input.element as HTMLInputElement
    el.value = value
    input.trigger('input')
  }

  // tslint:disable-next-line:no-any
  public setSelectValue(name: string, value: any): void {
    this.getQSelect(name).vm.$emit('input', value)
  }

  public getTextFromInput(name: string): string {
    const input = this.getInput(name).element as HTMLInputElement
    return input.value
  }

  public getIntFromInput(name: string): number {
    const input = this.getInput(name).element as HTMLInputElement
    return parseInt(input.value, 10)
  }

  public getValidationError(name: string): string {
    let childEl: HTMLElement = this.getByName(name).element as HTMLElement

    while (childEl.parentElement && !childEl.parentElement.classList.contains('q-field--error')) {
      childEl = childEl.parentElement
    }

    return createWrapper(childEl.parentElement!.__vue__).find('.q-field__bottom .q-field__messages').text()
  }

  public getQSelectChipValues(name: string): string[] {
    return this.wrapper.findAll('div[name="' + name + '"] .q-chip__content')
      .wrappers.map((wrp: Wrapper<Vue>): string => {
        return wrp.text()
      })
  }

  public getSelectValue(name: string): string {
    return this.wrapper.find('div[name="' + name + '"] ').text()
  }

  public getMultiSelectValue(name: string): string[] {
    return this.wrapper.find('div[name="' + name + '"]').text()
      .split(',')
      .map((v: string) => v.trim())
      .filter((v: string) => v !== '')
  }

  public toggleCheckbox(name: string = ''): Wrapper<Vue> {
    const qCheckBox = this.getByName(name)
    qCheckBox.find('.q-checkbox__native').trigger('click')
    return qCheckBox
  }

  public validateInputs(validatorCallbackName: string, expect: ChaiExpect, obj: { [_: string]: string }): void {
    for (const i of Object.keys(obj)) {
      // @ts-ignore
      expect(this[validatorCallbackName](i)).to.eql(obj[i])
    }
  }

  public validateForm(expect: ChaiExpect, formValues: { [_: string]: { [_: string]: string } }): void {
    const keyAndGetter: { [_: string]: string } = {
      qSelectChips: 'getQSelectChips',
      selectValue: 'getSelectValue',
      multiSelectValue: 'getMultiSelectValue',
      ints: 'getIntFromInput',
      texts: 'getTextFromInput',
    }
    for (const key of Object.keys(keyAndGetter)) {
      if (key in formValues) {
        this.validateInputs(keyAndGetter[key], expect, formValues[key])
      }
    }
  }

  public submitForm = async (name: string): Promise<void> => {
    // $nextTick because vee-validate can't read the password value otherwise
    // (it uses the initial value)
    await this.wrapper.vm.$nextTick()
    this.wrapper.find('[data-name="' + name + '"]').trigger('submit')

    // We do a flushPromisesTimeout so the validator is ready after submission
    return flushPromisesTimeout()
  }
}

export type IEWrapper<V extends Vue> = InstanceType<typeof EWrapper> & Wrapper<V>

function flushPromisesTimeout(): Promise<void> {
  return new Promise((resolve: () => void): void => {
    setTimeout(resolve)
  })
}
