//------------------------------------------------------------------------

var regexIndexOf = function(regex, startpos) {
    var indexOf = lexer.text.substring(startpos).search(regex);
    return (indexOf >= 0) ? (indexOf + startpos) : indexOf;
}

var lexer = {
	text: "",
	length: 0,
	categories: {},
	iterator: 0
}

/* Lexer function */

lexer.attachText = function (text) {
	lexer.text = text;
	lexer.length = text.length;
	lexer.iterator = 0;
}

lexer.addCategory = function (categoryName, categoryWords) {
	lexer.categories[categoryName] = categoryWords;
}

lexer.reset = function () {
	lexer.iterator == 0;
}


lexer.nextWord = function () {
	lexer.iterator = regexIndexOf(/\W\w/, lexer.iterator);

	if (lexer.iterator != -1) {
		lexer.iterator++;
		var end = regexIndexOf(/\W/, lexer.iterator);
		if (end == -1)
			end = lexer.length;
		return [lexer.iterator, end];
	}
	else //eof
		return null;

}

lexer.getWord = function(w) {
	return lexer.text.substring(w[0], w[1]);
}

lexer.getWordsInCategory = function(category, callback) {
	lexer.reset();

	var w;
	while ((w = lexer.nextWord()) != null) {
		console.log(w) 
		if (lexer.contains(category, w))
			callback(w[0], w[1]);
	}
}

lexer.contains = function(category, w) {
	var word = lexer.getWord(w);
	console.log(word)
	return (lexer.categories[category])[word] == true;
}

$(document).ready(function () {
	var quill = new Quill('#editor');


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


	lexer.attachText(quill.getText());

	categoryName = "body";
	category = {"head": true, "body": true, "legs": true, "back": true, "belly": true};

	lexer.addCategory(categoryName, category);

	lexer.getWordsInCategory(categoryName, highlightLetters);

	$("#newCategory button").on("click", function () {
		var name = "hello";
		event.preventDefault();
		var newItem = $("#newCategory").after("<li id='category-" + name + "'>" + name + "</li>")
		onCategorySelected("hello");


	});

	var onCategorySelected = function (name) {
		$(".selected").removeClass("selected");
		$("#category-" + name).addClass("selected")

		// select this category
		// retrieve the words
		// if lexer has category then getWordsInCategory
		// otherwise get words from backend
		// and then call getWordsInCategory
	}
})
