'use client'

import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Spinner,
  Flex,
  Divider,
  Badge,
} from '@chakra-ui/react'
import { usePurchaseOrderDetails } from 'context/PurchaseOrderDetailContext'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

import LinesTab from '@/components/purchaseorder/details/LinesTab'
import HeaderDetails from '@/components/PurchaseOrder/Details/HeaderDetails'

export default function PurchaseOrderDetailsPage() {
  const { poNumber } = useParams()
  const { purchaseOrderDetails, loading, error, fetchPurchaseOrderDetails } = usePurchaseOrderDetails()

  useEffect(() => {
    if (poNumber) {
      fetchPurchaseOrderDetails(poNumber)
    }
  }, [poNumber])

  if (loading || !purchaseOrderDetails) {
    return (
      <Flex justify="center" align="center" minH="60vh">
        <Spinner size="xl" />
      </Flex>
    )
  }

  return (
    <Box p={6}>
      <Text fontSize="2xl" fontWeight="bold">
        {purchaseOrderDetails?.PurchaseOrderNumber} : {purchaseOrderDetails?.OrderVendorAccountNumber} - {purchaseOrderDetails?.PurchaseOrderName}
      </Text>

      <Box mt={2}>
        <Badge colorScheme={purchaseOrderDetails?.DocumentApprovalStatus === 'Approved' ? 'green' : 'orange'}>
          {purchaseOrderDetails?.DocumentApprovalStatus}
        </Badge>
        <Badge ml={2} colorScheme={purchaseOrderDetails?.PurchaseOrderStatus === 'Canceled' ? 'red' : 'blue'}>
          {purchaseOrderDetails?.PurchaseOrderStatus}
        </Badge>
      </Box>

      <Divider my={4} />

      <Tabs variant="enclosed">
        <TabList>
          <Tab>Header</Tab>
          <Tab>Lines</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <HeaderDetails purchaseOrderDetails={purchaseOrderDetails} />
          </TabPanel>
          <TabPanel>
            <LinesTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}




// 'use client'

// import {
//   Box,
//   Tabs,
//   TabList,
//   TabPanels,
//   Tab,
//   TabPanel,
//   Text,
//   Spinner,
//   Flex,
//   Divider,
//   Badge,
//   Grid,
//   GridItem,
// } from '@chakra-ui/react'
// import { usePurchaseOrderDetails } from 'context/PurchaseOrderDetailContext'
// import { useParams } from 'next/navigation'
// import { useEffect } from 'react'


// export default function PurchaseOrderDetailsPage() {
//   const { poNumber } = useParams()
//   const { purchaseOrderDetails, loading, error, fetchPurchaseOrderDetails } = usePurchaseOrderDetails()

//   useEffect(() => {
//     if (poNumber) {
//       fetchPurchaseOrderDetails(poNumber)
//     }
//   }, [poNumber])

//   if (loading || !purchaseOrderDetails) {
//     return (
//       <Flex justify="center" align="center" minH="60vh">
//         <Spinner size="xl" />
//       </Flex>
//     )
//   }

//   return (
//     <Box p={6}>
//       <Text fontSize="2xl" fontWeight="bold">
//         {purchaseOrderDetails?.PurchaseOrderNumber} : {purchaseOrderDetails?.OrderVendorAccountNumber} - {purchaseOrderDetails?.PurchaseOrderName}
//       </Text>

//       <Box mt={2}>
//         <Badge colorScheme={purchaseOrderDetails?.DocumentApprovalStatus === 'Approved' ? 'green' : 'orange'}>
//           {purchaseOrderDetails?.DocumentApprovalStatus}
//         </Badge>
//         <Badge ml={2} colorScheme={purchaseOrderDetails?.PurchaseOrderStatus === 'Canceled' ? 'red' : 'blue'}>
//           {purchaseOrderDetails?.PurchaseOrderStatus}
//         </Badge>
//       </Box>

//       <Divider my={4} />

//       <Tabs variant="enclosed">
//         <TabList>
//           <Tab>Header</Tab>
//           <Tab>Lines</Tab>
//         </TabList>

//         <TabPanels>
//           <TabPanel>
//             <Grid templateColumns="repeat(3, 1fr)" gap={6}>
//               <GridItem>
//                 <Text fontWeight="semibold">Purchase Order</Text>
//                 <Text>{purchaseOrderDetails?.PurchaseOrderNumber}</Text>
//                 <Text fontWeight="semibold" mt={4}>Vendor Account</Text>
//                 <Text>{purchaseOrderDetails?.OrderVendorAccountNumber}</Text>
//                 <Text fontWeight="semibold" mt={4}>Invoice Account</Text>
//                 <Text>{purchaseOrderDetails?.InvoiceVendorAccountNumber}</Text>
//               </GridItem>

//               <GridItem>
//                 <Text fontWeight="semibold">PO Status</Text>
//                 <Text>{purchaseOrderDetails?.PurchaseOrderStatus}</Text>
//                 <Text fontWeight="semibold" mt={4}>Approval Status</Text>
//                 <Text>{purchaseOrderDetails?.DocumentApprovalStatus}</Text>
//                 <Text fontWeight="semibold" mt={4}>Invoice Type</Text>
//                 <Text>{purchaseOrderDetails?.InvoiceType}</Text>
//               </GridItem>

//               <GridItem>
//                 <Text fontWeight="semibold">Delivery Address</Text>
//                 <Text whiteSpace="pre-line">{purchaseOrderDetails?.FormattedDeliveryAddress}</Text>
//                 <Text fontWeight="semibold" mt={4}>Delivery Terms</Text>
//                 <Text>{purchaseOrderDetails?.DeliveryTermsId}</Text>
//                 <Text fontWeight="semibold" mt={4}>Currency</Text>
//                 <Text>{purchaseOrderDetails?.CurrencyCode}</Text>
//               </GridItem>
//             </Grid>
//           </TabPanel>

//           <TabPanel>
//             <Text fontSize="md" color="gray.500">Lines tab coming in next step…</Text>
//           </TabPanel>
//         </TabPanels>
//       </Tabs>
//     </Box>
//   )
// }
