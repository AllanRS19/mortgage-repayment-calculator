import Copyright from "./components/Copyright";
import MortageCalculatorCard from "./components/MortageCalculatorCard";

const App = () => {
    return (
        <main className="w-full h-full sm:h-screen flex-center p-4">
            <Copyright />
            <MortageCalculatorCard />
        </main>
    )
}

export default App;