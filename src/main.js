import Vue from "vue";
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import {library} from "@fortawesome/fontawesome-svg-core";
import {
    faInfoCircle,
    faSort,
    faSortUp,
    faSortDown
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
library.add(faInfoCircle, faSort, faSortUp, faSortDown);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount("#app");
