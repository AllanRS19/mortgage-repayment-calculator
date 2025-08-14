import { clsx, type ClassValue } from "clsx"
import type { SetURLSearchParams } from "react-router-dom";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type MortgageType = "repayment" | "interestOnly";

interface MortgageInput {
  amount: number;
  termYears: number;
  interestRate: number;
  type: MortgageType;
}

interface MortgageResult {
  monthlyRepayment: number;
  totalRepayment: number;
}

export function calculateMortgageRepayment({
  amount,
  termYears,
  interestRate,
  type,
}: MortgageInput): MortgageResult {
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = termYears * 12;

  let monthlyRepayment: number;
  let totalRepayment: number;

  if (type === "repayment") {
    if (monthlyRate === 0) {
      // No interest case
      monthlyRepayment = amount / totalMonths;
    } else {
      monthlyRepayment =
        (amount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }
    totalRepayment = monthlyRepayment * totalMonths;
  } else {
    // Interest-only
    monthlyRepayment = amount * monthlyRate;
    totalRepayment = monthlyRepayment * totalMonths + amount;
  }

  return {
    monthlyRepayment: Number(monthlyRepayment.toFixed(2)),
    totalRepayment: Number(totalRepayment.toFixed(2)),
  };
}

export function useDeleteAllParams(searchParams: URLSearchParams, setSearchParams: SetURLSearchParams) {
  const deleteParams = () => {
    searchParams.delete("monthlyRepayment");
    searchParams.delete("totalRepayment");
    searchParams.set("action", "reset");
    setSearchParams(searchParams);
    setTimeout(() => {
      searchParams.delete("action");
      setSearchParams(searchParams);
    }, 50);
  }

  return { deleteParams };
}