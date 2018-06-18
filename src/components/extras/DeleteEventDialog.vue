<template>
    <v-layout>
        <div>
            <v-btn color="error" @click.native.stop="dialog = true">Delete event</v-btn>  
        </div>
        <v-dialog v-model="dialog" persistent max-width="290"> 
            <v-card>
                <v-card-title class="headline">Are you sure you want to delete this event?</v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click.native="dialog = false" color="error">Disagree</v-btn>
                    <v-btn @click="deleteEvent" color="primary">Agree</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
export default {
    props: ["id"],
    data() {
        return {
            dialog: false
        };
    },
    methods: {
        deleteEvent() {
            this.$store.dispatch("deleteEvent", this.id);
            this.dialog = false;
            this.$router.push("/event/my-events");
        }
    }
};
</script>
