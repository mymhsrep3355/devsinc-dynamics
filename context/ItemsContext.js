'use client'

import { createContext, useContext, useEffect, useState, useCallback } from "react"
import axios from "axios"

const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchItems = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.BASE_URL}/api/allItems`);
            setItems(response.data.data);
        } catch (err) {
            console.error('Failed to fetch items:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    return (
        <ItemsContext.Provider value={{ items, loading, error, refetchItems: fetchItems }}>
            {children}
        </ItemsContext.Provider>
    );
}

export const useItems = () => {
    return useContext(ItemsContext);
}