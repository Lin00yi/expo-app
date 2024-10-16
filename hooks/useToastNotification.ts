import { useToast } from 'native-base';

/**
 * @author huaqiang
 * @description 封装 Toast 消息提示
 */
const useToastNotification = () => {
    const toast = useToast();

    const showToast = (
        description: string,
        placement: "top" | "bottom" | "top-right" | "top-left" | "bottom-left" | "bottom-right" | undefined = 'bottom',
        duration: number = 3000
    ) => {
        toast.show({
            description,
            placement,
            duration,
            // render: () => null,
        });
    };

    return { showToast };
};

export default useToastNotification;
