export interface Order {
  orderId: number
  productId: number
  quantity: number
  orderDate: string
  product?: import('./Product').Product
}
