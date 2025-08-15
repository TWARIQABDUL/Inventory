export interface ExpenseItem {
  id: string;
  account: string;
  date: string;
  vendorName: string;
  vendorAvatar: string;
  reference: string;
  status: 'Billable' | 'Non-Billable' | 'Draft';
  customer: string;
  amount: number;
}