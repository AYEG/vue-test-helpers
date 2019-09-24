const externals = {
  '@laura-wert/vee-form-handler': '@laura-wert/vee-form-handler',
  '@laura-wert/vue-helpers': '@laura-wert/vue-helpers',
  '@vue/test-utils': '@vue/test-utils',
  'axios': 'axios',
  'quasar/lang/nl': 'quasar/lang/nl',
  'quasar/src/vue-plugin.js': 'quasar/src/vue-plugin.js',
  'quasar/src/components/btn/QBtn': 'quasar/src/components/btn/QBtn',
  'quasar/src/components/card/QCard': 'quasar/src/components/card/QCard',
  'quasar/src/components/card/QCardActions': 'quasar/src/components/card/QCardActions',
  'quasar/src/components/card/QCardSection': 'quasar/src/components/card/QCardSection',
  'quasar/src/components/checkbox/QCheckbox': 'quasar/src/components/checkbox/QCheckbox',
  'quasar/src/components/banner/QBanner': 'quasar/src/components/banner/QBanner',
  'quasar/src/components/dialog/QDialog': 'quasar/src/components/dialog/QDialog',
  'quasar/src/components/icon/QIcon': 'quasar/src/components/icon/QIcon',
  'quasar/src/components/input/QInput': 'quasar/src/components/input/QInput',
  'quasar/src/components/list/QItem': 'quasar/src/components/list/QItem',
  'quasar/src/components/list/QItemLabel': 'quasar/src/components/list/QItemLabel',
  'quasar/src/components/list/QItemSection': 'quasar/src/components/list/QItemSection',
  'quasar/src/components/menu/QMenu': 'quasar/src/components/menu/QMenu',
  'quasar/src/components/select/QSelect': 'quasar/src/components/select/QSelect',
  'quasar/src/components/table/QTable': 'quasar/src/components/table/QTable',
  'quasar/src/components/table/QTd': 'quasar/src/components/table/QTd',
  'quasar/src/directives/ClosePopup': 'quasar/src/directives/ClosePopup',
  'quasar/src/utils/date': 'quasar/src/utils/date',
  'quasar/src/utils/scroll': 'quasar/src/utils/scroll',
  'quasar/src/vue-plugin': 'quasar/src/vue-plugin',
  'sanitizer': 'sanitizer',
  'tslib': 'tslib',
  'vee-validate': 'vee-validate',
  'vue': 'vue',
  'vuex': 'vuex',
  'vue-browser-acl': 'vue-browser-acl',
  'vue-class-component': 'vue-class-component',
  'vue-property-decorator': 'vue-property-decorator',
  'vue-router': 'vue-router',
  'vuex-xhr-state': 'vuex-xhr-state',
}

exports.setBuildExternals = function(config) {
  if (config.mode === 'production') {
    config.externals = Object.assign(config.externals || {}, externals)
    delete config.devtool
  }
}
