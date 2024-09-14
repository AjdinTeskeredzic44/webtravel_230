import React, { createContext, useEffect, useMemo, useState } from 'react'

export const Context = createContext();

function ContextProvider({ children }) {
    const [user, setUser] = useState({ exists: false, loading: true })

    useEffect(() => {
        try {
            const rawUser = localStorage.getItem('user');
            
            if(!rawUser) return;

            const user = JSON.parse(rawUser);

            setUser({ exists: true, loading: false, ...user });
        } catch(err) {
            setUser({ exists: false, loading: false });
            console.log(err);
        }
    }, []);

    const isAdmin = useMemo(() => user?.role === "admin", [user]);

    return (
        <Context.Provider value={{ user, isAdmin, setUser }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider