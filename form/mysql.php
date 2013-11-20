<?php

$con = mysql_connect("localhost", "root", "");
mysql_select_db("test", $con);
if (!$con) {
	die("herpderp");
}
if(isset($_POST['title']) && isset($_POST['summary'])
	&& isset($_POST['fileName']) && isset($_POST['fileSize']) 
	&& isset($_POST['fileType']) && isset($_POST['fileContent'])){
	$title = $_POST['title'];
	$text = $_POST['summary'];
	$fileName = $_POST['fileName'];
	$fileSize = intval($_POST['fileSize']);
	$fileType = $_POST['fileType'];
	$fileContent = mysql_real_escape_string($_POST['fileContent']);
	echo "jabadabadoo";
	$insertQuery = <<<EOD
	INSERT INTO post (title, text, fileName, fileContent, fileSize, fileType) VALUES
	('{$title}', '{$text}', '{$fileName}', '{$fileContent}', {$fileSize}, '{$fileType}')

EOD;

	mysql_query($insertQuery) or die("failed to put data in database1 ". mysql_error() . "<br />" . $fileContent);
	


}else if(isset($_POST['title'])){
	echo "at the else";
mysql_query("INSERT INTO post (title, text, fileName) VALUES
		(".
			"'el'" . "," . "'text'" . "," . "'fileName'"
			 .
		")") or die("failed to put data in database2" . mysql_error());
}else{
	echo "top lel";
}
