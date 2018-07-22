<template>
    <div>
        <v-layout 
            row 
            wrap
            justify-center
            align-center>
            <v-flex xs11>
                <v-tabs
                    v-model="active"
                    color="primary"
                    dark
                    slider-color="accent"
                    >
                    <v-tab                        
                        ripple
                        @click="searchByCategories= []; searchByLocation = ''"
                    >
                        Search events by title
                    </v-tab>
                    <v-tab-item class="height-card">
                        <v-card>
                            <v-card-text>
                                <v-subheader class="display-1">Search events</v-subheader>
                                <v-container>
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-text-field
                                                
                                                name="searchByTitle"
                                                label="Search by title"
                                                v-model="searchByTitle"
                                                active-class="accent"
                                            ></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab                        
                        ripple
                        @click="searchByCategories= []; searchByTitle = ''"
                    >
                        Search events by location
                    </v-tab>
                    <v-tab-item class="height-card">
                        <v-card>
                            <v-card-text>
                                <v-subheader class="display-1">Search events</v-subheader>
                                <v-container>
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-text-field
                                                name="searchByLocation"
                                                label="Search by location"
                                                v-model="searchByLocation"
                                            ></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab                        
                        ripple
                        @click="searchByTitle= ''; searchByLocation = ''"
                    >
                        Search events by categories                        
                    </v-tab>
                    <v-tab-item class="height-card">
                        <v-card>
                            <v-card-text>
                                <v-subheader class="display-1">Search events</v-subheader>
                                <v-container>
                                    <v-layout row wrap>                                
                                        <v-flex xs6 sm4 md4 v-for="(item, i) in categories" :key="i" >
                                            <v-checkbox
                                                v-model="searchByCategories"
                                                :label="item"
                                                color="accent"
                                                :value="item"
                                                multiple
                                                hide-details
                                            ></v-checkbox>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>                
            </v-flex>
        </v-layout>
        <v-layout 
            row 
            wrap
            justify-center
            align-center>
            <v-flex xs12 sm6 md6 v-for="(event) in foundEvents" 
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
                                        <h4 class="body-2 grey--text">Start date: {{ event.startDate }}</h4>
                                        <h4 class="body-2 grey--text">End date: {{ event.endDate }}</h4>
                                        <span>{{event.location.locality}}</span>
                                        <p class="text-cut subheading">{{event.description}}</p>                                        
                                        <v-layout row wrap class="text-xs-left">
                                            <v-flex v-for="(chips, i) in event.categorySelect" :key="i">
                                                <v-chip outline disabled class="error--text text-xs-left elevation-1">{{chips.toString()}}</v-chip>
                                            </v-flex>                                           
                                        </v-layout>                                        
                                    </div>                                
                                </v-card-title>
                                <v-card-actions>
                                    <v-layout justify-end row wrap>
                                        <v-flex xs4 md6>
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
    </div>
</template>

<script>
import { vm } from "../config/config";

export default {
    data() {
        return {
            active: null,
            eventsSelected: [],
            searchByTitle: "",
            searchByLocation: "",
            categories: vm.$data.category,
            searchByCategories: [],
            searchEvents: [],
            locationName: ""
        };
    },
    computed: {
        foundEvents() {
            const events = {
                searchByTitle: this.searchByTitle,
                searchByLocation: this.searchByLocation,
                searchByCategories: this.searchByCategories
            };
            this.$store.dispatch("searchedEvents", events);

            this.eventsSelected = this.$store.getters.foundEvents;
            return this.eventsSelected;
        }
    }
};
</script>

<style>
.text-cut {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 270px;
    max-height: 50px;
}
.height-card {
    height: 250px;
}
</style>

