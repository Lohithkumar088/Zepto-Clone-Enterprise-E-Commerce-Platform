import { useEffect, useRef, useState } from 'react'
import { departments } from '../data/catalog'
import { Icon } from './Icons'
import { useStore } from '../context/useStore'

export function Header({ activeDepartment, onDepartmentChange, onOpenAuth, onOpenAccount, onOpenCart, onOpenLocation, search, onSearchChange, onSearchSubmit, isAuthenticated }) {
  const { itemCount, location } = useStore()
  const [focused, setFocused] = useState(false)
  const searchRef = useRef(null)

  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        searchRef.current?.focus()
      }
      if (event.key === 'Escape') setFocused(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return <>
    <header className="site-header">
      <div className="header-main shell">
        <button className="brand" onClick={() => onDepartmentChange('all')} aria-label="Zepto home"><span>zepto</span><i>.</i></button>
        <button className="delivery-prompt" onClick={onOpenLocation}>
          <span className="delivery-title"><span className="bolt">ϟ</span> Delivery in minutes*</span>
          <span className="delivery-location">{location}<Icon name="chevron" size={14}/></span>
        </button>
        <form className={`search-box ${focused ? 'is-focused' : ''}`} onSubmit={(event) => { event.preventDefault(); onSearchSubmit(); setFocused(false) }}>
          <Icon name="search" size={22} />
          <input ref={searchRef} value={search} onFocus={() => setFocused(true)} onChange={(event) => onSearchChange(event.target.value)} placeholder={'Search for “milk”, “chips”, and more'} aria-label="Search products" />
          {search && <button type="button" className="search-clear" onClick={() => { onSearchChange(''); searchRef.current?.focus() }} aria-label="Clear search"><Icon name="close" size={17}/></button>}
          {!search && <kbd>⌘ K</kbd>}
        </form>
        <div className="header-actions">
          <button className="header-action" onClick={isAuthenticated ? onOpenAccount : onOpenAuth} aria-label={isAuthenticated ? 'Account' : 'Login'}>
            <Icon name="user" size={23}/><span>{isAuthenticated ? 'Account' : 'Login'}</span>
          </button>
          <button className="header-action cart-action" onClick={onOpenCart} aria-label={`Cart, ${itemCount} items`}>
            <span className="cart-icon-wrap"><Icon name="cart" size={24}/>{itemCount > 0 && <b>{itemCount}</b>}</span><span>Cart</span>
          </button>
        </div>
      </div>
      <nav className="department-nav" aria-label="Shop departments">
        <div className="department-track shell">
          {departments.map((department) => <button key={department.id} className={`department-link ${activeDepartment === department.id ? 'active' : ''}`} onClick={() => onDepartmentChange(department.id)}>
            <Icon name={department.icon} size={21}/><span>{department.label}</span>
          </button>)}
        </div>
      </nav>
    </header>
    {focused && search.length > 0 && <button className="search-dismiss" aria-label="Close search suggestions" onClick={() => setFocused(false)} />}
  </>
}

