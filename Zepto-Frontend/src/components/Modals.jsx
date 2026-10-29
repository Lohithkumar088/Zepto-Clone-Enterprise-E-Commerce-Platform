import { useMemo, useState } from 'react'
import { categories } from '../data/catalog'
import { useStore } from '../context/useStore'
import { Icon } from './Icons'

const cities = ['Bengaluru', 'Chennai', 'Delhi', 'Gurugram', 'Hyderabad', 'Jaipur', 'Kolkata', 'Mumbai', 'Noida', 'Pune']

export function LocationModal({ open, onClose }) {
  const { location, setLocation } = useStore()
  const [query, setQuery] = useState('')
  const results = useMemo(() => cities.filter((city) => city.toLowerCase().includes(query.toLowerCase())), [query])
  if (!open) return null
  return <div className="modal-scrim location-scrim" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="location-modal" role="dialog" aria-modal="true" aria-labelledby="location-heading">
      <button className="modal-close" onClick={onClose} aria-label="Close"><Icon name="close" size={19}/></button>
      <span className="location-pin"><Icon name="pin" size={24}/></span><span className="eyebrow">DELIVERING NEAR YOU</span><h2 id="location-heading">Where should we deliver?</h2><p>Choose your city to see what’s fresh and available nearby.</p>
      <label className="location-search"><Icon name="search" size={19}/><input autoFocus placeholder="Search your city" value={query} onChange={(event) => setQuery(event.target.value)}/></label>
      <div className="city-options">{results.length ? results.map((city) => <button key={city} className={location.startsWith(city) ? 'selected' : ''} onClick={() => { setLocation(city); onClose() }}><span><Icon name="pin" size={17}/>{city}</span>{location.startsWith(city) && <Icon name="check" size={18}/>}</button>) : <p className="no-cities">No matching cities. Try another name.</p>}</div>
      <small className="location-note">We’re adding new delivery areas every day.</small>
    </section>
  </div>
}

export function ProductModal({ product, onClose, onToast }) {
  const { cart, addItem, setQuantity } = useStore()
  if (!product) return null
  const quantity = cart[product.id]?.quantity || 0
  const discount = product.mrp > product.price ? Math.round((1 - product.price / product.mrp) * 100) : 0
  return <div className="modal-scrim product-scrim" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="product-modal" role="dialog" aria-modal="true" aria-label={product.name}>
      <button className="modal-close" onClick={onClose} aria-label="Close"><Icon name="close" size={20}/></button>
      <div className="detail-image" style={{ '--product-bg': product.color || '#f4effb' }}>{product.badge && <span className="product-badge">{product.badge}</span>}{product.image && <img src={product.image} alt={product.name} onError={(event) => { event.currentTarget.style.display = 'none' }}/>}<span className="detail-emoji">{product.emoji || '🛍️'}</span></div>
      <div className="detail-info"><span className="eyebrow">{product.brand || 'ZEPTO PICKS'}</span><h2>{product.name}</h2><p>{product.category || 'Everyday essentials'} · {product.unit || '1 pc'}</p><div className="detail-rating"><span>★</span> 4.6 <small>· 1.2k ratings</small></div><div className="detail-price"><b>₹{Number(product.price).toLocaleString('en-IN')}</b>{product.mrp > product.price && <><del>₹{Number(product.mrp).toLocaleString('en-IN')}</del><em>{discount}% OFF</em></>}</div><p className="detail-delivery"><Icon name="clock" size={18}/> Delivery in minutes to your location</p><div className="detail-bottom">{quantity ? <div className="add-control added-control detail-quantity"><button onClick={() => setQuantity(product, quantity - 1)} aria-label="Decrease quantity">−</button><span>{quantity}</span><button onClick={() => addItem(product)} aria-label="Increase quantity">+</button></div> : <button className="auth-submit" onClick={() => addItem(product)}>Add to cart · ₹{Number(product.price).toLocaleString('en-IN')}</button>}<button className="text-button continue-shopping" onClick={() => { onClose(); onToast('Added to cart — ready when you are.') }}>Continue shopping</button></div></div>
    </section>
  </div>
}

export function CategoryPicker({ open, onClose, onSelect }) {
  if (!open) return null
  const visible = categories.filter((category) => category.department === 'all')
  return <div className="modal-scrim" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="category-modal" role="dialog" aria-modal="true" aria-labelledby="category-modal-title"><button className="modal-close" onClick={onClose} aria-label="Close"><Icon name="close" size={20}/></button><span className="eyebrow">EXPLORE THE AISLES</span><h2 id="category-modal-title">Shop by category</h2><div className="category-modal-grid">{visible.map((category) => <button key={category.name} onClick={() => { onSelect(category.name); onClose() }}><span>{category.icon}</span><b>{category.name}</b></button>)}</div></section>
  </div>
}

