<?php
	$dir = 'audio/';
	
	$files = scandir($dir);

	echo json_encode($files);
?>