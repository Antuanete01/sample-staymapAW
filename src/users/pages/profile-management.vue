<script>
export default {
  name: "profile-management",
  data() {
    return {
      user: null
    };
  },
  mounted() {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }
};
</script>

<template>
  <div class="profile-container">


    <div v-if="user" class="profile-card">


      <div class="profile-info">

        <h1><strong>Tipo:</strong> {{ user.type === 'fan' ? 'Fan' : 'Artista' }}</h1>
        <img :src="user.profileImage || 'https://via.placeholder.com/100'" alt="Foto de perfil" class="profile-img" />
        <p>{{ user.name }}</p>
        <p class="profile-email-info">{{ user.email }}</p>

      </div>

      <div class="profile-concert-attended">
        <h1><strong>Conciertos Asistidos</strong> </h1>
        <p>LOUIS TOMLINSON
          26 DE MAYO 2024</p>
        <p>STRAY KIDS
          09 DE ABRIL 2025</p>
        <p>HARRY STYLES
          29 DE NOV 2022</p>
        <p>COLDPLAY
          15 DE NOV 2022</p>
        <p>ZAYN
          21 DE ENERO 2025</p>
      </div>

      <div class="profile-concert-to-attended">
        <h1><strong>Conciertos Asistidos</strong> </h1>
        <p>LOUIS TOMLINSON
          26 DE MAYO 2024</p>
        <p>STRAY KIDS
          09 DE ABRIL 2025</p>
        <p>HARRY STYLES
          29 DE NOV 2022</p>
        <p>COLDPLAY
          15 DE NOV 2022</p>
        <p>ZAYN
          21 DE ENERO 2025</p>
      </div>


    </div>

    <div v-else>
      <p>No hay información de usuario disponible.</p>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  background-color: #000;
  color: white;
  font-family: Arial, sans-serif;
  padding: 40px;
  flex-wrap: wrap;
}

.profile-card {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 350px;
  padding: 30px;

  border-radius: 20px;

}

.profile-img {
  width: 100%;
  max-width: 200px;
  height: auto;
  border-radius: 50%;
  border: 4px solid #a855f7;
  object-fit: cover;
  margin-bottom: 20px;
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
}

.profile-info h1 {
  font-size: 22px;
  margin-bottom: 10px;
}

.profile-info p {
  font-size: 18px;
}

.profile-email-info {
  color: #aaa;
  font-size: 16px;
}

.profile-concert-attended,
.profile-concert-to-attended {
  background-color: #1f1f1f;
  padding: 30px;
  border-radius: 20px;
  width: 300px;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
}

.profile-concert-attended h1,
.profile-concert-to-attended h1 {
  font-size: 20px;
  margin-bottom: 16px;
}

.profile-concert-attended p,
.profile-concert-to-attended p {
  font-size: 16px;
  margin-bottom: 12px;
  border-bottom: 1px solid #333;
  padding-bottom: 6px;
}

/* Responsivo para pantallas pequeñas */
@media (max-width: 768px) {
  .profile-info {
    max-width: 100%;
    padding: 20px;
  }

  .profile-img {
    max-width: 150px;
  }

  .profile-concert-attended,
  .profile-concert-to-attended {
    width: 90%;
    padding: 20px;
  }

  .profile-info h1,
  .profile-concert-attended h1,
  .profile-concert-to-attended h1 {
    font-size: 18px;
  }

  .profile-info p,
  .profile-concert-attended p,
  .profile-concert-to-attended p {
    font-size: 14px;
  }
}

</style>
