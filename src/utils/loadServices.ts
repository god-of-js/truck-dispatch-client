import Api from 'Api';
import User from 'types/User';
import { GOOGLE_MAPS_KEY } from './privateKeys';

export default function loadServices() {
  // Load external scripts after website has completely mounted.

  // let intercomScript: HTMLScriptElement | null =
  //   document.createElement('script');
  // intercomScript.innerHTML = `
  //     (function(){
  //       var w=window;
  //       var ic=w.Intercom;
  //       if(typeof ic==="function"){
  //         ic('reattach_activator');
  //         ic('update',w.intercomSettings);
  //       }else{
  //         var d=document;
  //         var i=function(){i.c(arguments);};
  //         i.q=[];i.c=function(args){i.q.push(args);};
  //         w.Intercom=i;
  //         var l=function(){
  //           var s=d.createElement('script');
  //           s.type='text/javascript';
  //           s.async=true;
  //           s.src='https://widget.intercom.io/widget/rglp4uhl';
  //           var x=d.getElementsByTagName('script')[0];
  //           x.parentNode.insertBefore(s,x);
  //         };
  //         if(document.readyState==='complete'){
  //           l();
  //         }else if(w.attachEvent){
  //           w.attachEvent('onload',l);
  //         }else{
  //           w.addEventListener('load',l,false);
  //         }
  //       }
  //     })();
  //   `;
  // document.head.appendChild(intercomScript);
  // // @ts-ignore
  // window.intercomSettings = {
  //   api_base: 'https://api-iam.intercom.io',
  //   app_id: 'rglp4uhl',
  // };
  // // @ts-ignore
  // window.Intercom('update');

  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    Api.getUser().then((user: User) => {
      // @ts-ignore
      window.Intercom('boot', {
        api_base: 'https://api-iam.intercom.io',
        app_id: 'rglp4uhl',
        name: `${user?.firstName} ${user?.lastName}`,
        email: user.email,
        created_at: user.createdAt,
        userType: user.userType,
      });
    });
  }

  let script: HTMLScriptElement | null = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&libraries=places&callback=initMap`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}
