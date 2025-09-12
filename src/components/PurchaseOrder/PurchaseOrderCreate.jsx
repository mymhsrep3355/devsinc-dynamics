'use client'

import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    Input,
    Select,
    Switch,
    FormControl,
    FormLabel,
    VStack,
    Textarea,
} from '@chakra-ui/react'
import { useVendors } from 'context/VendorsContext'
import VendorLookupDropdown from '../Dropdowns/VendorLookup';
import { useState } from 'react';

export default function PurchaseOrderCreate({ isOpen, onClose }) {
    const { vendors, loading } = useVendors();
    const [selectedVendor, setSelectedVendor] = useState(null);
    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader borderBottomWidth="1px">Create purchase order</DrawerHeader>
                <DrawerBody>
                    <VStack spacing={4} align="stretch">
                        <FormControl display="flex" alignItems="center">
                            <FormLabel mb="0">One-time supplier</FormLabel>
                            <Switch id="one-time" />
                        </FormControl>

                        {/* <FormControl>
                            <FormLabel>Vendor account</FormLabel>
                            <Select placeholder="Select account">
                                {vendors.map(vendor => (
                                    <option key={vendor.VendorAccountNumber} value={vendor.VendorAccountNumber}>
                                        {vendor.VendorOrganizationName && vendor.VendorAccountNumber}
                                    </option>
                                ))}
                            </Select>
                        </FormControl> */}

                        <FormControl
                        >
                            <FormLabel>Vendor account</FormLabel>
                            <VendorLookupDropdown
                                vendors={vendors}
                                onSelect={(vendor) => setSelectedVendor(vendor)}
                            />

                        </FormControl>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input value={selectedVendor?.VendorOrganizationName || ''} isReadOnly />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Contact</FormLabel>
                            <Input value={selectedVendor?.PrimaryPhoneNumber || ''} isReadOnly />
                            {/* <Select placeholder="Select contact" /> */}
                        </FormControl>
                        <FormControl>
                            <FormLabel>Delivery name</FormLabel>
                            <Textarea value={selectedVendor?.VendorOrganizationName || ''} isReadOnly />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Address</FormLabel>
                            <Textarea value={selectedVendor?.FormattedPrimaryAddress || ''} isReadOnly />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Delivery address</FormLabel>
                            <Select placeholder="Select address" />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Purchase order</FormLabel>
                            <Input value="" isReadOnly />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Purchase type</FormLabel>
                            <Select>
                                <option value="Purchase order">Purchase order</option>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Invoice account</FormLabel>
                            <Input value={selectedVendor?.VendorAccountNumber || ''} isReadOnly />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Site</FormLabel>
                            <Select />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Warehouse</FormLabel>
                            <Select />
                        </FormControl>
                    </VStack>
                </DrawerBody>

                <DrawerFooter borderTopWidth="1px">
                    <Button variant="outline" mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="blue">OK</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
