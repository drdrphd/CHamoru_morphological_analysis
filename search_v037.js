///
/// parse.js
/// 
/// Methods: search() -- Sanitize input and prepare for an SQL quesry
///
/// has access to global constants:
///			 words, affixes, non_affixing_words, affixation_combinations
/// has access (currently) to other methods in parse____.js:
/// 		 deaccent(), etc.
///
/// May try in the future to do a better ranked search
/// Currently runsearch.php returns sorted by definition length,
///  where shorter definitions are assumed to be more relevant
/// Could try to sort by number of words instead or number of non- stop-words
///
/// Things to add:
///		Wildcards
///		Search through stop-words first (things like "the") and present simple search results
///			Add a "do full search" button after these simplified results
///


//
// Search
//
// Method: Take input from textbox and sanitize for SQL query
//
function search() {
	var searchEntry = [];  //allow multiple input words
	
	document.getElementById("searchResults").innerHTML = "<span class=\"loading\">Searching . . .</span>";
	searchEntry = document.getElementById("searchEntry").value;
	
	//change all curly apostrophes to regular apostrophes
	searchEntry = searchEntry.replace(/[‘]/g, "'").replace(/[’]/g, "'");
	
	//Only take alphabetic, numeric, spaces, dash, and apostrophe
	// ** To Do -- later add wildcard functionality *******************************************************************
	searchEntry = searchEntry.replace(/[^a-zA-Z0-9 \-']+/g, '');
	
	
	//without the brief pause, was not updating the screen before running the rest of the code
	//allows for clear / load in results
	//probably a better way to do this -- this may be browser dependent
	setTimeout(() => { 
	
		//Run SQL query on search term(s)
		runSearch(searchEntry);
			
	} , 10); //10ms timeout
}