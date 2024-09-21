"use client";

import { useEffect, useState } from "react";
import { DialogRegisterUser } from "./register-user-dialog";

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
      <DialogRegisterUser />
    </>
  );
};
