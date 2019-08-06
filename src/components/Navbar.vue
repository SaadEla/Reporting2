<template>
    <nav>
        <v-toolbar flat app color="primary">
            <v-toolbar-title class="text-uppercase amber--text">
                <span>JP</span>
                <span class="font-weight-light">&</span>
                <span>CO</span>
            </v-toolbar-title>
            <!--Drop Down menu-->
            <v-menu offset-y row>
              <v-btn flat slot="activator" color="grey">
                <v-icon left>list_alt</v-icon>
              </v-btn>
            <!--List drop down-->
              <v-list class="primary white--text">
                <!-- Rapport des trajets-->  

                <v-list-tile >
                    <v-list-tile-title> 
                        <div>
                            <v-icon left class="white--text">time_to_leave</v-icon>
                            <span>Rapport des trajets</span>
                            <v-icon right class="white--text">chevron_right</v-icon>
                        </div>
                    </v-list-tile-title>
                </v-list-tile >
                <v-divider></v-divider>
                <v-list-tile>   
                    <v-list-tile-title>
                        <div>
                            <v-icon left class="white--text">assessment</v-icon>
                            <span>Rapport statistique</span>
                            <v-icon right class="white--text" slot="activator">chevron_right</v-icon>
                        </div>
                    </v-list-tile-title>
                </v-list-tile>

              </v-list>
            </v-menu>
            <!--End drop down-->
            <v-spacer></v-spacer>
            <!--SignOut-->
            <v-btn flat color="grey">
                <span>Sign Out</span>
                <v-icon>exit_to_app</v-icon>
            </v-btn>
      </v-toolbar>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      links: [
        { icon: 'dashboard', text: 'Dashboard', route: '/' },
        { icon: 'folder', text: 'My Projects', route: '/projects' },
        { icon: 'person', text: 'Team', route: '/team' },
      ],
      available: false
    }
  }
}
</script>

<style>
.v-list__tile  {
    padding: 3px;
}
.v-list{
    padding: 0px;
    
}
.div .span{
    font-size: 2px;
}
</style>