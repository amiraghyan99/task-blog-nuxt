export const useUserStore = <T = User>(): Ref<T | null | undefined> => {
    return useState<T | null | undefined>("user", () => undefined);
}