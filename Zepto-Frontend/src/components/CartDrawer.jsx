import { useStore } from '../context/useStore'
import { Icon } from './Icons'

export function CartDrawer({ open, onClose, onBrowse, onCheckout }) {
  const { items, subtotal, setQuantity, clearCart } = useStore()
  if (!open) return null
  const deliveryFee = subtotal >= 299 || subtotal === 0 ? 0 : 25
  const total = subtotal + deliveryFee

  return <div className="overlay-layer" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Your cart">
      <div className="drawer-heading"><button className="icon-button back-button" onClick={onClose} aria-label="Close cart"><Icon name="chevron" size={20}/></button><h2>Your cart <span>{items.length ? `(${items.length})` : ''}</span></h2>{items.length > 0 && <button className="text-button clear-cart" onClick={clearCart}>Clear</button>}</div>
      {items.length === 0 ? <div className="empty-cart-wrap">
        <div className="empty-cart-card"><div className="empty-bag"><Icon name="bag" size={42}/><span>＋</span></div><h3>Your cart is empty</h3><p>Good things are just a few taps away.</p><button className="dark-button" onClick={onBrowse}>Browse products <Icon name="arrow" size={17}/></button></div>
        <div className="drawer-reassurance"><span>⚡</span><div><b>Delivered in minutes</b><small>Fresh picks, right to your door</small></div></div>
      </div> : <>
        <div className="delivery-progress"><div className="progress-copy"><span>🎉 You’re saving on delivery</span><small>{subtotal >= 299 ? 'Free delivery unlocked' : `Add ₹${299 - subtotal} more for free delivery`}</small></div><div className="progress-track"><i style={{ width: `${Math.min(100, subtotal / 299 * 100)}%` }}/></div></div>
        <div className="cart-items">{items.map(({ product, quantity }) => <div className="cart-row" key={product.id}>
          <div className="cart-thumb">{product.image && <img src={product.image} alt="" onError={(event) => { event.currentTarget.style.display = 'none' }}/>}<span>{product.emoji || '🛍️'}</span></div>
          <div className="cart-product-copy"><b>{product.name}</b><small>{product.unit}</small><strong>₹{(product.price * quantity).toLocaleString('en-IN')}</strong></div>
          <div className="add-control added-control cart-quantity"><button onClick={() => setQuantity(product, quantity - 1)} aria-label="Decrease quantity">−</button><span>{quantity}</span><button onClick={() => setQuantity(product, quantity + 1)} aria-label="Increase quantity">+</button></div>
        </div>)}</div>
        <div className="cart-summary"><div><span>Item total</span><b>₹{subtotal.toLocaleString('en-IN')}</b></div><div><span>Delivery fee</span><b>{deliveryFee ? `₹${deliveryFee}` : <i>FREE</i>}</b></div><div className="grand-total"><span>To pay</span><b>₹{total.toLocaleString('en-IN')}</b></div><button className="checkout-button" onClick={onCheckout}>Proceed to checkout <span>₹{total.toLocaleString('en-IN')}</span></button><small className="checkout-note">Secure checkout · Free delivery on orders over ₹299</small></div>
      </>}
    </aside>
  </div>
}

