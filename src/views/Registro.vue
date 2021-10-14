<template>
  <section class="vh-100" style="background-color: #eee">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 25px">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    Registrarse
                  </p>

                  <form class="mx-1 mx-md-4">
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="text"
                          id="form3Example1c"
                          class="form-control"
                          v-model="usuario.username"
                        />
                        <label class="form-label" for="form3Example1c"
                          >Tu nombre</label
                        >
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="email"
                          id="form3Example3c"
                          class="form-control"
                          v-model="usuario.email"
                        />
                        <label class="form-label" for="form3Example3c"
                          >Tu email</label
                        >
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="password"
                          id="form3Example4c"
                          class="form-control"
                          v-model="usuario.password"
                        />
                        <label class="form-label" for="form3Example4c"
                          >Contraseña</label
                        >
                      </div>
                    </div>

                    <div
                      class="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                    >
                      <button
                          type="button"
                        @click="registrarUsuario()"
                        class="btn btn-primary btn-lg"
                      >
                        Registrarse
                      </button>
                      <button
                        type="button"
                        @click="rutaHome()"
                        class="btn btn-danger btn-lg mx-2"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
                <div
                  class="
                    col-md-10 col-lg-6 col-xl-7
                    d-flex
                    align-items-center
                    order-1 order-lg-2
                  "
                >
                  <img
                    src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-registration/draw1.png"
                    class="img-fluid"
                    alt="Sample image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Registro",
  data() {
    return {
      usuarios: [],
      usuario: { username: "", email: "", password: "" },
      username: "",
      email: "",
      password: "",
    };
  },

  props: {
    msg: String,
  },
  methods: {
    registrarUsuario() {
      this.axios
        .post("/nuevo-usuario", this.usuario)
        .then((res) => {
 
          this.usuarios.push(res.data);

          

          this.usuario.username = "";
          this.usuario.email = "";
          this.usuario.password = "";
          console.log("usuario registrado");
          this.$router.push({ path: "/" });
        })
        .catch((e) => {
          console.log(e.response);
        });
    },

    rutaHome() {
      this.$router.push({ path: "/" });
    },
  },

  beforeCreate() {
    var autenticacion = window.localStorage.getItem("autenticacion");
    console.log("autenticacion esta " + autenticacion);
    if (autenticacion == "ok") {
      this.$router.push({ path: "/Menu" });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
