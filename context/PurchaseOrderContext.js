'use client'

import { createContext, useContext, useEffect, useState, useCallback } from "react"
import axios from "axios"
import { useRefreshLoading } from "./RefreshLoadingContext.js"


const PurchaseOrderContext = createContext()
export const PurchaseOrderProvider = ({ children }) => {
    const { showLoading , hideLoading } = useRefreshLoading();
    const [purchaseOrders, setPurchaseOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [refetching, setRefetching] = useState(false)
    const [error, setError] = useState(null)

    const fetchPurchaseOrders = useCallback(async (isRefresh = false) => {
        try {
            isRefresh ? setRefetching(true) : setLoading(true)
            showLoading();
            const response = await axios.get(`${process.env.BASE_URL}/api/po/list`);
            console.log(response);
            setPurchaseOrders(response?.data?.data);
        } catch (err) {
            console.error('Failed to fetch purchase orders:', err);
            setError(err);
        } finally {
            isRefresh ? setRefetching(false) : setLoading(false);
            hideLoading();
        }
    }, []); 

    useEffect(() => {
        fetchPurchaseOrders();
    }, [fetchPurchaseOrders]); 

    useEffect(() => {
        console.log('Purchase orders updated:', purchaseOrders);
    }, [purchaseOrders]);

    return (
        <PurchaseOrderContext.Provider value={{ purchaseOrders, refetching, loading, error, refetchPurchaseOrders: () => fetchPurchaseOrders(true) }}>
            {children}
        </PurchaseOrderContext.Provider>
    );
};

export const usePurchaseOrders = () => useContext(PurchaseOrderContext);