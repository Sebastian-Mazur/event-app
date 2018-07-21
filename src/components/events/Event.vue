<template>
    <v-container fluid>
        <v-layout row justify-center>
            <v-flex xs10>
                <v-card>
                    <v-card-media
                    class="white--text"
                    height="450px"
                    :src="event.imageUrl"
                    >
                        <v-container fill-height fluid>
                            <v-layout fill-height>
                            <v-flex xs12 align-end flexbox>
                                <p class="display-1">{{event.title}}</p>
                            </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-media>
                    <v-card-title>
                        <div>
                            <span class="body-2 grey--text">Start date: {{event.startDate}}, {{event.startTime}}</span><br>
                            <span class="body-2 grey--text">End date: {{event.endDate}}, {{event.endTime}}</span><br>
                            <span class="subheading"><span class="primary--text">Organizer name:</span> {{event.organizerName}}</span><br>
                            <span class="subheading" id="location">Adress: {{event.location.name}}, {{event.location.locality}}, {{event.location.country}}</span>
                            <p class="pt-4 body-2">{{event.description}}</p>
                        </div>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-layout row wrap justify-start>
                            <v-flex xs10 md2 class="mt-2">
                                <edit-event v-if="userIsCreator" :event="event"></edit-event>
                            </v-flex>                                           
                            <v-flex xs10 md2 class="mt-2">
                                <delete-event v-if="userIsCreator" :id="event.id"></delete-event>
                            </v-flex>  
                            <v-spacer></v-spacer> 
                            <v-btn color="info" v-if="!userIsCreator && userIsAuthenticated" @click="registerEvent">Register</v-btn>       
                        </v-layout>
                    </v-card-actions>
                    <v-divider></v-divider>
                    <div class="google-map" id="googleMap"></div>
                </v-card>
            </v-flex>
            
        </v-layout>
        
    </v-container>
</template>

<script>
import googleMaps from "../extras/googleMaps";

export default {
    props: ["id"],
    computed: {
        event() {
            return this.$store.getters.loadedEvent(this.id);
        },
        userIsAuthenticated() {
            return this.$store.getters.userIsAuthenticated;
        },
        userIsCreator() {
            if (!this.userIsAuthenticated) {
                return false;
            }
            return this.$store.getters.user.id === this.event.creatorID;
        }
    },
    mounted: function() {
        const location = this.event;
        googleMaps.googleMaps(location);
    },
    methods: {
        registerEvent() {}
    }
};
</script>

<style>
.google-map {
    width: 48vw;
    height: 40vh;
    margin: 0 auto;
    background: gray;
}
</style>
