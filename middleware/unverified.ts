export default defineNuxtRouteMiddleware(() => {
  const user = useUserStore();

  if (!user.value) return navigateTo("/login");

  console.log(user.value)
  if (user.value.email_verified_at || user.value.is_verified)
    return navigateTo("/dashboard");
});
