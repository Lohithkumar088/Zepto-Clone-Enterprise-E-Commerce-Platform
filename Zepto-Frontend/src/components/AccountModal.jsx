import { Icon } from './Icons'

export function AccountModal({ open, identity, onClose, onSignOut }) {
  if (!open) return null

  return <div className="modal-scrim account-scrim" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="account-modal" role="dialog" aria-modal="true" aria-labelledby="account-heading">
      <button className="modal-close" onClick={onClose} aria-label="Close"><Icon name="close" size={19}/></button>
      <span className="account-avatar"><Icon name="user" size={27}/></span>
      <span className="eyebrow">YOUR ZEPTO ACCOUNT</span>
      <h2 id="account-heading">You’re signed in</h2>
      <p className="account-identity">{identity || 'Your account is active on this device.'}</p>
      <div className="account-status"><span>✓</span><div><b>Account connected</b><small>Your saved cart and location are available on this device.</small></div></div>
      <button className="account-signout" onClick={onSignOut}>Sign out</button>
    </section>
  </div>
}
