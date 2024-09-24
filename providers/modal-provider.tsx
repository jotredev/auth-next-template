"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export interface ModalContextProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  isOpenModalEditUser: boolean;
  setIsOpenModalEditUser: Dispatch<SetStateAction<boolean>>;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenModalEditUser, setIsOpenModalEditUser] =
    useState<boolean>(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        onOpen,
        onClose,
        isOpenModalEditUser,
        setIsOpenModalEditUser,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalProvider };

export default ModalContext;
