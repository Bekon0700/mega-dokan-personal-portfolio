import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebaseAuth";

export const authContext = createContext()

const auth = getAuth(app)

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const userRegister = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUser = (info) => {
        return updateProfile(auth.currentUser, info)
    }

    const userLogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const userLogout = () => {
        return signOut(auth)
    }

    const googleLogin = () => {
        return signInWithPopup(auth, provider)
    }

    useEffect(() => {
        const cleanUp = onAuthStateChanged(auth, (person) => {
            setUser(person)
        })

        return () => cleanUp()
    }, [])

    const value = {
        user,
        userRegister,
        updateUser,
        userLogin,
        userLogout,
        googleLogin
    }
    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider