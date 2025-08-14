import type { Control, FieldPath } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

import { cn } from "@/lib/utils";
import { useState, type Dispatch, type SetStateAction } from "react";

interface CustomFormFieldProps {
    name: FieldPath<any>
    control: Control<any>;
    label?: string;
    infoSide?: 'left' | 'right';
    infoText?: string;
    disabled?: boolean;
    isEmpty?: boolean;
    renderSkeleton?: (field: any, focus: string, setFocus: Dispatch<SetStateAction<string>>) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any, props: CustomFormFieldProps }) => {

    const { renderSkeleton, infoSide = 'right', infoText, disabled, name, isEmpty } = props;
    const [focus, setFocus] = useState(false);
    const [radioFocus, setRadioFocus] = useState("");

    return (
        <>
            {renderSkeleton ? renderSkeleton(field, radioFocus, setRadioFocus) : (
                <div className="w-full h-10 flex flex-col mt-1">
                    <div className={cn(
                        "flex items-center w-full h-full border border-slate-500 rounded-sm transition",
                        !isEmpty && 'hover:border-slate-800',
                        infoSide === 'left' && "flex-row-reverse",
                        isEmpty && "border-red-custom",
                        focus && "border-lime-custom"
                    )}
                    >
                        <FormControl onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}  className="cursor-pointer">
                            <Input
                                type="text"
                                {...field}
                                className="form-input border-0 rounded-none outline-none shadow-none"
                                disabled={disabled}
                                id={name}
                            />
                        </FormControl>
                        <p className={cn(
                            "h-full text-sm bg-slate-100 flex-center px-3 border-none text-slate-600 font-medium transition",
                            infoSide === 'left' && "rounded-tl-[4.7px] rounded-bl-[4.7px]",   
                            infoSide === 'right' && "rounded-tr-[4.7px] rounded-br-[4.7px]",
                            isEmpty && "bg-red-custom text-white",
                            focus && "bg-lime-custom text-white"
                        )}>
                            {infoText}
                        </p>
                    </div>
                </div>
            )}
        </>
    )
}

const CustomFormField = (props: CustomFormFieldProps) => {
    const { control, name, label } = props;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    {label && (
                        <FormLabel className="form-label">{label}</FormLabel>
                    )}

                    <RenderField
                        field={field}
                        props={props}
                    />

                    <FormMessage className="form-message" />
                </FormItem>
            )}
        />
    )
}

export default CustomFormField;