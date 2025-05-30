import { useState } from 'react'
import axios from 'axios'
import { API_URL } from '../api'
import type { Product } from '../types/Product'

type Props = {
  products: Product[]
  onAdd: () => void
}

const OrderForm = ({ products, onAdd }: Props) => {
  const [form, setForm] = useState({ productId: products[0]?.productId ?? 0, quantity: 1 })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await axios.post(`${API_URL}/orders`, form)
    alert('✅ Order placed!')
    setForm({ productId: products[0]?.productId ?? 0, quantity: 1 })
    onAdd()
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
      <select value={form.productId} onChange={e => setForm(prev => ({ ...prev, productId: +e.target.value }))}>
        {products.map(p => (
          <option key={p.productId} value={p.productId}>{p.name}</option>
        ))}
      </select>
      <input type="number" value={form.quantity} onChange={e => setForm(prev => ({ ...prev, quantity: +e.target.value }))} />
      <button type="submit">Create Order</button>
    </form>
  )
}

export default OrderForm
