import React, { createContext, useContext, useEffect, useReducer } from 'react';

const AuthContext = createContext();

const initialState = { isAuthenticated: false, user: {} };

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_LOGGED_IN":
            return {
                isAuthenticated: true,
                user: action.payload.user,
            };
        case "SET_LOGGED_OUT":
            return initialState;
        case "UPDATE_USER":
            return {
                ...state,
                user: { ...state.user, ...action.payload },
            };
        default:
            return state;
    }
};

export default function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch({ type: "SET_LOGGED_IN", payload: { user } });
        }
    }, []);

    const handleLogout = () => {
        dispatch({ type: "SET_LOGGED_OUT" });
        localStorage.removeItem("user");
    };

    const handleUpdateUser = async (updatedUser) => {
        try {
            // Update the user information in local storage
            const updatedUserData = { ...state.user, ...updatedUser };
            localStorage.setItem('user', JSON.stringify(updatedUserData));
            // Update the state
            dispatch({ type: "UPDATE_USER", payload: updatedUser });
        } catch (error) {
            console.error('Failed to update user:', error);
            throw new Error('Failed to update user');
        }
    };

    return (
        <AuthContext.Provider value={{ state, dispatch, handleLogout, handleUpdateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);
