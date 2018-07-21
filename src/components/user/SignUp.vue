<template>
    <v-container class="margin-register">
        <v-layout row v-if="error">
            <v-flex xs12 sm6 offset-sm3>
                <error-alert @dismissed="onDismissed" :text="error.message">
                </error-alert>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <form @submit.prevent="onSignUp">
                    <v-layout row>
                        <v-flex xs12>
                            <v-text-field
                                color="primary"
                                name="email"
                                label="E-mail"
                                id="email"
                                v-model="email"
                                type="email"
                                v-validate="'required|email'"
                                :hint="vErrors.first('email')"
                                required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12>
                            <v-text-field
                                counter
                                type="password" 
                                color="primary"
                                name="password"
                                label="Password"
                                id="password"
                                v-model="password"
                                ref="password"
                                v-validate="'required|min:6'"
                                :hint="vErrors.first('password')"  
                                required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12>
                            <v-text-field  
                                counter
                                type="password"                             
                                name="confirmPassword"
                                label="Confirm Password"
                                id="confirmPassword"
                                v-model="confirmPassword"                                
                                required
                                v-validate="'required|min:6|confirmed:password'"
                                :hint="vErrors.first('password')"  
                                >
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row justify-end>
                        <v-flex xs3>
                            <v-btn 
                                :disabled="!email || !password || !confirmPassword || vErrors.has('password') || vErrors.has('email') || vErrors.first('confirmPassword')"
                                type="submite"
                                color="primary">
                                Sign up
                                <span slot="loader" class="custom-loader">
                                    <v-icon light>cached</v-icon>
                                </span>
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
            email: "",
            password: "",
            confirmPassword: ""
        };
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
        error() {
            return this.$store.getters.error;
        }
    },
    watch: {
        user(value) {
            if (value !== null && value !== undefined) {
                this.$router.push("/");
            }
        }
    },
    methods: {
        onSignUp() {
            this.$store.dispatch("signUserUp", {
                email: this.email,
                password: this.password
            });
        },
        onDismissed() {
            this.$store.dispatch("clearError");
        }
    }
};
</script>

<style>
.margin-register {
    margin-top: 10%;
}
</style>