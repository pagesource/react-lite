// @flow
import fetch from 'isomorphic-unfetch';
import es6promise from 'es6-promise';

es6promise.polyfill();

class ServiceUtils {
  sessions: Object;

  constructor(sessions: Object = {}) {
    this.sessions = sessions;
  }

  setSessionID(sessionName: string, sessionId: string | number) {
    this.sessions[sessionName] = sessionId;
  }

  // corss check from reviewer
  fetch = (url: string, props?: Object = {}) => {
    let { headers } = props;
    // $FlowFixMe eslint-disable
    const apiUrl = `${process.env.REACT_APP_API_PATH}${url}`;
    if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_SECRET_KEY) {
      headers = { 'secret-key': process.env.REACT_APP_SECRET_KEY, ...headers };
    }
    /* eslint-disable compat/compat */
    return fetch(apiUrl, {
      ...props,
      headers,
    })
      .then(r => r.json())
      .then(data => data);
  };
}
/* eslint-enable */

export default new ServiceUtils();
