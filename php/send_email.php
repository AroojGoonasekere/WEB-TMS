<?php

$to = "user@example.com";


$data = json_decode(file_get_contents("php://input"), true);
$start = htmlspecialchars($data['start']);
$end = htmlspecialchars($data['end']);

$subject = "Your Kandy Traffic Route";
$message = "Hello,\n\nHere are your route details:\n\nStart Location: $start\nDestination: $end\n\nSafe travels!\n- Kandy Traffic Management System";
$headers = "From: traffic@kandytraffic.lk";

if (mail($to, $subject, $message, $headers)) {
  echo "Email sent successfully!";
} else {
  echo "Failed to send email.";
}
?>
