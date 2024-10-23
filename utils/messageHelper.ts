import type React from "react";

import { useEffect } from "react";
import useToastNotification from "@/hooks/useToastNotification";

let showMessage: ((message: string, type?: 'success' | 'error' | 'warning' | 'info', action?: React.ReactNode) => void) | undefined;

export const registerShowMessage = (fn: typeof showMessage) => {
    showMessage = fn;
};

export const message = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', action?: React.ReactNode) => {
    if (showMessage) {
        showMessage(message);
    } else {
        console.error('ShowMessage function is not registered');
    }
};

/**
 * @author huaqiang
 * @description 消息提示组件 使用notistack的消息提示
 */
export const MessageRegistrar = () => {
    const { showToast } = useToastNotification();

    useEffect(() => {
        // @ts-ignore
        registerShowMessage(showToast);
    }, [showToast]);

    return null;
};
