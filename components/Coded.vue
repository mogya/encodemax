<template>
  <div class="relative mb-3 flex justify-center mb-3 flex justify-center md:flex md:items-center" >
    <label class="block text-black-500 font-bold text-right text-sm mr-1 leading-9" style="width:10rem;">
      {{title}}
    </label>
    <input type="text" readonly v-on:click="on_click"
      :value="value"
      class="flex-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-1 text-gray-700 leading-tight" />
    <button
      v-on:click="copy"
      class="px-4 py-1 absolute right-0 bottom-0 m-1 bg-white hover:shadow-outline text-black-700 font-semibold border focus:outline-none rounded"
    >
      <font-awesome-icon icon="clipboard" />
    </button>
    <transition name="fade">
      <span v-show="messaging">コピーしました！</span>
    </transition>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faClipboard } from '@fortawesome/free-regular-svg-icons'
library.add(faClipboard)

export default {
  name: 'coded',
  props: {
    title: String,
    value: String
  },
  data: ()=> {
    return {
      messaging: false
    }
  },
  methods: {
    on_click: function(event){
      event.target.select();
    },
    copy: function(event){
      const element = event.currentTarget.parentElement.getElementsByTagName("input")[0];
      if (!(element==null) && !(element.value=="")){
        element.select();
        element.setSelectionRange(0, 99999);
        document.execCommand("copy");
        this.messaging = true;
        setTimeout(()=>{ this.messaging = false }, 1000);
      }
    }
  },
}
</script>
<style scoped>

.result-line button{
  @apply bg-transparent font-semibold py-1 px-3 border rounded;
}
.result-line span{
  position: absolute;
  top: 0;
  right: 0;
  font-size: 8pt;
  background: white;
}
.fade-enter-active {
  transition: opacity .5s;
}
</style>
