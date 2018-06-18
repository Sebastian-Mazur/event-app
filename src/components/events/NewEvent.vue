<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <form @submit.prevent="createNewEvents">
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="tittle"
                                label="Title"
                                id="title"
                                v-model="title"
                                :rules="inputRules"
                                required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>                                                  
                            <v-text-field
                                name="description"
                                label="Description"
                                id="description"
                                v-model="description"
                                :rules="inputRules"
                                multi-line
                                required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>                                                  
                            <v-text-field
                                name="organizerName"
                                label="The name of the organizer"
                                id="organizerName"
                                v-model="organizerName"
                                :rules="inputRules"
                                required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>                            
                            <vuetify-google-autocomplete            
                                id="map"
                                classname="form-control"
                                label="The address of the event (Address format: street, city, country)"
                                v-on:placechanged="getAddressData"
                                country="pl"
                                :types='address'            
                                :clearable="true"
                                :rules="[v => v.length > 0 || 'Addres is required']"
                            >
                            </vuetify-google-autocomplete>
                        </v-flex>
                    </v-layout>                    
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <span class="display-1">Start date</span>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12 sm3 offset-sm3 >
                            <date-picker @setDate="setStartDate($event)" labelName="Start date"></date-picker> 
                        </v-flex>
                        <v-flex xs12 sm3>
                            <time-picker @setTime="setStartTime($event)" labelName="Start Time"></time-picker>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-divider class="secondary mb-4 mt-3"></v-divider>
                            <span class="display-1">End date</span>
                        </v-flex>
                    </v-layout>                    
                    <v-layout row wrap class="mb-4">
                        <v-flex xs12 sm3 offset-sm3 >
                            <date-picker @setDate="setEndDate($event)" labelName="End date"></date-picker> 
                        </v-flex>
                        <v-flex xs12 sm3>
                            <time-picker @setTime="setEndTime($event)" labelName="End time"></time-picker>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>                            
                            <v-text-field
                                name="imageUrl"
                                label="Image URL"
                                id="imageUrl"
                                v-model="imageUrl"
                                type="url"
                                pattern="https?://.+"
                                placeholder="https://www.example.pl"
                                :rules="inputRules"
                                required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <img :src="imageUrl" height="150">
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>                            
                            <v-select
                                :items="category"
                                v-model="categorySelect"
                                label="Select category"
                                multiple
                                chips
                                :rules="[v => v.length > 0 || 'Category select is required']"
                                hint="You can choose more than one category"
                                persistent-hint
                            ></v-select>
                        </v-flex>                        
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn 
                                class="primary" 
                                :disabled="!isFormValid"
                                type="submit"
                                >Organize event
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </form>
            </v-flex>
        </v-layout>                        
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            address: "",
            title: "",
            inputRules: [
                v => !!v || "This field is required",
                v => v.length >= 6 || "Text must be less than 6 characters"
            ],
            location: {},
            locationName: "",
            imageUrl: "",
            description: "",
            organizerName: "",
            startDate: null,
            startTime: null,
            endDate: null,
            endTime: null,
            image: null,
            categorySelect: [],
            category: [
                "Arts",
                "Business",
                "Charity and Causes",
                "Community",
                "Film and media",
                "Food and drink",
                "Music",
                "Others"
            ]
        };
    },
    computed: {
        isFormValid() {
            console.log(
                this.startDate,
                this.startTime,
                this.endDate,
                this.endTime
            );
            return (
                this.title !== "" &&
                this.location !== "" &&
                this.imageUrl !== "" &&
                this.description !== "" &&
                this.startDate !== null &&
                this.startTime !== null &&
                this.endDate !== null &&
                this.endTime !== null &&
                this.categorySelect.length > 0 &&
                this.organizerName !== ""
            );
        }
    },
    methods: {
        createNewEvents() {
            if (!this.isFormValid) {
                return;
            }
            const newEvent = {
                title: this.title,
                location: this.location,
                imageUrl: this.imageUrl,
                description: this.description,
                startDate: this.startDate,
                startTime: this.startTime,
                endDate: this.endDate,
                endTime: this.endTime,
                categorySelect: this.categorySelect,
                organizerName: this.organizerName,
                locationName: this.locationName
            };
            console.log(newEvent);
            this.$store.dispatch("createEvent", newEvent);
            this.$router.push("/");
        },
        getAddressData(addressData, placeResultData, id) {
            if (
                addressData === "" ||
                addressData === null ||
                addressData == undefined
            ) {
                return;
            } else {
                this.location = {
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
            this.startDate = event;
        },
        setEndDate(event) {
            this.endDate = event;
        },
        setStartTime(event) {
            this.startTime = event;
        },
        setEndTime(event) {
            this.endTime = event;
        }
    }
};
</script>

<style>
</style>