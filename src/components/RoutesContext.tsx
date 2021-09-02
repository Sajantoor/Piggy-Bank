import { createContext } from 'react';
import { PageNames } from '../utilities/constants';

export const RoutesContext = createContext<RoutesContextInterface>({page: undefined, updatePage: () => {}});

export interface RoutesContextInterface { 
    page: React.FC | undefined;
    updatePage: (page: PageNames) => void;
}