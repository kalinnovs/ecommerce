<?php
	// Data received from POST request
	ini_set('display_errors', 1);
	$mailSentStatus = array();
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$name = $request->name;
	$emailIdFrom = $request->email;
	$company = $request->company;
	$message = $request->message;
	$subject = "Feedback Received !!";
	$emailAddr = "support@haastika.com, biswajit.swain@haastika.com";
	// $emailAddr = "pdwibedi@gmail.com";

	$message = "
	<html>
	<head>
		<title>Feedback Mail</title>
	</head>
	<body style=\"font-family:calibri; font-size: 14px; color: #333;\">
		<h1 style=\"font-weight:200; font-size: 24px;\">New Feedback Received !!</h1>
		<p>Dear Team, </p>
		<p>".$message."</p>
		<br/>
		<h4 style=\"font-weight:500; font-size: 16px; margin: 0 0 5px 0\">My details are: </h4>
		<p style=\"margin: 2px 0 0 0\"><strong>Name: </strong><span>".$name."</span></p>
		<p style=\"margin: 2px 0 0 0\"><strong>Company: </strong><span>".$company."</span></p>
		<p style=\"margin: 2px 0 0 0\"><strong>Email: </strong><span>".$emailIdFrom."</span></p>
		<br/><br/><br/><br/>
	    <p>Thanks,<br/>".$name."</p>
	</body>
	</html>
	";

	// Always set content-type when sending HTML email
	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

	// More headers
	$headers .= 'From: <'.$emailIdFrom.'>' . "\r\n";

	// mail($emailAddr,$subject,$message,$headers);

	if(@mail($emailAddr,$subject,$message,$headers)) {
	  	$mailSentStatus ['status'] = true;
		$mailSentStatus ['message'] = "Mail sent successfully. Thank you for giving us your feedback.";
		$mailSentStatus ['sentSuccesfully'] = true;
	} else {
	  	$mailSentStatus ['status'] = false;
		$mailSentStatus ['message'] = "Failed";
		$mailSentStatus ['sentFailed'] = true;
	}

	echo json_encode($mailSentStatus);

?>