import { create } from "zustand";
import { persist } from "zustand/middleware";

const API_LOGIN = "http://146.190.86.93:6969/api/login";

const useAuthStore = create(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            loginError: null,

            login: async ({ email, password }) => {
                try {
                    const res = await fetch(API_LOGIN, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, password }),
                    });

                    if (!res.ok) {
                        const errorData = await res.json();
                        set({
                            isAuthenticated: false,
                            loginError: errorData.message,
                        });
                        return false;
                    }

                    const data = await res.json();

                    if (data.role === 2) {
                        set({
                            isAuthenticated: true,
                            user: data.user,
                            loginError: null,
                        });
                        return true;
                    } else {
                        set({
                            isAuthenticated: false,
                            loginError: "Anda bukan admin!",
                        });
                        return false;
                    }
                } catch (err) {
                    set({ isAuthenticated: false, loginError: "Server error" });
                    return false;
                }
            },

            logout: () => {
                set({ isAuthenticated: false, user: null });
            },
        }),
        {
            name: "auth-storage", // nama key di localStorage
            getStorage: () => localStorage,
        }
    )
);

export default useAuthStore;
