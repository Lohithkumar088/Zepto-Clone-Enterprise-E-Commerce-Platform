import { categories } from '../data/catalog'

const cityLinks = 'Agra · Ahmedabad · Amritsar · Bengaluru · Chandigarh · Chennai · Coimbatore · Delhi · Faridabad · Ghaziabad · Gurugram · Hyderabad · Indore · Jaipur · Kochi · Kolkata · Lucknow · Mumbai · Mysuru · Nagpur · Noida · Pune · Surat · Vadodara'.split(' · ')

export function Footer({ onDepartmentChange, onCategorySelect }) {
  return <footer className="site-footer"><div className="shell">
    <section className="footer-top"><div className="footer-brand-column"><div className="footer-logo">zepto<span>.</span></div><p>Groceries and everyday essentials<br/>delivered in minutes.</p><div className="social-links"><a href="#instagram" aria-label="Instagram">ig</a><a href="#x" aria-label="X">𝕏</a><a href="#linkedin" aria-label="LinkedIn">in</a></div><small>© 2026 Zepto Marketplace Private Limited</small></div>
      <div className="footer-link-group"><h3>Explore</h3><button onClick={() => onDepartmentChange('all')}>Home</button><button onClick={() => onCategorySelect('Fruits & Vegetables')}>Fresh produce</button><button onClick={() => onDepartmentChange('cafe')}>Zepto Cafe</button><button onClick={() => onDepartmentChange('home')}>Home store</button><button onClick={() => onDepartmentChange('beauty')}>Beauty store</button></div>
      <div className="footer-link-group"><h3>Need help?</h3><a href="mailto:support@zepto.example">Customer support</a><a href="#delivery" onClick={(event) => event.preventDefault()}>Delivery areas</a><a href="#terms" onClick={(event) => event.preventDefault()}>Terms of use</a><a href="#privacy" onClick={(event) => event.preventDefault()}>Privacy policy</a></div>
      <div className="app-download-card"><span className="download-icon">↗</span><div><b>Good things happen fast.</b><small>Shop the Zepto experience on the go.</small></div><button aria-label="App store information">Get the app <span>→</span></button></div>
    </section>
    <section className="footer-categories"><h3>Popular categories</h3><div>{categories.slice(0, 15).map((category, index) => <span key={`${category.name}-${index}`}><button onClick={() => onCategorySelect(category.name)}>{category.name}</button>{index < 14 && <i>·</i>}</span>)}</div></section>
    <section className="footer-cities"><h3>We deliver across India</h3><p>{cityLinks.map((city, index) => <span key={city}><button onClick={() => onDepartmentChange('all')}>{city}</button>{index < cityLinks.length - 1 && <i>·</i>}</span>)}</p></section>
    <div className="footer-bottom"><span>Made for your everyday.</span><span>Prices and availability may vary by location.</span><a href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Back to top ↑</a></div>
  </div></footer>
}

