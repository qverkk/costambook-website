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
    VAlert,
    VTextarea,
    VFileInput,
    VDivider
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
        VAlert,
        VTextarea,
        VFileInput,
        VDivider
    }
});

export default new Vuetify({
    theme: {
        dark: true
    }
});