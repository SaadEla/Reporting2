<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="800">
      <template v-slot:activator="{ on }">
        <v-btn flat color="primary" light v-on="on">Afficher</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          <div class="font-weight-medium">{{vehid.leng}}</div>
          <div class="font-weight-light">Véhicules trouvés</div>
          <v-spacer></v-spacer>
          <v-btn color="error" flat @click="dialog = false">Fermer</v-btn>
        </v-card-title>

        <v-card-text>
          <v-text-field
            outline
            small
            v-model="recherche"
            label="Rechercher"
            prepend-icon="youtube_searched_for"
          ></v-text-field>
        </v-card-text>
        <table>
          <tr>
            <td v-for="col in cols" :key="col.name">{{col.name}}</td>
          </tr>

          <tr v-for="idv in vehid.idv" v-bind:key="idv">
            <template v-for="veh in filteredrapp" >
              <template v-if="idv==veh.id">
                <td v-bind:key="veh">{{veh.registration_number}}</td>
                <td v-bind:key="veh">{{veh.name}}</td>
                <td v-bind:key="veh">{{veh.driver}}</td>
              </template>
            </template>
          </tr>
        </table>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { reporting_api, relay_api } from "../plugins/axios";

export default {
  props: ["vehid"],
  data() {
    return {
      dialog: false,
      posts: [],
      recherche:"",
      vehic: [],
      last: [],
      cols: [{ name: "Matricule" }, { name: "Code" }, { name: "Conducteur" }]
    };
  },
computed: {
    filteredrapp: function(){
      return this.vehic.filter((mat) => {
        return mat.name.match(this.recherche);
      });
    }
    },
  created() {
    /* reporting_api
      .get("/templates", {})
      .then(response => {
        this.posts = response.data;
      })
      .catch(e => {
        console.error(e);
      }); */
    /* relay_api
      .get("/users/496/vehicles?with=relationships")
      .then(response => {
        this.vehic = response.data;
      })
      .catch(e => {
        console.error(e);
      }); */
  }
};
</script>

<style>
.font-weight-light {
  margin-left: 20px;
}
</style>