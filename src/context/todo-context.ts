import * as React from "react";
import { TodoContextType } from "../interfaces/interfaces";

export const TodoContext = React.createContext<TodoContextType | undefined >(undefined);

