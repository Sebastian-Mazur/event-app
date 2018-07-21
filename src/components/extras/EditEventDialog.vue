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
                                v-model="editedTitle"
                                required>
                            </v-text-field>
                            <v-text-field
                                name="description"
                                label="Description"
                                id="description"
                                v-model="editedDescription"
                                multi-line
                                required>
                            </v-text-field>
                            <v-text-field
                                name="organizerName"
                                label="The name of the organizer"
                                id="organizerName"
                                v-model="editedOrganizerName"
                                required>
                            </v-text-field>
                            <vuetify-google-autocomplete            
                                id="map"
                                classname="form-control"
                                label="Event adress"
                                :value="editedLocation.name + ', ' + editedLocation.locality + ', ' + editedLocation.country"
                                v-on:placechanged="getAddressData"
                                country="pl"           
                                :clearable="true"
                            >
                            </vuetify-google-autocomplete>  
                            <date-picker 
                                :editedDate="editedStartDate" 
                                @setDate="setStartDate($event)" 
                                labelName="Start date">
                            </date-picker>                        
                            <time-picker 
                                :editedTime="editedStartTime" 
                                @setTime="setStartTime($event)" 
                                labelName="Start Time">
                            </time-picker>
                            <date-picker 
                                :editedDate="editedEndDate" 
                                @setDate="setEndDate($event)" 
                                labelName="End date">
                            </date-picker>
                            <time-picker 
                                :editedTime="editedEndTime"
                                @setTime="setEndTime($event)"
                                labelName="End time">
                            </time-picker>                      
                            <v-text-field
                                name="imageUrl"
                                label="Image URL"
                                id="imageUrl"
                                v-model="editedImageUrl"
                                type="url"
                                placeholder="https://www.example.pl"
                                required>
                            </v-text-field>
                            <img :src="editedImageUrl" height="150">                        
                            <v-select
                                :items="category"
                                v-model="editedCategorySelect"
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
            category: vm.$data.category,
            editedCategorySelect: this.event.categorySelect,
            editedTitle: this.event.title,
            editedDescription: this.event.description,
            editedOrganizerName: this.event.organizerName,
            editedLocation: this.event.location,
            editedImageUrl: this.event.imageUrl,
            editedStartDate: this.event.startDate,
            editedStartTime: this.event.startTime,
            editedEndDate: this.event.endDate,
            editedEndTime: this.event.endTime,
            dialog: false,
            validate: false,
            messages: []
        };
    },
    created() {
        this.validator = new Validator(vm.$data.validRulesEdit);
        this.$set(this, "errors", this.validator.errors);
    },
    watch: {
        editedTitle(value) {
            this.validator.validate("editedTitle", value);
        },
        editedDescription(value) {
            this.validator.validate("editedDescription", value);
        },
        editedOrganizerName(value) {
            this.validator.validate("editedOrganizerName", value);
        },
        editedLocation(value) {
            this.validator.validate("editedLocation", value);
        },
        editedImageUrl(value) {
            this.validator.validate("editedImageUrl", value);
        },
        editedCategorySelect(value) {
            this.validator.validate("editedCategorySelect", value);
        },
        editedStartTime(value) {
            this.validator.validate("editedStartTime", value);
        },
        editedStartDate(value) {
            this.validator.validate("editedStartDate", value);
        },
        editedEndTime(value) {
            this.validator.validate("editedEndTime", value);
        },
        editedEndDate(value) {
            this.validator.validate("editedEndDate", value);
        }
    },
    methods: {
        validateForm() {
            this.validator
                .validateAll({
                    editedTitle: this.editedTitle,
                    editedDescription: this.editedDescription,
                    editedOrganizerName: this.editedOrganizerName,
                    editedLocation: this.editedLocation,
                    editedImageUrl: this.editedImageUrl,
                    editedCategorySelect: this.editedCategorySelect,
                    editedStartTime: this.editedStartTime,
                    editedStartDate: this.editedStartDate,
                    editedEndTime: this.editedEndTime,
                    editedEndDate: this.editedEndDate
                })
                .then(result => {
                    if (result) {
                        this.validate = result;
                        return;
                    }
                    this.messages = this.validator.errors.items;
                });
        },
        onSaveChanges() {
            this.validator
                .validateAll({
                    editedTitle: this.editedTitle,
                    editedDescription: this.editedDescription,
                    editedOrganizerName: this.editedOrganizerName,
                    editedLocation: this.editedLocation,
                    editedImageUrl: this.editedImageUrl,
                    editedCategorySelect: this.editedCategorySelect,
                    editedStartTime: this.editedStartTime,
                    editedStartDate: this.editedStartDate,
                    editedEndTime: this.editedEndTime,
                    editedEndDate: this.editedEndDate
                })
                .then(result => {
                    if (result) {
                        this.validate = result;
                        this.dialog = false;
                        const editedEvent = {
                            id: this.event.id,
                            title: this.editedTitle,
                            description: this.editedDescription,
                            organizerName: this.editedOrganizerName,
                            location: this.editedLocation,
                            categorySelect: this.editedCategorySelect,
                            imageUrl: this.editedImageUrl,
                            startDate: this.editedStartDate,
                            startTime: this.editedStartTime,
                            endDate: this.editedEndDate,
                            endTime: this.editedEndTime,
                            creatorID: this.event.creatorID
                        };
                        this.$store.dispatch("updateEventData", editedEvent);
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
                this.editedLocation = {
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
            this.editedStartDate = event;
        },
        setEndDate(event) {
            this.editedEndDate = event;
        },
        setStartTime(event) {
            this.editedStartTime = event;
        },
        setEndTime(event) {
            this.editedEndTime = event;
        }
    }
};
</script>