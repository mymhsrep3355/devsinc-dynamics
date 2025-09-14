'use client'

import { createContext, useContext, useEffect, useState, useCallback } from "react"
import axios from "axios"

const LocationsContext = createContext()
export const LocationsProvider = ({ children }) => {
    const [currencies, setCurrencies] = useState([])
    const [warehouses, setWarehouses] = useState([])
    const [sites, setSites] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
    const fetchLocationsData = useCallback(async () => {
        setLoading(true)
        try {
            const [currenciesResponse, warehousesResponse, sitesResponse] = await Promise.all([
                axios.get(`${process.env.BASE_URL}/api/locations/currencies`),
                axios.get(`${process.env.BASE_URL}/api/locations/warehouses`),
                axios.get(`${process.env.BASE_URL}/api/locations/sites`),
            ])
            setCurrencies(currenciesResponse.data)
            setWarehouses(warehousesResponse.data)
            setSites(sitesResponse.data)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchLocationsData()
    }, [fetchLocationsData])

    return (
        <LocationsContext.Provider value={{ currencies, warehouses, sites, loading, error, refresh: fetchLocationsData }}>
            {children}
        </LocationsContext.Provider>
    )
}

export const useLocations = () => {
    return useContext(LocationsContext)
}   