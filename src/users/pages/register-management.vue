<template>
  <div class="wrapper">
    <div class="containerRegister">
      <div class="left">
        <img src="https://i.pinimg.com/736x/2b/ef/88/2bef8867c232a2985a64b3feede8e152.jpg" alt="Background Image" />
      </div>
      <div class="right">
        <div class="form-container">
          <img src="https://the-rumbling.github.io/StayMap-Landing_Page/starymaplogo.png" class="logo" />
          <h2><span class="purple">Registro</span> StayMap</h2>
          <form @submit.prevent="register">
            <label for="name">Nombre completo</label>
            <input id="name" v-model="name" type="text" required />

            <label for="email">Correo electrónico</label>
            <input id="email" v-model="email" type="email" required />

            <label>Tipo de usuario</label>
            <div class="radio-group">
              <label><input type="radio" value="artist" v-model="type" /> Artista</label>
              <label><input type="radio" value="fan" v-model="type" /> Fan</label>
            </div>

            <label for="password">Contraseña</label>
            <input id="password" v-model="password" type="password" required />

            <label for="profileImage">Foto de perfil (URL)</label>
            <input id="profileImage" v-model="profileImage" type="url" placeholder="Ingresa el url..." required />
            <button type="submit" class="btn-submit">Crear cuenta</button>


          </form>

          <p v-if="error" class="error">{{ error }}</p>
          <p v-if="success" class="success">
            ¡Registro exitoso! Ahora puedes
            <router-link to="/login">iniciar sesión</router-link>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UserService } from '../services/user.service';

export default {
  name: 'RegisterComponent',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      type: 'fan',
      profileImage: '',
      error: '',
      success: false,
      userService: new UserService()
    };
  },
  methods: {
    async register() {
      this.error = '';
      try {
        const { data: existingUsers } = await this.userService.getAll();

        // Validar email duplicado
        if (existingUsers.some(u => u.email === this.email)) {
          this.error = 'Ya existe una cuenta con ese correo';
          return;
        }

        // Obtener nuevo id basado en el último
        const maxId = existingUsers.reduce((max, user) => Math.max(max, user.id), 0);
        const newId = maxId + 1;

        const newUser = {
          id: newId,
          name: this.name,
          email: this.email,
          password: this.password,
          type: this.type,
          profileImage: this.profileImage,
          location: {
            lat: -12.07,
            lng: -77.03
          },
          apiId: 'v1'
        };

        await this.userService.create(newUser);
        this.success = true;
      } catch (e) {
        console.error(e);
        this.error = 'Error al registrar usuario';
      }
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
}
.containerRegister {
  display: flex;
  width: 90vw;
  height: 90vh;
  max-width: 900px;
  max-height: 600px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  background: linear-gradient(135deg,#0e0e0e 60%,#1f1f1f);
}
.left {
  flex: 1;
}
.left img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: none;
  box-shadow: none;
}
.right {
  flex: 1;
  background: #121212;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 30px;
  overflow-y: auto;
}
.form-container {
  width: 100%;
  max-width: 320px;
  text-align: center;
}
.logo {
  width: 80px;
  margin-bottom: 20px;
  filter: none;
  box-shadow: none;
}
h2 {
  margin-bottom: 25px;
  font-size: 1.8rem;
  font-weight: 700;
}
.purple {
  color: #CB6CE6;
}
form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
label {
  text-align: left;
  font-weight: 600;
  color: #ccc;
}
input {
  padding: 12px;
  border-radius: 25px;
  border: 1.5px solid #555;
  background: transparent;
  color: #eee;
  font-size: 1rem;
}
input::placeholder {
  color: #777;
}
input:focus {
  outline: none;
  border-color: #CB6CE6;
  box-shadow: 0 0 6px #CB6CE6;
}
.radio-group {
  display: flex;
  gap: 20px;
}
.btn-submit {
  padding: 14px 0;
  border: none;
  border-radius: 25px;
  background: #CB6CE6;
  color: #fff;
  font-weight: 700;
  font-size: 1.05rem;
  cursor: pointer;
  transition: background 0.3s;
}
.btn-submit:hover {
  background: #A35BE5;
}
.error {
  color: #e74c3c;
  margin-top: 10px;
  text-align: left;
}
.success {
  color: #2ecc71;
  margin-top: 10px;
}
</style>
