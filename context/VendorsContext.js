'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const VendorsContext = createContext()

export const VendorsProvider = ({ children }) => {
    const [vendors, setVendors] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    console.log(process.env.BASE_URL);

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const response = await axios.get(`${process.env.BASE_URL}/api/vendors`);
                console.log(response);
                setVendors(response?.data?.data);

            } catch (err) {
                console.error('Failed to fetch vendors:', err)
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        fetchVendors()
    }, [])

    useEffect(() => {
    }, [vendors])

    console.log(vendors);

    return (
        <VendorsContext.Provider value={{ vendors, loading, error }}>
            {children}
        </VendorsContext.Provider>
    )
}

export const useVendors = () => useContext(VendorsContext)
