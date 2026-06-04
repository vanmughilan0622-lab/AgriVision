"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface FarmerLocation {
    state: string;
    district: string;
    city: string;
    label: string;
    lat?: number;
    lon?: number;
    source: "gps" | "manual" | "none";
}

const defaultLocation: FarmerLocation = {
    state: "",
    district: "",
    city: "",
    label: "Location not set",
    source: "none",
};

const LocationContext = createContext<{
    location: FarmerLocation;
    setLocation: (loc: FarmerLocation) => void;
}>({
    location: defaultLocation,
    setLocation: () => { },
});

export function LocationProvider({ children }: { children: React.ReactNode }) {
    const [location, setLocationState] = useState<FarmerLocation>(defaultLocation);

    useEffect(() => {
        const saved = localStorage.getItem("farmer_location");
        if (saved) {
            try { setLocationState(JSON.parse(saved)); } catch { }
        }
    }, []);

    const setLocation = (loc: FarmerLocation) => {
        setLocationState(loc);
        localStorage.setItem("farmer_location", JSON.stringify(loc));
    };

    return (
        <LocationContext.Provider value={{ location, setLocation }}>
            {children}
        </LocationContext.Provider>
    );
}

export function useLocation() {
    return useContext(LocationContext);
}
