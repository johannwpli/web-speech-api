var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

let stage;
let phrase; // Johann
let phrases = [
  'Please use the hand soap to wash your hands',
  'I hope every patient here could stay calm. We will spare our efforts to help everyone here',
  'This TV show is about a virus and a patient',
  'It’s yellow. Could you help me buy yellow masks',
  'If you need other help, do not hesitate to ask our nurses',
  'If you get sick, you should stay home and stay away from other people',
  'Doctors must wear masks to protect themselves',
  'Each person can get 9 masks every two weeks',
  'The symptoms of the virus include sore throat, fever, and cough',
  'No one can leave their house except to buy food or get medical care',
  'Hello! I am a new doctor here, but I am not an intern',
  'If you need water, you can use the water dispenser beside the toilet',
  'Keep others distance, or you will catch the virus'
]; // 13 phrases

let radios = document.getElementsByName("stage");

for(radio in radios) {
  radios[radio].onclick = function() {
    stage = this.value
    //console.log(stage);

    if (stage === 'A') {
      phrases = [
        'It’s a mask',
        'He is her doctor',
        'Keep the distance',
        'I’m illed',
        'I get the high fever',
        'Is this a lineup for masks',
        'Those patients are angry',
        'I recover',
        'That is an isolation',
        'These are vaccines',
        'They are infected',
        'That is a pharmacy',
        'The nurse is young',
        'It is a pill',
        'I don’t feel well',
        'I have a headache',
        'I need to take some medicine',
        'My temperature is 38 degrees'
      ]; // 18 phrases
    }

    if (stage === 'C') {
      phrases = [
        'People who have been exposed to the new coronavirus might practice self-quarantine',
        'This brand-new virus can be transmitted between humans through droplets and contact',
        'Canceling events that are likely to draw crowds is an example of social distancing',
        'People who contract the coronavirus might spread the disease before symptoms',
        'We could take precautions to prevent infection, such as washing hands regularly',
        'The World Health Organization declares the COVID-19 outbreak a pandemic as it ravages the world',
        'The virus has a long incubation period',
        'Thousands of people in Spain are protesting against the government’s handling of the coronavirus outbreak',
        'The country’s two-month lockdown has seen hotels, bars, and restaurants all close as well as beaches and other outdoor attractions',
        'Church officials followed social distancing rules and disinfected the building ahead of the service'
      ]; // 10 phrases
    }

  }
}

let phrasePara = document.querySelector('.phrase'),
    resultPara = document.querySelector('.result'),
    diagnoPara = document.querySelector('.output'),

    heartPara  = document.querySelector('#heart' ), // Johann
    swordPara  = document.querySelector('#sword' ), // Johann
    armorPara  = document.querySelector('#armor' ), // Johann

    heartCount = 0, // Johann
    swordCount = 0, // Johann
    armorCount = 0, // Johann

    testBtn    = document.querySelector('#test'  ), // Johann
    recoBtn    = document.querySelector('#reco'  ), // Johann
    textAra    = document.querySelector('#text'  ); // Johann

function randomPhrase() {
  let number = Math.floor(Math.random() * phrases.length);
  return number;
}

function testSpeechSet() {
  testBtn.disabled = true;
  testBtn.textContent = 'Test in progress';
  textAra.disabled = true; // Johann

  phrase = phrases[randomPhrase()]; // Johann
  // To ensure case consistency while checking with the returned output text
  phrase = phrase.toLowerCase();
  phrasePara.textContent = phrase;
  textAra.value = phrase; // Johann
  resultPara.textContent = 'Right or wrong?';
  resultPara.style.background = '#f2f2f2'; // Johann
  diagnoPara.textContent = '...diagnostic messages';
}

function testSpeechGet() {
  testBtn.disabled = true; // Johann
  testBtn.textContent = 'Test in progress'; // Johann

  textAra.value = textAra.value || 'Click New test or input text here to start.'; // Johann
  phrase = textAra.value.toLowerCase(); // Johann
  phrasePara.textContent = phrase; // Johann
  resultPara.textContent = 'Right or wrong?'; // Johann
  resultPara.style.background = '#f2f2f2'; // Johann
  diagnoPara.textContent = '...diagnostic messages'; // Johann

  let grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrase +';';
  let recognition = new SpeechRecognition();
  let speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function(event) {
    // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
    // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
    // It has a getter so it can be accessed like an array
    // The first [0] returns the SpeechRecognitionResult at position 0.
    // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
    // These also have getters so they can be accessed like arrays.
    // The second [0] returns the SpeechRecognitionAlternative at position 0.
    // We then return the transcript property of the SpeechRecognitionAlternative object 
    let speechResult = event.results[0][0].transcript.toLowerCase();
    diagnoPara.textContent = 'Speech received: ' + speechResult; // Johann
    if(speechResult === phrase) {
      resultPara.textContent = 'I heard the correct phrase!';
      resultPara.style.background = 'lime';

      heartPara.innerHTML += '❤️'; // Johann
      heartCount ++; // Johann

      if (heartCount === 5) {
        Swal.fire({
          html: '<div class="video-container"><iframe src="https://www.youtube.com/embed/-4lsg71fquo?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>',
          showConfirmButton: false,
        }) // show congrats video, Johann
      }

      if (heartCount === 10) {
        Swal.fire({
          html: '<div class="video-container"><iframe src="https://www.youtube.com/embed/CSav51fVlKU?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>',
          showConfirmButton: false,
        }) // show congrats video, Johann
      }

    } else {
      resultPara.textContent = 'That didn\'t sound right.';
      resultPara.style.background = 'red';
    }

    console.log('Confidence: ' + event.results[0][0].confidence);
  }

  recognition.onspeechend = function() {
    recognition.stop();
    testBtn.disabled = false;
    testBtn.textContent = '①  New test';
    textAra.disabled = false; // Johann
  }

  recognition.onerror = function(event) {
    testBtn.disabled = false;
    testBtn.textContent = '①  New test';
    textAra.disabled = false; // Johann
    diagnoPara.textContent = 'Error occurred in recognition: ' + event.error;
  }
  
  recognition.onaudiostart = function(event) {
      //Fired when the user agent has started to capture audio.
      console.log('SpeechRecognition.onaudiostart');
  }
  
  recognition.onaudioend = function(event) {
      //Fired when the user agent has finished capturing audio.
      console.log('SpeechRecognition.onaudioend');
  }
  
  recognition.onend = function(event) {
      //Fired when the speech recognition service has disconnected.
      console.log('SpeechRecognition.onend');
  }
  
  recognition.onnomatch = function(event) {
      //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
      console.log('SpeechRecognition.onnomatch');
  }
  
  recognition.onsoundstart = function(event) {
      //Fired when any sound — recognisable speech or not — has been detected.
      console.log('SpeechRecognition.onsoundstart');
  }
  
  recognition.onsoundend = function(event) {
      //Fired when any sound — recognisable speech or not — has stopped being detected.
      console.log('SpeechRecognition.onsoundend');
  }
  
  recognition.onspeechstart = function (event) {
      //Fired when sound that is recognised by the speech recognition service as speech has been detected.
      console.log('SpeechRecognition.onspeechstart');
  }
  recognition.onstart = function(event) {
      //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
      console.log('SpeechRecognition.onstart');
  }
}

testBtn.addEventListener('click', testSpeechSet);
recoBtn.addEventListener('click', testSpeechGet);
