<script>

import DataManager from "@/shared/components/data-manager.component.vue";
import {Concert} from "@/concerts/model/concert.entity.js";
import ConcertItemCreateAndEditComponent from "@/concerts/components/concert-item-create-and-edit.component.vue";
import {ConcertService} from "@/concerts/services/concert.services.js";

export default {
  name: "concert-management",
  components: {ConcertItemCreateAndEditComponent, DataManager},
  data() {
    return {
      title: {singular: "Concert", plural: "Concerts"},

      concerts: [],

      concert: new Concert({}),

      selectedConcerts: [],

      concertService: null,

      createAndEditDialogIsVisible: false,

      isEdit: false,

      submitted: false,

      selectedGenres: [], // ← para guardar los géneros seleccionados

      genres: [
        "Pop", "Rock", "K-pop", "Indie", "Urbano",
        "Electrónica", "Salsa", "Cumbia", "Jazz"
      ],

      currentUser: null

    }
  },

  computed: {
    filteredConcerts() {
      if (this.selectedGenres.length === 0) return this.concerts;

      return this.concerts.filter(concert =>
          this.selectedGenres.includes(concert.genre)
      );
    },
    //Funcion que sirver para condicionar la visibilidad del boton, se usa en el v-if
    isArtist() {
      return this.currentUser && this.currentUser.type === 'artist';
    }
  },


  methods: {

    notifySuccessfulAction(message) {
      this.$toast.add({severity: 'success', summary: 'Success', detail: message, life: 3000});
    },

    findIndexById(id) {
      return this.concerts.findIndex(concert => concert.id === id);
    },


    onNewItem() {
      this.concert = new Concert({});
      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
      console.log(this.createAndEditDialogIsVisible);
    },

    onEditItem(item) {
      this.concert = new Concert(item);
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },


    onDeleteItem(item) {
      this.concert = {...item};
      this.deleteConcert();
    },

    onDeleteSelectedItems(selectedItems) {
      this.selectedConcerts = selectedItems;
      this.deleteSelectedConcerts();
    },

    onCancelRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },

    onSaveRequested(item) {
      console.log('onSaveRequested');
      this.submitted = true;
      if (this.concert.artistName.trim()) {
        if (item.id) {
          this.updateConcert();
        } else {
          this.createConcert();
        }
        this.createAndEditDialogIsVisible = false;
        this.isEdit = false;
      }
    },

    createConcert() {
      const dataToSend = { ...this.concert };
      if (!dataToSend.id || dataToSend.id === '') {
        delete dataToSend.id;
      }

      this.concertService.create(dataToSend).then(response => {
        let concert = new Concert(response.data);
        this.concerts.push(concert);
        this.notifySuccessfulAction("concert Created");
      }).catch(error => {
        console.error('Error al crear concert ', error);
      });
    },

    updateConcert() {
      this.concertService.update(this.concert.id, this.concert).then(response => {
        console.log('updateConcert');
        let index = this.findIndexById(this.concert.id);
        this.concerts[index] = new Concert(response.data);
        console.log(this.concerts);
        this.notifySuccessfulAction("concert Updated");
      }).catch(error => console.error(error));
    },

    deleteConcert() {
      this.concertService.delete(this.concert.id).then(() => {
        let index = this.findIndexById(this.concert.id);
        this.concerts.splice(index, 1);
        this.notifySuccessfulAction("concert Deleted");
      }).catch(error => console.error(error));
    },

    deleteSelectedConcerts() {
      this.selectedConcerts.forEach((concert) => {
        this.concertService.delete(concert.id).then(() => {
          this.concert = this.concerts.filter((t) => t.id !== this.concert.id);
        });
      });
      this.notifySuccessfulAction("concert Deleted");
    }
  },


  created() {
    //Verifica si el usuario es tipo fan o artista
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
    this.concertService = new ConcertService();
    this.concertService.getAll().then(response => {
      this.concerts = response.data.data.map(c => new Concert(c));
    }).catch(error => console.error('Error al cargar concert ', error));
  }
}
</script>

<template>
  <div class="w-full">
    <!--DIALOGO PARA CREAR NUEVO CONCIERTO-->
    <div class="flex justify-content-between align-items-center mb-4" style="margin-left: 1.5rem;">
      <h2 class="text-2xl">Conciertos</h2>
      <pv-button
          v-if="isArtist"
          label="Nuevo concierto"
          icon="pi pi-plus"
          severity="success"
          @click="onNewItem"
          style="background-color: #CB6CE6; border-radius: 25px; border: none; color: white; font-weight: bold;"
      />
    </div>


    <div class="concerts-filter-container">
      <!-- Filtros -->
      <div class="filter-container">
        <div class="filter-header">
          <span>Filtrar</span>
        </div>
        <div class="filter-options">
          <label v-for="genre in genres" :key="genre" class="checkbox-label">
            <input type="checkbox" :value="genre" v-model="selectedGenres" />
            {{ genre }}
          </label>
        </div>
      </div>

      <!-- Lista de conciertos -->
      <div class="concerts-grid">
        <div v-for="concert in filteredConcerts" :key="concert.id" class="concert-card">
          <img :src="concert.image" :alt="concert.artistName" />
          <div class="concert-info">
            <h3>{{ concert.artistName }} </h3>
            <p>{{ concert.date }}, {{concert.venueName}}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Diálogo para Crear / Editar -->
    <concert-item-create-and-edit-component
        :edit="isEdit"
        :item="concert"
        :visible="createAndEditDialogIsVisible"
        @cancel-requested="onCancelRequested"
        @save-requested="onSaveRequested($event)"
    />
  </div>

</template>

<style >

</style>

