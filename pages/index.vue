<template>
  <div class="container mx-auto">
    <div class="m-1">
      <div id="title-area" class="mb-6" >
        <span id="title-logo">encode Max</span>
        <textarea id="input-textarea" v-model="original_code" 
          placeholder="エンコード・デコードしたい文字列を入力" autofocus="autofocus"
          class="inline md:block shadow border border-gray-700 rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" >
        </textarea>
      </div>
      <div id="decoded-area" >
        <coded title="Base64 Decode" :value="base64_decode" />
        <coded title="URL Decode" :value="url_decode" />
        <coded title="HTML文字参照" :value="charactor_deref" />
        <coded title="unicode un-escape" :value="from_unicode_escaped" />
      </div>
      <div id="encoded-area" >
        <coded title="Base64 Encode" :value="base64_encode" />
        <coded title="URL Encode" :value="url_encode" />
        <coded title="数値参照(10進)" :value="charactor_ref_by_10" />
        <coded title="数値参照(16進)" :value="charactor_ref_by_16" />
        <coded title="HTML実体参照" :value="charactor_ref_by_name" />
        <coded title="unicode escape" :value="to_unicode_escaped" />
      </div>
      <p class="text-sm text-gray-900">使ってみた感想を聞かせてください！<br />
        匿名/非公開でも回答できます<br />
        → <a class="underline" href="https://ikens.net/mogya/encodemax?v=1">ikens.net/encodemax</a>
      </p>
      <ul id="footer" class="text-right">
        <li class="">
          <p class="text-sm text-gray-500">
          developed by <a class="underline" href="https://twitter.com/mogya">@mogya</a>
          </p>
        </li>
        <li class="">
          <p class="text-sm text-gray-500">
          source: <a class="underline" href="https://github.com/mogya/encodemax">github.com/mogya/encodemax</a>
          </p>
        </li>
        <li class="">
          <p class="text-sm text-gray-500">
          <a class="underline" href="https://www.amazon.co.jp/hz/wishlist/ls/THOKUF6CE3VD?&sort=default">欲しいものリスト</a>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Coded from '~/components/Coded.vue'
import HTMLEntities from 'he'
import QRCode from 'qrcode'
import Unicode from '~/assets/js/unicode'

function exec_or_errormessage(method){
  try{
    return method() 
  }
  catch(e){
    console.log(e.message)
    return ''
  }
}

export default {
  components: {
    Coded
  },
  data () {
    return {
      original_code: ''
    }
  },
  computed: {
    base64_encode: function(){
      return exec_or_errormessage( function(){ return window.btoa(unescape(encodeURIComponent(this.original_code))) }.bind(this) )
    },
    base64_decode: function(){
      return exec_or_errormessage( function(){ return decodeURIComponent(escape(window.atob(this.original_code))) }.bind(this) )
    },
    charactor_deref: function(){
      return exec_or_errormessage( function(){ 
        return HTMLEntities.decode(this.original_code) 
      }.bind(this) )
    },
    to_unicode_escaped: function(){
      return exec_or_errormessage( function(){ 
        return Unicode.to_unicode_escaped(this.original_code) 
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
        return HTMLEntities.encode(this.original_code, { 'decimal': true }) 
      }.bind(this) )
    },
    charactor_ref_by_16: function(){
      return exec_or_errormessage( function(){ 
        return HTMLEntities.encode(this.original_code, {}) 
      }.bind(this) )
    },
    charactor_ref_by_name: function(){
      return exec_or_errormessage( function(){ 
        return HTMLEntities.encode(this.original_code, { 'useNamedReferences': true }) 
      }.bind(this) )
    },
    from_unicode_escaped: function(){
      return exec_or_errormessage( function(){ 
        return Unicode.from_unicode_escaped(this.original_code) 
      }.bind(this) )
    },
  },
  head () {
    return {
      title: 'EncodeMax. エンコードデコードをリアルタイムに',
    }
  },
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/

#title-logo{
  font-family: "Times New Roman", Times, serif;
  font-style: italic;
  font-size: 24px;
  width: 6em;
}
#title-area span{
  margin-right: 0.5em;
}
#title-area textarea{
}
</style>
