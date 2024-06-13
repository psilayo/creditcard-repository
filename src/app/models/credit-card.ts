export interface CreditCard {
    id: number | undefined;
    name: string;
    description: string;
    bankName: string;
    maxCredit: number;
    interestRate: number;
    active: boolean;
    recommendedScore: number;
    annualFee: number;
    termsandConditions: string;
    createdDate: string;
    updatedDate: string;
}
