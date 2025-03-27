import { ReactNode } from 'react';
import { IUserDTO } from '@/infra/services/User/IUserDTO';
import { createContext } from 'react';
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface IUserContext {
  errors: FieldErrors<IUserDTO>;
  register: UseFormRegister<IUserDTO>;
  isViewMode: boolean;
}

export const UserContext = createContext<IUserContext>({
  errors: {},
  register: undefined as unknown as UseFormRegister<IUserDTO>,
  isViewMode: false,
});

export const UserContextProvider = ({
  children,
  errors,
  register,
  isViewMode,
}: {
  children: ReactNode;
  errors: FieldErrors<IUserDTO>;
  register: UseFormRegister<IUserDTO>;
  isViewMode: boolean;
}) => {
  return (
    <UserContext.Provider value={{ isViewMode, errors, register }}>
      {children}
    </UserContext.Provider>
  );
};