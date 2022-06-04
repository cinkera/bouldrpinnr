import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { Ripple } from 'vuetify/lib/directives'
import colors from 'vuetify/lib/util/colors'


Vue.use(Vuetify, {
    // other stuff
    theme: {
      themes: {
        light: {
          primary: colors.purple,
          secondary: colors.grey.darken1,
          tertiary: colors.purple.darken2,
          accent: colors.shades.black,
          error: colors.red.accent3,
        },
        dark: {
          primary: colors.white,
          secondary: colors.grey.darken1,
          tertiary: colors.purple.lighten2,
          accent: colors.shades.black,
          error: colors.red.accent3,
        },
      },
    },
    directives: {
      Ripple
    }
  })

export default new Vuetify({
});
