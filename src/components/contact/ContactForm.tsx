"use client";

import { Send, User } from "lucide-react";
import type { FormEventHandler } from "react";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import Button from "@/components/ui/Button";
import EmailInputField from "@/components/ui/EmailInputField";
import PhoneInputField from "@/components/ui/PhoneInputField";
import SelectField, { type SelectFieldOption } from "@/components/ui/SelectField";
import TextareaField from "@/components/ui/TextareaField";
import TextInputField from "@/components/ui/TextInputField";
import type { EnquiryFormValues } from "@/server/enquiries/types";

interface ContactFormProps {
    control: Control<EnquiryFormValues>;
    errors: FieldErrors<EnquiryFormValues>;
    isSubmitting: boolean;
    propertyOptions: SelectFieldOption[];
    onSubmit: FormEventHandler<HTMLFormElement>;
}

export default function ContactForm({
    control,
    errors,
    isSubmitting,
    onSubmit,
    propertyOptions,
}: ContactFormProps) {
    return (
        <form
            noValidate
            onSubmit={onSubmit}
            aria-labelledby="enquiry-title"
            className="rounded-[2rem] bg-surface p-6 sm:p-10"
        >
            <h2 id="enquiry-title" className="text-subtitle text-ink sm:text-title">
                Send us a message
            </h2>
            <p className="mt-2 text-body text-ink-muted">
                Tell us what you are looking for. Sending opens your email app with your message
                ready to go, and we reply within one working day.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <TextInputField
                            id="enquiry-name"
                            label="Full name"
                            placeholder="Maria Lumentut"
                            autoComplete="name"
                            maxLength={80}
                            icon={<User className="size-[1.125rem]" strokeWidth={1.75} />}
                            name={field.name}
                            value={field.value}
                            onBlur={field.onBlur}
                            onChange={field.onChange}
                            error={errors.name?.message}
                            disabled={isSubmitting}
                            isRequired
                        />
                    )}
                />
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <EmailInputField
                            id="enquiry-email"
                            label="Email"
                            placeholder="maria@example.com"
                            autoComplete="email"
                            name={field.name}
                            value={field.value}
                            onBlur={field.onBlur}
                            onChange={field.onChange}
                            error={errors.email?.message}
                            disabled={isSubmitting}
                            isRequired
                        />
                    )}
                />
                <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                        <PhoneInputField
                            id="enquiry-phone"
                            label="Phone or WhatsApp"
                            placeholder="+62 812 3456 7890"
                            autoComplete="tel"
                            name={field.name}
                            value={field.value}
                            onBlur={field.onBlur}
                            onChange={field.onChange}
                            error={errors.phone?.message}
                            disabled={isSubmitting}
                        />
                    )}
                />
                <Controller
                    name="propertyId"
                    control={control}
                    render={({ field }) => (
                        <SelectField
                            id="enquiry-property"
                            name={field.name}
                            label="Home you're interested in"
                            options={propertyOptions}
                            value={field.value}
                            error={errors.propertyId?.message}
                            disabled={isSubmitting}
                            onValueChange={field.onChange}
                        />
                    )}
                />
                <Controller
                    name="message"
                    control={control}
                    render={({ field }) => (
                        <TextareaField
                            id="enquiry-message"
                            label="Message"
                            rows={5}
                            maxLength={1000}
                            placeholder="I'd like to visit the show unit this weekend…"
                            name={field.name}
                            value={field.value}
                            onBlur={field.onBlur}
                            onChange={field.onChange}
                            error={errors.message?.message}
                            disabled={isSubmitting}
                            wrapperClassName="sm:col-span-2"
                            isRequired
                        />
                    )}
                />
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-caption text-ink-muted">
                    <span aria-hidden="true" className="text-danger">
                        *
                    </span>{" "}
                    Required fields
                </p>
                <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="sm:min-w-44"
                    rightIcon={<Send aria-hidden="true" className="size-4" />}
                >
                    {isSubmitting ? "Sending…" : "Send message"}
                </Button>
            </div>
        </form>
    );
}
