// 定制 Button 组件
const Button = {
    baseStyle: {
        rounded: "lg",  // 圆角
    },
    defaultProps: {
        size: "md",  // 默认按钮大小
        // colorScheme: "primary.500",  // 默认颜色主题
    },
    variants: {
        solid: (props: any) => ({
            // bg: props.colorMode === 'dark'
            //     ? props.theme.colors.primary[500]  // 'primary.500' 也可以
            //     : 'transparent',  // solid 变体的背景色
            bg: 'primary.500'
        }),
        outline: (props: any) => ({
            borderWidth: 2,  // outline 变体的边框宽度
            borderColor: props.theme.colors.primary[500],  // 边框颜色
        }),
        ghost: () => ({
            bg: 'transparent',  // ghost 变体的背景色
        }),
    },
};


export const components = {
    Button,
};