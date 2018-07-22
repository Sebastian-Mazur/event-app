<template>
    <v-layout row>
        <div>
            <v-btn color="primary" @click.native.stop="dialog = true">Edit event</v-btn> 
        </div>
        <v-dialog v-model="dialog" persistent max-width="650"> 
            <v-card>           
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-text>
                            <v-text-field
                                name="tittle"
                                label="Title"
                                id="title"
                                v-model="eventEdited.title"
                                required>
                            </v-text-field>
                            <v-text-field
                                name="description"
                                label="Description"
                                id="description"
                                v-model="eventEdited.description"
                                multi-line
                                required>
                            </v-text-field>
                            <v-text-field
                                name="organizerName"
                                label="The name of the organizer"
                                id="organizerName"
                                v-model="eventEdited.organizerName"
                                required>
                            </v-text-field>
                            <vuetify-google-autocomplete            
                                id="map"
                                classname="form-control"
                                label="EventEdited adress"
                                :value="eventEdited.location.name + ', ' + eventEdited.location.locality + ', ' + eventEdited.location.country"
                                v-on:placechanged="getAddressData"
                                country="pl"           
                                :clearable="true"
                            >
                            </vuetify-google-autocomplete>  
                            <date-picker 
                                :editedDate="eventEdited.startDate" 
                                @setDate="setStartDate($event)" 
                                labelName="Start date">
                            </date-picker>                        
                            <time-picker 
                                :editedTime="eventEdited.startTime" 
                                @setTime="setStartTime($event)" 
                                labelName="Start Time">
                            </time-picker>
                            <date-picker 
                                :editedDate="eventEdited.endDate" 
                                @setDate="setEndDate($event)" 
                                labelName="End date">
                            </date-picker>
                            <time-picker 
                                :editedTime="eventEdited.endTime"
                                @setTime="setEndTime($event)"
                                labelName="End time">
                            </time-picker>                      
                            <v-text-field
                                name="imageUrl"
                                label="Image URL"
                                id="imageUrl"
                                v-model="eventEdited.imageUrl"
                                type="url"
                                placeholder="https://www.example.pl"
                                required>
                            </v-text-field>
                            <img :src="eventEdited.imageUrl" height="150">                        
                            <v-select
                                :items="category"
                                v-model="eventEdited.categorySelect"
                                label="Select a category"
                                multiple
                                chips
                                persistent-hint
                            ></v-select>               
                        </v-card-text>                            
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap text-xs-right>
                    <v-flex xs12>
                        <v-btn color="error" @click.native.stop="dialog = false">Close</v-btn>
                        <v-btn 
                            color="primary" 
                            @click="onSaveChanges">
                            Save
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-card-text v-for="(msg, i) in messages" :key="i" class="error--text">  
                    {{ msg.msg }}
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
import { Validator } from "vee-validate";
import { vm } from "../../config/config";

export default {
    props: ["event"],
    data() {
        return {
            eventEdited: {
                categorySelect: this.event.categorySelect,
                title: this.event.title,
                description: this.event.description,
                organizerName: this.event.organizerName,
                location: this.event.location,
                imageUrl: this.event.imageUrl,
                startDate: this.event.startDate,
                startTime: this.event.startTime,
                endDate: this.event.endDate,
                endTime: this.event.endTime
            },
            category: vm.$data.category,
            dialog: false,
            validate: false,
            messages: []
        };
    },
    created() {
        this.validator = new Validator(vm.$data.validRules);
        this.$set(this, "errors", this.validator.errors);
    },
    watch: {
        newEventEdited(value) {
            Object.keys(this.eventEdited).forEach(function(key) {
                this.validator.validate(`${[key]}`, value);
            });
        }
    },
    methods: {
        onSaveChanges() {
            this.validator.validateAll(this.eventEdited).then(result => {
                if (result) {
                    this.validate = result;
                    this.dialog = false;
                    this.eventEdited.id = this.event.id;
                    this.eventEdited.creatorID = this.event.creatorID;
                    this.$store.dispatch("updateEventData", this.eventEdited);
                    return;
                }
                this.messages = this.validator.errors.items;
                this.dialog = true;
            });
        },
        getAddressData(addressData, placeResultData, id) {
            if (
                addressData === "" ||
                addressData === null ||
                addressData == undefined
            ) {
                return;
            } else {
                this.eventEdited.location = {
                    country: addressData.country,
                    latitude: addressData.latitude,
                    longitude: addressData.longitude,
                    locality: addressData.locality,
                    name: addressData.name,
                    place_id: addressData.place_id,
                    route: addressData.route
                };
            }
        },
        clearErrors() {
            this.errors.clear();
        },
        setStartDate(event) {
            this.eventEdited.startDate = event;
        },
        setEndDate(event) {
            this.eventEdited.endDate = event;
        },
        setStartTime(event) {
            this.eventEdited.startTime = event;
        },
        setEndTime(event) {
            this.eventEdited.endTime = event;
        }
    }
};
</script>