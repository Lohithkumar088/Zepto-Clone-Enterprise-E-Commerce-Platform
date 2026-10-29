import { useState } from 'react'
import { api } from '../lib/api'
import { Icon } from './Icons'

export function AuthModal({ open, onClose, onAuthenticated }) {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  if (!open) return null

  const change = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  const submit = async (event) => {
    event.preventDefault()
    setBusy(true); setError(''); setMessage('')
    try {
      const payload = mode === 'login'
        ? await api.login({ email: form.email, password: form.password })
        : await api.register({ firstName: form.firstName, lastName: form.lastName, email: form.email, phone: form.phone, password: form.password })
      const token = payload?.message || payload?.token
      if (token) {
        localStorage.setItem('zepto-token', token)
        onAuthenticated(token)
        onClose()
      } else if (mode === 'register') {
        setMessage(payload?.message || 'Account created. Please sign in.')
        setMode('login')
      } else setError('The server response did not include a sign-in token.')
    } catch (err) {
      setError(err.message.includes('Failed to fetch') ? 'Could not reach the Zepto server. Make sure the backend is running on port 8080.' : err.message)
    } finally { setBusy(false) }
  }

  return <div className="modal-scrim" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <div className="auth-story"><span className="brand auth-brand"><span>zepto</span><i>.</i></span><h2>Everything<br/>you need,<br/><b>in minutes.</b></h2><div className="auth-illustration" aria-hidden="true"><span className="story-sun"/><span className="story-bag">Z</span><span className="story-fruit fruit-one">🍊</span><span className="story-fruit fruit-two">🥑</span><span className="story-sparkle">✦</span></div><small>Good things happen fast.</small></div>
      <div className="auth-form-panel"><button className="modal-close" onClick={onClose} aria-label="Close"><Icon name="close" size={20}/></button>
        <div className="auth-heading"><span className="eyebrow">WELCOME TO ZEPTO</span><h2 id="auth-title">{mode === 'login' ? 'Sign in to continue' : 'Create your account'}</h2><p>{mode === 'login' ? 'Your next quick delivery is just a sign-in away.' : 'Join us for a faster, fresher everyday.'}</p></div>
        {message && <div className="form-notice success-notice">{message}</div>}{error && <div className="form-notice error-notice">{error}</div>}
        <form className="auth-form" onSubmit={submit}>
          {mode === 'register' && <div className="form-name-row"><label>First name<input autoComplete="given-name" name="firstName" value={form.firstName} onChange={change} required /></label><label>Last name<input autoComplete="family-name" name="lastName" value={form.lastName} onChange={change} required /></label></div>}
          <label>Email address<div className="input-with-icon"><span>✉</span><input autoComplete="email" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={change} required /></div></label>
          {mode === 'register' && <label>Phone number<input autoComplete="tel" inputMode="tel" name="phone" placeholder="10-digit mobile number" value={form.phone} onChange={change} required /></label>}
          <label>Password<input autoComplete={mode === 'login' ? 'current-password' : 'new-password'} type="password" name="password" placeholder="At least 6 characters" minLength="6" value={form.password} onChange={change} required /></label>
          <button className="auth-submit" type="submit" disabled={busy}>{busy ? <span className="button-spinner"/> : mode === 'login' ? 'Continue' : 'Create account'}</button>
        </form>
        <p className="auth-switch">{mode === 'login' ? 'New to Zepto?' : 'Already have an account?'} <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); setMessage('') }}>{mode === 'login' ? 'Create an account' : 'Sign in'}</button></p>
        <p className="legal-copy">By continuing, you agree to our <a href="#terms" onClick={(event) => event.preventDefault()}>Terms of Use</a> and <a href="#privacy" onClick={(event) => event.preventDefault()}>Privacy Policy</a>.</p>
        <div className="app-promo"><span>📲</span><p><b>Order faster & easier</b><small>Get the Zepto experience on the go</small></p><span className="promo-arrow">↗</span></div>
      </div>
    </section>
  </div>
}

