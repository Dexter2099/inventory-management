import { useEffect, useState } from 'react'
import axios from 'axios'
import type { Product } from '../types/Product'
import ProductForm from '../Components/ProductForm'
import ProductList from '../Components/ProductList'

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await axios.get<Product[]>('http://localhost:5204/api/products')
      setProducts(res.data)
    } catch (err) {
      console.error('❌ Failed to fetch products', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleProductAdded = () => {
    fetchProducts()
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🧾 Inventory Dashboard</h1>

      <ProductForm onAdd={handleProductAdded} />

      <hr />

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  )
}

export default Dashboard
