"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm, type FieldErrors } from "react-hook-form";
import ContactForm from "@/components/contact/ContactForm";
import type { SelectFieldOption } from "@/components/ui/SelectField";
import StatusAlert from "@/components/ui/StatusAlert";
import useStatusAlert from "@/hooks/useStatusAlert";
import { scrollToFirstFieldError } from "@/lib/field-error-scroll";
import { enquiryFormSchema } from "@/server/enquiries/schemas";
import type {
    CreateEnquiryInput,
    EnquiryFormValues,
    EnquiryMutationResult,
} from "@/server/enquiries/types";
import { listingSearchParams } from "@/server/properties/options";

interface ContactFormControllerProps {
    propertyOptions: SelectFieldOption[];
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
const genericErrorMessage = "Unable to send your message. Please try again.";

function toCreateEnquiryInput(values: EnquiryFormValues): CreateEnquiryInput {
    return {
        name: values.name.trim(),
        email: values.email.trim().toLowerCase(),
        phone: values.phone.trim() || undefined,
        propertyId: values.propertyId || undefined,
        message: values.message.trim(),
    };
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

async function readEnquiryResponse(response: Response): Promise<Partial<EnquiryMutationResult>> {
    try {
        return (await response.json()) as Partial<EnquiryMutationResult>;
    } catch {
        return {};
    }
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
        reset,
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

    async function handleValidSubmit(values: EnquiryFormValues) {
        try {
            const response = await fetch("/api/enquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(toCreateEnquiryInput(values)),
            });
            const result = await readEnquiryResponse(response);

            if (!response.ok || !result.ok) {
                showStatusAlert({
                    tone: "error",
                    title: "Message not sent",
                    message: result.message || genericErrorMessage,
                });
                return;
            }

            showStatusAlert({
                tone: "success",
                title: "Message sent",
                message: result.message || "Our team will contact you soon.",
            });
            reset(emptyFormValues);
        } catch {
            showStatusAlert({
                tone: "error",
                title: "Message not sent",
                message: genericErrorMessage,
            });
        }
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
