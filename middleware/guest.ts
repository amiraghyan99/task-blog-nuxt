export default defineNuxtRouteMiddleware(async () => {
  const user = useUserStore();
  if (user.value) return navigateTo("/dashboard", { replace: true });
});
