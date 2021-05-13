// // FOR NOW IT"S STATIC LATER USE IT THROUGH .env FILE
// const PUBLIC_VAPID_KEY="BPhxjNVofkUTZBRjsIloslKNuVw2E7avqo65YUOS0TJ6QTUI9DabVc1Nit1AnoOnrIySf5E-UUbzNNhaNH71CPQ";

// // CHECK FOR SERVICE WORKER IN BROWSER

// // Register SW, Register Push, Send Push
// const notification = async ()=>{
//     console.log('Registering service...');
//     let l = location.pathname;
//     const register = await navigator.serviceWorker.register('/worker.js',{
//         scope: '/' // define on which url it needs to be applied
//     });
//     // console.log('REG: ',register);
    
//     // Register Push
//     const subscription = await register.pushManager.subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
//     });
//     console.log('Push Registered...');
    
//     // Sending Push
//     console.log('Sending Push...',subscription);
//     await axios.post('/push/register', subscription
//     // JSON.stringify(subscription)
//     ,{
//         Headers: {
//             'Content-type': 'application/json'
//         }
//     });
//     console.log('Push send...');
// }

// if('serviceWorker' in navigator){
//     notification().catch(err=> console.log('sw error',err));
// }

// function urlBase64ToUint8Array(base64String) {
//     const padding = '='.repeat((4 - base64String.length % 4) % 4);
//     const base64 = (base64String + padding)
//       .replace(/-/g, '+')
//       .replace(/_/g, '/');
   
//     const rawData = window.atob(base64);
//     const outputArray = new Uint8Array(rawData.length);
   
//     for (let i = 0; i < rawData.length; ++i) {
//       outputArray[i] = rawData.charCodeAt(i);
//     }
//     return outputArray;
//   }