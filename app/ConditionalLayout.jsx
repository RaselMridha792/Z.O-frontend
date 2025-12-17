"use client";

import { usePathname } from 'next/navigation';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserProfile, stopLoading } from "@/store/slices/authSlice";
import Header from "./Components/Header/Header"; 
import Footer from "./Components/Footer/Footer"; 
import ReduxProvider from "./store/ReduxProvider"; 
function AuthInitializer({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("sb-access-token");
        if (token) {
            dispatch(fetchUserProfile(token));
        } else {
            dispatch(stopLoading());
        }
    }, [dispatch]);

    return <>{children}</>;
}

export default function ConditionalLayout({ children }) {
    const pathname = usePathname();
    const routesToHideHeaderFooter = [
        '/admin',      
        '/login',      
        '/registration'
    ];
    
    const shouldHideHeaderFooter = routesToHideHeaderFooter.some(route => 
        pathname.startsWith(route)
    );

    return (
        <ReduxProvider>
            <AuthInitializer>
                {!shouldHideHeaderFooter && <Header />}

                <main className="min-h-screen mx-auto ">
                    {children}
                </main>

                {!shouldHideHeaderFooter && <Footer />}
            </AuthInitializer>
        </ReduxProvider>
    );
}