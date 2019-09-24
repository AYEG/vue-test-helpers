import { expect } from 'chai'
import { mockLocalStorage } from '../../src/local-storage-mock'

describe('local-storage-mock', () => {
  beforeEach(() => {
    mockLocalStorage()
  })

  it('can set and get an item', () => {
    window.localStorage.setItem('my_key', 'my value')

    expect(window.localStorage.getItem('my_key')).to.equal('my value')
  })

  it('can get the length of the storage', () => {
    window.localStorage.setItem('my_key1', 'my value1')
    window.localStorage.setItem('my_key2', 'my value2')

    expect(window.localStorage.length).to.equal(2)
  })

  it('can get clear the storage', () => {
    window.localStorage.setItem('my_key1', 'my value1')
    window.localStorage.setItem('my_key2', 'my value2')

    window.localStorage.clear()

    expect(window.localStorage.length).to.equal(0)
    expect(window.localStorage.getItem('my_key')).to.equal(null)
  })

  it('can can remove item from storage', () => {
    window.localStorage.setItem('my_key1', 'my value1')

    window.localStorage.removeItem('my_key')

    expect(window.localStorage.getItem('my_key')).to.equal(null)
  })

  it('can can get key index from storage', () => {
    window.localStorage.setItem('my_key1', 'my value1')
    window.localStorage.setItem('my_key2', 'my value2')

    expect(window.localStorage.key(0)).to.equal('my_key1')
    expect(window.localStorage.key(1)).to.equal('my_key2')
    expect(window.localStorage.key(2)).to.equal(null)
  })
})
