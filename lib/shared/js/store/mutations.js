import _ from 'lodash';
import Vue from 'vue';

// Publicly accessible state mutations.
export const Mutations = {
  READY: 'READY',
  ERROR: 'ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',

  SET_MODE: 'SET_MODE',

  // User mutations
  SET_USER: 'SET_USER',
  SET_USER_ROLE: 'SET_USER_ROLE',
  SET_USER_TWITCH_ID: 'SET_USER_TWITCH_ID',
  SET_USER_TWITCH_JWT: 'SET_USER_TWITCH_JWT',
  SET_USER_IP_ADDRESS: 'SET_USER_IP_ADDRESS',
  SET_USER_VIDEOMODE: 'SET_USER_VIDEOMODE',
  SET_USER_GAME: 'SET_USER_GAME',
  SET_USER_BITRATE: 'SET_USER_BITRATE',
  SET_USER_LATENCY: 'SET_USER_LATENCY',

  // Options mutations
  UPDATE_VIEWER_OPTIONS: 'UPDATE_VIEWER_OPTIONS',
  UPDATE_CHANNEL_OPTIONS: 'UPDATE_CHANNEL_OPTIONS',
  UPDATE_EXTENSION_OPTIONS: 'UPDATE_EXTENSION_OPTIONS',
  UPDATE_ALL_OPTIONS: 'UPDATE_ALL_OPTIONS',

  // App mutations
  ADD_APP: 'ADD_APP',
  ENABLE_APP: 'ENABLE_APP',
  DISABLE_APP: 'DISABLE_APP',
  TOGGLE_APP: 'TOGGLE_APP',
  SHOW_APP: 'SHOW_APP',
  HIDE_APP: 'HIDE_APP',
  NOTIFY_APP: 'NOTIFY_APP',
  CLICK_APP: 'CLICK_APP',

  // App configuration
  SET_APP_CHANNEL_OPTIONS: 'SET_APP_CHANNEL_OPTIONS',
  SET_APP_VIEWER_OPTIONS: 'SET_APP_VIEWER_OPTIONS'
};

// Publicly accessible events
export const Events = {
  CHANNEL_OPTIONS_CHANGE: 'channel_options_change',
  APP_OPTIONS_CHANGE: 'app_options_change'
};

// updateCombinedOptions merges the current option states
// (extension, channel and viewer) and updates the combined
// reference to the result. This allows reactive bindings
// into the combined object which will be updated automatically.
function updateCombinedOptions(state) {
  state.options.combined = _.merge(
    {},
    state.options.extension || {},
    state.options.channel || {},
    state.options.viewer || {}
  );
}

// Actual Mutation implementations
export const Mutators = {
  [Mutations.READY](state) {
    state.ready = true;
  },

  [Mutations.ERROR](state, reason) {
    state.error = reason;
  },
  [Mutations.CLEAR_ERROR](state) {
    state.error = null;
  },

  [Mutations.SET_MODE](state, mode) {
    state.mode = mode;
  },

  [Mutations.SET_USER](state, user) {
    state.user = user;
  },
  [Mutations.SET_USER_ROLE](state, role) {
    Vue.set(state.user, 'role', role);
  },
  [Mutations.SET_USER_TWITCH_ID](state, twitchID) {
    Vue.set(state.user, 'twitchID', twitchID);
  },
  [Mutations.SET_USER_TWITCH_JWT](state, jwt) {
    Vue.set(state.user, 'twitchJWT', jwt);
  },
  [Mutations.SET_USER_IP_ADDRESS](state, ip) {
    Vue.set(state.user, 'ip', ip);
  },
  [Mutations.SET_USER_VIDEOMODE](state, mode) {
    Vue.set(state.user, 'videoMode', mode);
  },
  [Mutations.SET_USER_GAME](state, game) {
    Vue.set(state.user, 'game', game);
  },
  [Mutations.SET_USER_BITRATE](state, bitrate) {
    Vue.set(state.user, 'bitrate', bitrate);
  },
  [Mutations.SET_USER_LATENCY](state, latency) {
    Vue.set(state.user, 'latency', latency);
  },

  [Mutations.UPDATE_VIEWER_OPTIONS](state, options) {
    state.options.viewer = state.options.viewer || {};
    state.options.viewer = _.extend(state.options.viewer, options);
    updateCombinedOptions(state);
  },
  [Mutations.UPDATE_CHANNEL_OPTIONS](state, options) {
    state.options.channel = state.options.channel || {};
    state.options.channel = _.extend(state.options.channel, options);
    updateCombinedOptions(state);
  },
  [Mutations.UPDATE_EXTENSION_OPTIONS](state, options) {
    state.options.extension = state.options.extension || {};
    state.options.extension = _.extend(state.options.extension, options);
    updateCombinedOptions(state);
  },
  [Mutations.UPDATE_ALL_OPTIONS](state, options) {
    state.options.extension = state.options.extension || {};
    state.options.extension = _.extend(state.options.extension, options.extension);

    state.options.channel = state.options.channel || {};
    state.options.channel = _.extend(state.options.channel, options.channel);

    state.options.viewer = state.options.viewer || {};
    state.options.viewer = _.extend(state.options.viewer, options.viewer);

    updateCombinedOptions(state);
  },

  [Mutations.ADD_APP](state, app) {
    if (typeof app.enabled === 'undefined') {
      app.enabled = false;
    }
    app.show = false;
    app.notification = false;

    state.apps.push(app);
  },

  [Mutations.ENABLE_APP](state, { appID }) {
    state.apps.filter(a => a.id === appID).forEach((a) => {
      a.enabled = true;
    });
  },
  [Mutations.DISABLE_APP](state, { appID }) {
    state.apps.filter(a => a.id === appID).forEach((a) => {
      a.enabled = false;
    });
  },

  [Mutations.TOGGLE_APP](state, { appID }) {
    state.apps.filter(a => a.id === appID).forEach((a) => {
      a.show = !a.show;
      a.notification = false;
    });
  },
  [Mutations.SHOW_APP](state, { appID }) {
    state.apps.filter(a => a.id === appID).forEach((a) => {
      a.show = true;
    });
  },
  [Mutations.HIDE_APP](state, { appID }) {
    state.apps.filter(a => a.id === appID).forEach((a) => {
      a.show = false;
    });
  },
  [Mutations.NOTIFY_APP](state, { appID }) {
    state.apps.filter(a => a.id === appID).forEach((a) => {
      a.notification = true;
    });
  },
  [Mutations.CLICK_APP](state, { appID }) {
    state.apps.filter(a => a.id === appID).forEach((a) => {
      a.clicked += 1;
    });
  },

  [Mutations.SET_APP_VIEWER_OPTIONS](state, { id, options }) {
    state.options.viewer.apps = state.options.viewer.apps || {};
    state.options.viewer.apps[id] = _.extend(state.options.viewer.apps[id], options);
    updateCombinedOptions(state);
  },

  [Mutations.SET_APP_CHANNEL_OPTIONS](state, { id, options }) {
    state.options.channel.apps = state.options.channel.apps || {};
    state.options.channel.apps[id] = _.extend(state.options.channel.apps[id], options);

    updateCombinedOptions(state);
  }
};
