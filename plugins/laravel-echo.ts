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

    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: '5f269c1dbb908e5f02db',
        wsHost: '',
        wsPort: 443,
        cluster: 'sa1',
        forceTLS: false
    })
});
