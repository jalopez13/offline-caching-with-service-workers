// Make sure service workers are supported
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw_cached_site.js')
      .then(registration => {
        console.log('Service worker registered: ', registration);
      })
      .catch(error => console.log(error));
  });
}