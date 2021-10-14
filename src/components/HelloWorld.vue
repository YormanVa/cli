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
                    INGRESAR  
                  </p>

                  <form class="mx-1 mx-md-4">

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="email"
                          id="form3Example3c"
                          v-model="form.email"
                          class="form-control"
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
                          v-model="form.password"
                          class="form-control"
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
                        @click="buscarUsuario()"
                        class="btn btn-primary btn-lg"
                      >
                        Ingresar
                      </button>
                      <button
                        type="button"
                        @click="registrarse()"
                        class="btn btn-danger btn-lg mx-2"
                      >
                        Registrarse
                      </button>
                    </div>
                  </form>
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
  name: "HelloWorld",
  data() {
    return {
      form: {
        username: "",
        email:"",
        password: "",
      },
      show: true,
      users: [],
    };
  },

  props: {
    msg: String,
  },
  methods: {
    buscarUsuario() {
      console.log("accedi a buscarUsuario");
      this.axios.get("usuarios").then((res) => {
        console.log(res.data);
        this.users = res.data;

        this.users.forEach((value, index) => {
          console.log(value.email);
          console.log(value.password);

          if (this.form.email == value.email) {
            console.log("Usuario si existe");

            if (this.form.password == value.password) {
              console.log("contraseña correcta");

              window.localStorage.setItem("autenticacion", "ok");

              this.$router.push({ path: "/menu" });
            }
          }
        });
      });
    },

    registrarse() {
      this.$router.push({ path: "/Registro" });
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
