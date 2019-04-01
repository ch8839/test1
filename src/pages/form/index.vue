<template>
  <div class="contain">
   <header>
        header
    </header>
    <div class="content">
        <main>main</main>
        <nav>nav</nav>
        <aside>aside</aside>
    </div>
    <footer>
        footer
    </footer>
  </div>
</template>
 
<script type="text/babel">
  export default {
    data() {
      return {
        msg:'侧边栏'
      }
    },
    methods: {
     
    }
  }
</script>
 
<style scoped>
.contain{
    display: flex;
    flex-direction: column;
    min-height: 600px;
    height: 100%;
    font-size: 28px;
    font-weight: bolder;
}
  header,
footer {
    height: 150px;
    background-color: #666;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: none;
}

.content {
    flex: 1;
    display: flex;
}
nav,
aside {
    background-color: #eb6f43;
    flex: 0 1 200px;
    display: flex;
    justify-content: center;
    align-items: center;
}
main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    background-color: #d6d6d6;
}
nav {
    order: -1;
}

</style>