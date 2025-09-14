'use client'

import {
  Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter,
  Button, Switch, FormControl, FormLabel, VStack, Textarea, Input, Divider, Box, useColorModeValue
} from '@chakra-ui/react'

import { useState } from 'react'
import { useVendors } from 'context/VendorsContext'
import { useTerms } from 'context/TermsContext'
import { useLocations } from 'context/LocationsContext'
import { usePurchaseOrderPost } from 'context/CreatePurchaseOrderContext'
import VendorLookupDropdown from '../Dropdowns/VendorLookup'
import FormLookups from '../Dropdowns/FormLookups'

export default function PurchaseOrderCreate({ isOpen, onClose }) {
  const { vendors } = useVendors()
  const { sites, warehouses, currencies } = useLocations()
  const { dlvTerms, dlvModes, paymentTerms } = useTerms()
  const { postPurchaseOrder, posting } = usePurchaseOrderPost()

  const [selectedVendor, setSelectedVendor] = useState(null)
  const [selectedSite, setSelectedSite] = useState('')
  const [selectedWarehouse, setSelectedWarehouse] = useState('')
  const [selectedCurrency, setSelectedCurrency] = useState('')
  const [selectedDlvTerm, setSelectedDlvTerm] = useState('')
  const [selectedDlvMode, setSelectedDlvMode] = useState('')
  const [selectedPaymentTerm, setSelectedPaymentTerm] = useState('')

  const bgHeader = useColorModeValue("gray.50", "gray.900")

  const handleSubmit = async () => {
    const payload = {
      dataAreaId: "usmf",
      OrderVendorAccountNumber: selectedVendor?.VendorAccountNumber,
      InvoiceVendorAccountNumber: selectedVendor?.VendorAccountNumber,
      PurchaseOrderName: selectedVendor?.VendorOrganizationName,
      RequestedDeliveryDate: new Date().toISOString().slice(0, 10),
      CurrencyCode: selectedCurrency,
      DeliveryTermsId: selectedDlvTerm,
      DeliveryModeId: selectedDlvMode,
      DefaultReceivingSiteId: selectedSite,
      DefaultReceivingWarehouseId: selectedWarehouse,
      PaymentTermsName: selectedPaymentTerm,
      DeliveryAddressLocationId: "000001098",
      DeliveryAddressStreet: selectedVendor?.FormattedPrimaryAddress || "",
      DeliveryAddressCountryRegionId: "USA",
      DeliveryAddressCountyId: "ASOTIN",
      DeliveryAddressZipCode: "",
      FormattedDeliveryAddress: selectedVendor?.FormattedPrimaryAddress || "",
    }

    //console.log("Purchase Order Payload:", payload)
    await postPurchaseOrder(payload)
    handleClose()
  }

  const handleClose = () => {
    setSelectedVendor(null)
    setSelectedCurrency('')
    setSelectedSite('')
    setSelectedWarehouse('')
    setSelectedDlvTerm('')
    setSelectedDlvMode('')
    setSelectedPaymentTerm('')
    onClose()
  }

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={handleClose} size="lg">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px" bg={bgHeader}>
          Create Purchase Order
        </DrawerHeader>

        <DrawerBody py={6}>
          <VStack spacing={6} align="stretch">

            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">One-time supplier</FormLabel>
              <Switch id="one-time" />
            </FormControl>

            <Box>
              <FormControl mb={3}>
                <FormLabel>Vendor Account</FormLabel>
                <VendorLookupDropdown
                  vendors={vendors}
                  onSelect={(vendor) => setSelectedVendor(vendor)}
                />
              </FormControl>

              <FormControl mb={3}>
                <FormLabel>Vendor Name</FormLabel>
                <Input value={selectedVendor?.VendorOrganizationName || ''} isReadOnly />
              </FormControl>

              <FormControl mb={3}>
                <FormLabel>Contact</FormLabel>
                <Input value={selectedVendor?.PrimaryPhoneNumber || ''} isReadOnly />
              </FormControl>

              <FormControl mb={3}>
                <FormLabel>Delivery Name</FormLabel>
                <Textarea value={selectedVendor?.VendorOrganizationName || ''} isReadOnly />
              </FormControl>

              <FormControl mb={3}>
                <FormLabel>Address</FormLabel>
                <Textarea value={selectedVendor?.FormattedPrimaryAddress || ''} isReadOnly />
              </FormControl>
            </Box>

            <Divider />

            <FormControl>
              <FormLabel>Invoice Account</FormLabel>
              <Input value={selectedVendor?.VendorAccountNumber || ''} isReadOnly />
            </FormControl>

            <FormControl>
              <FormLabel>Delivery Address</FormLabel>
              <Input placeholder="Select address" />
            </FormControl>

            <Divider />

            <FormLookups
              label="Site"
              placeholder="Select site"
              data={sites.map(site => ({ id: site.SiteId, name: site.SiteName || site.Name }))}
              selectedValue={selectedSite}
              onSelect={setSelectedSite}
            />

            <FormLookups
              label="Warehouse"
              placeholder="Select warehouse"
              data={warehouses.map(wh => ({ id: wh.WarehouseId, name: wh.WarehouseName || wh.Name }))}
              selectedValue={selectedWarehouse}
              onSelect={setSelectedWarehouse}
            />

            <FormLookups
              label="Currency"
              placeholder="Select currency"
              data={currencies.map(c => ({ id: c.CurrencyCode, name: c.CurrencyCode }))}
              selectedValue={selectedCurrency}
              onSelect={setSelectedCurrency}
            />

            <FormLookups
              label="Payment Terms"
              placeholder="Select payment term"
              data={paymentTerms.map(term => ({
                id: term.Name,
                name: term.Description ? `${term.Name} - ${term.Description}` : term.Name,
              }))}
              selectedValue={selectedPaymentTerm}
              onSelect={setSelectedPaymentTerm}
            />

            <FormLookups
              label="Delivery Terms"
              placeholder="Select delivery terms"
              data={dlvTerms.map(term => ({
                id: term.TermsCode,
                name: term.TermsDescription ? `${term.TermsCode} - ${term.TermsDescription}` : term.TermsCode,
              }))}
              selectedValue={selectedDlvTerm}
              onSelect={setSelectedDlvTerm}
            />

            <FormLookups
              label="Delivery Mode"
              placeholder="Select delivery mode"
              data={dlvModes.map(mode => ({
                id: mode.ModeCode,
                name: mode.ModeDescription ? `${mode.ModeCode} - ${mode.ModeDescription}` : mode.ModeCode,
              }))}
              selectedValue={selectedDlvMode}
              onSelect={setSelectedDlvMode}
            />
          </VStack>
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px" bg={bgHeader}>
          <Button variant="outline" mr={3} onClick={handleClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit} isLoading={posting}>
            Create PO
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}




// 'use client'

// import {
//     Drawer,
//     DrawerOverlay,
//     DrawerContent,
//     DrawerHeader,
//     DrawerBody,
//     DrawerFooter,
//     Button,
//     Input,
//     Select,
//     Switch,
//     FormControl,
//     FormLabel,
//     VStack,
//     Textarea,
// } from '@chakra-ui/react'
// import { useVendors } from 'context/VendorsContext'
// import VendorLookupDropdown from '../Dropdowns/VendorLookup';
// import { useState } from 'react';
// import { useLocations } from 'context/LocationsContext';
// import { useTerms } from 'context/TermsContext';
// import FormLookups from '../Dropdowns/FormLookups';
// import { usePurchaseOrderPost } from 'context/CreatePurchaseOrderContext';
// import { useRouter } from 'next/router';

// export default function PurchaseOrderCreate({ isOpen, onClose }) {
//     const { vendors, loading } = useVendors();
//     const { dlvTerms, dlvModes, loading: termsLoading, paymentTerms } = useTerms();
//     const { postPurchaseOrder, posting } = usePurchaseOrderPost();
//     const handleSubmit = async () => {
//         const payload = {
//             dataAreaId: "usmf",
//             OrderVendorAccountNumber: selectedVendor?.VendorAccountNumber,
//             InvoiceVendorAccountNumber: selectedVendor?.VendorAccountNumber,
//             PurchaseOrderName: selectedVendor?.VendorOrganizationName,
//             RequestedDeliveryDate: new Date().toISOString().slice(0, 10),
//             CurrencyCode: selectedCurrency,
//             DeliveryTermsId: selectedDlvTerm,
//             DeliveryModeId: selectedDlvMode,
//             DefaultReceivingSiteId: selectedSite,
//             DefaultReceivingWarehouseId: selectedWarehouse,
//             PaymentTermsName: selectedPaymentTerm,
//             DeliveryAddressLocationId: "000001098",
//             DeliveryAddressStreet: selectedVendor?.FormattedPrimaryAddress || "",
//             DeliveryAddressCountryRegionId: "USA",
//             DeliveryAddressCountyId: "ASOTIN",
//             DeliveryAddressZipCode: "",
//             FormattedDeliveryAddress: selectedVendor?.FormattedPrimaryAddress || "",
//         };
//         console.log("📦 Purchase Order Payload:", payload);
//          await postPurchaseOrder(payload);
//         // const result = await postPurchaseOrder(payload);
//         // if (result?.success && result?.poNumber) {
//         //     // After toast, navigate
//         //     router.push(`/Dashboard/modules/purchaseorder/${result.poNumber}`);
//         // }
//         handleClose();
//     };
//     const handleClose = () => {
//         setSelectedVendor(null);
//         setSelectedCurrency('');
//         setSelectedSite('');
//         setSelectedDlvTerm('');
//         setSelectedDlvMode('');
//         setSelectedPaymentTerm('');
//         setSelectedWarehouse('');
//         onClose();
//     };
//     const { sites, warehouses, currencies, loading: locationsLoading } = useLocations();
//     const [selectedVendor, setSelectedVendor] = useState(null);
//     const [selectedDlvTerm, setSelectedDlvTerm] = useState('');
//     const [selectedPaymentTerm, setSelectedPaymentTerm] = useState('');
//     const [selectedDlvMode, setSelectedDlvMode] = useState('');
//     const [selectedCurrency, setSelectedCurrency] = useState('');
//     const [selectedSite, setSelectedSite] = useState('');
//     const [selectedWarehouse, setSelectedWarehouse] = useState('');
//     return (
//         <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
//             <DrawerOverlay />
//             <DrawerContent>
//                 <DrawerHeader borderBottomWidth="1px">Create purchase order</DrawerHeader>
//                 <DrawerBody>
//                     <VStack spacing={4} align="stretch">
//                         <FormControl display="flex" alignItems="center">
//                             <FormLabel mb="0">One-time supplier</FormLabel>
//                             <Switch id="one-time" />
//                         </FormControl>

//                         {/* <FormControl>
//                             <FormLabel>Vendor account</FormLabel>
//                             <Select placeholder="Select account">
//                                 {vendors.map(vendor => (
//                                     <option key={vendor.VendorAccountNumber} value={vendor.VendorAccountNumber}>
//                                         {vendor.VendorOrganizationName && vendor.VendorAccountNumber}
//                                     </option>
//                                 ))}
//                             </Select>
//                         </FormControl> */}

//                         <FormControl
//                         >
//                             <FormLabel>Vendor account</FormLabel>
//                             <VendorLookupDropdown
//                                 vendors={vendors}
//                                 onSelect={(vendor) => setSelectedVendor(vendor)}
//                             />

//                         </FormControl>
//                         <FormControl>
//                             <FormLabel>Name</FormLabel>
//                             <Input value={selectedVendor?.VendorOrganizationName || ''} isReadOnly />
//                         </FormControl>
//                         <FormControl>
//                             <FormLabel>Contact</FormLabel>
//                             <Input value={selectedVendor?.PrimaryPhoneNumber || ''} isReadOnly />
//                             {/* <Select placeholder="Select contact" /> */}
//                         </FormControl>
//                         <FormControl>
//                             <FormLabel>Delivery name</FormLabel>
//                             <Textarea value={selectedVendor?.VendorOrganizationName || ''} isReadOnly />
//                         </FormControl>

//                         <FormControl>
//                             <FormLabel>Address</FormLabel>
//                             <Textarea value={selectedVendor?.FormattedPrimaryAddress || ''} isReadOnly />
//                         </FormControl>

//                         <FormControl>
//                             <FormLabel>Delivery address</FormLabel>
//                             <Select placeholder="Select address" />
//                         </FormControl>


//                         {/* <FormControl>
//                             <FormLabel>Purchase type</FormLabel>
//                             <Select>
//                                 <option value="Purchase order">Purchase order</option>
//                             </Select>
//                         </FormControl> */}

//                         <FormControl>
//                             <FormLabel>Invoice account</FormLabel>
//                             <Input value={selectedVendor?.VendorAccountNumber || ''} isReadOnly />
//                         </FormControl>



//                         <FormControl>
//                             {/* <Select
//                                 placeholder={locationsLoading ? "Loading sites..." : "Select site"}
//                                 value={selectedSite}
//                                 onChange={e => setSelectedSite(e.target.value)}
//                                 isDisabled={locationsLoading}
//                             >
//                                 {sites.map(site => (
//                                     <option key={site.SiteId || site.id} value={site.SiteId || site.id}>
//                                         {site.Name || site.SiteName || site.SiteId}
//                                     </option>
//                                 ))}
//                             </Select> */}
//                             <FormLookups label="Site"
//                                 placeholder="Select site"
//                                 data={sites.map(site => ({
//                                     id: site.SiteId,
//                                     name: site.SiteName || site.Name,
//                                 }))}
//                                 selectedValue={selectedSite}
//                                 onSelect={(site) => setSelectedSite(site)} />
//                         </FormControl>

//                         <FormControl>
//                             <FormLookups label="Warehouse"
//                                 placeholder="Select warehouse"
//                                 data={warehouses.map(w => ({ id: w.WarehouseId, name: w.WarehouseName || w.Name }))}
//                                 selectedValue={selectedWarehouse}
//                                 onSelect={(w) => setSelectedWarehouse(w)} />
//                             {/* <Select
//                                 placeholder={locationsLoading ? "Loading warehouses..." : "Select warehouse"}
//                                 value={selectedWarehouse}
//                                 onChange={e => setSelectedWarehouse(e.target.value)}
//                                 isDisabled={locationsLoading}
//                             >
//                                 {warehouses.map(wh => (
//                                     <option key={wh.WarehouseId || wh.id} value={wh.WarehouseId || wh.id}>
//                                         {wh.WarehouseName || wh.Name || wh.WarehouseId}
//                                     </option>
//                                 ))}
//                             </Select> */}
//                         </FormControl>

//                         <FormControl>
//                             {/* <FormLabel>Payment terms</FormLabel>
//                             <Select
//                                 placeholder={termsLoading ? "Loading payment terms..." : "Select payment terms"}
//                                 value={selectedPaymentTerm}
//                                 onChange={e => setSelectedPaymentTerm(e.target.value)}
//                                 isDisabled={termsLoading}
//                             >
//                                 {paymentTerms.map(term => (
//                                     <option key={term.TermsCode} value={term.Name}>
//                                         {term.Name} {term.Description ? `- ${term.Description}` : ''}
//                                     </option>
//                                 ))}
//                             </Select> */}
//                             <FormLookups label="Payment terms"
//                                 placeholder="Select payment terms"
//                                 data={paymentTerms.map(term => ({
//                                     id: term.Name,
//                                     name: term.Description ? `${term.Name} - ${term.Description}` : term.Name,
//                                 }))}
//                                 selectedValue={selectedPaymentTerm}
//                                 onSelect={(term) => setSelectedPaymentTerm(term)} />
//                         </FormControl>

//                         <FormControl>
//                             {/* <FormLabel>Currency</FormLabel>
//                             <Select
//                                 placeholder={locationsLoading ? "Loading currencies..." : "Select currency"}
//                                 value={selectedCurrency}
//                                 onChange={e => setSelectedCurrency(e.target.value)}
//                                 isDisabled={locationsLoading}
//                             >
//                                 {currencies.map(cur => (
//                                     <option key={cur.CurrencyCode} value={cur.CurrencyCode}>
//                                         {cur?.CurrencyCode}
//                                     </option>
//                                 ))}
//                             </Select> */}
//                             <FormLookups label="Currency"
//                                 placeholder="Select currency"
//                                 data={currencies.map(cur => ({
//                                     id: cur.CurrencyCode,
//                                     name: cur.CurrencyCode,
//                                 }))}
//                                 selectedValue={selectedCurrency}
//                                 onSelect={(cur) => setSelectedCurrency(cur)} />
//                         </FormControl>

//                         <FormControl>
//                             {/* <FormLabel>Delivery terms</FormLabel>
//                             <Select
//                                 placeholder={termsLoading ? "Loading delivery terms..." : "Select delivery terms"}
//                                 value={selectedDlvTerm}
//                                 onChange={e => setSelectedDlvTerm(e.target.value)}
//                                 isDisabled={termsLoading}
//                             >
//                                 {dlvTerms.map(term => (
//                                     <option key={term.TermsCode} value={term.TermsCode}>
//                                         {term.TermsCode}{term.TermsDescription ? ` - ${term.TermsDescription}` : ''}
//                                     </option>
//                                 ))}
//                             </Select> */}
//                             <FormLookups label="Delivery terms"
//                                 placeholder="Select delivery terms"
//                                 data={dlvTerms.map(term => ({
//                                     id: term.TermsCode,
//                                     name: term.TermsDescription ? `${term.TermsCode} - ${term.TermsDescription}` : term.TermsCode,
//                                 }))}
//                                 selectedValue={selectedDlvTerm}
//                                 onSelect={(term) => setSelectedDlvTerm(term)} />
//                         </FormControl>

//                         <FormControl>
//                             {/* <FormLabel>Delivery mode</FormLabel>
//                             <Select
//                                 placeholder={termsLoading ? "Loading delivery modes..." : "Select delivery mode"}
//                                 value={selectedDlvMode}
//                                 onChange={e => setSelectedDlvMode(e.target.value)}
//                                 isDisabled={termsLoading}
//                             >
//                                 {dlvModes.map(mode => (
//                                     <option key={mode.ModeCode} value={mode.ModeCode}>
//                                         {mode.ModeCode}{mode.ModeDescription ? ` - ${mode.ModeDescription}` : ''}
//                                     </option>
//                                 ))}
//                             </Select> */}
//                             <FormLookups label="Delivery mode"
//                                 placeholder="Select delivery mode"
//                                 data={dlvModes.map(mode => ({
//                                     id: mode.ModeCode,
//                                     name: mode.ModeDescription ? `${mode.ModeCode} - ${mode.ModeDescription}` : mode.ModeCode,
//                                 }))}
//                                 selectedValue={selectedDlvMode}
//                                 onSelect={(mode) => setSelectedDlvMode(mode)} />
//                         </FormControl>
//                     </VStack>
//                 </DrawerBody>

//                 <DrawerFooter borderTopWidth="1px">
//                     <Button variant="outline" mr={3} onClick={handleClose}>
//                         Cancel
//                     </Button>
//                     <Button colorScheme="blue" onClick={handleSubmit}>Create PO</Button>
//                 </DrawerFooter>
//             </DrawerContent>
//         </Drawer>
//     )
// }
