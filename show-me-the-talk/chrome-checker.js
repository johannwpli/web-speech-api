/*
Author: Rob W
Title:  javascript - How to detect Safari, Chrome, IE, Firefox and Opera browser? - Stack Overflow
Link:   https://stackoverflow.com/a/9851769
*/

// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1 - 79
var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

// Edge (based on chromium) detection
var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);

// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;

var output = 'you\'re using ';
var browser = '';

if (isFirefox)      { browser = 'Firefox';      }
if (isSafari)       { browser = 'Safari';       }
if (isOpera)        { browser = 'Opera';        }
if (isIE)           { browser = 'IE';           }
if (isEdge)         { browser = 'Edge';         }
if (isEdgeChromium) { browser = 'EdgeChromium'; }
if (isBlink)        { browser = 'Blink';        }

if (browser) {
  output = output + browser + ' now, plz open Chrome to continue';
  //console.log(output)
  Swal.fire(output) // fire SweetAlert2
}


/* click icon to show info by Johann */

var infoIcn = document.querySelector('#info');

function showInfo() {
  Swal.fire({
    title: 'click New test or input text in the box to start',
    showConfirmButton: false,
    timer: 3000,
  })
}

infoIcn.addEventListener('click', showInfo);
