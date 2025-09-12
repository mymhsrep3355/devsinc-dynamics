'use client'
import { useContext, createContext, useState, useEffect } from "react";

const SitesContext = createContext();

export const SitesProvider = ({ children }) => {
    const [sites, setSites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log(process.env.BASE_URL);
    useEffect(() => {
        const fetchSites = async () => {
            try {
                const response = await fetch(`${process.env.BASE_URL}/api/fields/sites`);
                const data = await response.json();
                setSites(data?.data || []);
            }
            catch (err) {
                console.error('Failed to fetch sites:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSites();
    }, []);
    return (
        <SitesContext.Provider value={{ sites, loading, error }}>
            {children}
        </SitesContext.Provider>
    );
}
export const useSites = () => useContext(SitesContext);
