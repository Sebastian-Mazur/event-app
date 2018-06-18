<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-menu
                ref="menu"
                :close-on-content-click="false"
                v-model="menu"
                :nudge-right="40"
                :return-value.sync="time"
                :rules="[v => v = null || 'Time select is required']" 
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
            >
                <v-text-field
                slot="activator"
                v-model="time"
                :placeholder="editedTime"
                :label="labelName"
                prepend-icon="access_time"
                readonly
                ></v-text-field>
                <v-time-picker v-model="time" @change="pushTime"></v-time-picker>
            </v-menu>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    props: ["labelName", "editedTime"],
    data() {
        return {
            time: null,
            menu: false
        };
    },
    mounted() {
        if (this.editedTime === "" && this.time == null) {
            return;
        } else {
            this.time = this.editedTime;
        }
    },
    methods: {
        pushTime() {
            this.$refs.menu.save(this.time);
            this.$emit("setTime", this.time);
        }
    }
};
</script>

<style>
</style>

