<template>
    <v-card>
        <v-navigation-drawer
            mobile-break-point="1024"
            fixed    
            app
            v-model="drawer"
            class="secondary"
            dark
        >
            <v-list>
                <v-list-tile to="/" active-class="accent--text">
                    <v-list-tile-action>
                        <v-icon>home</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title class="title">Home</v-list-tile-title>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-group
                    value="true"
                    v-for="(menu, i) in menus"
                    :key="i"
                >
                    <v-list-tile slot="activator" active-class="accent--text">
                        <v-list-tile-action>
                            <v-icon>{{ menu.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title class="title">{{ menu.name }}</v-list-tile-title>
                    </v-list-tile>                
                    <v-list-tile
                        v-for="(item, i) in menu.items"
                        :key="i"
                        :to="item.link"
                        active-class="accent--text"
                    >                    
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                    </v-list-tile>		            
                </v-list-group>
                <v-list-tile v-if="userIsAuthenticated" @click="logout">
                    <v-list-tile-action>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title class="title">Logout</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar color="secondary" dark fixed app class="hidden-md-and-up">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>Events</v-toolbar-title>
        </v-toolbar>        
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            drawer: true
            // mini: true
        };
    },
    computed: {
        userIsAuthenticated() {
            return this.$store.getters.userIsAuthenticated;
        },
        menus() {
            let menus = [
                {
                    name: "Events",
                    icon: "event",
                    items: [
                        {
                            name: "Create event",
                            icon: "add_box",
                            link: "/event/new"
                        },
                        {
                            name: "My events",
                            icon: "chrome_reader_mode",
                            link: "/event/my-events"
                        }
                    ]
                }
            ];
            if (!this.userIsAuthenticated) {
                menus = [
                    {
                        name: "User",
                        icon: "account_circle",
                        items: [
                            {
                                name: "SignIn",
                                icon: "person_outline",
                                link: "/user/signin"
                            },
                            {
                                name: "SignUp",
                                icon: "person_add",
                                link: "/user/signup"
                            }
                        ]
                    }
                ];
            }
            return menus;
        }
    },
    methods: {
        logout() {
            this.$store.dispatch("logout");
            this.$router.push("/");
        }
    }
};
</script>
