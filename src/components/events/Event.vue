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
export default {
    props: ["id"],
    computed: {
        event() {
            console.log(this.$store.getters.loadedEvent(this.id));
            return this.$store.getters.loadedEvent(this.id);
        },
        userIsAuthenticated() {
            return (
                this.$store.getters.user !== null &&
                this.$store.getters.user !== undefined
            );
        },
        userIsCreator() {
            if (!this.userIsAuthenticated) {
                return false;
            }
            return this.$store.getters.user.id === this.event.creatorID;
        }
    },
    mounted: function() {
        const myLatLng = {
            lat: this.event.location.latitude,
            lng: this.event.location.longitude
        };

        const map = new google.maps.Map(document.getElementById("googleMap"), {
            zoom: 10,
            center: myLatLng
        });

        const marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: "Hello World!"
        });

        const infowindow = new google.maps.InfoWindow();
        const service = new google.maps.places.PlacesService(map);

        service.getDetails(
            {
                placeId: this.event.location.place_id
            },
            function(place, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    const marker = new google.maps.Marker({
                        map: map,
                        position: place.geometry.location
                    });
                    google.maps.event.addListener(marker, "click", function() {
                        infowindow.setContent(
                            "<div><strong>" +
                                place.name +
                                "</strong><br>" +
                                place.formatted_address +
                                "</div>"
                        );
                        infowindow.open(map, this);
                    });
                }
            }
        );
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
