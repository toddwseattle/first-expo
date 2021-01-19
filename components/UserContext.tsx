import { createContext } from "react";
import { DEFAULT_USER, UserData } from "../utils/User";

const UserContext = createContext<UserData>(DEFAULT_USER);

export default UserContext;
