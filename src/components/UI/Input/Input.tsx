import React, { ComponentPropsWithoutRef, FC } from "react";

import { IInput } from "./InputTypes";

import "./Input.scss";

export const Input: FC<IInput> = ({
  ...props
}: ComponentPropsWithoutRef<"input">) => {
  return <input {...props} />;
};
