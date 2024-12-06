import { useDispatch, useSelector, useStore } from 'react-redux';
import type { AppDispatch, AppStore, RootState } from './store';

// Типизированные хуки
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: <TSelected>(
    selector: (state: RootState) => TSelected
) => TSelected = useSelector;
export const useAppStore: () => AppStore = useStore;

// Хук для создания функции действия
export const useActionSlice = (actionCreator: (value?: any) => any) => {
    const dispatch = useAppDispatch();

    return (value?: any) => {
        dispatch(actionCreator(value));
    };
};
