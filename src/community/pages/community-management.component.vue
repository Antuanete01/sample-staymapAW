<script>
import {Community} from "@/community/model/community.entity.js";
import CommunityItemCreateAndEditComponent from "@/community/components/community-item-create-and-edit.component.vue";
import DataManager from "@/shared/components/data-manager.component.vue";
import {CommunityService} from "@/community/services/community.service.js"

export default {
  name: "community-management",
  components: {CommunityItemCreateAndEditComponent, DataManager},
  data() {
    return {
      title: {singular: "Community", plural: "Communities"},

      communities: [],

      community: new Community({}),

      selectedCommunities: [],

      communityService: null,

      createAndEditDialogIsVisible: false,

      isEdit: false,

      submitted: false,
    }
  },
  methods: {

    notifySuccessfulAction(message) {
      this.$toast.add({severity: 'success', summary: 'Success', detail: message, life: 3000});
    },

    findIndexById(id) {
      return this.communities.findIndex(community => community.id === id);
    },


    onNewItem() {
      this.community = new Community({});
      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
      console.log(this.createAndEditDialogIsVisible);
    },

    onEditItem(item) {
      this.community = new Community(item);
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },


    onDeleteItem(item) {
      this.community = {...item};
      this.deleteCommunity();
    },

    onDeleteSelectedItems(selectedItems) {
      this.selectedCommunities = selectedItems;
      this.deleteSelectedCommunities();
    },

    onCancelRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },

    onSaveRequested(item) {
      console.log('onSaveRequested');
      this.submitted = true;
      if (this.community.name.trim()) {
        if (item.id) {
          this.updateCommunity();
        } else {
          this.createCommunity();
        }
        this.createAndEditDialogIsVisible = false;
        this.isEdit = false;
      }
    },

    createCommunity() {
      const dataToSend = { ...this.community };
      if (!dataToSend.id || dataToSend.id === '') {
        delete dataToSend.id;
      }

      this.communityService.create(dataToSend).then(response => {
        let community = new Community(response.data);
        this.communities.push(community);
        this.notifySuccessfulAction("Community Created");
      }).catch(error => {
        console.error('Error al crear comunidad ', error);
      });
    },

    updateCommunity() {
      this.communityService.update(this.community.id, this.community).then(response => {
        console.log('updateCommunity');
        let index = this.findIndexById(this.community.id);
        this.communities[index] = new Community(response.data);
        console.log(this.communities);
        this.notifySuccessfulAction("Community Updated");
      }).catch(error => console.error(error));
    },

    deleteCommunity() {
      this.communityService.delete(this.community.id).then(() => {
        let index = this.findIndexById(this.community.id);
        this.communities.splice(index, 1);
        this.notifySuccessfulAction("Community Deleted");
      }).catch(error => console.error(error));
    },

    deleteSelectedCommunities() {
      this.selectedCommunities.forEach((community) => {
        this.communityService.delete(community.id).then(() => {
          this.community = this.communities.filter((t) => t.id !== this.community.id);
        });
      });
      this.notifySuccessfulAction("Communities Deleted");
    }
  },


 created() {
  this.communityService = new CommunityService();
  this.communityService.getAll()
    .then(communities => {
      console.log('API response:', communities);
      this.communities = communities;
    })
    .catch(error => console.error('Error al cargar comunidades', error));
}
}
</script>

<template>
  <div class="w-full">
    <!--
    DIALOGO PARA CREAR NUEVA COMUNIDAD
    -->
    <div class="flex justify-content-between align-items-center mb-4" style="margin-left: 1.5rem;">
      <h2 class="text-2xl">Comunidades</h2>
      <pv-button label="Nueva comunidad" icon="pi pi-plus" severity="success" @click="onNewItem"/>
    </div>

    <!-- Cards Grid pero con botones para modificar y eliminar -->
   <!-- <div class="grid">
      <div v-for="community in communities" :key="community.id" class="col-12 md:col-4">
        <pv-card class="h-full">
          <template #header>
            <img :src="community.image" alt="Community Image" class="w-full h-12rem object-cover border-round-top"/>
          </template>
          <template #title>
            <h3>{{ community.name }}</h3>
          </template>
          <template #content>
            <p><strong>Members:</strong> {{ community.memberQuantity }}</p>
          </template>
          <template #footer>
            <div class="flex justify-content-end gap-2">
              <pv-button icon="pi pi-pencil" severity="info" outlined @click="onEditItem(community)" />
              <pv-button icon="pi pi-trash" severity="danger" outlined @click="onDeleteItem(community)" />
            </div>
          </template>
        </pv-card>
      </div>
    </div> -->
    <!-- Cards Grid con el boton de unirse al grupo-->


    <div class="communities-group-container">

          <div class="groups-container">
            <div class="groups-header">
              <span>Grupos</span>
            </div>
            <div class="groups-options">
               <a>Descubrir</a>
              <a>Tus Grupos</a>
            </div>
          </div>



        <div class="grid">
          <div v-for="community in communities" :key="community.id" class="col-12 md:col-6 lg:col-3">
            <div class="community-card">
              <img :src="community.image" :alt="community.name" />
              <div class="info">
                <h3>{{ community.name }}</h3>
                <p>{{ community.memberQuantity }} miembros</p>
              </div>
              <button class="join-button">Unirte al grupo</button>
            </div>
          </div>
        </div>
        <!-- Diálogo para Crear / Editar -->
        <community-item-create-and-edit-component
            :edit="isEdit"
            :item="community"
            :visible="createAndEditDialogIsVisible"
            @cancel-requested="onCancelRequested"
            @save-requested="onSaveRequested($event)"
        />
      </div>
    </div>
</template>

<style >

</style>
