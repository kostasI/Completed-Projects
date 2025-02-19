'use strict';

const textInput = document.querySelector('.input-text');
const submitBtn = document.querySelector('#submit-text');
let text = '';

// Auto-resize textarea
textInput.addEventListener('input', autoResize, false);
function autoResize() {
  this.style.height = 'auto';
  this.style.height = this.scrollHeight + 'px';
}

// Character total with spaces
function countCharacters(text) {
  var count = 0;
  for (var i = 0; i < text.length; i++) {
    count++;
  }
  return count;
}

// Character total without spaces
function countCharactersWithoutSpaces(text) {
  var count = 0;
  text = text.replace(/ /g, '');
  for (var i = 0; i < text.length; i++) {
    count++;
  }
  return count;
}

// Count number of words
function countWords(text) {
  var count = 0;
  for (var i = 0; i < text.length; i++) {
    count = text.split(' ').length;
  }
  return count;
}

function countSentences(text) {
  var count = 0;
  for (var i = 0; i < text.length; i++) {
    count = text.split(/[.?!]/g).filter(Boolean).length;
  }
  return count;
}

// Count number of syllables
function countSyllables(text) {
  text = text.toLowerCase();
  text = text.replace(/[.?!,]/g, '');
  text = text.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  text = text.replace(/^y/, '');
  return text.match(/[aeiouy]{1,2}/g).length;
}

//TODO: Submit button gets inputted text
submitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const textValue = textInput.value;

  if (textValue.length === 0) {
    alert('Your text input is invalid');
  } else {
    text = textValue;

    //TODO: Get number of characters (with spaces)
    var totalCharCount = countCharacters(text);

    //TODO: Get number of characters (without spaces)
    var totalCharCountNoSpaces = countCharactersWithoutSpaces(text);

    //TODO: Get number of words
    var numberOfWords = countWords(text);

    //TODO: Get number of sentences
    var numberOfSentences = countSentences(text);

    //TODO: Get number of syllables
    var numberOfSyllables = countSyllables(text);

    //TODO: Get unfiltered word count, occurences of the word and usage percantage
    var stringValue = text.match(/\b\w+\b/g);

    var table = document.createElement('table');
    table.style.margin = '0   auto';
    table.style.marginTop = '1rem';
    table.style.padding = '1rem';
    table.style.fontSize = '20px';
    table.style.border = '1px solid black';

    // Table rows
    var thRow = document.createElement('tr');

    // Table header
    var th1 = document.createElement('th');
    var th2 = document.createElement('th');
    var th3 = document.createElement('th');

    th1.style.padding = '0.25rem';
    th2.style.padding = '0.25rem';
    th3.style.padding = '0.25rem';

    th1.style.margin = '0.5rem';
    th2.style.margin = '0.5rem';
    th3.style.margin = '0.5rem';

    // Add the text into the data cell
    th1.appendChild(document.createTextNode('Unfiltered word count'));
    th2.appendChild(document.createTextNode('Occurrences'));
    th3.appendChild(document.createTextNode('Percentage'));

    // Add the data cell into the row
    thRow.appendChild(th1);
    thRow.appendChild(th2);
    thRow.appendChild(th3);

    // Add the row into the table
    table.appendChild(thRow);

    // Get words occurance
    var tempString = Array.from(new Set(stringValue)).toString();
    tempString = tempString.split(',');

    // Get percantage
    var percantage = 100 / numberOfWords;

    for (var i = 0; i < tempString.length; i++) {
      // Table data into text nodes
      var tr = document.createElement('tr');
      var occuranceCount = 0;

      // Table data
      var td1 = document.createElement('td');
      var td2 = document.createElement('td');
      var td3 = document.createElement('td');

      // Cell styling
      td1.style.padding = '0.25rem';
      td2.style.padding = '0.25rem';
      td3.style.padding = '0.25rem';

      td1.style.margin = '0.5rem';
      td2.style.margin = '0.5rem';
      td3.style.margin = '0.5rem';

      td1.style.textAlign = 'center';
      td2.style.textAlign = 'center';
      td3.style.textAlign = 'center';

      td1.style.borderBottom = '1px solid black';
      td2.style.borderBottom = '1px solid black';
      td3.style.borderBottom = '1px solid black';

      td2.style.borderLeft = '1px solid black';
      td2.style.borderRight = '1px solid black';

      // Check occurance for each word
      for (var j = 0; j < stringValue.length; j++) {
        if (tempString[i] === stringValue[j]) {
          occuranceCount++;
        }
      }

      // Column 1: Unfiltered word count
      td1.appendChild(document.createTextNode(tempString[i])); // Second cell has all the words
      tr.appendChild(td1);

      // Column 2: Occurrences
      td2.appendChild(document.createTextNode(occuranceCount)); // Third cell has the word occurance
      tr.appendChild(td2);

      // Column 3: Percentage
      td3.appendChild(
        document.createTextNode((percantage * occuranceCount).toFixed(4))
      ); // Four cell has the percantage usage
      tr.appendChild(td3);

      table.appendChild(tr);
    }
    document.body.appendChild(table);
  }
});
