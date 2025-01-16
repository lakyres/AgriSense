/* eslint-disable prettier/prettier */
import React, { createContext, useContext, useState, ReactNode } from "react";

interface FormData {
  email: string;
  password: string;
}

interface FormContextType {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [form, setForm] = useState<FormData>({
    email: "",
    password: "",
  });

  return (
    <FormContext.Provider value={{ form, setForm }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};
