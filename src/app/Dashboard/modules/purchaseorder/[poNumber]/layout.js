
'use client'
import { PurchaseOrderDetailsProvider } from "context/PurchaseOrderDetailContext"


export default function PurchaseOrderLayout({ children }) {
  return (
    <PurchaseOrderDetailsProvider>
      {children}
    </PurchaseOrderDetailsProvider>
  )
}