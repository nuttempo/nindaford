import type React from "react";
import type { FordModel } from "../../../data/types";

export type CalculatorSectionProps = {
  selectedModelIndex: number;
  setSelectedModelIndex: React.Dispatch<React.SetStateAction<number>>;
  downType: "percent" | "amount";
  setDownType: React.Dispatch<React.SetStateAction<"percent" | "amount">>;
  downPercent: number;
  setDownPercent: React.Dispatch<React.SetStateAction<number>>;
  downAmount: number;
  setDownAmount: React.Dispatch<React.SetStateAction<number>>;
  interestRate: number;
  setInterestRate: React.Dispatch<React.SetStateAction<number>>;
  months: number;
  setMonths: React.Dispatch<React.SetStateAction<number>>;
  handleDownPercentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  monthlyInstallment: number;
  carPrice: number;
  financeAmount: number;
  totalInterest: number;
  fordModels: FordModel[];
};
