<template lang="pug">
div
  #header.container.fixed.right-0.left-0.top-0.bg-white.px-1.z-10
    #title-area
      span#title-logo.font-serif.text-3xl.w-8
        span.italic &amp;&nbsp;
        span.italic encode
        span.italic &nbsp;
        span.italic Max
        span.italic &nbsp;%
      #textarea
        textarea(
          v-model="original_code", 
          placeholder="エンコード・デコードしたい文字列を入力", 
          autofocus="autofocus", 
          class="inline shadow border border-gray-700 rounded w-full py-2 px-3 text-black-700 leading-tight md:block focus:outline-none focus:shadow-outline"
        )
        button#clear-btn(
          v-on:click="clear"
          v-if="show_clear_button"
          class="py-2 px-4 mx-2 my-4 absolute right-0 bottom-0 bg-transparent hover:shadow-outline text-black-700 font-semibold border focus:outline-none rounded"
        )
          <font-awesome-icon icon="eraser" />
  #main.container.absolute(class="px-1 lg:px-2 xl:px-2")
    #decoded-area
      coded(title="Base64 Decode", :value="base64_decode")
      coded(title="URL Decode", :value="url_decode")
      coded(title="URL Decode(SJIS)", :value="url_decode_sjis")
      coded(title="HTML文字参照", :value="charactor_deref")
      coded(title="unicode un-escape", :value="from_unicode_escaped")
    #encoded-area
      coded(title="Base64 Encode", :value="base64_encode")
      coded(title="URL Encode", :value="url_encode")
      coded(title="URL Encode(SJIS)", :value="url_encode_sjis")
      coded(title="数値参照(10進)", :value="charactor_ref_by_10")
      coded(title="数値参照(16進)", :value="charactor_ref_by_16")
      coded(title="HTML実体参照", :value="charactor_ref_by_name")
      coded(title="unicode escape", :value="to_unicode_escaped")
    ul#footer(class="px-1 lg:px-2 xl:px-2")
      p.text-sm.text-gray-900
        | 使ってみた感想を聞かせてください！
        br
        |         匿名/非公開でも回答できます
        br
        |         → 
        a.underline(href="https://ikens.net/mogya/encodemax?v=1") ikens.net/encodemax
      .text-right
        li
          p.text-sm.text-gray-500
            | developed by 
            a.underline(href="https://twitter.com/mogya") @mogya
        li
          p.text-sm.text-gray-500
            | source: 
            a.underline(href="https://github.com/mogya/encodemax") github.com/mogya/encodemax
        li
          p.text-sm.text-gray-500
            a.underline(href="https://www.amazon.co.jp/hz/wishlist/ls/THOKUF6CE3VD?&sort=default") 欲しいものリスト
</template>

<script>
import Coded from '~/components/Coded.vue'
import HTMLEntities from 'he'
import QRCode from 'qrcode'
import Unicode from '~/assets/js/unicode'
import Encoding from 'encoding-japanese'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEraser } from '@fortawesome/free-solid-svg-icons'
library.add(faEraser)

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
    show_clear_button: function(){
      return this.original_code != ''
    },
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
    url_encode_sjis: function(){
      return exec_or_errormessage( function(){ 
        const unicode_array = Encoding.stringToCode(this.original_code)
        const sjis_array = Encoding.convert(
          unicode_array,
          { from: 'UNICODE', to: 'SJIS' }
        );
        return Encoding.urlEncode(sjis_array)
      }.bind(this) )
    },
    url_decode: function(){
      return exec_or_errormessage( function(){ return decodeURIComponent(this.original_code) }.bind(this) )
    },
    url_decode_sjis: function(){
      return exec_or_errormessage( function(){ 
        const sjis_array = Encoding.urlDecode(this.original_code)
        const unicode_array = Encoding.convert(
          sjis_array,
          { from: 'SJIS', to: 'UNICODE' }
        )
        return Encoding.codeToString(unicode_array)
      }.bind(this) )
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
  methods: {
    clear: function(event){
      this.original_code = "";
      document.querySelector("#textarea textarea").focus(); 
    }
  },
  head () {
    return {
      title: 'EncodeMax. エンコードデコードをリアルタイムに',
    }
  },
}
</script>

<style>
#main{
  top: 120px
}
#title-area textarea{
}
</style>
