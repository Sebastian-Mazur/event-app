<template>    
    <v-layout 
        row 
        wrap
        justify-center
        align-center>
        <v-flex xs12 v-if="!isUserCreatedEvents"> 
            <v-card>
                <h2 class="display-2 text-xs-center pa-3">You don't create any events.</h2>
                <v-layout row justify-center>
                    <v-btn class="text-xs-center ma-3" color="primary" to="/event/new">Create event</v-btn>
                </v-layout>
            </v-card>
        </v-flex>
        <v-flex xs12 sm6 md6 v-for="(event) in myEvents" 
        :key="event.id" class="pa-2">
            <v-card>
                <v-container fluid>
                    <v-layout row>
                        <v-flex xs12>
                            <v-card-media
                                :src="event.imageUrl"
                                height="200px"
                            ></v-card-media>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs7 sm8 md9>
                            <v-card-title primary-title>
                                <div>
                                    <h3 class="headline primary--text">{{ event.title }}</h3>
                                    <h4 class="body-2 grey--text">{{ event.date }}</h4>
                                    <p class="text-cut subheading">{{event.description}}</p>
                                    <v-layout row wrap class="text-xs-left">
                                        <v-flex xs6 v-for="(chips, i) in event.categorySelect" :key="i">
                                            <span class="info--text text-xs-left">{{chips.toString()}}</span>                                                
                                        </v-flex>                                           
                                    </v-layout>                                         
                                </div>                                
                            </v-card-title>
                            <v-card-actions>
                                <v-layout justify-end row wrap>
                                    <v-flex xs6>
                                        <v-btn class="primary" flat :to="'/event/' + event.id">
                                            <v-icon left>arrow_forward</v-icon>
                                            Viwe event
                                        </v-btn>
                                    </v-flex>                                        
                                </v-layout>
                            </v-card-actions>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    data() {
        return {
            isUserCreatedEvents: false
        };
    },
    computed: {
        myEvents() {
            const events = this.$store.getters.loadedEvents;
            const user = this.$store.getters.user;
            let myEvents = events.filter(event => {
                return event.creatorID == user.id;
            });
            if (myEvents.length > 0) {
                this.isUserCreatedEvents = true;
            }
            return myEvents;
        }
    }
};
</script>
