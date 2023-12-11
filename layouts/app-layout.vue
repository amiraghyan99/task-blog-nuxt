<template>
  <Head>
    <Title>Dashboard</Title>
  </Head>
  <div class="min-h-screen bg-gray-100">
    <Navigation/>

    <!-- Page Heading  -->
    <header class="bg-white shadow" v-if="$slots.header">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <slot name="header"/>
      </div>
    </header>

    <FlashMessages/>

    <main>
      <slot/>
    </main>
  </div>
</template>
