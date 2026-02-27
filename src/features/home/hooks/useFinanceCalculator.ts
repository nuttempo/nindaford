import React from "react";
import type { FordModel } from "../../../data/types";

export function useFinanceCalculator(fordModels: FordModel[]) {
  const [selectedModelIndex, setSelectedModelIndex] = React.useState<number>(0);
  const carPrice = fordModels[selectedModelIndex].price;
  const [downType, setDownType] = React.useState<"percent" | "amount">("percent");
  const [downPercent, setDownPercent] = React.useState<number>(25);
  const [downAmount, setDownAmount] = React.useState<number>(Math.round(fordModels[0].price * 0.25));
  const [interestRate, setInterestRate] = React.useState<number>(2.99);
  const [months, setMonths] = React.useState<number>(84);

  React.useEffect(() => {
    if (downType === "percent") {
      setDownAmount(Math.round(carPrice * (downPercent / 100)));
    } else {
      setDownPercent(Math.round((downAmount / carPrice) * 100));
    }
  }, [carPrice, downPercent, downAmount, downType]);

  const handleDownPercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const percent = Number(e.target.value);
    setDownType("percent");
    setDownPercent(percent);
  };

  const financeAmount = Math.max(0, carPrice - downAmount);
  const totalInterest = financeAmount * (interestRate / 100) * (months / 12);
  const totalFinance = financeAmount + totalInterest;
  const monthlyInstallment = months > 0 ? Math.ceil(totalFinance / months) : 0;

  return {
    selectedModelIndex,
    setSelectedModelIndex,
    downType,
    setDownType,
    downPercent,
    setDownPercent,
    downAmount,
    setDownAmount,
    interestRate,
    setInterestRate,
    months,
    setMonths,
    handleDownPercentChange,
    monthlyInstallment,
    carPrice,
    financeAmount,
    totalInterest,
  };
}
