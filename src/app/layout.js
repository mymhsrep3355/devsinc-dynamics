'use client'

import { ChakraProviders } from "@/chakraProvider"
import { PurchaseOrderProvider } from "context/PurchaseOrderContext"
import { RefreshLoadingProvider } from "context/RefreshLoadingContext"
import { VendorsProvider } from "context/VendorsContext"


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ChakraProviders>
          <RefreshLoadingProvider>
            <VendorsProvider>
              <PurchaseOrderProvider>

                {children}
              </PurchaseOrderProvider>
            </VendorsProvider>
          </RefreshLoadingProvider>
        </ChakraProviders>
      </body>
    </html>
  )
}