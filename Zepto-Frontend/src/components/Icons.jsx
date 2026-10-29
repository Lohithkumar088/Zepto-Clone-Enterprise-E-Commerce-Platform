const paths = {
  bag: <><path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/><path d="M9 13h.01M15 13h.01"/></>,
  cup: <><path d="M5 5h13l-1 16H7L5 5Z"/><path d="M18 8h2a2 2 0 0 1 0 4h-2M9 2v1M14 2v1"/></>,
  home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v11h14V10M9 21v-7h6v7"/></>,
  toy: <><path d="M8 8 6 5M16 8l2-3M8 11a4 4 0 1 0 0 8h8a4 4 0 1 0 0-8H8Z"/><path d="M9 14v2M15 14v2"/></>,
  leaf: <><path d="M20 4c-8 0-14 3-14 10a6 6 0 0 0 6 6c7 0 8-8 8-16Z"/><path d="M4 21c3-5 6-8 12-11"/></>,
  headphones: <><path d="M3 13v-2a9 9 0 0 1 18 0v2"/><rect x="3" y="12" width="4" height="8" rx="2"/><rect x="17" y="12" width="4" height="8" rx="2"/></>,
  phone: <><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/></>,
  beauty: <><path d="M8 3h8l-1 5 4 3-2 10H7L5 11l4-3-1-5Z"/><path d="M9 8h6M10 13h4"/></>,
  shirt: <><path d="m8 4 4 2 4-2 6 4-3 4-2-1v10H7V11l-2 1-3-4 6-4Z"/></>,
  plus: <><path d="M12 3v18M3 12h18"/><circle cx="12" cy="12" r="9"/></>,
  search: <><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
  cart: <><path d="M3 4h2l2.3 11.3a2 2 0 0 0 2 1.7h8.8a2 2 0 0 0 2-1.6L22 8H6"/><circle cx="10" cy="21" r="1"/><circle cx="18" cy="21" r="1"/></>,
  pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  close: <><path d="m6 6 12 12M18 6 6 18"/></>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
  chevron: <path d="m7 10 5 5 5-5"/>,
  check: <path d="m5 12 4 4L19 6"/>,
  plusSign: <path d="M12 5v14M5 12h14"/>,
  minus: <path d="M5 12h14"/>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/>,
}

export function Icon({ name, size = 22, className = '', strokeWidth = 1.8 }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.bag}</svg>
}

