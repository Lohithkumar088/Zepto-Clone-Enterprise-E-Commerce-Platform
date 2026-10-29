import { useCallback, useEffect, useMemo, useState } from 'react'
import { CART_KEY, readCart, StoreContext } from './store'

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(readCart)
  const [location, setLocation] = useState(() => localStorage.getItem('zepto-location') || 'Select location')

  useEffect(() => localStorage.setItem(CART_KEY, JSON.stringify(cart)), [cart])
  useEffect(() => localStorage.setItem('zepto-location', location), [location])

  const addItem = useCallback((product) => setCart((current) => ({ ...current, [product.id]: { product, quantity: (current[product.id]?.quantity || 0) + 1 } })), [])
  const setQuantity = useCallback((product, quantity) => setCart((current) => {
    const next = { ...current }
    if (quantity <= 0) delete next[product.id]
    else next[product.id] = { product, quantity }
    return next
  }), [])
  const clearCart = useCallback(() => setCart({}), [])

  const value = useMemo(() => {
    const items = Object.values(cart)
    return {
      cart,
      items,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      addItem,
      setQuantity,
      clearCart,
      location,
      setLocation,
    }
  }, [cart, addItem, setQuantity, clearCart, location])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

