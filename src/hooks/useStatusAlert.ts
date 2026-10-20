"use client";

import { useEffect, useState } from "react";
import type { StatusAlertTone } from "@/components/ui/StatusAlert";

interface SiteStatusAlert {
    id: number;
    tone: StatusAlertTone;
    title: string;
    message: string;
}

type SiteStatusAlertInput = Omit<SiteStatusAlert, "id">;

export default function useStatusAlert(timeoutMs = 6000) {
    const [alert, setAlert] = useState<SiteStatusAlert | null>(null);

    useEffect(() => {
        if (!alert) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setAlert(null);
        }, timeoutMs);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [alert, timeoutMs]);

    function showStatusAlert(nextAlert: SiteStatusAlertInput) {
        setAlert({ ...nextAlert, id: Date.now() });
    }

    function dismissStatusAlert() {
        setAlert(null);
    }

    return {
        alert,
        showStatusAlert,
        dismissStatusAlert,
    };
}
