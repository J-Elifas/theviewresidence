type FieldErrors<FieldName extends string> = Partial<Record<FieldName, string>>;

// Scrolls the first invalid field's label into view (below the sticky header) and focuses the field.
export function scrollToFirstFieldError<FieldName extends string>(
    errors: FieldErrors<FieldName>,
    fieldOrder: readonly FieldName[],
    fieldIdByName: Record<FieldName, string>
) {
    const firstErrorField = fieldOrder.find((fieldName) => Boolean(errors[fieldName]));

    if (!firstErrorField) {
        return;
    }

    window.requestAnimationFrame(() => {
        const fieldElement = document.getElementById(fieldIdByName[firstErrorField]);

        if (!fieldElement) {
            return;
        }

        const labelElement = document.querySelector(`label[for="${fieldElement.id}"]`);
        (labelElement ?? fieldElement).scrollIntoView({ behavior: "smooth", block: "start" });
        fieldElement.focus({ preventScroll: true });
    });
}
