import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../api'
import type { Product } from '../types/Product'
import type { Order } from '../types/Order'
import ProductForm from '../Components/ProductForm'
import ProductList from '../Components/ProductList'
import OrderForm from '../Components/OrderForm'
import OrderList from '../Components/OrderList'

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [orders, setOrders] = useState<Order[]>([])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await axios.get<Product[]>(`${API_URL}/products`)
      setProducts(res.data)
    } catch (err) {
      console.error('❌ Failed to fetch products', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchOrders = async () => {
    const res = await axios.get<Order[]>(`${API_URL}/orders`)
    setOrders(res.data)
  }

  useEffect(() => {
    fetchProducts()
    fetchOrders()
  }, [])

  const handleProductAdded = () => {
    fetchProducts()
  }

  const handleOrderAdded = () => {
    fetchOrders()
    fetchProducts()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this product?')) return
    await axios.delete(`${API_URL}/products/${id}`)
    fetchProducts()
  }

  const handleEdit = async (p: Product) => {
    const name = prompt('Name', p.name)
    if (name === null) return
    const sku = prompt('SKU', p.sku)
    if (sku === null) return
    const stock = prompt('Stock', String(p.stock))
    if (stock === null) return
    const reorderLevel = prompt('Reorder Level', String(p.reorderLevel))
    if (reorderLevel === null) return

    await axios.put(`${API_URL}/products/${p.productId}`, {
      productId: p.productId,
      name,
      sku,
      stock: +stock,
      reorderLevel: +reorderLevel
    })
    fetchProducts()
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🧾 Inventory Dashboard</h1>

      <ProductForm onAdd={handleProductAdded} />

      <input
        placeholder="Search"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: '1rem', padding: '0.5rem' }}
      />

      <hr />

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <ProductList products={filtered} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <hr />

      <OrderForm products={products} onAdd={handleOrderAdded} />
      <OrderList orders={orders} />
    </div>
  )
}

export default Dashboard
