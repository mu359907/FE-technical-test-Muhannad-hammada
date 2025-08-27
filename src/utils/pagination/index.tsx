import React, { createContext, useContext, useState, ReactNode, Dispatch,
  SetStateAction} from 'react';

interface PaginationContextType {
  page: number;
  pageSize: number;
  goToPage: (pageNumber: number) => void;
  changePageSize: (size: number) => void;
  questionId: any;
  setQuestionId: Dispatch<SetStateAction<any>>;
  setNumberOfStation: Dispatch<SetStateAction<any>>;
  numberOfStation: any;
  setInitialTime: Dispatch<SetStateAction<any>>;
  initialTime: any;
  setCheckAutoSubmit: Dispatch<SetStateAction<any>>;
  checkAutoSubmit: any;
}

const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

export const usePagination = (): PaginationContextType => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error('usePagination must be used within a PaginationProvider');
  }
  return context;
};

interface PaginationProviderProps {
  children: ReactNode;
}

export const PaginationProvider = ({ children }: PaginationProviderProps): JSX.Element => {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [questionId, setQuestionId] = useState<any>([]);
  const [numberOfStation, setNumberOfStation] = useState<any>();
  const [initialTime, setInitialTime] = useState<any>();
  const [checkAutoSubmit, setCheckAutoSubmit] = useState<any>(false);

  const goToPage = (pageNumber: number): void => {
    setPage(pageNumber);
  };

  const changePageSize = (size: number): void => {
    setPageSize(size);
  };

  const value: PaginationContextType = {
    page,
    pageSize,
    goToPage,
    changePageSize,
    questionId,
    setQuestionId,
    setNumberOfStation,
    numberOfStation,
    setInitialTime,
    initialTime,
    setCheckAutoSubmit,
    checkAutoSubmit,
  };

  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  );
};
