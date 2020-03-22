<?php
$name = $_POST['name'];
$visitor_email = $_POST['email'];
$message = $_POST['message'];
$email_from = "richa1998.patel@gmail.com";
$subject = "Contact Form";
$body_email = "user name:"$name.\n"."User Email: $visitor_email.\n"."User message: $message.\n";
$to = "riyu2498.patelgmail.com";
$header = "From: $email_from \r\n";
$header .= "Replay-To : $visitor_email \r\n";
mail($to, $subject, $body_email, $header) or die("Error!");
header("Location: index.html");
echo "Thank You!" . " -" . "<a href='form.html' style='text-decoration:none;color:#ff0099;'> Return Home</a>";
?>
