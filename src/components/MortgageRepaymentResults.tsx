import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const MortgageRepaymentResults = () => {

    const [mortgageData, setMortgageData] = useState({
        monthlyRepayment: '',
        totalRepayment: ''
    })

    const [searchParams] = useSearchParams();
    const action = searchParams.get("action") || "";

    useEffect(() => {
        if (searchParams.get("monthlyRepayment") !== "" && searchParams.get("totalRepayment") !== "") {
            setMortgageData({
                monthlyRepayment: searchParams.get("monthlyRepayment") as string,
                totalRepayment: searchParams.get("totalRepayment") as string
            });
        } else {
            setMortgageData({
                monthlyRepayment: '',
                totalRepayment: ''
            });
        }
    }, [searchParams]);

    return (

        <div className="mortgage-repayment-results flex-center">
            <div className={cn(
                "animate-in fade-in fade-in-40 duration-[2s]",
                searchParams.get("monthlyRepayment") && searchParams.get("totalRepayment") && "md:self-start"
                )}
            >
                {mortgageData.monthlyRepayment && mortgageData.totalRepayment ? (
                    <div className="md:self-start flex flex-col gap-3">
                        <h1 className="text-xl text-white font-bold text-left">Your results</h1>
                        <p className="text-sm text-slate-400 text-left">Your results are shown based on the information you provided. To adjust the results, edit the form and click "calculate repayments" again.</p>
                        <div className="results-container">
                            <div className="flex flex-col gap-2">
                                <h3 className="!text-sm text-slate-400">Your monthly repayments</h3>
                                <p className="text-3xl md:text-5xl text-lime-custom font-bold">{Number(mortgageData.monthlyRepayment).toLocaleString("en-GB", {
                                    style: "currency",
                                    currency: "GBP"
                                })}</p>
                            </div>
                            <div className="separator" />
                            <div className="flex flex-col gap-2">
                                <h3 className="!text-sm text-slate-400">Total you'll repay over the term</h3>
                                <p className="text-xl text-white font-bold">{Number(mortgageData.totalRepayment).toLocaleString("en-GB", {
                                    style: "currency",
                                    currency: "GBP"
                                })}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-center flex-col gap-4">
                        <img src="/images/illustration-empty.svg" className={`${action === 'calculating' && "animate-pulse"}`} alt="Empty Illustration" width={160} height={160} />
                        <h3 className="text-xl text-white font-bold">
                            {action === 'calculating' ? "Your results are almost ready" : "Results shown here"}
                        </h3>
                        <p className="text-sm text-slate-400 text-center">
                            {action === 'calculating' ? "We are preparing your results, so you can know what your mortgage repayments would be..." : 'Complete the form and click "calculate repayments" to see what your monthly repayments would be.'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MortgageRepaymentResults