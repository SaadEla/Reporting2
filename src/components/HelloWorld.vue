<template>
  <v-container fluid grid-list-md>
    <!-- card Rapport instantané -->
    <v-card flat>
      <v-layout wrap>
        <v-card-title class="mx-4">
          <h2>Rapport instantané</h2>
        </v-card-title>
        <v-spacer></v-spacer>
        <!-- button Afficher le tableau du modèles -->
        <!--         <v-btn class="primary white--text" flat v-on:click="afficher">Afficher les modèles existants</v-btn>
        -->
      </v-layout>

      <v-layout>
        <v-menu offset-y full-width="200px">
          <v-btn flat slot="activator" color="grey">
            <v-icon left>expand_more</v-icon>
            <span>RAPPORT TRAJET</span>
          </v-btn>
          <v-list>
            <v-list-tile v-for="link in trajet" :key="link.text" router :to="link.route">
              <v-list-tile-title>{{ link.text }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-menu offset-y>
          <v-btn flat slot="activator" color="grey">
            <v-icon left>expand_more</v-icon>
            <span>RAPPORT STATISTIQUE</span>
          </v-btn>
          <v-list>
            <v-list-tile v-for="link in statistique" :key="link.text" router :to="link.route">
              <v-list-tile-title>{{ link.text }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-layout>

      <!-- <v-layout wrap>
        <v-flex xs12 md3>
          <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="test">
              <v-card-title class="mx-4 caption primary--text">
                <h3>RAPPORT TRAJET</h3>
              </v-card-title>
              <div>
                <v-btn class="button" flat small href="/about">Rapport de proximité</v-btn>
              </div>
              <div>
                <v-btn class="button" flat small>Rapport d'arrêt</v-btn>
              </div>
            </v-card>
          </v-hover>
        </v-flex>
        <v-flex xs12 md3>
          <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="test1">
              <v-card-title class="mx-4 caption primary--text">
                <h3>RAPPORT STATISTIQUE</h3>
              </v-card-title>
              <div>
                <v-btn class="button" flat small>Rapport statistique général flotte</v-btn>
              </div>
              <div>
                <v-btn class="button" flat small>Rapport statistique véhicule flotte</v-btn>
              </div>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>-->

      <v-divider></v-divider>
      <!-- tableaux d'affichage du modéles -->
      <!--       <v-div v-if="table">
      -->
      <table>
        <tr>
          <th>ID</th>
          <th>Libellé</th>
          <th>Type</th>
          <th>Action</th>
        </tr>
        <tr v-for="post in posts" v-bind:key="post.id">
          <td v-if="!post.schedule">{{post.seqId}}</td>
          <td v-if="!post.schedule">{{post.displayName}}</td>
          <td v-if="!post.schedule">{{post.type}}</td>
          <td v-if="!post.schedule">
            <a href="#">Choisir</a>
          </td>
        </tr>
      </table>
      <!--       </v-div>
      -->
    </v-card>
  </v-container>
</template>
<script>
import { reporting_api } from "../plugins/axios";

export default {
  data() {
    return {
      posts: [],
      rt: "  rapport trajet",
      rs: "  rapport statistique",
      trajet: [
        { text: "=>Rapport de proximité", route: "/about" },
        { text: "=>Rapport d'arrêt", route: "/about" }
      ],
      statistique: [
        { text: "=>Rapport statistique général flotte", route: "/about" },
        { text: "=>Rapport statistique véhicule flotte", route: "/about" }
      ],
      table: false
    };
  },
  methods: {
    afficher() {
      this.table = !this.table;
    }
  },

  /* recupération des données */
  created() {
    reporting_api
      .get("/templates", {})
      .then(response => {
        this.posts = response.data;
      })
      .catch(e => {
        console.error(e);
      });
  }
};
</script>
<style>
.test {
  margin-bottom: 1.55rem;
  margin-right: 0.2rem;
  width: 100%;
}
.test1 {
  margin-bottom: 1.55rem;
  margin-left: 0.55rem;
  width: 100%;
}
.button {
  margin-bottom: 1.55rem;
  margin-left: 0.7rem;

  width: 90%;
}

.topbutton {
  margin-bottom: 1.55rem;
  margin-top: 2rem;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: rgb(148, 171, 245);
}
</style>