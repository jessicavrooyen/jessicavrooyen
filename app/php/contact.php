<?php

	$to      = "jessicav556@gmail.com";
	$subject = "Hello!";

	$header = "From: jessicav556@gmail.com\r\n";
	$header.= "MIME-Version: 1.0\r\n";
	$header.= "Content-Type: text/plain; charset=utf-8\r\n";
	$header.= "X-Priority: 1\r\n";

	if (isset($_POST["name"]) && isset($_POST["email"]) && isset($_POST["message"])) {

		$content  = "Name: "     . $_POST["name"]    . "\r\n";
		$content .= "Email: "    . $_POST["email"]   . "\r\n";
		$content .= "Message: "  . "\r\n" . $_POST["message"];

		if (mail($to, $subject, $content, $header)) {

			$result = array(
				"message"    => "Thanks for getting in touch! ",
				"sendstatus" => 1
			);

			echo json_encode($result);

		} else {

			$result = array(
				"message"    => "Error...error...not...working...",
				"sendstatus" => 0
			);

			echo json_encode($result);

		}

	}

?>
