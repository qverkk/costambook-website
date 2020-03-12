import Vue from 'vue';
import Vuetify, {
    VContent,
    VContainer,
    VLayout,
    VFlex,
    VCard,
    VToolbar,
    VToolbarTitle,
    VCardText,
    VForm,
    VTextField,
    VCardActions,
    VSpacer,
    VBtn,
    VApp,
    VAlert
} from 'vuetify/lib';

Vue.use(Vuetify, {
    components: {
        VContent,
        VContainer,
        VLayout,
        VFlex,
        VCard,
        VToolbar,
        VToolbarTitle,
        VCardText,
        VForm,
        VTextField,
        VCardActions,
        VSpacer,
        VBtn,
        VApp,
        VAlert
    }
});

export default new Vuetify({
    theme: {
        dark: true
    }
});