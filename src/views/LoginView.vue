<template>
  <div class="login">
    <div id="okta-signin-container"></div>
  </div>
</template>

<script>
import OktaSignIn from '@okta/okta-signin-widget'
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css'

import sampleConfig from '../config'

export default {
  name: 'LoginView',
  mounted: function() {
    this.$nextTick(function() {
      const { issuer, clientId, redirectUri, scopes } = sampleConfig.oidc
      this.widget = new OktaSignIn({
        clientId,
        redirectUri,
        logo: require('@/assets/logo.png'),
        i18n: {
          en: {
            'primaryauth.title': 'Sign in to my Okta Sign-In Widget Vue.js app'
          }
        },
        authParams: {
          issuer,
          scopes,
        }
      })

      const originalUri = this.$auth.getOriginalUri();
      if (!originalUri) {
        this.$auth.setOriginalUri('/');
      }

      // Search for URL Parameters to see if a user is being routed to the application to recover password
      var searchParams = new URL(window.location).searchParams;
      this.widget.otp = searchParams.get('otp');
      this.widget.state = searchParams.get('state');

      this.widget.showSignInToGetTokens({
        el: '#okta-signin-container',
        scopes
      }).then(tokens => {
        this.$auth.handleLoginRedirect(tokens)
      }).catch(err => {
        throw err
      })

    })
  },
  unmounted() {
    // Remove the widget from the DOM on path change
    this.widget.remove()
  }
}
</script>
