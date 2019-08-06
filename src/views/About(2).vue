<template>
  <div>
    <!--our card-->
    <v-card class="card1">
      <v-card-title>
        <h2 class="font-weight-light display-1">Modèles et planification</h2>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <!--another one -->
        <v-card class="card2" flat>
          <v-card-text class="cardtext2">
            <!--layout and files to display visibility better-->
            <v-layout>
              <v-flex xs6 md2>
                <v-text-field
                  outline
                  v-model="recherche"
                  label="Rechercher"
                  prepend-icon="youtube_searched_for"
                ></v-text-field>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs6 md1>
                <v-btn color="primary">Ajouter</v-btn>
              </v-flex>
            </v-layout>
            <!--tableau d'affichage ( Modèles et planification ) -->

            <table>
              <tr>
                <th v-for="col in cols" :key="col.name">{{col.name}}</th>
              </tr>
              <tr v-for="post in filteredrapp" v-bind:key="post.id">
                <td>{{post.seqId}}</td>
                <td>{{post.displayName}}</td>
                <td>trajet -{{post.type}}</td>
                <td>{{post.creationDate}}</td>
                <td>{{post.lastModification}}</td>

                <td v-if="post.schedule">oui ( {{post.state +" - "+post.schedule.frequency}} )</td>
                <td v-else>non</td>
                <template v-if="post.criteria.vehicles.length==1">
                  <template v-for="veh in vehic">
                    <template v-if="post.criteria.vehicles[0]==veh.id">
                      <td v-bind:key="veh">{{veh.name}}</td>
                    </template>
                  </template>
                </template>
                <template v-else>
                  <td>
                    <v-btn
                      color="#BBDEFB"
                      @click="afficherVeh(post)"
                    >afficher ({{post.criteria.vehicles.length}})</v-btn>
                  </td>
                </template>
                <!--button icons-->
                <!-- if le modèle est planifié -->
                <td v-if="post.schedule" class="btnicon">
                  <!--Modifier-->
                  <v-btn fab flat small title="Modifier">
                    <v-icon>create</v-icon>
                  </v-btn>
                  <!--Cloner-->
                  <v-btn fab flat small title="Cloner">
                    <v-icon>filter_none</v-icon>
                  </v-btn>
                  <!--Activer-->
                  <v-btn
                    v-if="post.state=='ACTIVATED'"
                    fab
                    flat
                    small
                    title="Désactiver"
                    @click="desactiveId(post)"
                  >
                    <v-icon>highlight_off</v-icon>
                  </v-btn>
                  <!-- désactiver -->
                  <v-btn
                    v-if="post.state=='DEACTIVATED'"
                    fab
                    flat
                    small
                    title="Activer"
                    @click="activeId(post)"
                  >
                    <v-icon>check_circle_outline</v-icon>
                  </v-btn>
                  <!--supprimer-->
                  <v-btn fab flat small title="Supprimer" @click="suppId(post)">
                    <v-icon>delete</v-icon>
                  </v-btn>
                </td>
                <!-- le modèle n'est pas planifié -->
                <td v-if="! post.schedule" class="btnicon">
                  <!--Modifier-->
                  <v-btn fab flat small title="Modifier">
                    <v-icon>create</v-icon>
                  </v-btn>
                  <!--Cloner-->
                  <v-btn fab flat small title="Cloner">
                    <v-icon>filter_none</v-icon>
                  </v-btn>
                  <!--Lancer-->
                  <v-btn fab flat small title="Lancer">
                    <v-icon>play_arrow</v-icon>
                  </v-btn>
                  <!--supprimer-->
                  <v-btn fab flat small title="Supprimer" @click="suppId(post)">
                    <v-icon>delete</v-icon>
                  </v-btn>
                  <!--fin button icon-->
                </td>
                <v-layout justify-center>
                  <!-- popup pour delete(vérification du choix ) -->

                  <!-- pop up verification activer un rapport  -->
                  <v-dialog v-model="dialog2" persistent width="700">
                    <v-card>
                      <v-card-title class="headline">Changement d'état de modèle</v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>Vous voulez vraiment activer ce modèle ?</v-card-text>
                      <v-divider></v-divider>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text @click="dialog2 = false">Annuler</v-btn>
                        <v-btn color="error" text @click="active(supp2)">activer</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                  <!-- pop up verification désactiver un rapport  -->
                  <v-dialog v-model="dialog3" persistent width="700">
                    <v-card>
                      <v-card-title class="headline">Changement d'état de modèle</v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>Vous voulez vraiment désactiver ce modèle ?</v-card-text>
                      <v-divider></v-divider>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text @click="dialog3 = false">Annuler</v-btn>
                        <v-btn color="error" text @click="desactive(supp3)">désactiver</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-layout>
              </tr>
            </table>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>

    <!-- pop up afficher -->
    <v-dialog v-model="dialog1" width="800">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          <!-- nombre de vehicules -->
          <div class="font-weight-medium">{{vehid.length}}</div>
          <div class="font-weight-light">) Véhicules trouvés</div>
          <v-spacer></v-spacer>
          <!-- button fermer -->
          <v-btn color="error" flat @click="dialog1 = false">Fermer</v-btn>
        </v-card-title>

        <v-card-text>
          <v-text-field
            outline
            small
            v-model="recherch"
            label="Rechercher"
            prepend-icon="youtube_searched_for"
          ></v-text-field>
        </v-card-text>
        <table>
          <tr>
            <td v-for="col in colls" :key="col.name">{{col.name}}</td>
          </tr>
          <!-- affichage des vehicules -->
          <tr v-for="id in vehid" v-bind:key="id">
            <template v-for="veh in filteredrapp1">
              <template v-if="id==veh.id">
                <td v-bind:key="veh">{{veh.registration_number}}</td>
                <td v-bind:key="veh">{{veh.name}}</td>
                <td v-bind:key="veh">{{veh.driver}}</td>
              </template>
            </template>
          </tr>
        </table>
      </v-card>
    </v-dialog>
    <!-- popup verification (Supprimer) -->
    <v-dialog v-model="dialog" persistent width="700">
      <v-card>
        <v-card-title class="headline">Suppression de modèle</v-card-title>
        <v-divider></v-divider>
        <!-- Id du modèle qu'on va supprimer -->
        <v-card-text>Attention vous étes sur le point de supprimer le modèle : {{supp.seqId}}.</v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- buttons annuler -- Supprimer -->
          <v-btn color="green darken-1" text @click="dialog = false">Annuler</v-btn>
          <v-btn color="error" text @click="supprimer()">Supprimer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
/* importation axios */
import { reporting_api, relay_api } from "../plugins/axios";

export default {
  data() {
    return {
      posts: [],
      vehid: [],
      vehic: [],
      last: [],
      recherche: "",
      dialog: false,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      id: {
        idv: [],
        leng: 0
      },
      rechercher: "",
      planifie: "",
      planif: "",
      plan: "",
      recherch: "",
      colls: [{ name: "Matricule" }, { name: "Code" }, { name: "Conducteur" }],
      supp: [],
      supp2: [],
      supp3: [],
      activer: false,
      table: false,
      index: false,
      cols: [
        { name: "Id" },
        { name: "Libellé" },
        { name: "Type" },
        { name: "Date de création" },
        { name: "Dérnière modification" },
        { name: "Planifié" },
        { name: "Véhicules" },
        { name: "" }
      ]
    };
  },
  computed: {
    /* fonction por filter les modèles (Rechercher) */
    filteredrapp: function() {
      return this.posts.filter(mat => {
        return mat.creationDate.match(this.recherche);
      });
    },
    /* fonction pour filtrer les vehicules sur popup */
    filteredrapp1: function() {
      return this.vehic.filter(mat => {
        return mat.name.match(this.recherch);
      });
    }
  },
  methods: {
    /* fonction pour afficher les vehicules */
    afficherVeh(post) {
      this.vehid = post.criteria.vehicles;
      this.dialog1 = true;
    },
    /* fonction pour recuperer le modèles qu'on doit supprimer et afficher le popup */
    suppId(post) {
      this.supp = post;
      this.dialog = true;
    },
    /* fonction pour supprimer le modèle  */
    supprimer() {
      reporting_api
        .delete("/templates/" + this.supp.templateId, {})
        .then(response => {
          const idx = this.posts.indexOf(this.supp);
          this.posts.splice(idx, 1);
          this.dialog = false;
        })
        .catch(e => {
          console.error(e);
        });
    },
    activeId(post) {
      this.supp2 = post;
      this.dialog2 = true;
    },
    desactiveId(post) {
      this.supp3 = post;
      this.dialog3 = true;
    },
    /* fonction pour activer le modèle */
    active(supp2) {
      supp2.state = "ACTIVATED";
      this.dialog2 = false;
    },
    /* fonction por désactiver le modèle */
    desactive(supp3) {
      supp3.state = "DEACTIVATED";
      this.dialog3 = false;
    },
    afficher(vehicles, vehic) {
      for (var i = 0; i < vehicles.length; i++) {
        for (var j = 0; j < vehic.length; j++) {
          if (vehicles[i] == vehic[j].id) {
            this.last.push(vehic[j].name);
          }
        }
      }
      alert(this.last);
      this.last = [];
    },
    refresh: function() {}
  },
  created() {
    reporting_api
      .get("/templates", {})
      .then(response => {
        this.posts = response.data;
      })
      .catch(e => {
        console.error(e);
      });
    relay_api
      .get("/users/496/vehicles?with=relationships")
      .then(response => {
        this.vehic = response.data;
      })
      .catch(e => {
        console.error(e);
      });
  }
};
</script>

<style>
.v-card.card1 {
  margin-top: 25px;
}
.v-card.card2 {
  border: 0.5px solid #e0e0e0;
  padding-top: 0px;
}
.v-divider {
  margin: 17px;
}
.refresh {
  margin-left: 70px;
  margin-top: 20px;
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
  background-color: #eee;
}
.v-btn {
  margin: 0px;
}
.btnicon {
  text-align: center;
}
</style>