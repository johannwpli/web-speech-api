var synth = window.speechSynthesis;

var inputForm   = document.querySelector('form'        );
var inputTxt    = document.querySelector('#text'       ); // Johann
var voiceSelect = document.querySelector('select'      );

var pitch       = document.querySelector('#pitch'      );
var pitchValue  = document.querySelector('.pitch-value');
var rate        = document.querySelector('#rate'       );
var rateValue   = document.querySelector('.rate-value' );

var voices = [];

function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
      const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
      if ( aname < bname ) return -1;
      else if ( aname == bname ) return 0;
      else return +1;
  });
  var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = '<option value="0" disabled="true">pick a language</option>'; // Johann
  for(i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    
    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);

    if(voices[i].lang === 'en-US') {
      option.setAttribute('value', 'en-US'); // Johann
      option.setAttribute('id', 'en-US'); // Johann
    }

    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = selectedIndex;
}

populateVoiceList();

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak(){
    if (document.querySelector('select').value === '0') {
      document.querySelector('#en-US').selected = true; // Johann
    }

    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (inputTxt.value !== '') {
    //console.log(inputTxt.value); // Johann
    var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
    utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
    }
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
    }
    var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for(i = 0; i < voices.length ; i++) {
      if(voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        break;
      }
    }
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis);
  }
}

inputForm.onsubmit = function(event) {
  event.preventDefault();

  speak();

  inputTxt.blur();
}

pitch.onchange = function() {
  pitchValue.textContent = pitch.value;
}

rate.onchange = function() {
  rateValue.textContent = rate.value;
}

voiceSelect.onchange = function(){
  speak();
}
