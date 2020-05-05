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
  Swal.fire('plz use Chrome to continue') // fire SweetAlert2
}


/* click icon to show info by Johann */

var infoIcn = document.querySelector('#info');

function showInfo() {
  Swal.fire({
    title: 'click New test or input text in the box to start',
    icon: 'question',
    showConfirmButton: false,
    timer: 3000,
  })
}

infoIcn.addEventListener('click', showInfo);
