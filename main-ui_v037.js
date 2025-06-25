///
/// main-ui.js
///
/// Includes:
///		Global search tries Object (reTRIEval trees)
///		OnLoad:
///			UI methods for input
///			Compile trie structures
///		UI methods on Submit
///		UI methods to print Derivations
///		custom hide / show
///

//global to hold all retrieval trie objects
var tries = {};

//
// UI methods / onload
//
window.onload = function(){
	//hide all loading indicators
	const loading_indicators = document.getElementsByClassName("loading");
	for(var i=0; i<loading_indicators.length; i++) {loading_indicators[i].style.display = "none"};
	
	//allow submit buttons
	const submit_buttons = document.getElementsByClassName("submit");
	for(var i=0; i<submit_buttons.length; i++) {submit_buttons[i].disabled = false};
	
	//turn on enter key for entry fields (morph search, and English entry search)
	//focus on the morphology entry field
	const entry_listener = document.getElementById("entry");
	entry_listener.focus();
	entry_listener.addEventListener("keyup", function(event) {
		if (event.key === "Enter") {
			morph();
		}
	});
	const search_listener = document.getElementById("searchEntry");
	search_listener.addEventListener("keyup", function(event) {
		if (event.key === "Enter") {
			search();
		}
	});
	
	//add listeners for ribbon-clicks (frame switches - morph / English search)
	const ribbon_listener = document.getElementById("ribbon").children;
	ribbon_listener[0].addEventListener("click", function(){show(document.getElementById("morphFrame")); hide(document.getElementById("searchFrame")); ribbon_listener[0].classList.add("current"); ribbon_listener[1].classList.remove("current");});
	ribbon_listener[1].addEventListener("click", function(){show(document.getElementById("searchFrame")); hide(document.getElementById("morphFrame")); ribbon_listener[1].classList.add("current"); ribbon_listener[0].classList.remove("current");});



	//
	// * Trie methods *
	//
	//Compile retrieval trie structures
	tries.words = new Trie();
	tries.non_aff_words = new Trie();	//non-affixing words (mostly small function words)
	tries.affixes = new Trie();
	
	//add words to word_trie
	//Creates Trie with deaccented forms...
	//but includes accented forms at end nodes in properties
	//	Tries are fast but fairly rigid...
	//	methods to allow other characters are complicated or lengthy
	//	We'll deaccent and then possibly filter at the end
	for (var i = 0; i < words.length; i++) {
		tries.words.insert(deaccent(words[i].split("/", 1)[0].toLowerCase()), words[i]);
	}
	
	//add words to non_affixing_word_trie
	for (var i = 0; i < non_affixing_words.length; i++) {
		tries.non_aff_words.insert(deaccent(non_affixing_words[i].split("/", 1)[0].toLowerCase()), non_affixing_words[i]);
	}
	
	//add affixes to affix_trie
	for (var i = 0; i < affixes.length; i++) {
		tries.affixes.insert(deaccent(affixes[i].add.split("/", 1)[0].toLowerCase()), affixes[i]);
	}
}



//
// morph()
//
// Fires on click from Submit button next to Morph textbox
//
// Method: Take input from textbox, requests parses, handles UI / display functionality
//
async function morph() {
	var parses = [];  //all ouput parses	

	//get entry from input blank on page
	var entry = document.getElementById("entry").value;
	
	//dislpay loading
	document.getElementById("results").innerHTML = "<span class=\"loading\">Loading . . .</span>";
	
	//Get parses
	parses = await parse(entry);
	
	//display results
	printDerivations(parses);
}


//
// printDerivations(Object)
//
// Outputs parses to the results div
// places each word into its own div,
// and each parse into its own table of affixes
//
function printDerivations(parses) {
	document.getElementById("results").innerHTML = "";
	var temp_deriv = "";  //what to add to the document

	for (var i in parses) {
		var word_parses = parses[i][2];
		
		temp_deriv += "<h3>";
		temp_deriv += parses[i][0];
		temp_deriv += "</h3>";
		
		if (word_parses.length == 0) {			//returned empty string
			temp_deriv += "<p class='no_result'>Word not found</p></br>";
		} else {
			//replace this eventually with something where a drop-down global selector can choose which properties to show (like Topping, GovGuam, etc.)
			for (var j in word_parses) {
				temp_deriv += "</br><table><tr>";
				
				var keys = Object.keys(word_parses[j]);
				for (var k in keys) {				
					temp_deriv += "<td>";
					temp_deriv += word_parses[j][keys[k]].morpheme_value;
					temp_deriv += "</td>";
				}
				temp_deriv += "</tr><tr>";
				for (var k in keys) {
					temp_deriv += "<td>";
					temp_deriv += word_parses[j][keys[k]].morpheme_text;
					temp_deriv += "</td>";
				}
				temp_deriv += "</tr></table></br>";
			}
		}
	}
	document.getElementById("entry").select();
	document.getElementById("results").innerHTML += temp_deriv;
	
	
	// Add [Root] morpheme listeners
	// Allows user to click [ROOT] to get definitions
	var root_spans = document.getElementsByClassName("roots");
	for (var i =0; i < root_spans.length; i++) {
		var base_word = root_spans[i].id.split("_", 2)[1];
		root_spans[i].addEventListener("click", showWord.bind(this, base_word), false);
	}
}



//
// hide
//
function hide(to_hide) {
	to_hide.style.display = "none";
}

//
// show
//
function show(to_show) {
	to_show.style.display = "block";
	to_show.removeAttribute("hidden");
}