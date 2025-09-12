'use client'

import LoadingPage from '@/app/Loading/page';
import AddNew from '@/components/Buttons/AddNew'
import Loading from '@/components/Loading/Loading';
import PurchaseOrderCreate from '@/components/PurchaseOrder/PurchaseOrderCreate';
import PurchaseOrderListTable from '@/components/PurchaseOrder/PurchaseOrderListTable'
import { Box, Flex, Heading, Spinner, Text } from '@chakra-ui/react'
import { usePurchaseOrders } from 'context/PurchaseOrderContext';
import { useState } from 'react';

export default function PurchaseOrder() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { purchaseOrders, refetchPurchaseOrders, loading, error, refetching } = usePurchaseOrders();

  const mappedData = purchaseOrders.map(po => ({
    poNumber: po.PurchaseOrderNumber,
    vendorAccount: po.OrderVendorAccountNumber,
    invoiceAccount: po.InvoiceVendorAccountNumber,
    vendorName: po.PurchaseOrderName || '--',
    purchaseType: po.PurchaseOrderHeaderCreationMethod || '--',
    approvalStatus: po.DocumentApprovalStatus || '--',
    purchaseOrderStatus: po.PurchaseOrderStatus || '--',
    currency: po.CurrencyCode || '--',
    requestedReceiptDate: new Date(po.RequestedDeliveryDate).toLocaleDateString(),
    modeOfDelivery: po.DeliveryModeId || '--',
  }));
  // if (loading || refetching) {
  //   return <LoadingPage /> 
  // }

  return (
    <Box>
      <Flex justify={"space-between"} align="center" mb={4}>
        <Heading size="md">Purchase Order</Heading>
      </Flex>
      <AddNew onClick={() => setIsDrawerOpen(true)} />
      {error ? (
        <Text color="red.500">Failed to load purchase orders.</Text>
      ) : (
        <PurchaseOrderListTable
          data={mappedData}
          onRefresh={refetchPurchaseOrders}
        />
      )}
      
      <PurchaseOrderCreate isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </Box>
  )
}