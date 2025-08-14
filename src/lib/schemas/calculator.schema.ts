import { z } from "zod"

export const formSchema = z.object({
    mortgageAmount: z.string().min(1, { message: "This field is required" }).max(50).nonempty(),
    mortgageTerms: z.string().min(1, { message: "This field is required" }).max(50).nonempty(),
    interestRate: z.string().min(1, { message: "This field is required" }).max(50).nonempty(),
    mortgageType: z.enum(["repayment", "interestOnly"], {
        message: "Please select an option"
    }).nonoptional()
})