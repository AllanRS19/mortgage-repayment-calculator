import MortgageCalculatorForm from "./MortgageCalculatorForm";
import MortgageRepaymentResults from "./MortgageRepaymentResults";

const MortageCalculatorCard = () => {
    return (
        <div className="mortgage-calculator-card">
            <MortgageCalculatorForm />
            <MortgageRepaymentResults />
        </div>
    )
}

export default MortageCalculatorCard;