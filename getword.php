<?php
	require (__DIR__ . '/../../private_html/morphconfig.php');
	header('Content-Type: text/html; charset=utf-8');
	
	$db_connect = mysqli_connect(DB_SERVER, DB_USER, DB_PASS, DB_NAME);

	if (mysqli_connect_errno()) {
		printf("Could not connect to database: %s\n", mysqli_connect_error());
		exit();
	}
	
	mysqli_set_charset($db_connect, 'utf8mb4');
	
	$q = strval($_GET['q']);
	$q2 = str_replace("'","''",$q);
	$q2 = mb_convert_encoding($q2, "UTF-8");

	$sql = "SELECT * FROM dict WHERE entry = '" . $q2 . "'";
	
	$result = mysqli_query($db_connect, $sql);

	if ($result->num_rows > 0) {
		while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
			echo "<div><h2>" . $row["entry"] . "</h2>";
			echo "<h3>Part of Speech</h3><p>" . $row["part_of_speech"] . "</p>";
			echo "<h3>Definition</h3><p>" . $row["definition"] . "</p></div>";
		}
	} else {
		echo "<h2>" . $q . "</h2>";
		echo "<p class='no_result'>Entry not found</p></br>";
	}

	// free up the memory from the result set
	mysqli_free_result($result);
	// close connection 
	mysqli_close( $db_connect );
?>
