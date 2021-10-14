<template>
  <div class="container">
    <nav
      class="navbar navbar-expand-lg navbar-light"
      style="background-color: #e3f2fd"
    >
      <a class="navbar-brand" href="#">DOC-INC</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="#"
              >Home <span class="sr-only">(current)</span></a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="http://localhost:8083/about"
              >Sobre Nosotros</a
            >
          </li>
          <ul class="nav navbar-nav pull-xs-right">

          <li class="nav-item  ">
            <b-button  @click="cerrarSesion()" variant="danger" class="float-right"
              >Cerrar Sesion</b-button
            >
          </li>
          </ul>
        </ul>
      </div>
    </nav>

    <h1>Bienvenid@ a nuestro sistema</h1>
  </div>
</template>



<script>
export default {
  name: "Menu",
  beforeCreate() {
    var autenticacion = window.localStorage.getItem("autenticacion");
    console.log("Autenticacion esta " + autenticacion);
    if (autenticacion !== "ok") {
      this.$router.push({ path: "/" });
    }
  },
  methods: {
    cerrarSesion() {
      window.localStorage.removeItem("autenticacion");
      this.$router.push({ path: "/" });
    },
  },
};
</script>
