<?php
	// Data received from POST request
	$mailSentStatus = array();
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$name = $request->firstName;
	$emailAddr = $request->emailId;
	$subject = "Haastika Subscription Success !!";

	$message = "
	<html>
	<head>
		<title>Promo Code !</title>
	</head>
	<body style=\"font-family:calibri; font-size: 14px; color: #333;\">
		<h1 style=\"font-weight:200; font-size: 24px;\">Nice. You're Registered for using the Promo Code!</h1>
		<p>Dear ".$name.", </p>
		<p>Thank you for subscribing to our website.<br> We are glad to provide you with a Promo Code which can be used to obtain discount on your first purchase with us.</p>
		<p style=\"font-weight:700\">Your Promo Code is AX652BH</p>
		<p>Please visit our website <a href=\"http://www.haastika.com\" target=\"_blank\">www.haastika.com</a>.</p>
		<br/><br/><br/><br/>
	    <p>Thanks,<br/>Haastika Team</p>
	</body>
	</html>
	";

	// Always set content-type when sending HTML email
	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

	// More headers
	$headers .= 'From: <support@haastika.com>' . "\r\n";
	$headers .= 'Cc: biswajit@haastika.com' . "\r\n";

	// mail($emailAddr,$subject,$message,$headers);

	if(@mail($emailAddr,$subject,$message,$headers)) {
	  	$mailSentStatus ['status'] = true;
		$mailSentStatus ['message'] = "Success";
	} else {
	  	$mailSentStatus ['status'] = false;
		$mailSentStatus ['message'] = "Failed";
	}

	echo json_encode($mailSentStatus);

?>