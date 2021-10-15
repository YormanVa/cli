<template>
  <div class="container">
  

    <h1>Bienvenid@ a nuestro sistema</h1>
    <b-button  @click="cerrarSesion()" variant="danger" class="float-right"
              >Cerrar Sesion</b-button
            >
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
