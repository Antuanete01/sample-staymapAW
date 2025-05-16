<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      isAuthenticated: localStorage.getItem('user') !== null,
      user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
      items: [
        { label: 'option.concerts', to: '/concerts' },
        { label: 'option.map', to: '/concerts-map' },
        { label: 'option.communities', to: '/communities' },
      ],
    };
  },

  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    },
    logout() {
      localStorage.removeItem('user')
      this.isAuthenticated = false
      this.$router.push({ name: 'login' })
    }
  },
  computed: {
    isAuthPage() {
      return ['login', 'register'].includes(this.$route.name)
    }
  },
  watch: {
    $route() {
      this.isAuthenticated = localStorage.getItem('user') !== null;
      this.user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    },
  }

}


</script>


<template>
  <pv-toast />
  <pv-confirm-dialog />

  <header v-if="!isAuthPage">
    <pv-toolbar class="custom-toolbar">
      <!-- Logo a la izquierda -->
      <template #start>
        <div class="logo-section">
          <img
              src="https://the-rumbling.github.io/StayMap-Landing_Page/starymaplogo.png"
              alt="Logo"
              class="logo"
          />
        </div>
      </template>

      <!-- Navegación al centro -->
      <template #center>
        <div class="flex gap-7 justify-center items-center">
          <router-link
              v-for="item in items"
              :key="item.label"
              :to="item.to"
              class="nav-button"
          >
            {{ $t(item.label) }}
          </router-link>
        </div>
      </template>

      <!-- Login o imagen + logout a la derecha -->
      <template #end>
        <div class="flex items-center gap-4">
          <!-- Si no está autenticado, muestra botón de login -->
          <router-link
              v-if="!isAuthenticated"
              to="/login"
              class="nav-button"
          >
            Iniciar Sesión
          </router-link>

          <!-- Si está autenticado, muestra imagen de perfil (clicable) + logout -->
          <div v-else class="flex items-center gap-2">
            <div class="profile-image">
            <!-- Imagen que lleva al perfil -->
            <router-link to="/profile">
              <img
                  :src="user?.profileImage || 'https://via.placeholder.com/32'"
                  alt="Perfil"
                  class="w-8 h-8 rounded-full object-cover border cursor-pointer"
              />
            </router-link>
          </div>
            <button
                @click="logout"
                class="nav-button"
            >
              Cerrar Sesión
            </button>
          </div>

        </div>
      </template>
    </pv-toolbar>
    <pv-drawer v-model:visible="drawer" />
  </header>

  <main>
    <router-view />
  </main>
</template>


<style>

</style>
