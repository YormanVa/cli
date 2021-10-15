<template>
  <div class="container">
    <h1>Usuarios</h1>

    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="mensaje.color"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      {{ mensaje.texto }}
    </b-alert>

    <form @submit.prevent="editarUsuario(usuarioEditar)" v-if="editar">
      <h3>Editar nota</h3>

      <input
        type="text"
        class="form-control my-2"
        placeholder="Nombre"
        v-model="usuarioEditar.username"
      />
      <input
        type="text"
        class="form-control my-2"
        placeholder="Correo Electronico"
        v-model="usuarioEditar.email"
      />
       <input
        type="text"
        class="form-control my-2"
        placeholder="Contraseña"
        v-model="usuarioEditar.password"
      />
      <b-button class="btn-success my-2" type="submit">Editar</b-button>
      <b-button class="mx-2" type="submit" @click="editar = false"
        >Cancelar</b-button
      >
    </form>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Nombre</th>
          <th scope="col">Correo Electronico</th>
          <th scope="col">Contraseña</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in usuarios" :key="index">
          <th scope="row">{{ item._id }}</th>
          <td>{{ item.username }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.password }}</td>
          <td>
            <b-button class="btn-danger mx-2" @click="eliminarNota(item._id)"
              >Eliminar</b-button
            >
            <b-button class="btn-warning mx-2" @click="activarEdicion(item._id)"
              >Editar</b-button
            >
          </td>
        </tr>
      </tbody>
    </table>
    <b-button class="btn-danger my-2" @click="cerrarSesion()" >Regresar</b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuarios: [],
      usuario: { username: "", email: "", password: "" },
      mensaje: { color: "success", texto: "" },
      dismissSecs: 5,
      dismissCountDown: 0,
      editar: false,
      usuarioEditar: {},
    };
  },
   beforeCreate() {
    var autenticacion = window.localStorage.getItem("autenticacionAdmin");
    console.log("Autenticacion esta " + autenticacion);
    if (autenticacion !== "ok") {
      this.$router.push({ path: "/" });
    }
   },

  created() {
    this.listarNotas();
  },

  methods: {
    listarNotas() {
      this.axios
        .get("./usuarios")
        .then((res) => {
          console.log(res.data);
          this.usuarios = res.data;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },

    eliminarNota(id) {
      this.axios
        .delete(`/usuario/${id}`)
        .then((res) => {
          const index = this.usuarios.findIndex(
            (item) => item._id === res.data._id
          );
          this.usuarios.splice(index, 1);
          this.mensaje.color = "success";
          this.mensaje.texto = "Nota eliminada";
          this.showAlert();
        })
        .catch((e) => {
          console.log(e.response);
        });
    },

    cerrarSesion() {
      window.localStorage.removeItem("autenticacion");
            window.localStorage.removeItem("autenticacionAdmin");

      this.$router.push({ path: "/" });
    },

    activarEdicion(id) {
      this.editar = true;
      this.axios
        .get(`/usuario/${id}`)
        .then((res) => {
          this.usuarioEditar = res.data;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },

    editarUsuario(item) {
      this.axios
        .put(`/usuario/${item._id}`, item)
        .then((res) => {
          const index = this.usuarios.findIndex((n) => n._id === res.data._id);
          this.usuarios[index].username = res.data.username;
          this.usuarios[index].email = res.data.email;
          this.usuarios[index].password = res.data.password;
          this.usuarios[index].rol = res.data.rol;

          this.mensaje.color = "success";
          this.mensaje.texto = "Usuario editado";
          this.showAlert();
          this.editar = false;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },

    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },
};
</script>