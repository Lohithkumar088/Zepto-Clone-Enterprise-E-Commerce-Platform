import { useCallback, useEffect, useRef, useState } from 'react'
import { StoreProvider } from './context/StoreContext'
import { demoProducts } from './data/catalog'
import { getStoredIdentity, getStoredToken, api, mapApiProduct } from './lib/api'
import { Header } from './components/Header'
import { CartDrawer } from './components/CartDrawer'
import { AuthModal } from './components/AuthModal'
import { AccountModal } from './components/AccountModal'
import { LocationModal, ProductModal, CategoryPicker } from './components/Modals'
import { Footer } from './components/Footer'
import { Storefront } from './pages/Storefront'
import './App.css'

function StoreApp() {
  const [department, setDepartment] = useState('all')
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState(demoProducts)
  const [token, setToken] = useState(getStoredToken)
  const [catalogStatus, setCatalogStatus] = useState(() => getStoredToken() ? 'loading' : 'demo')
  const [authOpen, setAuthOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [locationOpen, setLocationOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [quickView, setQuickView] = useState(null)
  const [toast, setToast] = useState('')
  const toastTimer = useRef(null)

  const notify = useCallback((message) => {
    setToast(message)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(''), 3000)
  }, [])

  useEffect(() => () => window.clearTimeout(toastTimer.current), [])

  useEffect(() => {
    let cancelled = false
    if (!token) return undefined

    Promise.allSettled([api.products(), api.categories()]).then(([productsResult, categoriesResult]) => {
      if (cancelled) return
      if (productsResult.status !== 'fulfilled' || !Array.isArray(productsResult.value)) {
        setProducts(demoProducts)
        setCatalogStatus('fallback')
        notify('Could not load the live catalog. Showing preview products instead.')
        return
      }

      const apiCategories = categoriesResult.status === 'fulfilled' && Array.isArray(categoriesResult.value)
        ? categoriesResult.value
        : []
      const liveProducts = productsResult.value.map((product) => mapApiProduct(product, apiCategories))
      const liveNames = new Set(liveProducts.map((product) => product.name.trim().toLowerCase()))
      const combinedCatalog = [
        ...liveProducts,
        ...demoProducts.filter((product) => !liveNames.has(product.name.trim().toLowerCase())),
      ]
      setProducts(combinedCatalog)
      setCatalogStatus(combinedCatalog.length ? 'live' : 'empty')
    })

    return () => { cancelled = true }
  }, [token, notify])

  const chooseDepartment = (id) => {
    setDepartment(id)
    setSearch('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const chooseCategory = (name) => {
    setDepartment('all')
    setSearch(name)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const onAuthenticated = (newToken) => {
    setCatalogStatus('loading')
    setToken(newToken)
    notify('You’re signed in. Welcome to Zepto!')
  }
  const signOut = () => {
    localStorage.removeItem('zepto-token')
    setToken(null)
    setProducts(demoProducts)
    setCatalogStatus('demo')
    setAccountOpen(false)
    notify('You’ve signed out.')
  }

  useEffect(() => {
    const onKey = (event) => {
      if (event.key !== 'Escape') return
      setAuthOpen(false); setAccountOpen(false); setCartOpen(false); setLocationOpen(false); setCategoryOpen(false); setQuickView(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return <div className="app-shell">
    <Header activeDepartment={department} onDepartmentChange={chooseDepartment} onOpenAuth={() => setAuthOpen(true)} onOpenAccount={() => setAccountOpen(true)} onOpenCart={() => setCartOpen(true)} onOpenLocation={() => setLocationOpen(true)} search={search} onSearchChange={setSearch} onSearchSubmit={() => window.scrollTo({ top: 0, behavior: 'smooth' })} isAuthenticated={Boolean(token)} />
    <Storefront department={department} products={products} search={search} catalogStatus={catalogStatus} onProductOpen={setQuickView} onCategorySelect={chooseCategory} onDepartmentChange={chooseDepartment} onSeeAll={() => setCategoryOpen(true)} />
    <Footer onDepartmentChange={chooseDepartment} onCategorySelect={chooseCategory}/>
    <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} onBrowse={() => { setCartOpen(false); chooseDepartment('all') }} onCheckout={() => { setCartOpen(false); notify(token ? 'Checkout will be available when the order API is connected.' : 'Sign in is required before checkout.') ; if (!token) setAuthOpen(true) }} />
    <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onAuthenticated={onAuthenticated}/>
    <AccountModal open={accountOpen} identity={getStoredIdentity()} onClose={() => setAccountOpen(false)} onSignOut={signOut}/>
    <LocationModal open={locationOpen} onClose={() => setLocationOpen(false)}/>
    <ProductModal product={quickView} onClose={() => setQuickView(null)} onToast={notify}/>
    <CategoryPicker open={categoryOpen} onClose={() => setCategoryOpen(false)} onSelect={chooseCategory}/>
    {toast && <div className="toast-message" role="status"><span>✓</span>{toast}</div>}
  </div>
}

export default function App() {
  return <StoreProvider><StoreApp /></StoreProvider>
}
