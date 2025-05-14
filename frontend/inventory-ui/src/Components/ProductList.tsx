import type { Product } from '../types/Product'

type Props = {
  products?: Product[]  // 👈 optional
}

const ProductList = ({ products = [] }: Props) => {  // 👈 default value

  return (
    <div>
      <h2>📦 Current Products</h2>

      {products.length === 0 ? (
        <p style={{ color: 'gray' }}>No products yet.</p>
      ) : (
        <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#eee' }}>
              <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Name</th>
              <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>SKU</th>
              <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Stock</th>
              <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Reorder Level</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.productId}>
                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{p.name}</td>
                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{p.sku}</td>
                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{p.stock}</td>
                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{p.reorderLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ProductList
