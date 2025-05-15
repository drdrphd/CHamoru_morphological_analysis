<?php
	require '../../guamlingconfig.php';
	header('Content-Type: text/html; charset=utf-8');
	
	$db_connect = mysqli_connect(DB_SERVER, DB_USER, DB_PASS, "dict");

	if (mysqli_connect_errno()) {
		printf("Could not connect to database: %s\n", mysqli_connect_error());
		exit();
	}
	
	mysqli_set_charset($db_connect, 'utf8mb4');
	
	$q = strval($_GET['q']);
	$q2 = str_replace("'","''",$q);
	$q2 = mb_convert_encoding($q2, "UTF-8");

	$sql = "SELECT * FROM `dict` WHERE definition LIKE '%" . $q2 . "%' ORDER BY CHAR_LENGTH(definition)";
	
	$result = mysqli_query($db_connect, $sql);

	if ($result->num_rows > 0) {
		echo "<div><h2>" . $result->num_rows . " results found</h2></div>";
		while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
			echo "<div><h3>" . $row["entry"] . "</h3>";
			echo "<b>Part of Speech:</b> " . $row["part_of_speech"] . "</p>";
			echo "<b>Definition:</b> " . $row["definition"] . "</p>";
			if (($row["alternate_form"] !== null) && (strlen($row["alternate_form"])>0)) {
				echo "<b>Alternate forms:</b> " . $row["alternate_form"] . "</p>";
			}
			echo "</div>";
		}
	} else {
		echo "<h2>" . $q . "</h2>";
		echo "<p class='no_result'>No results found</p></br>";
	}

	// free up the memory from the result set
	mysqli_free_result($result);
	// close connection 
	mysqli_close( $db_connect );
?>
