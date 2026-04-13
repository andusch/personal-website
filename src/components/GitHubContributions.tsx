"use client";

import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";

export default function GitHubContributions() {

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="p-6 bg-white border border-[#e5e5e5] rounded-lg h-32 flex items-center justify-center">
                <span className="text-[#999] text-sm">Loading contributions...</span>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white border border-[#e5e5e5] rounded-lg overflow-x-auto">

            <GitHubCalendar
                username="andusch"
                colorScheme="light"
                blockSize={12}
                blockMargin={3}
                fontSize={12}
                theme={{
                    light: ['#f5f5f5', '#e5e5e5', '#999', '#666', '#1a1a1a'],
                }}
            />

        </div>
    )
}