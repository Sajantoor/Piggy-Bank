export interface TransactionObject {
  Name: string;
  Subtitle: string;
  Price: number;
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
