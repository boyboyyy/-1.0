<template>
  <div>
    <div style="box-shadow: 0 0 10px rgba(0,0,0,.1); padding:10px 20px; border-radius:5px;margin-bottom: 10px">
      早安,<span>{{ username }}</span>。 期待每一天，^(*￣(oo)￣)^你和小鹿一样热爱世界！！！
    </div>
    <div class="demo-image__lazy">
      <el-image v-for="url in urls" :key="url" :src="url" lazy></el-image>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data(){
    return {
     mapfix: '',
      urls: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
       
      ],
      username: ''
    }
  },
  mounted() {
    // console.log(this.$cookies.get('user'));
    this.username = this.$cookies.get('user').name;
  },
  methods: {
  }
}
</script>
<style>
</style>