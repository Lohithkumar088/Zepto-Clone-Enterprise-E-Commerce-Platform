import { useMemo, useRef } from 'react'
import { categories, departmentContent } from '../data/catalog'
import { ProductCard } from '../components/ProductCard'
import { Icon } from '../components/Icons'

function ProductRow({ title, products, onProductOpen, onSeeAll, accent = false }) {
  const rowRef = useRef(null)
  if (!products.length) return null
  return <section className="product-section">
    <div className="section-heading"><div><h2>{title}</h2><p>Picked for your everyday</p></div><button className="see-all" onClick={onSeeAll}>See all <Icon name="arrow" size={16}/></button></div>
    <div className={`product-row-wrap ${accent ? 'accent-row' : ''}`}>
      <div className="product-row" ref={rowRef}>{products.map((product, index) => <ProductCard key={`${title}-${product.id}-${index}`} product={product} onOpen={onProductOpen}/>)}</div>
      {products.length > 4 && <><button className="row-arrow row-arrow-left" onClick={() => rowRef.current?.scrollBy({ left: -Math.max(rowRef.current.clientWidth * 0.85, 320), behavior: 'smooth' })} aria-label="Scroll products left">‹</button><button className="row-arrow row-arrow-right" onClick={() => rowRef.current?.scrollBy({ left: Math.max(rowRef.current.clientWidth * 0.85, 320), behavior: 'smooth' })} aria-label="Scroll products right">›</button></>}
    </div>
  </section>
}

function HeroBanners({ department, onShop }) {
  if (department === 'all') return <section className="hero-banners">
    <button className="hero-banner hero-fees" onClick={onShop}>
      <div className="banner-heading"><span className="mini-logo">zepto<span>.</span></span><span className="banner-pill">A little more value, every day</span></div>
      <h1>All the good stuff.<br/><b>None of the extra.</b></h1>
      <div className="fee-benefits"><span><i>✓</i> ₹0 handling fee</span><span><i>✓</i> Free delivery offers</span><span><i>✓</i> Everyday low prices</span></div>
      <div className="banner-art banner-art-grocery" aria-hidden="true"><span>🥬</span><span>🍓</span><span>🥑</span><span>🥖</span><span>🍊</span><b>FRESH<br/>PICKS</b></div>
    </button>
    <button className="hero-banner hero-cafe" onClick={() => onShop('cafe')}>
      <div className="cafe-orbit" aria-hidden="true"><span>☕</span><span>🥐</span><span>🍪</span></div><div className="cafe-copy"><span className="banner-pill">GOOD MOOD, ON THE WAY</span><h2>Your cafe<br/>favourites,<br/><b>made fresh.</b></h2><span className="banner-cta">Order now <Icon name="arrow" size={18}/></span></div>
    </button>
  </section>

  const className = `hero-banner department-hero department-hero-${department}`
  const content = {
    cafe: ['A little joy,', 'made fresh.', 'Coffee, comfort food and treats from the Zepto Cafe.'],
    home: ['Make room', 'for comfort.', 'Everyday finds to make your space feel like you.'],
    toys: ['Make today', 'playful.', 'Big smiles and little adventures, delivered fast.'],
    fresh: ['Freshness you', 'can taste.', 'Picked with care and delivered fresh to your door.'],
    electronics: ['A smarter', 'everyday.', 'Useful tech and everyday accessories, all nearby.'],
    mobiles: ['Your next', 'upgrade.', 'Phones and accessories that keep you connected.'],
    beauty: ['A little care,', 'a lot of glow.', 'Everyday beauty favourites, handpicked for you.'],
    fashion: ['Your style,', 'your moment.', 'Easy everyday looks, delivered on your schedule.'],
    pharmacy: ['Feel good,', 'every day.', 'Wellness essentials and everyday care, made easy.'],
  }[department] || ['Good things,', 'delivered fast.', 'Explore favourites for your everyday.']
  const emoji = { cafe: '☕', home: '🪴', toys: '🧸', fresh: '🍊', electronics: '🎧', mobiles: '📱', beauty: '✨', fashion: '👟', pharmacy: '🌿' }[department]
  return <section className="department-hero-wrap"><div className={className}>
    <div className="department-hero-copy"><span className="banner-pill">MADE FOR YOUR EVERYDAY</span><h1>{content[0]}<br/><b>{content[1]}</b></h1><p>{content[2]}</p><button className="banner-cta" onClick={() => onShop()} >Explore now <Icon name="arrow" size={18}/></button></div>
    <div className="department-hero-art" aria-hidden="true"><div className="hero-art-disc disc-one"/><div className="hero-art-disc disc-two"/><span>{emoji}</span><small>GOOD<br/>THINGS</small></div>
  </div></section>
}

function CategoryStrip({ title, items, onSelect, seeAll }) {
  if (!items.length) return null
  return <section className="category-section"><div className="section-heading category-heading"><div><h2>{title}</h2><p>Explore the things you love</p></div><button className="see-all" onClick={seeAll}>See all <Icon name="arrow" size={16}/></button></div>
    <div className="category-grid">{items.slice(0, 12).map((category, index) => <button className="category-tile" key={`${category.name}-${index}`} onClick={() => onSelect(category.name)}>
      <span className={`category-image ${category.image ? '' : 'no-tile-image'}`} style={{ '--tile-color': ['#f4effb', '#edf5eb', '#fff3e6', '#eef4fa'][index % 4] }}>{category.image && <img loading="lazy" decoding="async" src={`https://images.unsplash.com/${category.image}?auto=format&fit=crop&w=360&q=82`} alt="" onError={(event) => { event.currentTarget.style.display = 'none' }}/>}<i>{category.icon}</i></span><b>{category.name}</b>
    </button>)}</div>
  </section>
}

function DepartmentCategoryTiles({ department, onSelect }) {
  const tiles = {
    cafe: ['All-day breakfast', 'Beverages', 'Desserts', 'Value combos', 'Korean noodles', 'Snack time', 'Chai corner'],
    home: ['Kitchen & dining', 'Decor & furnishing', 'Bath & wellness', 'Cleaning & storage'],
    toys: ['Toys & games', 'Sports & activities', 'Building sets', 'Creative play'],
    fresh: ['Season’s best', 'Low prices on exotics', 'Leafy greens', 'Fresh vegetables'],
    electronics: ['Audio store', 'Kitchen appliances', 'Home appliances', 'Personal care'],
    mobiles: ['Apple', 'Motorola', 'Samsung', 'OnePlus', 'Oppo', 'Nokia'],
    beauty: ['Makeup', 'Skin care', 'Hair care', 'Bath & body', 'Fragrance'],
    fashion: ['Men', 'Women', 'Accessories', 'Innerwear', 'Footwear', 'Kids'],
    pharmacy: ['Fever, cough & cold', 'Vitamins & supplements', 'Pain relief & first aid', 'Everyday wellness'],
  }[department] || []
  const departmentCategories = categories.filter((category) => category.department === department)
  const tileImages = departmentCategories.length ? departmentCategories : tiles.map((name, index) => ({ name, icon: ['✦', '🌿', '🛍️', '✨'][index % 4], image: '' }))
  return <section className={`department-categories department-categories-${department}`}>
    {department === 'mobiles' && <div className="brand-tiles">{tiles.map((brand) => <button key={brand} onClick={() => onSelect(brand)}><span>{brand.slice(0, 1)}</span><b>{brand}</b></button>)}</div>}
    {department === 'fashion' && <div className="fashion-tiles">{tileImages.map((tile) => <button key={tile.name} onClick={() => onSelect(tile.name)}><span>{tile.icon}</span><b>{tile.name}</b></button>)}</div>}
    {department !== 'mobiles' && department !== 'fashion' && <div className="department-tile-row">{tileImages.slice(0, 7).map((tile, index) => <button key={`${tile.name}-${index}`} onClick={() => onSelect(tile.name)}><span className={`department-tile-image ${tile.image ? '' : 'no-tile-image'}`}>{tile.image && <img loading="lazy" decoding="async" src={`https://images.unsplash.com/${tile.image}?auto=format&fit=crop&w=300&q=82`} alt="" onError={(event) => { event.currentTarget.style.display = 'none' }}/>}<i>{tile.icon}</i></span><b>{tile.name}</b></button>)}</div>}
  </section>
}

export function Storefront({ department, products, search, catalogStatus, onProductOpen, onCategorySelect, onDepartmentChange, onSeeAll }) {
  const normalizedSearch = search.trim().toLowerCase()
  const visible = useMemo(() => products.filter((product) => {
    if (product.active === false) return false
    if (normalizedSearch) return `${product.name} ${product.brand} ${product.category}`.toLowerCase().includes(normalizedSearch)
    return department === 'all' || product.department === department
  }), [products, department, normalizedSearch])
  const copy = departmentContent[department] || departmentContent.all

  const categoryTiles = useMemo(() => department === 'all'
    ? categories.filter((category) => category.department === 'all').slice(0, 20)
    : categories.filter((category) => category.department === department), [department])

  const sections = useMemo(() => {
    if (normalizedSearch) return visible.length ? [{ title: `Search results for “${search.trim()}”`, products: visible }] : []
    if (department === 'all') {
      const groups = [
        ['Popular near you', ['Fruits & Vegetables', 'Dairy, Bread & Eggs', 'Munchies', 'Sweet Cravings', 'Cold Drinks & Juices']],
        ['Fresh picks for today', ['Fruits & Vegetables']],
        ['Daily essentials', ['Dairy, Bread & Eggs', 'Atta, Rice, Oil & Dals', 'Cleaning & Storage']],
        ['Sweet treats & snacks', ['Munchies', 'Sweet Cravings', 'Ice Creams & More', 'Biscuits']],
      ]
      return [
        { title: `All products · ${visible.length}`, products: visible },
        ...groups.map(([title, names], index) => ({
        title,
        products: visible.filter((product) => names.some((name) => product.category?.toLowerCase().includes(name.toLowerCase())) || (index === 0 && product.department === 'all')),
        })),
      ].filter((section) => section.products.length)
    }
    if (!visible.length) return []
    const rowCount = Math.min(copy.sections.length, Math.ceil(visible.length / 8))
    const productsPerRow = Math.ceil(visible.length / rowCount)
    return copy.sections.slice(0, rowCount).map((title, index) => ({
      title,
      products: visible.slice(index * productsPerRow, (index + 1) * productsPerRow),
    })).filter((section) => section.products.length)
  }, [department, visible, normalizedSearch, search, copy.sections])

  return <main className="store-main shell" id="top">
    {!normalizedSearch && <>
      <HeroBanners department={department} onShop={(target) => target ? onDepartmentChange(target) : document.getElementById('shop-sections')?.scrollIntoView({ behavior: 'smooth' })}/>
      {department === 'all'
        ? <CategoryStrip title="Shop by category" items={categoryTiles} onSelect={onCategorySelect} seeAll={onSeeAll}/>
        : <DepartmentCategoryTiles department={department} onSelect={onCategorySelect}/>}
    </>}
    {normalizedSearch && <div className="search-results-intro"><span className="eyebrow">FIND YOUR FAVOURITES</span><h1>Results for <b>“{search.trim()}”</b></h1><p>{visible.length ? `${visible.length} great finds, delivered in minutes.` : 'We couldn’t find a match just yet. Try another search.'}</p></div>}
    {!normalizedSearch && department === 'all' && <div className="promo-ribbon"><span className="ribbon-star">✦</span><span>Everyday favourites, right around the corner.</span><button onClick={() => onDepartmentChange('fresh')}>Explore fresh picks <Icon name="arrow" size={15}/></button></div>}
    <div id="shop-sections" className="product-sections">{sections.length ? sections.map((section, index) => <ProductRow key={`${department}-${section.title}`} title={section.title} products={section.products} onProductOpen={onProductOpen} onSeeAll={() => onSeeAll(section.title)} accent={index === 0 && department === 'fresh'}/>) : <div className="no-search-results"><span>🔎</span><h2>{normalizedSearch ? 'No products found' : catalogStatus === 'empty' ? 'Your catalog is empty' : 'No products in this department yet'}</h2><p>{catalogStatus === 'loading' ? 'Loading products from the catalog…' : catalogStatus === 'empty' ? 'Add products to the backend catalog to show live inventory here.' : normalizedSearch ? 'Try a different spelling or browse a category.' : 'Browse the rest of the store while we add more products here.'}</p><button className="dark-button" onClick={() => onDepartmentChange('all')}>Browse all products</button></div>}</div>
    {!normalizedSearch && <section className="editorial-strip"><div><span className="eyebrow">A LITTLE SOMETHING FOR EVERY DAY</span><h2>More time for<br/><b>the good stuff.</b></h2><p>From pantry staples to little pick-me-ups, find your new favourites in one quick stop.</p><button onClick={() => onDepartmentChange('all')}>Explore the store <Icon name="arrow" size={17}/></button></div><div className="editorial-art" aria-hidden="true"><span>🥑</span><span>🍊</span><span>🥖</span><span>🥛</span><b>your<br/>everyday<br/>edit</b></div></section>}
  </main>
}

