import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { Form, FormControl } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod";
import { formSchema } from "@/lib/schemas/calculator.schema";

import CustomFormField from "./CustomFormField";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

import { mortgageTypes } from "@/constants";
import { calculateMortgageRepayment, cn } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";

const CalculatorForm = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isMortgageAmountEmpty, setIsMortgageAmountEmpty] = useState(false);
    const [isMortgageTermsEmpty, setIsMortgageTermsEmpty] = useState(false);
    const [isInterestRateEmpty, setIsInterestRateEmpty] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            mortgageAmount: '',
            mortgageTerms: '',
            interestRate: '',
            mortgageType: 'repayment'
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Values submitted", { values });
        const { mortgageAmount, mortgageTerms, interestRate, mortgageType } = values;

        if (mortgageAmount === "" && mortgageTerms === "" && interestRate === "") return;

        searchParams.delete("monthlyRepayment");
        searchParams.delete("totalRepayment");
        setIsCalculating(true);
        searchParams.set("action", "calculating");
        setSearchParams(searchParams);

        await new Promise((resolve) => setTimeout(resolve, 4000))

        const { monthlyRepayment, totalRepayment } = calculateMortgageRepayment({
            amount: Number(mortgageAmount),
            termYears: Number(mortgageTerms),
            interestRate: Number(interestRate),
            type: mortgageType
        });

        setIsCalculating(false);
        searchParams.delete("action");

        setSearchParams(searchParams);
        form.reset();

        if (monthlyRepayment < 0 || totalRepayment < 0) return;

        searchParams.set("monthlyRepayment", String(monthlyRepayment));
        searchParams.set("totalRepayment", String(totalRepayment));
        setSearchParams(searchParams);

    }

    const handleSubmitButtonClick = () => {

        if (form.getValues().mortgageAmount === "") {
            setIsMortgageAmountEmpty(true);
        } else {
            setIsMortgageAmountEmpty(false);
        }

        if (form.getValues().mortgageTerms === "") {
            setIsMortgageTermsEmpty(true);
        } else {
            setIsMortgageTermsEmpty(false);
        }

        if (form.getValues().interestRate === "") {
            setIsInterestRateEmpty(true);
        } else {
            setIsInterestRateEmpty(false);
        }
    }

    useEffect(() => {
        if (searchParams.get("action") === 'reset') {
            form.reset();
            setIsMortgageAmountEmpty(false);
            setIsMortgageTermsEmpty(false);
            setIsInterestRateEmpty(false);
        }
    }, [searchParams, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 flex flex-col gap-6">

                <CustomFormField
                    name="mortgageAmount"
                    control={form.control}
                    label="Mortgage Amount"
                    infoSide="left"
                    infoText="£"
                    isEmpty={isMortgageAmountEmpty}
                    disabled={isCalculating}
                />

                <div className="w-full flex flex-col gap-6 sm:flex-row">
                    <CustomFormField
                        name="mortgageTerms"
                        control={form.control}
                        label="Mortgage Term"
                        infoText="years"
                        isEmpty={isMortgageTermsEmpty}
                        disabled={isCalculating}
                    />
                    <CustomFormField
                        name="interestRate"
                        control={form.control}
                        label="Interest Rate"
                        infoText="%"
                        isEmpty={isInterestRateEmpty}
                        disabled={isCalculating}
                    />
                </div>

                <CustomFormField
                    name="mortgageType"
                    control={form.control}
                    label="Mortgage Type"
                    renderSkeleton={(field, focus, setFocus) => (
                        <FormControl>
                            <RadioGroup className="flex flex-col gap-2 mt-1" onValueChange={field.onChange} defaultValue={field.value}>
                                {mortgageTypes.map((mortgageType) => (
                                    <div key={mortgageType.value} className={cn(
                                        "radio-group",
                                        focus === mortgageType.value && "border-lime-custom bg-lime-custom/10"
                                    )}
                                    >
                                        <RadioGroupItem checked={focus === mortgageType.value} value={mortgageType.value} id={mortgageType.value} className={`${focus === mortgageType.value && "border-lime-custom !text-lime-custom"}`} onFocus={() => setFocus(mortgageType.value)} onBlur={() => setFocus("")} disabled={isCalculating} />
                                        <Label htmlFor={mortgageType.value} className="w-full h-full cursor-pointer text-sm font-semibold text-slate-800">
                                            {mortgageType.title}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </FormControl>
                    )}
                />

                <Button type="submit" variant="custom" className={cn(
                    "sm:w-fit hover:opacity-50",
                    isCalculating && searchParams.get("action") === "calculating" && "opacity-50"
                    )} 
                    onClick={handleSubmitButtonClick}
                >
                    <img
                        src="/images/icon-calculator.svg"
                        alt="Calculator"
                        width={20}
                        height={20}
                    />
                    <p>
                        {isCalculating && searchParams.get("action") === "calculating" ? "Calculating Repayments..." : "Calculate Repayments"}
                    </p>
                </Button>
            </form>
        </Form>
    )
}

export default CalculatorForm;