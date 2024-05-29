<template>
    <div class="wrapper wrapper-flex">
        <h1>Discover our premium features</h1>
            <ul class="text-amber-100 font-semibold marker:text-amber-100 !list-disc bg-indigo-900 rounded-[32px] pt-4 p-5 pl-8">
                <li>Unilimited AI explanations</li>
                <li>App personalisation</li>
                <li>First-hand access to new features</li>
                <li>And much more to come...</li>
            </ul>
        <RouterLink to="/en/getPremium" class="bg-gradient-to-tr from-[#F2EAD0] via-[#F7D977] to-[#F2EAD0] flex justify-center rounded-full align-middle py-3 px-6 text-center text-indigo-900 font-semibold">Upgrade now!</RouterLink>
        <div class="bg-indigo-900 rounded-[32px] flex flex-col align-middle justify-center py-3 px-6">
            <h3>Have a promocode?</h3>
            <form>
                <input type="text" placeholder="XXXX-XXXX-XXXX">
            </form>
            <RouterLink to="/en/getPremium" class="bg-fuchsia-900 flex justify-center rounded-full align-middle py-3 px-6 text-center text-amber-100 font-semibold">Redeem</RouterLink>
        </div>
    </div>
</template>