<script>
import { Loader } from '@googlemaps/js-api-loader';
import { ConcertService } from '@/concerts/services/concert.services';
import { Concert } from '@/concerts/model/concert.entity';

export default {
  name: "concert-map-component",
  data() {
    return {
      concerts: [],
      map: null,
      infoWindow: null,
      markers: [],
      userLocation: {
        lat: -12.076837528231636,
        lng: -77.09347965592731,
        icon: 'https://the-rumbling.github.io/StayMap-Landing_Page/starymaplogo.png'
      },
      concertService: null,
    };
  },
  methods: {
    loadMap() {
      const loader = new Loader({
        apiKey: 'AIzaSyAd-IuCKmGRzA4BsS2Yz_hR5FD6-XHUqjA',
        version: 'weekly',
      });

      loader.load().then(() => {
        this.map = new google.maps.Map(this.$refs.map, {
          center: this.userLocation,
          zoom: 13,
          disableDefaultUI: true,
        });

        new google.maps.Marker({
          position: this.userLocation,
          map: this.map,
          icon: {
            url: this.userLocation.icon,
            scaledSize: new google.maps.Size(40, 40)
          }
        });

        this.infoWindow = new google.maps.InfoWindow();

        this.concerts.forEach(concert => {
          const position = {
            lat: Number(concert.venueLat) + this.getRandomOffset(),
            lng: Number(concert.venueLng) + this.getRandomOffset()
          };

          const marker = new google.maps.Marker({
            position,
            map: this.map,
            icon: {
              url: 'https://the-rumbling.github.io/StayMap-Landing_Page/starymaplogo.png',
              scaledSize: new google.maps.Size(40, 40)
            }
          });

          marker.addListener('click', () => {
            const data = JSON.parse(JSON.stringify(concert));
            this.infoWindow.setContent(
                `<div style="font-family: Arial, sans-serif; color: black; padding: 4px;">
                  <h3 style="margin: 0; font-size: 16px;">${data.artistName}</h3>
                 <p style="margin: 0; font-size: 14px;">${data.venueName} - ${data.date}</p>
                </div>`
            );
            this.infoWindow.open(this.map, marker);
          });

          this.markers.push(marker);
        });
      });
    },
    getRandomOffset() {
      const offset = 0.00005;
      return (Math.random() - 0.5) * offset;
    },
    fetchConcerts() {
      this.concertService = new ConcertService();
      this.concertService.getAll().then(response => {
        console.log('API response:', response.data);
        this.concerts = response.data.data.map(c => new Concert(c));
        this.loadMap();
      });
    }
  },
  mounted() {
    this.fetchConcerts();
  }
};
</script>

<template>
  <div class="container">
    <div class="sidebar">
      <div v-for="concert in concerts" :key="concert.id" class="card">
        <h3>{{ concert.artistName }}</h3>
        <p>{{ concert.venueName }} - {{ concert.date }}</p>
        <span :class="['status-badge', concert.status === 'Available' ? 'available' : 'soldout']">
          {{ concert.status }}
        </span>
      </div>
    </div>
    <div class="map-section">
      <h1>Encuentra conciertos <span class="resaltado">cercanos</span></h1>
      <div ref="map" class="mapa-style"></div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  background-color: #121212;
  color: white;
}
.sidebar {
  width: 300px;
  background-color: #1e1e1e;
  padding: 1rem;
  overflow-y: auto;
}
.card {
  background: #2a2a2a;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
}
.status-badge {
  display: inline-block;
  margin-top: 0.5rem;
  padding: 0.2rem 0.6rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
}
.available {
  background-color: #2ecc71;
  color: white;
}
.soldout {
  background-color: #e74c3c;
  color: white;
}
.map-section {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}
.mapa-style {
  flex: 1;
  border-radius: 1rem;
  overflow: hidden;
}

/*RESALTADO*/
.resaltado {
  color: #b54cf4;
}
h3 {
  color: white;
}
</style>