<template>
  <div class="result-line md:flex md:items-center mb-6" >
    <label>
      {{title}}
    </label>
    <input type="text" readonly v-on:click="on_click"
      :value="value" />
    <button
      v-on:click="copy"
      class="hover:bg-gray-500 hover:text-white hover:border-transparent"
    >
      &#x1F4CB;
    </button>
    <transition name="fade">
      <span v-show="messaging">コピーしました！</span>
    </transition>
  </div>
</template>

<script>
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
.result-line{
  @apply mb-6 flex justify-center;
  position: relative;
}
.result-line label{
  @apply block text-gray-500 font-bold text-right pr-4;
  width: 10em;
  line-height: 2.25;
}
.result-line input{
  @apply flex-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight;
}
.result-line button{
  @apply bg-transparent font-semibold py-2 px-4 border rounded;
}
.result-line span{
  position: absolute;
  top: -1em;
  right: -20px;
  font-size: 8pt;
  background: white;
}
.fade-enter-active {
  transition: opacity .5s;
}
</style>
