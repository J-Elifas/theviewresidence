import { Mail, Phone } from "lucide-react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import FieldLabel from "./FieldLabel";
import {
    fieldControlClasses,
    fieldDividerClasses,
    fieldErrorClasses,
    fieldIconClasses,
    fieldInputClasses,
} from "./field-styles";

type FieldType = NonNullable<InputHTMLAttributes<HTMLInputElement>["type"]>;

interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    id: string;
    label: string;
    type?: FieldType;
    error?: string;
    /** Leading icon. Email and phone fields get one by default; pass `null` to hide it. */
    icon?: ReactNode | null;
    inputClassName?: string;
    controlClassName?: string;
    labelClassName?: string;
    isRequired?: boolean;
}

function getDefaultIcon(type: FieldType) {
    if (type === "email") {
        return <Mail className="size-[1.125rem]" strokeWidth={1.75} aria-hidden="true" />;
    }

    if (type === "tel") {
        return <Phone className="size-[1.125rem]" strokeWidth={1.75} aria-hidden="true" />;
    }

    return null;
}

export default function InputField({
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    className,
    controlClassName,
    error,
    icon,
    id,
    inputClassName,
    isRequired = false,
    label,
    labelClassName,
    required,
    type = "text",
    ...props
}: InputFieldProps) {
    const errorId = `${id}-error`;
    const describedBy = [ariaDescribedBy, error ? errorId : undefined].filter(Boolean).join(" ");
    const renderedIcon = icon === undefined ? getDefaultIcon(type) : icon;
    const isInvalid = Boolean(error || ariaInvalid);
    const isFieldRequired = isRequired || required;

    return (
        <div className={cn("space-y-2", className)}>
            <FieldLabel htmlFor={id} isRequired={isFieldRequired} className={labelClassName}>
                {label}
            </FieldLabel>
            <div
                className={cn(
                    "group flex h-12 items-center gap-3 px-4",
                    fieldControlClasses(isInvalid),
                    controlClassName
                )}
            >
                {renderedIcon ? (
                    <>
                        <span className={fieldIconClasses}>{renderedIcon}</span>
                        <span className={fieldDividerClasses} aria-hidden="true" />
                    </>
                ) : null}
                <input
                    id={id}
                    type={type}
                    required={isFieldRequired}
                    aria-invalid={error ? true : ariaInvalid}
                    aria-describedby={describedBy || undefined}
                    className={cn(fieldInputClasses, inputClassName)}
                    {...props}
                />
            </div>
            {error ? (
                <p id={errorId} className={fieldErrorClasses}>
                    {error}
                </p>
            ) : null}
        </div>
    );
}
