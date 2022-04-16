<template>
<nav class="navbar navbar-expand-lg fixed-top">
   <router-link to="/" class="navbar-brand" href="#">Home</router-link>
   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
     <span class="navbar-toggler-icon"></span>
   </button>
<div class="collapse navbar-collapse " id="navbarSupportedContent">
     <ul class="navbar-nav mr-4">
       <li class="nav-item">
         <router-link to="/add" class="nav-link " href="#">Add new post</router-link>
       </li>
     </ul>
     
   </div>
</nav>
</template>
<script>
export default {
}
</script>

<style scoped>
.navbar-brand{
  margin-left: 3%;
}
.navbar{
 background:#cdb60901;
 transition: 0.5s;
}
.navbar:hover{
 background:#ed6e0c;
  transition: 0.5s;
}
.nav-link , .navbar-brand{
 color: #000000;
 cursor: pointer;
}
.nav-link{
 margin-right: 1em !important;
 border-radius: 10%;
}
.nav-link:hover{
 background: #f4f4f4;
 color: #ed6e0c;
}
.navbar-collapse{
 justify-content: flex-end;
}
.navbar-toggler{
  background:#fff !important;
}
</style>