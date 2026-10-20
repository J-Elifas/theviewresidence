import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "./button-styles";

interface ButtonLinkProps extends ComponentProps<typeof Link> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isFullWidth?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

export default function ButtonLink({
    children,
    className,
    isFullWidth = false,
    leftIcon,
    rightIcon,
    size = "md",
    variant = "primary",
    ...props
}: ButtonLinkProps) {
    return (
        <Link className={buttonClasses({ variant, size, isFullWidth, className })} {...props}>
            {leftIcon}
            {children}
            {rightIcon}
        </Link>
    );
}
