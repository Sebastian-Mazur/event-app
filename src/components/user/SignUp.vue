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
                                color="secondary"
                                name="email"
                                label="E-mail"
                                id="email"
                                v-model="email"
                                type="email"
                                :rules="[rules.required, rules.email]"
                                required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12>
                            <v-text-field
                                color="secondary"
                                name="password"
                                label="Password"
                                id="password"
                                v-model="password"
                                type="password"
                                hint="At least 6 characters"
                                min="6"
                                required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12>
                            <v-text-field
                                name="confirmPassword"
                                label="Confirm Password"
                                id="confirmPassword"
                                v-model="confirmPassword"
                                type="password"
                                required
                                hint="At least 6 characters"
                                min="6"
                                :rules="[comparePasswords]">
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row justify-end>
                        <v-flex xs3>
                            <v-btn 
                                type="submite"
                                color="secondary">
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
            confirmPassword: "",
            rules: {
                required: value => !!value || "Required.",
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || "Invalid e-mail.";
                }
            }
        };
    },
    computed: {
        comparePasswords() {
            return this.password !== this.confirmPassword
                ? "Password do not match"
                : "";
        },
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