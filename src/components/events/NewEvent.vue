<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <form @submit.prevent="validateForm">
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field                                
                                name="title"
                                label="Title"
                                id="title"
                                v-model="title"
                                :hint="errors.first('title')"
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
                                multi-line
                                :hint="errors.first('description')"
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
                                :hint="errors.first('organizerName')"
                                required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>                            
                            <vuetify-google-autocomplete
                                name="map"           
                                id="map"
                                classname="form-control"
                                label="The address of the event (Address format: street, city, country)"
                                v-on:placechanged="getAddressData"
                                country="pl"
                                :types='address'            
                                :clearable="true"                                
                                :hint="errors.first('location')"
                                required
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
                            <time-picker
                                @setTime="setEndTime($event)"
                                labelName="End time"
                                ></time-picker>
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
                                placeholder="https://www.example.pl"                                
                                :hint="errors.first('imageUrl')"
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
                                :hint="errors.first('categorySelect')"
                                :class="{'error--text': errors.has('categorySelect')}"
                                required
                            ></v-select>
                             <span v-show="errors.has('category')" class="error">{{ errors.first('category') }}</span>
                        </v-flex>                        
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn 
                                slot="activator"
                                class="primary"                                 
                                type="submit"
                                >Organize event
                            </v-btn>
                            <v-dialog
                                v-model="dialog"
                                width="500"
                            >
                                <v-card>
                                    <v-card-text v-for="(msg, i) in messages" :key="i" class="body-2 error--text">                            
                                        {{ msg.msg }}
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-layout justify-center>
                                            <v-btn
                                                v-if="validate"
                                                color="primary"
                                                flat
                                                @click="createNewEvents"
                                            >
                                                I accept
                                            </v-btn>
                                            <v-btn
                                                v-if="!validate"
                                                color="primary"
                                                flat
                                                @click="dialog = false"
                                            >
                                                Ok
                                            </v-btn>
                                        </v-layout>
                                    </v-card-actions>
                                </v-card> 
                            </v-dialog>
                        </v-flex>
                    </v-layout> 
                </form>
            </v-flex>
        </v-layout>              
    </v-container>
</template>

<script>
import { Validator } from "vee-validate";
import { vm } from "../../config/config";

export default {
    validator: null,
    data() {
        return {
            address: "",
            title: "",
            location: {},
            imageUrl: "",
            description: "",
            organizerName: "",
            startDate: null,
            startTime: null,
            endDate: null,
            endTime: null,
            image: null,
            categorySelect: [],
            category: vm.$data.category,
            errors: null,
            dialog: false,
            messages: [],
            validate: false
        };
    },
    created() {
        this.validator = new Validator(vm.$data.validRules);
        this.$set(this, "errors", this.validator.errors);
    },
    watch: {
        title(value) {
            this.validator.validate("title", value);
        },
        description(value) {
            this.validator.validate("description", value);
        },
        organizerName(value) {
            this.validator.validate("organizerName", value);
        },
        location(value) {
            this.validator.validate("location", value);
        },
        imageUrl(value) {
            this.validator.validate("imageUrl", value);
        },
        categorySelect(value) {
            this.validator.validate("categorySelect", value);
        },
        startTime(value) {
            this.validator.validate("startTime", value);
        },
        startDate(value) {
            this.validator.validate("startDate", value);
        },
        endTime(value) {
            this.validator.validate("endTime", value);
        },
        endDate(value) {
            this.validator.validate("endDate", value);
        }
    },
    methods: {
        validateForm() {
            this.validator
                .validateAll({
                    title: this.title,
                    description: this.description,
                    organizerName: this.organizerName,
                    locality: this.location,
                    imageUrl: this.imageUrl,
                    categorySelect: this.categorySelect,
                    startTime: this.startTime,
                    startDate: this.startDate,
                    endTime: this.endTime,
                    endDate: this.endDate
                })
                .then(result => {
                    if (result) {
                        this.validate = result;
                        return;
                    }
                });
            this.messages = this.validator.errors.items;
            this.dialog = true;
        },
        createNewEvents() {
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
                organizerName: this.organizerName
            };
            this.$store.dispatch("createEvent", newEvent);
            this.dialog = false;
            this.$router.push("/");
        },
        clearErrors() {
            this.errors.clear();
        },
        getAddressData(addressData, placeResultData, id) {
            if (
                addressData === "" ||
                addressData === null ||
                addressData === undefined
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