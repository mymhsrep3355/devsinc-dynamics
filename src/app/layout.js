'use client'

import { ChakraProviders } from "@/chakraProvider"
import { PurchaseOrderPostProvider } from "context/CreatePurchaseOrderContext"
import { LocationsProvider } from "context/LocationsContext"
import { PurchaseOrderProvider } from "context/PurchaseOrderContext"
import { RefreshLoadingProvider } from "context/RefreshLoadingContext"
import { TermsProvider } from "context/TermsContext"
import { VendorsProvider } from "context/VendorsContext"


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ChakraProviders>
          <RefreshLoadingProvider>
            <VendorsProvider>
              <PurchaseOrderPostProvider>
                <PurchaseOrderProvider>
                  <LocationsProvider>
                    <TermsProvider>
                      {children}
                    </TermsProvider>
                  </LocationsProvider>
                </PurchaseOrderProvider>
              </PurchaseOrderPostProvider>
            </VendorsProvider>
          </RefreshLoadingProvider>
        </ChakraProviders>
      </body>
    </html>
  )
}