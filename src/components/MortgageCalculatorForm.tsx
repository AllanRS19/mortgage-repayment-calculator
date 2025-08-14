import { useSearchParams } from "react-router-dom"
import CalculatorForm from "./CalculatorForm"
import { useDeleteAllParams } from "@/lib/utils";

const MortgageCalculatorForm = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { deleteParams } = useDeleteAllParams(searchParams, setSearchParams);

    return (
        <div className="w-full flex flex-col gap-5 sm:flex-1 p-6 md:p-8">
            <header className="mortgage-form-header">
                <h1 className="text-xl text-slate-900 font-bold">Mortgage Calculator</h1>
                <button
                    className="text-sm text-left underline text-slate-700 w-fit cursor-pointer hover:text-slate-800"
                    onClick={deleteParams}
                >
                    Clear all
                </button>
            </header>

            <CalculatorForm />
        </div>
    )
}

export default MortgageCalculatorForm