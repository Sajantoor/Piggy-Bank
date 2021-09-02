import {createContext} from 'react';
import {PageNames} from '../utilities/constants';

export const Navigator = createContext<RoutesContextInterface>({
  page: undefined,
  updatePage: () => {},
  updateTab: () => {},
  goBack: () => {},
});

export interface RoutesContextInterface {
  page: React.FC | undefined;
  updatePage: (page: PageNames) => void;
  updateTab: (page: PageNames) => void;
  goBack: () => void;
}
