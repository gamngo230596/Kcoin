<?php
	session_cache_limiter('nocache');
	header('Expires: ' . gmdate('r', 0));
	header('Content-type: application/json');
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
	require 'PHPMailer/PHPMailerAutoload.php';
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$from_email = $request->email;
	$id = $request->id;
	echo($from_email);
	$mail = new PHPMailer();

    //set a host
    $mail->Host = "mail.smtp2go.com";

    //enable SMTP
    $mail->isSMTP();
    $mail->SMTPDebug = 0;

    //set authentication to true
    $mail->SMTPAuth = true;

    //set login details for Gmail account
    $mail->Username = "gamcornpink";
    $mail->Password = "OXg1Y2dyc3Q0bXYw";

    //set type of protection
    $mail->SMTPSecure = "tls"; //or we can use TLS

    //set a port
    $mail->Port = 2525; //or 587 if TLS

    //set subject
    $mail->Subject = "Activated account!";

    //set HTML to true
    $mail->isHTML(true);

    //set body
    $mail->Body = '<a href="http://localhost:4200/validate/'.$id.'">Activated!</a>'.
                    'ID wallet: '.$id.'to sign in';

   

    //set who is sending an email
    $mail->setFrom($from_email, 'KCoin');

    //set where we are sending email (recipients)
    $mail->addAddress('gamcornpink96@gmail.com');

    //send an email
    if ($mail->send())
        echo "mail is sent";
    else
        echo $mail->ErrorInfo;
?>