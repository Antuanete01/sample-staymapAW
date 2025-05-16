<template>
  <div class="wrapper">
    <div class="containerLogin">
      <div class="left">
        <img src="https://the-rumbling.github.io/StayMap-Landing_Page/taylor.jpeg" alt="Logo Image" />
      </div>
      <div class="right">
        <div class="form-container">
          <img src="https://the-rumbling.github.io/StayMap-Landing_Page/starymaplogo.png" class="logo" />
          <h2>¡Bienvenido a <span class="purple">StayMap</span>!</h2>
          <form @submit.prevent="handleLogin">
            <label>Email</label>
            <input type="email" v-model="email" placeholder="Correo electrónico" required />

            <label>Contraseña</label>
            <input type="password" v-model="password" placeholder="Contraseña" required />

            <button type="submit" class="btn-submit">Ingresar</button>
            <p v-if="error" class="error">{{ error }}</p>
          </form>

          <div class="divider"><span>—————— o ——————</span></div>

          <router-link to="/register" class="btn-register">
            ¿No tienes cuenta? Regístrate
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UserService } from '../services/user.service';
export default {
  name: 'LoginComponent',
  data() {
    return {
      email: '',
      password: '',
      error: '',
      userService: new UserService()
    };
  },
  methods: {
    async handleLogin() {
      this.error = '';
      try {
        const response = await this.userService.getByEmail(this.email);
        const user = response.data.find(u => u.password === this.password);

        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.$router.push({ name: 'communities' });
        } else {
          this.error = 'Credenciales incorrectas';
        }
      } catch (e) {
        this.error = 'Error al autenticar';
        console.error(e);
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
.btn-submit {
  padding: 10px;
  border-radius: 20px;
  border: none;
  background-color: #CB6CE6;
  color: white;
  cursor: pointer;
  font-weight: bold;
  margin-top: 10px;
}

.btn-submit:hover {
  background-color: #CB6CE6;
}

.btn-register {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  border-radius: 20px;
  background-color: transparent;
  border: 1px solid #CB6CE6;
  color: #CB6CE6;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s, color 0.3s;
}

.btn-register:hover {
  background-color: #CB6CE6;
  color: #1e1e1e;
}

.error {
  color: #e74c3c;
  margin-top: 8px;
  text-align: left;
}
body {
  height: 100vh;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.containerLogin {
  display: flex;
  width: 900px;
  height: 600px;
  border-radius: 10px;
  overflow: hidden;

  justify-content: center;
  box-shadow: 0 0 25px rgba(184,111,255,0.5);
}
.wrapper {
  /* Ocupa toda la ventana */
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000; /* o transparente si prefieres */
}
.left {
  flex: 1;
  background-color: #000;
}

.left img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.right {
  flex: 1;
  background-color: #0e0e0e;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container {
  width: 80%;
  text-align: center;
}

.logo {
  width: 80px;
  margin-bottom: 15px;
}

h2 {
  margin-bottom: 20px;
}

.purple {
  color: #CB6CE6;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #888;
  background: transparent;
  color: white;
}


.divider {
  margin: 15px 0;
  color: #ccc;
  text-align: center;
}


label {
  display: block;
  text-align: left;
  margin-bottom: 5px;
  font-weight: 600;
}

</style>
