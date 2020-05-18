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
  showWeb();
}


/* click icon to show info, Johann */

var infIcn = document.querySelector('#inf');
var webIcn = document.querySelector('#web');
var grpIcn = document.querySelector('#grp');

function showInf() {
  Swal.fire({
    title: 'The Echo Method',
    //icon: 'question',
    html: 'First, spend 19 mins to view this video.<br>(highly recommended)<br><br><div class="video-container"><iframe src="https://www.youtube.com/embed/sQEWEPIHLzQ?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>',
    showConfirmButton: false,
    //timer: 3000,
  })
}

function showWeb() {
  Swal.fire({
    title: 'Web Browser',
    html: 'Project SMTT uses Google Web Speech API to implement speech synthesis and speech recognition, which means strongly suggested using Google Chrome for browsing. <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API#Browser_compatibility" target="_blank">(Learn More)</a>',
    showConfirmButton: false,
  })
}

function showGrp() {
  Swal.fire({
    title: 'Team SMTT',
    html: 'Briefing: Buck & Shelly<br>Content: Jason & Juanito<br>Program: <a href="https://paint1024.github.io/" target="_blank">Johann</a><br>Schedule: Kobe',
    showConfirmButton: false,
  })
}

infIcn.addEventListener('click', showInf);
webIcn.addEventListener('click', showWeb);
grpIcn.addEventListener('click', showGrp);


/* PWA, Johann */

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
