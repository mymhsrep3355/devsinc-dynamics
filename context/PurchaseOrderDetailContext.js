'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const PurchaseOrderDetailsContext = createContext();

export const PurchaseOrderDetailsProvider = ({ children }) => {

    const [purchaseOrderDetails, setPurchaseOrderDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const fetchPurchaseOrderDetails = async (poNumber) => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${process.env.BASE_URL}/api/po/details/${poNumber}`);
            const data = await response.json();
            setPurchaseOrderDetails(data?.data || []);
        } catch (err) {
            console.error('Failed to fetch purchase order details:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <PurchaseOrderDetailsContext.Provider value={{ purchaseOrderDetails, loading, error, fetchPurchaseOrderDetails }}>
            {children}
        </PurchaseOrderDetailsContext.Provider>
    );
}
export const usePurchaseOrderDetails = () => useContext(PurchaseOrderDetailsContext);