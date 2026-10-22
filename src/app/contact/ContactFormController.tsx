"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm, type FieldErrors } from "react-hook-form";
import ContactForm from "@/components/contact/ContactForm";
import StatusAlert from "@/components/ui/StatusAlert";
import { contactEmail, siteConfig } from "@/content/site";
import useStatusAlert from "@/hooks/useStatusAlert";
import { scrollToFirstFieldError } from "@/lib/field-error-scroll";
import { buildMailtoHref } from "@/lib/utils";
import { enquiryFormSchema } from "@/server/enquiries/schemas";
import type { EnquiryFormValues } from "@/server/enquiries/types";
import { listingSearchParams } from "@/server/properties/options";

interface PropertyOption {
    value: string;
    label: string;
}

interface ContactFormControllerProps {
    propertyOptions: PropertyOption[];
}

const enquiryFieldOrder = [
    "name",
    "email",
    "phone",
    "propertyId",
    "message",
] as const satisfies readonly (keyof EnquiryFormValues)[];
const enquiryFieldIds: Record<(typeof enquiryFieldOrder)[number], string> = {
    name: "enquiry-name",
    email: "enquiry-email",
    phone: "enquiry-phone",
    propertyId: "enquiry-property",
    message: "enquiry-message",
};
const emptyFormValues: EnquiryFormValues = {
    name: "",
    email: "",
    phone: "",
    propertyId: "",
    message: "",
};

// The site is static, so there is no server to receive the form. The enquiry opens in the
// visitor's email app, addressed to the sales team and ready to send.
function toEnquiryEmailHref(values: EnquiryFormValues, propertyLabel: string | undefined) {
    const details = [
        `Name: ${values.name.trim()}`,
        `Email: ${values.email.trim().toLowerCase()}`,
        values.phone.trim() ? `Phone / WhatsApp: ${values.phone.trim()}` : null,
        propertyLabel ? `Home: ${propertyLabel}` : null,
    ].filter(Boolean);

    return buildMailtoHref(contactEmail, {
        subject: propertyLabel
            ? `Enquiry: ${propertyLabel}`
            : `Enquiry from the ${siteConfig.name} website`,
        body: `${values.message.trim()}\n\n${details.join("\n")}`,
    });
}

function openEmailApp(href: string) {
    const link = document.createElement("a");
    link.href = href;
    link.click();
}

function getFieldErrorMessages(errors: FieldErrors<EnquiryFormValues>) {
    const fieldErrors: Partial<Record<keyof EnquiryFormValues, string>> = {};

    enquiryFieldOrder.forEach((fieldName) => {
        const message = errors[fieldName]?.message;

        if (typeof message === "string") {
            fieldErrors[fieldName] = message;
        }
    });

    return fieldErrors;
}

export default function ContactFormController({ propertyOptions }: ContactFormControllerProps) {
    const searchParams = useSearchParams();
    const { alert, dismissStatusAlert, showStatusAlert } = useStatusAlert();
    const requestedPropertyId = searchParams.get(listingSearchParams.property) ?? "";
    const isKnownProperty = propertyOptions.some((option) => option.value === requestedPropertyId);
    const {
        control,
        formState: { errors, isSubmitting },
        handleSubmit,
    } = useForm<EnquiryFormValues>({
        defaultValues: {
            ...emptyFormValues,
            propertyId: isKnownProperty ? requestedPropertyId : "",
        },
        resolver: zodResolver(enquiryFormSchema),
    });

    function handleInvalidSubmit(nextErrors: FieldErrors<EnquiryFormValues>) {
        scrollToFirstFieldError(
            getFieldErrorMessages(nextErrors),
            enquiryFieldOrder,
            enquiryFieldIds
        );
    }

    // The form keeps its values in case the visitor's email app doesn't open.
    function handleValidSubmit(values: EnquiryFormValues) {
        const propertyLabel = values.propertyId
            ? propertyOptions.find((option) => option.value === values.propertyId)?.label
            : undefined;

        openEmailApp(toEnquiryEmailHref(values, propertyLabel));
        showStatusAlert({
            tone: "success",
            title: "Opening your email app",
            message: `Your message is ready to send to ${contactEmail}. We reply within one working day.`,
        });
    }

    return (
        <>
            <ContactForm
                control={control}
                errors={errors}
                isSubmitting={isSubmitting}
                propertyOptions={propertyOptions}
                onSubmit={handleSubmit(handleValidSubmit, handleInvalidSubmit)}
            />
            {alert ? (
                <StatusAlert
                    key={alert.id}
                    tone={alert.tone}
                    title={alert.title}
                    message={alert.message}
                    onDismiss={dismissStatusAlert}
                />
            ) : null}
        </>
    );
}
