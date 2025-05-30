import { useState } from 'react'
import axios from 'axios'
import { API_URL } from '../api'
import type { Product } from '../types/Product'

type Props = {
  onAdd: () => void
}

const ProductForm = ({ onAdd }: Props) => {
  const [form, setForm] = useState<Omit<Product, 'productId'>>({
    name: '',
    sku: '',
    stock: 0,
    reorderLevel: 0
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: name === 'stock' || name === 'reorderLevel' ? +value : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post(`${API_URL}/products`, form)
      alert('✅ Product added!')
      setForm({ name: '', sku: '', stock: 0, reorderLevel: 0 })
      onAdd() // 🔁 trigger parent to refetch product list
    } catch (err) {
      console.error('❌ Failed to add product', err)
      alert('❌ Failed to add product')
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Product Name"
        required
      />
      <input
        name="sku"
        value={form.sku}
        onChange={handleChange}
        placeholder="SKU"
        required
      />
      <input
        name="stock"
        value={form.stock}
        onChange={handleChange}
        placeholder="Stock"
        type="number"
        required
      />
      <input
        name="reorderLevel"
        value={form.reorderLevel}
        onChange={handleChange}
        placeholder="Reorder Level"
        type="number"
        required
      />
      <button type="submit" style={{ padding: '0.75rem 1.5rem' }}>➕ Add Product</button>
    </form>
  )
}

export default ProductForm
