var quill = new Quill('#editor');


var textIsInactive = true;
var textIsChanging = false;
var currentTimer;

// function that is called when the text has changed significantly
var textHasChanged = function () {
	console.log('Text changed');
	textIsChanging = false;

	// this is the point to call something that will get new counts & act on them!
	highlightRandomWords();
}

// event caller for textHasChanged
quill.on('text-change', function(delta, source) {
	if (source == 'api')
		return;

	// textHasChanged is called if there there is no typing for 2sec.
	console.log('Text is changing');
	removeHighlights();

	if (textIsChanging == false) {
		textIsChanging = true;
		currentTimer = setTimeout(textHasChanged, 2000);
	} else {
		clearTimeout(currentTimer);
		currentTimer = setTimeout(textHasChanged, 2000);
	}


});




// retrieves the n-th word in the form of {word, start, stop}
var highlightLetters = function (start, stop) {
	quill.formatText(start, stop, 'background', 'yellow');
}

var highlightRandomWords = function() {
	var len = quill.getLength();
	for (i  = 0; i < 10; i++) {
		var start = Math.floor(Math.random() * len);
		var stop = start + Math.floor(Math.random() * 8);
		highlightLetters(start, stop);
	}
}

var removeHighlights = function() {
	quill.formatText(0, quill.getLength()-1, 'background', false);
}

