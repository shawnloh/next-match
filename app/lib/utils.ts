import {differenceInYears} from "date-fns";

export function calculateAge(dateOfBirth: Date): number {
    return differenceInYears(new Date(), dateOfBirth);
}