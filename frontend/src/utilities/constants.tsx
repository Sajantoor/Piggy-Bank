export interface TransactionObject {
  Name: string;
  Price: number;
  Store: string;
  Location: string; // Types for this? -> Not sure
  Date: Date; 
  Category: string; // Types -> This is doable
}

/**
 * Names of the tabs in the app
 */
export type PageNames =
  | 'Home'
  | 'Statistics'
  | 'Add'
  | 'Transactions'
  | 'Profile';
