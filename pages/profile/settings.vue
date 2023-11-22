<script setup lang="ts">
definePageMeta({middleware: ["auth"]});


const router = useRouter();
const route = useRoute();
const {changeEmail} = useAuth();

const form = ref({
  email: ""
});

const status = ref(
    (route.query.reset ?? "").length > 0 ? atob(route.query.reset as string) : ""
);

const {
  submit,
  inProgress,
  validationErrors: errors,
} = useSubmit(
    () => {
      status.value = "";
      return changeEmail(form.value);
    },
    {
      onError: (error) => console.log(error),
    }
);
</script>

<template>
  <NuxtLayout name="app-layout">
    <Head>
      <Title>Profile Settings</Title>
    </Head>

    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        Profile Settings
      </h2>
    </template>

    <div class="my-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">

        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">

          <h3 class="p-6 font-semibold text-lg text-gray-800 leading-tight">
            Change Password
          </h3>
          <div class="p-6 bg-white border-b border-gray-200">
            <form @submit.prevent="submit">
              <!-- Email Address -->
              <div>
                <Label for="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    class="block mt-1 w-full"
                    v-model="form.email"
                    :errors="errors.email?.[0]"
                    required
                    autoFocus
                />
              </div>


              <div class="flex items-center justify-end mt-4">

                <Button class="ml-3" :disabled="inProgress">Change Email</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
