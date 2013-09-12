<?php
	$user = $_GET['user'];
	$pass = $_GET['pass'];
	if($user == 'admin' && $pass == 'admin'){
		echo "true";
	}
	else{
		echo "false";
	}
?>