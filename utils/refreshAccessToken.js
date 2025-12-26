"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function RefreshAccessToken({ shouldRefresh,children }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!shouldRefresh) return false
        const refresh = async () => {
            try {
                await axios.post(
                    "/api/auth/refresh",
                    {},
                    { withCredentials: true }
                );
            } catch (err) {
                window.location.href = "/";
            } finally {
                setLoading(false);
            }
        };

        refresh()
    }, [shouldRefresh]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <span className="spinner-border text-success"></span>
            </div>
        );
    }

    return children

}
