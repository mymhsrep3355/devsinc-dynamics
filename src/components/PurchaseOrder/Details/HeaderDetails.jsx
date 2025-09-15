'use client'

import { Grid, GridItem, Text } from '@chakra-ui/react'

export default function HeaderDetails({ purchaseOrderDetails }) {
    return (
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            <GridItem>
                <Text fontWeight="semibold">Purchase Order</Text>
                <Text>{purchaseOrderDetails?.PurchaseOrderNumber}</Text>

                <Text fontWeight="semibold" mt={4}>Vendor Account</Text>
                <Text>{purchaseOrderDetails?.OrderVendorAccountNumber}</Text>

                <Text fontWeight="semibold" mt={4}>Invoice Account</Text>
                <Text>{purchaseOrderDetails?.InvoiceVendorAccountNumber}</Text>
            </GridItem>

            <GridItem>
                <Text fontWeight="semibold">PO Status</Text>
                <Text>{purchaseOrderDetails?.PurchaseOrderStatus}</Text>

                <Text fontWeight="semibold" mt={4}>Approval Status</Text>
                <Text>{purchaseOrderDetails?.DocumentApprovalStatus}</Text>

                <Text fontWeight="semibold" mt={4}>Invoice Type</Text>
                <Text>{purchaseOrderDetails?.InvoiceType}</Text>
            </GridItem>

            <GridItem>
                <Text fontWeight="semibold">Delivery Address</Text>
                <Text whiteSpace="pre-line">{purchaseOrderDetails?.FormattedDeliveryAddress}</Text>

                <Text fontWeight="semibold" mt={4}>Delivery Terms</Text>
                <Text>{purchaseOrderDetails?.DeliveryTermsId}</Text>

                <Text fontWeight="semibold" mt={4}>Currency</Text>
                <Text>{purchaseOrderDetails?.CurrencyCode}</Text>
            </GridItem>
        </Grid>

    )
}
