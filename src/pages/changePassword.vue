<template>
    <div class="wrapper !h-screen">
        <div class="bg-indigo-900 rounded-[32px] flex flex-col align-middle justify-center py-2 px-6 mt-3">
            <p class="my-auto">We are really sorry, but we are not able to change your password now. Please, try later</p>
            <RouterLink :to="{
        name: '/edit/[id]',
        params: {
          id: pb.authStore.model.id
        }
      }" class="bg-fuchsia-900 rounded-full align-middle py-2 px-6 mt-3 text-amber-100 font-semibold text-center">Go back</RouterLink>
        </div>
    </div>
</template>