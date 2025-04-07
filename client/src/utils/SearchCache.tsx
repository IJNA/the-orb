import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface CacheEntry<T> {
    data: T;
    timestamp: number;
}

interface SearchCacheContextType {
    getCachedResults: <T>(query: string) => T | null;
    setCachedResults: <T>(query: string, data: T) => void;
    clearCache: () => void;
}

const SearchCacheContext = createContext<SearchCacheContextType | null>(null);
const CACHE_TTL = 30 * 60 * 1000;

export const SearchCacheProvider = ({ children }: { children: ReactNode }) => {
    const [cache, setCache] = useState<Record<string, CacheEntry<any>>>({});

    useEffect(() => {
        try {
            const savedCache = localStorage.getItem("searchCache");
            if (savedCache) {
                const parsedCache = JSON.parse(savedCache) as Record<string, CacheEntry<any>>;

                const now = Date.now();
                const validEntries = Object.entries(parsedCache).reduce((acc, [key, value]) => {
                    if (now - value.timestamp < CACHE_TTL) {
                        acc[key] = value;
                    }
                    return acc;
                }, {} as Record<string, CacheEntry<any>>);

                setCache(validEntries);
            }
        } catch (error) {
            console.error("Error loading search cache:", error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem("searchCache", JSON.stringify(cache));
        } catch (error) {
            console.error("Error saving search cache:", error);
        }
    }, [cache]);

    const getCachedResults = <T,>(query: string): T | null => {
        const entry = cache[query];
        if (!entry) return null;

        if (Date.now() - entry.timestamp > CACHE_TTL) {
            const newCache = { ...cache };
            delete newCache[query];
            setCache(newCache);
            return null;
        }

        return entry.data as T;
    };

    const setCachedResults = <T,>(query: string, data: T) => {
        setCache((prev) => ({
            ...prev,
            [query]: {
                data,
                timestamp: Date.now(),
            },
        }));
    };

    const clearCache = () => {
        setCache({});
        localStorage.removeItem("searchCache");
    };

    return <SearchCacheContext.Provider value={{ getCachedResults, setCachedResults, clearCache }}>{children}</SearchCacheContext.Provider>;
};

export const useSearchCache = () => {
    const context = useContext(SearchCacheContext);
    if (!context) {
        throw new Error("useSearchCache must be used within a SearchCacheProvider");
    }
    return context;
};
