import {differenceInYears} from "date-fns";
import {FieldValues, Path, UseFormSetError} from "react-hook-form";
import {ZodIssue} from "zod/v3";


export function calculateAge(dateOfBirth: Date): number {
    return differenceInYears(new Date(), dateOfBirth);
}

export function handleFormServerError<TFieldValues extends FieldValues>(
    errorResponse: { error: string | ZodIssue[] },
    setError: UseFormSetError<TFieldValues>
) {
    if (Array.isArray(errorResponse.error)) {
        errorResponse.error.forEach((error) => {
            const fieldName = error.path.join('.') as Path<TFieldValues>
            setError(fieldName, {message: error.message})
        })
    } else {
        setError('root.serverError', {message: errorResponse.error})
    }
}