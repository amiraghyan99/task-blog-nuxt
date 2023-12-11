<script setup lang="ts">
definePageMeta({ middleware: ["guest"] });

const router = useRouter();
const { register } = useAuth();

const form = reactive({
  name: "",
  last_name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const {
  submit,
  inProgress,
  validationErrors: errors,
} = useSubmit(() => register(form), {
  onSuccess: () => router.push("/dashboard"),
});
</script>

<template>
  <AuthCard>
    <template #logo>
      <NuxtLink href="/">
        <ApplicationLogo class="w-20 h-20 fill-current text-gray-500" />
      </NuxtLink>
    </template>

    <form @submit.prevent="submit">
      <!-- Name -->
      <div>
        <Label for="name">Name</Label>
        <Input
          id="name"
          type="text"
          class="block mt-1 w-full"
          v-model="form.name"
          :errors="errors.name"
          required
          autoFocus
        />
      </div>
      <!--Last Name -->
      <div>
        <Label for="last_name">Last Name</Label>
        <Input
          id="last_name"
          type="text"
          class="block mt-1 w-full"
          v-model="form.last_name"
          :errors="errors.last_name"
          required
          autoFocus
        />
      </div>

      <!-- Email Address -->
      <div class="mt-4">
        <Label for="email">Email</Label>
        <Input
          id="email"
          type="email"
          class="block mt-1 w-full"
          v-model="form.email"
          :errors="errors.email"
          required
        />
      </div>

      <!-- Password -->
      <div class="mt-4">
        <Label for="password">Password</Label>
        <Input
          id="password"
          type="password"
          class="block mt-1 w-full"
          v-model="form.password"
          :errors="errors.password"
          required
          autoComplete="new-password"
        />
      </div>

      <!-- Confirm Password -->
      <div class="mt-4">
        <Label for="password_confirmation">Confirm Password</Label>
        <Input
          id="password_confirmation"
          type="password"
          class="block mt-1 w-full"
          v-model="form.password_confirmation"
          :errors="errors.password_confirmation"
          required
        />
      </div>

      <div class="flex items-center justify-end mt-4">
        <NuxtLink
          href="/login"
          class="underline text-sm text-gray-600 hover:text-gray-900"
        >
          Already registered?
        </NuxtLink>

        <Button class="ml-3" :disabled="inProgress">Register</Button>
      </div>
    </form>
  </AuthCard>
</template>
