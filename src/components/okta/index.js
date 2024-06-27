import OktaSignIn from '@okta/okta-signin-widget';
import {OltahAuth} from '@okta/okta-auth-js';

const oktaSignIn = new OktaSignIn({
  baseUrl: 'https://dev-123456.oktapreview.com',
  clientId: '0123456789abcdef',
  redirectUri: 'http://localhost:8080',
  authParams: {
    pkce
    issuer
    display
    scopes
},
  features:{
    registration: true
  }
})

const oktaAuth =new OktaAuth({
  issuer: 'https://dev-123456.oktapreview.com/oauth2/default',
  clientId: '0123456789abcdef',
  redirectUri: 'http://localhost:8080',
 scopes: ['openid',  'profile','email'],
})
export {oktaAuth,oktaSignIn}
}