

<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">INFORMATIONS GENERAL</v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">PERSONNALISER LES COLONNES</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">NOTIFICATION</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <!-- étape 1 du rapport  -->

      <v-stepper-content step="1">
        <v-card class="mb-12">
          <v-card-title>
            <h4>Vous pouvez créer un rapport qui sera générer à la demande.</h4>
          </v-card-title>
          <v-card-text>
            <v-form class="px-3" ref="form">
              <!-- layout 1 -->
              <v-layout>
                <!-- Libellé -->

                <v-flex sm5 md5>
                  <v-text-field
                    v-model="title"
                    label="Libellé "
                    prepend-icon="folder"
                    :rules="inputRules"
                  ></v-text-field>
                </v-flex>
                <v-flex sm1 md1></v-flex>
                <!-- Heure début -->

                <v-flex sm2 md2>
                  <v-menu
                    ref="menu"
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="time"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="time"
                        label="Heure début"
                        prepend-icon="access_time"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="menu2"
                      v-model="time"
                      full-width
                      @click:minute="$refs.menu.save(time)"
                    ></v-time-picker>
                  </v-menu>
                </v-flex>
                <!-- Heure fin -->

                <v-flex sm2 md2>
                  <v-menu
                    ref="menu1"
                    v-model="menu1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="time1"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="time1"
                        label="Heure fin"
                        prepend-icon="access_time"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="menu1"
                      v-model="time1"
                      full-width
                      @click:minute="$refs.menu1.save(time1)"
                    ></v-time-picker>
                  </v-menu>
                </v-flex>
              </v-layout>

              <!-- layout 2 -->
              <v-layout>
                <!-- Description -->

                <v-flex sm5 md5>
                  <v-textarea
                    v-model="content"
                    label="Description"
                    prepend-icon="edit"
                    :rules="inputRules"
                  ></v-textarea>
                </v-flex>
                <v-flex sm1 md1></v-flex>
                <!-- Date départ -->

                <v-flex sm2 md2>
                  <v-menu
                    ref="menu3"
                    v-model="menu3"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    v-if="!checkbox"
                    :return-value.sync="date"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="date3"
                        label="Date départ"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date3" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="menu3 = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.menu3.save(date3)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
                <!-- Date fin -->

                <v-flex sm2 md2>
                  <v-menu
                    ref="menu4"
                    v-model="menu4"
                    v-if="!checkbox"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="date"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="date4"
                        label="Date fin"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date4" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="menu4 = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.menu4.save(date4)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex sm1 md1></v-flex>
                <!-- checkbox planifié pour les rapports !!!!!!!!!!!!!!!!!!!!!!! -->

                <!--                 <v-checkbox v-model="checkbox" :label="`Planifié`"></v-checkbox>
                -->
              </v-layout>

              <v-layout>
                <v-flex sm2 md2></v-flex>
                <v-flex sm1 md1></v-flex>
                <v-flex sm2 md2></v-flex>
                <v-flex sm1 md1></v-flex>

                <v-flex md3 sm3>
                  <v-select
                    v-model="selected"
                    :items="selec"
                    :rules="[(v) => !!v || 'Item is required']"
                    label="selectionner"
                    multiple
                  >
                    <template v-slot:prepend-item>
                      <v-list-tile ripple @click="toggle">
                        <v-list-tile-action>
                          <v-icon :color="selected.length > 0 ? 'indigo darken-4' : ''">{{ icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title>Select All</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </template>
                    <template v-slot:append-item></template>
                  </v-select>
                </v-flex>
                <v-flex sm1 md1></v-flex>
                <v-flex md2 sm2 d-flex offset-x>
                  <v-select :items="par" label="Afficher par" @change="changed" v-model="Spar" solo></v-select>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>

        <v-btn color="primary" @click="e1 = 2">Continue</v-btn>

        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

        <v-btn color="primary" @click="e1 = 3">Continue</v-btn>

        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

        <v-btn color="primary" @click="e1 = 1">Continue</v-btn>

        <v-btn text>Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
import { relay_api } from "../plugins/axios";

export default {
  data() {
    return {
      e1: 0,
      foo: 50,
      code: [],
      vehic: [],
      matricule: [],
      codeConducteur: [],
      selected: [],
      checkbox: false,

      Spar: "Afficher par",
      selec: [],

      par: ["Afficher par", "=>code", "=>matricule", "=>codeConducteur"],
      foo1: 0,
      time: null,
      menu2: false,
      time1: null,
      menu1: false,
      date3: new Date().toISOString().substr(0, 10),
      date4: new Date().toISOString().substr(0, 10),

      menu3: false,
      menu4: false
    };
  },

  computed: {
    likesAllselec() {
      return this.selected.length === this.selec.length;
    },
    likesSomeselec() {
      return this.selected.length > 0 && !this.likesAllselec;
    },
    icon() {
      if (this.likesAllselec) return "mdi-close-box";
      if (this.likesSomeselec) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    }
  },
  created() {
    relay_api
      .get("/users/496/vehicles?with=relationships")
      .then(response => {
        this.vehic = response.data;
      })
      .catch(e => {
        console.error(e);
      });
  },
  methods: {
    /* button pour detecter l'événement "Afficher par :" */

    changed(value) {
      if (this.Spar == "=>code") {
        this.parCode(this.vehic);
      } else if (this.Spar == "=>matricule") {
        this.parMatricule(this.vehic);
      } else {
        this.parCodeConducteur(this.vehic);
      }
    },
    /* afficher par code */

    parCode(vehic) {
      for (var i = 0; i < vehic.length; i++) {
        this.code.push(vehic[i].name);
      }
      this.selec = this.code;
    },
    /* afficher par matricule */

    parMatricule(vehic) {
      for (var i = 0; i < vehic.length; i++) {
        this.matricule.push(vehic[i].registration_number);
      }
      this.selec = this.matricule;
    },
    /* afficher par codeConducteur */

    parCodeConducteur(vehic) {
      for (var i = 0; i < vehic.length; i++) {
        this.codeConducteur.push(vehic[i].driver);
      }
      this.selec = this.codeConducteur;
    },

    increment() {
      this.foo = parseInt(this.foo, 10) + 1;
    },
    decrement() {
      this.foo = parseInt(this.foo, 10) - 1;
    },
    increment1() {
      this.foo = parseInt(this.foo1, 10) + 1;
    },
    decrement1() {
      this.foo1 = parseInt(this.foo1, 10) - 1;
    },
    toggle() {
      this.$nextTick(() => {
        if (this.likesAllselec) {
          this.selected = [];
        } else {
          this.selected = this.selec.slice();
        }
      });
    }
  }
};
</script>
