'use client'

import { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

const PurchaseOrderPostContext = createContext();

export function PurchaseOrderPostProvider({ children }) {
    const [posting, setPosting] = useState(false);
    const toast = useToast();
    // const router = typeof window !== 'undefined' ? useRouter() : null;

   
    function normalizePOFormValues(values) {
        return {
            ...values,
            CurrencyCode: typeof values.CurrencyCode === 'object' ? values.CurrencyCode.id : values.CurrencyCode,
            DeliveryTermsId: typeof values.DeliveryTermsId === 'object' ? values.DeliveryTermsId.id : values.DeliveryTermsId,
            DeliveryModeId: typeof values.DeliveryModeId === 'object' ? values.DeliveryModeId.id : values.DeliveryModeId,
            DefaultReceivingSiteId: typeof values.DefaultReceivingSiteId === 'object' ? values.DefaultReceivingSiteId.id : values.DefaultReceivingSiteId,
            DefaultReceivingWarehouseId: typeof values.DefaultReceivingWarehouseId === 'object' ? values.DefaultReceivingWarehouseId.id : values.DefaultReceivingWarehouseId,
            PaymentTermsName: typeof values.PaymentTermsName === 'object' ? values.PaymentTermsName.id : values.PaymentTermsName,
        };
    }

    const postPurchaseOrder = useCallback(async (poFormValues) => {
        setPosting(true);
        try {
            const payload = normalizePOFormValues(poFormValues);

            const res = await axios.post(`${process.env.BASE_URL}/api/po/create`, payload);
            const { poNumber, message } = res.data;

            toast({
                title: "Purchase Order Created!",
                description: `PO Number: ${poNumber}`,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: 'top'
            });


            // router.push(`/Dashboard/modules/purchaseorder/${poNumber}`);
            return { success: true, poNumber };
        } catch (error) {
            toast({
                title: "Failed to create PO",
                description: error?.response?.data?.error || error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'top'
            });
            return { success: false, error };
        } finally {
            setPosting(false);
        }
    // }, [router, toast]);
 }, [toast]);

    return (
        <PurchaseOrderPostContext.Provider value={{ posting, postPurchaseOrder }}>
            {children}
        </PurchaseOrderPostContext.Provider>
    );
}

export function usePurchaseOrderPost() {
    return useContext(PurchaseOrderPostContext);
}

