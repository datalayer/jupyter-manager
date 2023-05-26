const xsrfToken = '';

export const jupyterHubAPIRequest = (
  endpoint: string,
  method: string,
  data?: Record<string, any>
): Promise<Response> => {
  //  let api_url = `${base_url}hub/api`;
  const api_url = 'http://localhost:8000/hub/api';
  let suffix = '';
  if (xsrfToken) {
    // add xsrf token to url parameter
    const sep = endpoint.indexOf('?') === -1 ? '?' : '&';
    suffix = sep + '_xsrf=' + xsrfToken;
  }
  return fetch(api_url + endpoint + suffix, {
    method: method,
    mode: 'cors',
    //    credentials: 'include',
    cache: 'no-cache',
    headers: {
      Authorization:
        'token 9280326a088d3a4a058823ce1c607029e7c11be15af2cb69f32cf507a85c27e5',
      'Content-Type': 'application/json',
      Accept: 'application/jupyterhub-pagination+json'
    },
    body: data ? JSON.stringify(data) : null
  });
}
