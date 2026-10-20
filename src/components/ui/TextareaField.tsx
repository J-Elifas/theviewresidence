import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import FieldLabel from "./FieldLabel";
import { fieldControlClasses, fieldErrorClasses } from "./field-styles";

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    id: string;
    label: string;
    error?: string;
    isRequired?: boolean;
    wrapperClassName?: string;
    labelClassName?: string;
}

export default function TextareaField({
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    className,
    error,
    id,
    isRequired = false,
    label,
    labelClassName,
    required,
    wrapperClassName,
    ...props
}: TextareaFieldProps) {
    const errorId = `${id}-error`;
    const describedBy = [ariaDescribedBy, error ? errorId : undefined].filter(Boolean).join(" ");
    const isInvalid = Boolean(error || ariaInvalid);
    const isFieldRequired = isRequired || required;

    return (
        <div className={cn("space-y-2", wrapperClassName)}>
            <FieldLabel htmlFor={id} isRequired={isFieldRequired} className={labelClassName}>
                {label}
            </FieldLabel>
            <textarea
                id={id}
                required={isFieldRequired}
                aria-invalid={error ? true : ariaInvalid}
                aria-describedby={describedBy || undefined}
                className={cn(
                    fieldControlClasses(isInvalid),
                    "min-h-36 resize-y px-4 py-3 placeholder:text-ink-muted/70",
                    className
                )}
                {...props}
            />
            {error ? (
                <p id={errorId} className={fieldErrorClasses}>
                    {error}
                </p>
            ) : null}
        </div>
    );
}
