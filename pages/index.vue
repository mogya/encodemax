<template>
  <div class="container mx-auto">
    <div class="mr-1">
      <div id="title-area" class="flex mb-6" >
        <logo id="title-logo" class="flex-none" />
        <input v-model="original_code" type="text" placeholder="input text to encode/decode."
          class="flex-grow shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div id="decoded-area" class="border border-gray-100">
        <div class="result-line" >
          <label>
            Base64 Decode
          </label>
          <input type="text" 
            :value="base64_decode" />
        </div>
        <div class="result-line md:flex md:items-center mb-6" >
          <label>
            URL Decode
          </label>
          <input type="text" 
            :value="url_decode" />
        </div>
        <div class="result-line md:flex md:items-center mb-6" >
          <label>
          HTML文字参照
          </label>
          <input type="text" 
            :value="charactor_deref" />
        </div>
        <div class="result-line md:flex md:items-center mb-6" >
          <label>
          hex2bin(php)
          </label>
          <input type="text" 
            :value="hex_to_bin" />
        </div>
      </div>
      <div id="encoded-area" class="border border-gray-100">
        <div class="result-line md:flex md:items-center mb-6" >
          <label>
            Base64 Encode
          </label>
          <input type="text" 
            :value="base64_encode" />
        </div>
        <div class="result-line md:flex md:items-center mb-6" >
          <label>
            URL Encode
          </label>
          <input type="text" 
            :value="url_encode" />
        </div>
        <div class="result-line md:flex md:items-center mb-6" >
          <label>
          数値参照(10進)
          </label>
          <input type="text" 
            :value="charactor_ref_by_10" />
        </div>
        <div class="result-line md:flex md:items-center mb-6" >
          <label>
          数値参照(16進)
          </label>
          <input type="text" 
            :value="charactor_ref_by_16" />
        </div>
        <div class="result-line md:flex md:items-center mb-6" >
          <label>
          HTML実体参照
          </label>
          <input type="text" 
            :value="charactor_ref_by_name" />
        </div>
        <div class="result-line md:flex md:items-center mb-6" >
          <label>
          bin2hex(php)
          </label>
          <input type="text" 
            :value="bin_to_hex" />
        </div>
      </div>
      <ul id="footer" class="flex">
        <li class="mr-6">
          <a class="" href="https://twitter.com/mogya">@mogya</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import { bin2hex, hex2bin } from '~/assets/js/php'
import he from 'he'
function exec_or_errormessage(method){
  try{
    return method() 
  }
  catch(e){
    return e.toString()
  }
}

export default {
  components: {
    Logo
  },
  data () {
    return {
      original_code: '%E6%97%A5%E6%9C%AC%E8%AA%9E'
    }
  },
  computed: {
    base64_encode: function(){
      return exec_or_errormessage( function(){ return window.btoa(this.original_code) }.bind(this) )
    },
    base64_decode: function(){
      return exec_or_errormessage( function(){ return window.atob(this.original_code) }.bind(this) )
    },
    charactor_deref: function(){
      return exec_or_errormessage( function(){ 
        return he.decode(this.original_code) 
      }.bind(this) )
    },
    bin_to_hex: function(){
      return exec_or_errormessage( function(){ 
        return bin2hex(this.original_code) 
      }.bind(this) )
    },

    url_encode: function(){
      return exec_or_errormessage( function(){ return encodeURIComponent(this.original_code) }.bind(this) )
    },
    url_decode: function(){
      return exec_or_errormessage( function(){ return decodeURIComponent(this.original_code) }.bind(this) )
    },
    charactor_ref_by_10: function(){
      return exec_or_errormessage( function(){ 
        return he.encode(this.original_code, { 'decimal': true }) 
      }.bind(this) )
    },
    charactor_ref_by_16: function(){
      return exec_or_errormessage( function(){ 
        return he.encode(this.original_code, {}) 
      }.bind(this) )
    },
    charactor_ref_by_name: function(){
      return exec_or_errormessage( function(){ 
        return he.encode(this.original_code, { 'useNamedReferences': true }) 
      }.bind(this) )
    },
    hex_to_bin: function(){
      return exec_or_errormessage( function(){ 
        return hex2bin(this.original_code) 
      }.bind(this) )
    },
  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/

#title-logo{
  display: inline;
  height: 2em;
  margin-right: 0.5em;
  vertical-align: text-bottom;
  width: 2em;
}
#title-area input{
  display: inline;
}
.result-line{
  @apply mb-6 flex justify-center;
}
.result-line label{
  @apply block text-gray-500 font-bold text-right pr-4;
  width: 10em;
  line-height: 2.25;
}
.result-line input{
  @apply flex-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight;
}
</style>
