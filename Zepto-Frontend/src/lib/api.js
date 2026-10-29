const API_BASE = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '')

export function getStoredToken() {
  return localStorage.getItem('zepto-token')
}

export function getStoredIdentity() {
  const token = getStoredToken()
  if (!token) return ''
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(atob(payload)).sub || ''
  } catch {
    return ''
  }
}

async function request(path, options = {}) {
  const token = getStoredToken()
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  const text = await response.text()
  let payload = text
  try { payload = text ? JSON.parse(text) : null } catch { /* API may return plain text */ }
  if (!response.ok) {
    const message = typeof payload === 'string' ? payload : payload?.message || `Request failed (${response.status})`
    throw new Error(message)
  }
  return payload
}

export const api = {
  login: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (details) => request('/auth/register', { method: 'POST', body: JSON.stringify(details) }),
  products: () => request('/products'),
  categories: () => request('/categories'),
  search: (keyword) => request(`/products/search?keyword=${encodeURIComponent(keyword)}`),
}

export function mapApiProduct(product, categories = []) {
  const categoryName = product.categoryName || categories.find((category) => category.id === product.categoryId)?.name || 'Everyday essentials'
  const match = categoryName.toLowerCase()
  let department = 'all'
  if (/fruit|vegetable|fresh|produce/.test(match)) department = 'fresh'
  else if (/cafe|coffee|beverage/.test(match)) department = 'cafe'
  else if (/home|kitchen|clean|decor/.test(match)) department = 'home'
  else if (/toy|game/.test(match)) department = 'toys'
  else if (/audio|electronic|appliance/.test(match)) department = 'electronics'
  else if (/mobile|phone|tablet/.test(match)) department = 'mobiles'
  else if (/beauty|skin|makeup|hair/.test(match)) department = 'beauty'
  else if (/fashion|clothing|wear/.test(match)) department = 'fashion'
  else if (/health|pharmacy|medicine/.test(match)) department = 'pharmacy'
  return {
    id: String(product.id),
    name: product.name,
    brand: product.brand || 'Zepto picks',
    price: Number(product.discountPrice || product.price || 0),
    mrp: Number(product.price || 0),
    unit: product.unit || '1 pc',
    department,
    category: categoryName,
    image: product.imageUrl || '',
    emoji: '🛍️',
    color: '#f4effb',
    active: product.active !== false,
  }
}

