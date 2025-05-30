import type { Order } from '../types/Order'

interface Props {
  orders?: Order[]
}

const OrderList = ({ orders = [] }: Props) => {
  return (
    <div>
      <h2>📑 Orders</h2>
      {orders.length === 0 ? (
        <p style={{ color: 'gray' }}>No orders.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
          <thead>
            <tr style={{ background: '#eee' }}>
              <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Date</th>
              <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Product</th>
              <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.orderId}>
                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{new Date(o.orderDate).toLocaleString()}</td>
                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{o.product?.name ?? o.productId}</td>
                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{o.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default OrderList
