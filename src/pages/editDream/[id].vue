<script setup lang="ts">
import { pb } from '@/backend'
import { useRouter } from 'vue-router/auto'
import { dreamById } from '@/backend';
import { useRoute } from 'vue-router/auto';

const route = useRoute('/editDream/[id]')
console.log('id :', route.params.id)

const router = useRouter()
const submit = async (event: Event) => {
  event.preventDefault()
  const form = event.target as HTMLFormElement
  const formData = new FormData(form)

  // Handle the checkbox value explicitly
  const publishedCheckbox = form.querySelector('input[name="published"]') as HTMLInputElement
  formData.set('published', publishedCheckbox.checked ? 'true' : 'false')

  const newDream = await pb.collection('dream').update(route.params.id, formData)
  router.push({ name: '/dream/[id]', params: { id: newDream.id } })
  
  form.reset()
  form.querySelector('input[name="title"]').value = ''
  form.querySelector('textarea[name="textDream"]').value = ''
  form.querySelector('input[name="published"]').checked = false
}

const record = await dreamById(route.params.id);
console.log(record);
</script>


<template>
<div class="wrapper !h-screen">
    <h1>Add a new dream</h1>
    <div>
        <form class="my-3 bg-indigo-900 rounded-[32px] pt-8 p-5" method="post" @submit="submit">
            <input type="text" placeholder="Title" name="title" id="title" :value="record.title"/>
            <textarea placeholder="Description" name="textDream" id="textDream" :value="record.textDream"></textarea>
            <div class="flex justify-between align-middle">
                <p class="my-auto">Publish this dream</p>
                <label class="switch">
                    <input type="checkbox" name="published" id="published" :checked="record.published">
                    <span class="slider round"></span>
                </label>
            </div>
            <input type="text" name="user" id="user" :value="pb.authStore.model?.id" hidden/>
            <button type="submit" class="bg-fuchsia-900 rounded-full align-middle py-2 px-6 w-full text-amber-100 font-semibold mt-3" >Save</button>
            <!--When submited open the page with dream-->
        </form>
    </div>
</div>
</template>

<style scoped>
.switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 22.67px;
}

/* Hide default HTML checkbox */
.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

/* The slider */
.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #1e1b4b;
    -webkit-transition: .4s;
    transition: .4s;
    width: 40px;
    height: 22.67px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 17.33px;
    width: 17.33px;
    left: 2.67px;
    bottom: 2.67px;
    background-color: #312e81;
    border: 1.33px;
    border-color: #fef3c7;
    -webkit-transition: .4s;
    transition: .4s;
}

input:checked + .slider {
    background-color: #fef3c7;
}

input:focus + .slider {
    box-shadow: 0 0 1px #2e1065;
}

input:checked + .slider:before {
    -webkit-transform: translateX(17.33px);
    -ms-transform: translateX(17.33px);
    transform: translateX(17.33px);
}

/* Rounded sliders */
.slider.round {
    border-radius: 22.67px;
}

.slider.round:before {
    border-radius: 50%;
}
</style>