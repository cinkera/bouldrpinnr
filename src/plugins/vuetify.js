import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { Ripple } from 'vuetify/lib/directives'


Vue.use(Vuetify, {
    // other stuff
    directives: {
      Ripple
    }
  })

export default new Vuetify({
});
