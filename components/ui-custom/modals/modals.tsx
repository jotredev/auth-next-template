"use client";

import { useEffect, useState } from "react";
import { ModalRegisterUser } from "./register-user-modal";

export const Modals = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ModalRegisterUser />
    </>
  );
};
