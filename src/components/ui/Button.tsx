import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "./button-styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    ref?: Ref<HTMLButtonElement>;
    variant?: ButtonVariant;
    size?: ButtonSize;
    isFullWidth?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

export default function Button({
    children,
    className,
    isFullWidth = false,
    leftIcon,
    rightIcon,
    size = "md",
    type = "button",
    variant = "primary",
    ...props
}: ButtonProps) {
    return (
        <button
            type={type}
            className={buttonClasses({ variant, size, isFullWidth, className })}
            {...props}
        >
            {leftIcon}
            {children}
            {rightIcon}
        </button>
    );
}
