import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
  interface Window {
    Pusher:any;
    Echo:any;
  }
}

export default defineNuxtPlugin(() => {
  window.Pusher = Pusher
  const config = useRuntimeConfig();

  window.Echo = new Echo({
    broadcaster: 'pusher',
    key: config.public.pusherKey || '',
    wsHost: config.public.pusherHost || '',
    wsPort: config.public.pusherPort || 443,
    cluster: config.public.pusherCluster || 'sa1',
    forceTLS: config.public.pusherTls === 'false'
  });
});
