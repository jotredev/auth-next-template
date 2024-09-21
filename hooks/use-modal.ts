import { useContext } from "react";
import ModalContext, { ModalContextProps } from "@/providers/modal-provider";

export const useModal = () => {
  return useContext(ModalContext) as ModalContextProps;
};
