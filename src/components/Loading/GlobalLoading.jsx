'use client'

const { useRefreshLoading } = require("context/RefreshLoadingContext")

import LoadingPage from "@/app/Loading/page"

export default function GlobalLoading() {
    const { isLoading } = useRefreshLoading();

    if (!isLoading) return null;

    return <LoadingPage />;
}