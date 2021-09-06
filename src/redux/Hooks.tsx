import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {RootState} from './Slice';
import {AppDispatch} from './Store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
