<template>
    <v-layout row>
        <v-flex xs12>
            <v-menu
                ref="menu"
                :close-on-content-click="false"
                v-model="menu"
                :nudge-right="40"
                :return-value.sync="date"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"              
            >
                <v-text-field
                slot="activator"
                v-model="date"
                :label="labelName"
                prepend-icon="event"
                readonly
                ></v-text-field>
                <v-date-picker 
                    v-model="date" 
                    @input="$refs.menu.save(date)" 
                    :min="currentData.toString()"
                    @change="pushDate"
                ></v-date-picker>
            </v-menu>
        </v-flex>   
    </v-layout>
</template>

<script>
export default {
    props: ["labelName", "editedDate"],
    data: () => ({
        date: null,
        menu: false,
        currentData:
            new Date().getFullYear() +
            "-0" +
            new Date().getMonth() +
            "-" +
            new Date().getDate()
    }),
    mounted() {
        if (this.editedDate === "" && this.date == null) {
            return;
        } else {
            this.date = this.editedDate;
        }
    },
    methods: {
        pushDate() {
            this.$emit("setDate", this.date);
        }
    }
};
</script>
