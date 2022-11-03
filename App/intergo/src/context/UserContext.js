import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [userId, setUserId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isStudent, setIsStudent] = useState(false);

    const data = {
        userId, setUserId,
        isLoading, setIsLoading,
        isStudent, setIsStudent
    };
    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    );
}

export { UserProvider };

export default UserContext;