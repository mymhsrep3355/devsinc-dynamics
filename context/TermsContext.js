'use client'

import { createContext, useContext, useEffect, useState, useCallback } from "react"
import axios from "axios"

const TermsContext = createContext()
export const TermsProvider = ({ children }) => {
    const [dlvModes, setDlvModes] = useState([])
    const [dlvTerms, setDlvTerms] = useState([])
    const [paymentTerms, setPaymentTerms] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchTermsData = useCallback(async () => {
        setLoading(true)
        try {
            const [dlvModesResponse, dlvTermsResponse, paymentTermsResponse] = await Promise.all([
                axios.get(`${process.env.BASE_URL}/api/terms/dlvModes`),
                axios.get(`${process.env.BASE_URL}/api/terms/dlvTerms`),
                axios.get(`${process.env.BASE_URL}/api/terms/paymentTerms`),
            ])
            setDlvModes(dlvModesResponse.data)
            setDlvTerms(dlvTermsResponse.data)
            setPaymentTerms(paymentTermsResponse.data)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchTermsData()
    }, [fetchTermsData])

    return (
        <TermsContext.Provider value={{ dlvModes, dlvTerms, paymentTerms, loading, error, refresh: fetchTermsData }}>
            {children}
        </TermsContext.Provider>
    )
}

export const useTerms = () => {
    return useContext(TermsContext)
}   