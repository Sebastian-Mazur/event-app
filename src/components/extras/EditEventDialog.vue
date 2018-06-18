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
                                :rules="inputRules"
                                required>
                            </v-text-field>
                            <v-text-field
                                name="description"
                                label="Description"
                                id="description"
                                v-model="editedDescription"
                                :rules="inputRules"
                                multi-line
                                required>
                            </v-text-field>
                            <v-text-field
                                name="organizerName"
                                label="The name of the organizer"
                                id="organizerName"
                                v-model="editedOrganizerName"
                                :rules="inputRules"
                                required>
                            </v-text-field>
                            <vuetify-google-autocomplete            
                                id="map"
                                classname="form-control"
                                label="Event adress"
                                :value="editedLocation.name + ', ' + editedLocation.locality + ', ' + editedLocation.country"
                                v-on:placechanged="getAddressData"
                                :rules="[v => v.length > 0 || 'Location is required']"
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
                                pattern="https?://.+"
                                placeholder="https://www.example.pl"
                                :rules="inputRules"
                                required>
                            </v-text-field>
                            <img :src="editedImageUrl" height="150">                        
                            <v-select
                                :items="category"
                                v-model="editedCategorySelect"
                                label="Select a category"
                                multiple
                                chips
                                :rules="[v => v.length > 0 || 'Category select is required']"
                                hint="You can choose more than one category"
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
                            @click="onSaveChanges" 
                            :disabled="!isFormValid">
                            Save
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
export default {
    props: ["event"],
    data() {
        return {
            dialog: false,
            inputRules: [
                v => !!v || "This field is required",
                v => v.length >= 6 || "Text must be less than 6 characters"
            ],
            category: [
                "Arts",
                "Business",
                "Charity and Causes",
                "Community",
                "Film and media",
                "Food and drink",
                "Music",
                "Others"
            ],
            editedCategorySelect: this.event.categorySelect,
            editedTitle: this.event.title,
            editedDescription: this.event.description,
            editedOrganizerName: this.event.organizerName,
            editedLocation: this.event.location,
            editedImageUrl: this.event.imageUrl,
            editedStartDate: this.event.startDate,
            editedStartTime: this.event.startTime,
            editedEndDate: this.event.endDate,
            editedEndTime: this.event.endTime
        };
    },
    computed: {
        isFormValid() {
            return (
                this.editedTitle !== "" &&
                this.editedLocation !== "" &&
                this.editedImageUrl !== "" &&
                this.editedDescription !== "" &&
                this.event.startDate !== "" &&
                this.event.startTime !== "" &&
                this.event.endDate !== "" &&
                this.event.endTime !== "" &&
                this.editedCategorySelect.length > 0 &&
                this.editedOrganizerName !== ""
            );
        }
    },
    methods: {
        onSaveChanges() {
            if (
                this.editedTitle === "" ||
                this.editedDescription === "" ||
                this.editedOrganizerName === "" ||
                this.editedLocation === ""
            ) {
                return false;
            }
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
                endTime: this.editedEndTime
            };
            this.$store.dispatch("updateEventData", editedEvent);
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
        setStartDate(event) {
            console.log();
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