import type { Product } from '../types/Product'

type Props = {
  products?: Product[]  // 👈 optional
  onEdit?: (product: Product) => void
  onDelete?: (id: number) => void
}

const ProductList = ({ products = [], onEdit, onDelete }: Props) => {

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
              {(onEdit || onDelete) && (
                <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.productId}>
                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{p.name}</td>
                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{p.sku}</td>
                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{p.stock}</td>
                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{p.reorderLevel}</td>
                {(onEdit || onDelete) && (
                  <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
                    {onEdit && (
                      <button onClick={() => onEdit(p)} style={{ marginRight: '0.5rem' }}>Edit</button>
                    )}
                    {onDelete && (
                      <button onClick={() => onDelete(p.productId)}>Delete</button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ProductList
