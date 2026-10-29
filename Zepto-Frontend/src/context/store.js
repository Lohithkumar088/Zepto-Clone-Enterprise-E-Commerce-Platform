import { createContext } from 'react'

export const StoreContext = createContext(null)
export const CART_KEY = 'zepto-demo-cart'

export function readCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || '{}') } catch { return {} }
}
