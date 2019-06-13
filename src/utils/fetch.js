// @flow
import fetch from 'isomorphic-unfetch';
import es6promise from 'es6-promise';

es6promise.polyfill();

/* eslint-disable */
class ServiceUtils {
  sessions: Object;

  constructor(sessions: Object = {}) {
    this.sessions = sessions;
  }

  setSessionID(sessionName: string, sessionId: string | number) {
    this.sessions[sessionName] = sessionId;
  }

  // corss check from reviewer
  fetch = (url: string, props: Object) => {
    let { headers } = props;
    if (process.env.mode === 'development' && process.env.API_SECRET_KEY) {
      headers = { 'secret-key': process.env.API_SECRET_KEY, ...headers };
    }
    return fetch(url, {
      ...props,
    });
  };
}
/* eslint-enable */

export default new ServiceUtils();
