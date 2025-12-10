<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed top-0 left-0 w-full z-50">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><RouterLink class="text-white text-decoration-none" to="/">
              Modern Tech Solutions
            </RouterLink>
      </a>   

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.navbar-brand {
  font-weight: bold;
  letter-spacing: 1px;
}
</style>

<script>
export default {
  name: "Navbar"
};
</script>


