import { useStore } from '../context/useStore'

export function ProductCard({ product, onOpen }) {
  const { cart, addItem, setQuantity } = useStore()
  const quantity = cart[product.id]?.quantity || 0
  const savings = product.mrp > product.price ? Math.round((1 - product.price / product.mrp) * 100) : 0

  return <article className="product-card">
    <div className="product-media">
      <button className="product-image-button" onClick={() => onOpen(product)} aria-label={`View ${product.name}`}>
        <div className="product-art" style={{ '--product-bg': product.color || '#f4effb' }}>
          <span className="product-emoji" aria-hidden="true">{product.emoji || '🛍️'}</span>
          {product.badge && <span className="product-badge">{product.badge}</span>}
          {product.image && <img src={product.image} alt={product.name} loading="lazy" decoding="async" onError={(event) => { event.currentTarget.style.display = 'none' }} />}
        </div>
      </button>
      {quantity > 0 ? <div className="add-control added-control" aria-label={`${quantity} in cart`}>
        <button onClick={() => setQuantity(product, quantity - 1)} aria-label={`Remove one ${product.name}`}>−</button><span>{quantity}</span><button onClick={() => addItem(product)} aria-label={`Add one ${product.name}`}>+</button>
      </div> : <button className="add-control" onClick={() => addItem(product)} aria-label={`Add ${product.name} to cart`}>ADD</button>}
    </div>
    <div className="product-meta">
      <div className="price-line"><strong>₹{Number(product.price).toLocaleString('en-IN')}</strong>{product.mrp > product.price && <><del>₹{Number(product.mrp).toLocaleString('en-IN')}</del>{savings >= 10 && <em>{savings}% OFF</em>}</>}</div>
      <button className="product-name" onClick={() => onOpen(product)} title={product.name}>{product.name}</button>
      <span className="product-unit">{product.unit || '1 pc'}</span>
      {product.rating && <span className="product-rating">★ {product.rating} <small>({product.reviews || '120'})</small></span>}
    </div>
  </article>
}

