"use client";

import { Check, ChevronDown } from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import useOutsidePointerDown from "@/hooks/useOutsidePointerDown";
import { cn } from "@/lib/utils";
import FieldLabel from "./FieldLabel";
import { fieldControlClasses, fieldErrorClasses } from "./field-styles";

type SelectFieldVariant = "boxed" | "bare";

export interface SelectFieldOption {
    value: string;
    label: ReactNode;
    disabled?: boolean;
}

interface SelectFieldProps {
    id: string;
    label: string;
    options: readonly SelectFieldOption[];
    name?: string;
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    error?: string;
    isRequired?: boolean;
    disabled?: boolean;
    /** `boxed` is a regular form field; `bare` sits inside a search or filter bar. */
    variant?: SelectFieldVariant;
    wrapperClassName?: string;
    onValueChange?: (value: string) => void;
}

const labelClasses: Record<SelectFieldVariant, string> = {
    boxed: "",
    bare: "text-micro font-medium text-ink-muted",
};

const triggerClasses: Record<SelectFieldVariant, string> = {
    boxed: "mt-2 h-12 px-4",
    bare: "mt-0.5 h-8 rounded-lg border-0 bg-transparent px-0 font-medium shadow-none hover:border-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink disabled:bg-transparent",
};

function getFirstEnabledIndex(options: readonly SelectFieldOption[]) {
    return options.findIndex((option) => !option.disabled);
}

function getLastEnabledIndex(options: readonly SelectFieldOption[]) {
    return options.findLastIndex((option) => !option.disabled);
}

function getNextEnabledIndex(
    options: readonly SelectFieldOption[],
    currentIndex: number,
    direction: 1 | -1
) {
    for (let offset = 1; offset <= options.length; offset += 1) {
        const nextIndex = (currentIndex + offset * direction + options.length) % options.length;

        if (!options[nextIndex]?.disabled) {
            return nextIndex;
        }
    }

    return -1;
}

export default function SelectField({
    defaultValue = "",
    disabled = false,
    error,
    id,
    isRequired = false,
    label,
    name,
    onValueChange,
    options,
    placeholder = "Select an option",
    value,
    variant = "boxed",
    wrapperClassName,
}: SelectFieldProps) {
    const listboxId = useId();
    const errorId = `${id}-error`;
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue);
    const selectedValue = isControlled ? value : internalValue;
    const selectedOption = options.find((option) => option.value === selectedValue);
    const selectedIndex = options.findIndex(
        (option) => option.value === selectedValue && !option.disabled
    );
    const [activeIndex, setActiveIndex] = useState(-1);
    const [isOpen, setIsOpen] = useState(false);
    const [isListboxRendered, setIsListboxRendered] = useState(false);

    useOutsidePointerDown(isOpen, [wrapperRef], () => setIsOpen(false));

    function openListbox() {
        if (disabled) {
            return;
        }

        setActiveIndex(selectedIndex >= 0 ? selectedIndex : getFirstEnabledIndex(options));
        setIsListboxRendered(true);
        window.requestAnimationFrame(() => setIsOpen(true));
    }

    function closeListbox() {
        setIsOpen(false);
    }

    function selectValue(nextValue: string) {
        if (!isControlled) {
            setInternalValue(nextValue);
        }

        onValueChange?.(nextValue);
        triggerRef.current?.focus();
        closeListbox();
    }

    function moveActiveIndex(direction: 1 | -1) {
        if (!isOpen) {
            openListbox();
            return;
        }

        setActiveIndex((currentIndex) => getNextEnabledIndex(options, currentIndex, direction));
    }

    function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
        if (disabled) {
            return;
        }

        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            moveActiveIndex(event.key === "ArrowDown" ? 1 : -1);
            return;
        }

        if (event.key === "Home" || event.key === "End") {
            event.preventDefault();
            openListbox();
            setActiveIndex(
                event.key === "Home" ? getFirstEnabledIndex(options) : getLastEnabledIndex(options)
            );
            return;
        }

        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();

            if (!isOpen) {
                openListbox();
                return;
            }

            const activeOption = options[activeIndex];

            if (activeOption && !activeOption.disabled) {
                selectValue(activeOption.value);
            }
            return;
        }

        if (event.key === "Escape" && isOpen) {
            event.preventDefault();
            closeListbox();
        }

        if (event.key === "Tab") {
            closeListbox();
        }
    }

    return (
        <div ref={wrapperRef} className={cn("relative min-w-0", wrapperClassName)}>
            <FieldLabel htmlFor={id} isRequired={isRequired} className={labelClasses[variant]}>
                {label}
            </FieldLabel>
            {name ? <input type="hidden" name={name} value={selectedValue} /> : null}
            <button
                ref={triggerRef}
                id={id}
                type="button"
                role="combobox"
                disabled={disabled}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-controls={listboxId}
                aria-activedescendant={
                    isOpen && activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined
                }
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? errorId : undefined}
                aria-required={isRequired || undefined}
                onClick={() => (isOpen ? closeListbox() : openListbox())}
                onKeyDown={handleKeyDown}
                className={cn(
                    fieldControlClasses(Boolean(error)),
                    "flex cursor-pointer items-center justify-between gap-3 text-left",
                    isOpen && variant === "boxed" && "border-ink",
                    triggerClasses[variant]
                )}
            >
                <span
                    className={cn(
                        "min-w-0 truncate",
                        selectedOption ? "text-ink" : "text-ink-muted"
                    )}
                >
                    {selectedOption?.label ?? placeholder}
                </span>
                <ChevronDown
                    className={cn(
                        "size-4 shrink-0 text-ink-muted transition-all duration-200 ease-out motion-reduce:transition-none",
                        isOpen && "rotate-180 text-ink"
                    )}
                    aria-hidden="true"
                />
            </button>
            {isListboxRendered ? (
                <div
                    onTransitionEnd={(event) => {
                        if (event.target === event.currentTarget && !isOpen) {
                            setIsListboxRendered(false);
                        }
                    }}
                    className={cn(
                        "absolute top-full left-0 z-40 mt-2 w-full min-w-56 origin-top rounded-2xl border border-line-soft bg-canvas p-1.5 shadow-[0_24px_60px_-28px_rgba(29,29,31,0.45)] transition-all duration-150 ease-out motion-reduce:transition-none",
                        isOpen
                            ? "translate-y-0 scale-100 opacity-100"
                            : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0"
                    )}
                >
                    <div
                        id={listboxId}
                        role="listbox"
                        aria-labelledby={id}
                        className="max-h-64 overflow-y-auto overscroll-contain"
                    >
                        {options.map((option, index) => {
                            const isSelected = option.value === selectedValue;
                            const isActive = index === activeIndex;

                            return (
                                <button
                                    key={option.value}
                                    id={`${listboxId}-option-${index}`}
                                    type="button"
                                    role="option"
                                    tabIndex={-1}
                                    disabled={option.disabled}
                                    aria-selected={isSelected}
                                    // Keep focus on the trigger so the list doesn't close before the
                                    // click lands (Safari doesn't focus buttons on click).
                                    onMouseDown={(event) => event.preventDefault()}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    onClick={() => selectValue(option.value)}
                                    className={cn(
                                        "flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-caption transition-all duration-150 ease-out disabled:cursor-not-allowed disabled:text-ink-muted/50 motion-reduce:transition-none",
                                        isActive && "bg-surface",
                                        isSelected ? "font-medium text-ink" : "text-ink-muted"
                                    )}
                                >
                                    <span className="min-w-0 truncate">{option.label}</span>
                                    <Check
                                        className={cn(
                                            "size-4 shrink-0 text-ink transition-all duration-150 motion-reduce:transition-none",
                                            isSelected ? "opacity-100" : "opacity-0"
                                        )}
                                        aria-hidden="true"
                                    />
                                </button>
                            );
                        })}
                    </div>
                </div>
            ) : null}
            {error ? (
                <p id={errorId} className={cn("mt-2", fieldErrorClasses)}>
                    {error}
                </p>
            ) : null}
        </div>
    );
}
