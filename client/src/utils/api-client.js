export default function client(endpoint, customConfig = {}) {
  const config = {
    method: 'GET',
    ...customConfig,
  };
  return window
    .fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
    .then(async (response) => {
      const data = await response.json();
      return data;
    });
}
