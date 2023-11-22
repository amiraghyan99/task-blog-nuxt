export type User = {
    id: number;
    name: string;
    last_name: string;
    email: string;
    password: string;
    email_verified_at?: Date;
    is_verified?: boolean;
};

export type LoginCredentials = {
    email: string;
    password: string;
};
export type ChangeEmail = {
    email: string;
};

export type RegisterCredentials = {
    name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export type ResetPasswordCredentials = {
    email: string;
    password: string;
    password_confirmation: string;
    token: string;
};

// Value is initialized in: ~/plugins/auth.ts
export const useUser = <T = User>() => {
    return useState<T | undefined | null>("user", () => undefined);
};

export const useAuth = <T = User>() => {
    const router = useRouter();

    const user = useUser<T>();
    const isLoggedIn = computed(() => !!user.value);

    async function refresh() {
        try {
            user.value = await fetchCurrentUser();
        } catch {
            user.value = null;
        }
    }

    async function login(credentials: LoginCredentials) {
        if (isLoggedIn.value) return;

        await $laraFetch("/login", {method: "post", body: credentials});
        await refresh();
    }

    async function changeEmail(email: ChangeEmail) {
        await $laraFetch<{ status: string }>("/change-email", {method: "post", body: email});
    }

    async function register(credentials: RegisterCredentials) {
        await $laraFetch("/register", {method: "post", body: credentials});
        await refresh();
    }

    async function resendEmailVerification() {
        return await $laraFetch<{ status: string }>("/email/verification-notification", {method: "post",});
    }

    async function logout() {
        if (!isLoggedIn.value) return;

        await $laraFetch("/logout", {method: "post"});
        user.value = null;

        await router.push("/login");
    }

    async function forgotPassword(email: string) {
        return await $laraFetch<{ status: string }>("/forgot-password", {
            method: "post",
            body: {email},
        });
    }

    async function resetPassword(credentials: ResetPasswordCredentials) {
        return await $laraFetch<{ status: string }>("/reset-password", {
            method: "post",
            body: credentials,
        });
    }

    return {
        user,
        isLoggedIn,
        login,
        changeEmail,
        register,
        resendEmailVerification,
        logout,
        forgotPassword,
        resetPassword,
        refresh,
    };
};

export const fetchCurrentUser = async <T = User>() => {
    try {
        return await $laraFetch<T>("/api/user");
    } catch (error: any) {
        if ([401, 419].includes(error?.response?.status)) return null;
        throw error;
    }
};
