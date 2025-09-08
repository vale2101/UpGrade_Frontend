interface InstallmentPlanProps {
  installments: number;
  monthlyAmount: string;
  className?: string;
}

export default function InstallmentPlan({ 
  installments, 
  monthlyAmount, 
  className = "" 
}: InstallmentPlanProps) {
  return (
    <div className={`text-sm text-gray-600 mb-3 ${className}`}>
      {installments} cuotas 0% interés {monthlyAmount}*
    </div>
  );
}
