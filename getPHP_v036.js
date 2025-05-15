///
/// getwords.js
///
/// intiates PHP calls to SQL databases
/// 
/// also handles some UI "loading..." indicators
///
///

//
// showWord(string)
//
// Dictionay lookup initiated from [ROOT] click
//
function showWord(str) {
    if (str == "") {
        document.getElementById("dictionary").innerHTML = "";
        return;
    } else {
		document.getElementById("dictionary_popup").style.display = "block";
		document.getElementById("dictionary").innerHTML = "<span class=\"loading\">Loading . . .</span>";
			
		if (window.XMLHttpRequest)  xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("dictionary").innerHTML = this.responseText;
				
            }
        };
        xmlhttp.open("GET","getword.php?q=" + str,true);
        xmlhttp.send();
    }
}

//
// runSearch(string)
//
// English Search run from English search input blank
//
function runSearch(str) {
    if (str == "") {
        document.getElementById("searchResults").innerHTML = "";
        return;
    } else {
		document.getElementById("searchResults").innerHTML = "<span class=\"loading\">Searching . . .</span>";
		
		if (window.XMLHttpRequest)  xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("searchResults").innerHTML = this.responseText;
				
            }
        };
        xmlhttp.open("GET","runsearch.php?q=" + str,true);
        xmlhttp.send();
    }
}