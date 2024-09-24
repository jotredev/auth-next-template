"use client";

import { useModal } from "@/hooks/use-modal";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RegisterUserForm } from "@/components/ui-custom/forms/register-user-form";

export const ModalRegisterUser = () => {
  const { isOpen, onClose } = useModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar usuario</DialogTitle>
        </DialogHeader>
        <RegisterUserForm fromPage="dashboard-create-user" />
      </DialogContent>
    </Dialog>
  );
};
