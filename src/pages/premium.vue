<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router/auto';
import { pb } from '@/backend';
import { onMounted } from 'vue';

onMounted(async () => {
    if (!pb.authStore.model) {
        router.push('/');
    }
});

const router = useRouter();
const promocode= ref("MMI1-2024");
const promocodeInput = ref("");
const isError = ref(false);

const getPremium = () => {
    if (promocodeInput.value === promocode.value) {
        if (pb.authStore.model) {
            pb.collection('users').update(pb.authStore.model.id, { premium: true });
        }
        console.log("Promocode is correct");
        router.push({ name: '/home' });
        setTimeout(() => {
            location.reload();
        }, 500);
    } else {
        console.log("Promocode is incorrect");
        isError.value = true;
    }
};
</script>

<template>
    <div class="wrapper wrapper-flex">
        <h1>Discover our premium features</h1>
            <ul class="text-amber-100 font-semibold marker:text-amber-100 !list-disc bg-indigo-900 rounded-[32px] pt-4 p-5 pl-8">
                <li>Unilimited AI explanations</li>
                <li>App personalisation</li>
                <li>First-hand access to new features</li>
                <li>And much more to come...</li>
            </ul>
        <RouterLink to="/getPremium" class="bg-gradient-to-tr from-[#F2EAD0] via-[#F7D977] to-[#F2EAD0] flex justify-center rounded-full align-middle py-3 px-6 text-center text-indigo-900 font-semibold">Upgrade now!</RouterLink>
        <div class="bg-indigo-900 rounded-[32px] flex flex-col align-middle justify-center py-3 px-6">
            <h3>Have a promocode?</h3>
            <form>
                <input type="text" placeholder="XXXX-XXXX" v-model="promocodeInput">
            </form>
            <p v-if="isError" class="text-[12px] text-violet-300  font-extralight mb-1 -mt-2">This promocode is invalid</p>
            <button @click="getPremium" to="/getPremium" class="bg-fuchsia-900 flex justify-center rounded-full align-middle py-3 px-6 text-center text-amber-100 font-semibold">Redeem</button>
        </div>
    </div>
    
</template>