let readySyn = (window.speechSynthesis !== undefined) ? 'READY✔️' : 'NOT READY❌',
    readyRec = (SpeechRecognition !== undefined && webkitSpeechRecognition !== undefined) ? 'READY✔️' : 'NOT READY❌';

/*
Author: Jonathan Marzullo
Title:  html - JavaScript: How to find out if the user browser is Chrome? - Stack Overflow
Link:   https://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome/13348618#13348618
*/

// please note, 
// that IE11 now returns undefined again for window.chrome
// and new Opera 30 outputs true for window.chrome
// but needs to check if window.opr is not undefined
// and new IE Edge outputs to true now for window.chrome
// and if not iOS Chrome check
// so use the below updated condition

var isChromium = window.chrome;
var winNav = window.navigator;
var vendorName = winNav.vendor;
var isOpera = typeof window.opr !== "undefined";
var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
var isIOSChrome = winNav.userAgent.match("CriOS");

if (isIOSChrome) {
  // is Google Chrome on IOS
} else if(
  isChromium !== null &&
  typeof isChromium !== "undefined" &&
  vendorName === "Google Inc." &&
  isOpera === false &&
  isIEedge === false
) {
  // is Google Chrome
} else { 
  // not Google Chrome
  //Swal.fire('plz use Chrome to continue') // fire SweetAlert2
  showEnv();
}


/* icon to show info, Johann */

let hlpIcn = document.querySelector('#hlp'),
    infIcn = document.querySelector('#inf'),
    envIcn = document.querySelector('#env'),
    grpIcn = document.querySelector('#grp');

function showHlp() {
  Swal.fire({
    title: '',
    //icon: 'question',
    html:
      '<h2 class="swal2-title">How to Play</h2>' + 
      'Type A<br>①  Click \'New test\' to get test.<br>②  Click \'Play sound\' to listen.<br>③  Click \'Recognize voice\' to speak.<br><br>Type B<br>①  Input text in the form to set test.<br>②  Click \'Play sound\' to listen.<br>③  Click \'Recognize voice\' to speak.',
    showConfirmButton: false,
  })
}

function showInf() {
  Swal.fire({
    title: '',
    //icon: 'info',
    html:
      '<h2 class="swal2-title">Origin</h2>' + 
      'Please read the <a href="https://github.com/paint1024/web-speech-api/tree/master/show-me-the-talk/README.md" target="_blank">README</a> to know more.<br><br>' +
      '<h2 class="swal2-title">Under the Hood</h2>' + 
      //'The Shadowing / Echo Method<br><br>' +
      'Before continuing, I highly recommend spending 19 mins first to watch this video.<br><br>' +
      '<div class="video-container"><iframe src="https://www.youtube.com/embed/sQEWEPIHLzQ?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>',
    showConfirmButton: false,
    //timer: 3000,
  })
}

function showEnv() {
  Swal.fire({
    title: '',
    html:
      '<h2 class="swal2-title">Browser</h2>' + 
      'Please use <a href="https://www.google.com/chrome/" target="_blank">Google Chrome</a> to play.<br>' +
      '<a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API#Browser_compatibility" target="_blank">(Learn More)</a><br><br>' +
      '<h2 class="swal2-title">Readiness</h2>' +
      'Speech synthesis is ' + readySyn + '.<br>Speech recognition is ' + readyRec +'.<br><br>' +
      '<h2 class="swal2-title">Web</h2>' +
      '<img src=scan.png>',
    showCloseButton: false,
    showConfirmButton: false,
  })
}

function showGrp() {
  Swal.fire({
    title: '',
    html:
      '<h2 class="swal2-title">API</h2>' + 
      'SMTT uses Google Web Speech API to do speech synthesis and recognition.<br><br>' +
      '<h2 class="swal2-title">Feedback</h2>' +
      'Fill in the <a href="https://docs.google.com/forms/d/e/1FAIpQLSfLNwECXdLieEhI389OXgaAeAKYgPJdfV18YvlLNqDlKaCvSQ/viewform" target=_blank>questionnaire</a> to help improve our system.<br><br>' +
      '<h2 class="swal2-title">Team</h2>' +
      'Project Manage: Buck, Kobe & Shelly<br>Material Edit: Jason & Juanito<br>Game & Program Design: <a href="https://paint1024.github.io/" target="_blank">Johann</a>',
      //'<h2 class="swal2-title">Support</h2>' +
      //'If you need support or have any questions, feel free to contact us.',
    showCloseButton: false,
    showConfirmButton: false,
  })
}

hlpIcn.addEventListener('click', showHlp);
infIcn.addEventListener('click', showInf);
envIcn.addEventListener('click', showEnv);
grpIcn.addEventListener('click', showGrp);


/* initialization for materialize, Johann */

/*
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, options);
});
*/


/* PWA, Johann */

/*
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('js/service-worker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
*/

/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

/* eslint-env browser, es6 */

'use strict';

const applicationServerPublicKey = 'BHdd2PwLOsYaDQQOmqw_8KIIYOQYECWN' +
  'lat0K8GScnytjV88e6Xifn0GMz7MbScAkxf_kVJhnp-0NrB_P4u6WHw';

const pushButton = document.querySelector('.js-push-btn');

let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function updateBtn() {
  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Push Messaging Blocked.';
    pushButton.disabled = true;
    updateSubscriptionOnServer(null);
    return;
  }

  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}

function updateSubscriptionOnServer(subscription) {
  // TODO: Send subscription to application server

  const subscriptionJson = document.querySelector('.js-subscription-json');
  const subscriptionDetails =
    document.querySelector('.js-subscription-details');

  if (subscription) {
    subscriptionJson.textContent = JSON.stringify(subscription);
    subscriptionDetails.classList.remove('is-invisible');
  } else {
    subscriptionDetails.classList.add('is-invisible');
  }
}

function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    console.log('User is subscribed.');

    updateSubscriptionOnServer(subscription);

    isSubscribed = true;

    updateBtn();
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
    updateBtn();
  });
}

function unsubscribeUser() {
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription) {
      return subscription.unsubscribe();
    }
  })
  .catch(function(error) {
    console.log('Error unsubscribing', error);
  })
  .then(function() {
    updateSubscriptionOnServer(null);

    console.log('User is unsubscribed.');
    isSubscribed = false;

    updateBtn();
  });
}

function initializeUI() {
  pushButton.addEventListener('click', function() {
    pushButton.disabled = true;
    if (isSubscribed) {
      unsubscribeUser();
    } else {
      subscribeUser();
    }
  });

  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    updateSubscriptionOnServer(subscription);

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  });
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('js/service-worker.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);

    swRegistration = swReg;
    initializeUI();
  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}
