<?php
    // Your Email
    $recipient = "office@teslawatt.com"; // PLEASE SET YOUR EMAIL ADDRESS
    $sender = 'office@teslawatt.com'; // use the hosts domain name
    // Check $recipient
    if($recipient === '') {
        returnAndExitAjaxResponse(
            constructAjaxResponseArray(
                FALSE,
                'RECIPIENT_IS_NOT_SET',
                array('error_message'=> 'RECIPIENT email address is not set. Please configure the script.')
            )
        );
    }

    // Check for empty required field
    if(!isset($_POST["email"])) {
        returnAndExitAjaxResponse(
            constructAjaxResponseArray(
                FALSE,
                'MISSING_REQUIRED_FIELDS',
                array('error_message'=> 'MISSING_REQUIRED_FIELDS should not be occurred.')
            )
        );
    }

    // Sanitize input
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);

    // Headers
    $headers = 'From: <'.$sender.'>' . "\r\n";
    $headers .= 'Reply-To: '.$email.'' . "\r\n";
    $headers .= 'X-Mailer: PHP/' . phpversion();
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

    // Subject
    $subject = "New email from Request Demo form";

    // Build Message
    $email_content .= $_POST["emailcontent"];

// Check if sent
try {
    $sendmailResult = mail($recipient, $subject, $email_content, $headers);
    if( $sendmailResult === TRUE ) {
        returnAndExitAjaxResponse(
            constructAjaxResponseArray(
                TRUE
            )
        );
    } else {
        returnAndExitAjaxResponse(
            constructAjaxResponseArray(
                FALSE,
                'ERROR_AT_PHPMAIL',
                array(
                    'error_information'=> error_get_last()
                )
            )
        );
    }
} catch (Exception $_e) {
    returnAndExitAjaxResponse(
        constructAjaxResponseArray(
            TRUE,
            'ERROR_AT_PHPMAIL',
            array('error_message'=> $_e->getMessage())
        )
    );
}

/*
    Construct ajax response array
    Input: Result (bool), Message (optional), Data to be sent back in array
*/
function constructAjaxResponseArray ($_response, $_message = '', $_json = null) {
    $_responseArray = array();
    $_response = ( $_response === TRUE ) ? TRUE : FALSE;
    $_responseArray['response'] = $_response;
    if(isset($_message)) $_responseArray['message'] = $_message;
    if(isset($_json)) $_responseArray['json'] = $_json;

    return $_responseArray;
}
/*
    Returns in the Gframe ajax format.
    Input: data array processed by constructAjaxResponseArray ()
    Outputs as a html stream then exits.
*/
function returnAndExitAjaxResponse ($_ajaxResponse) {
    if(!$_ajaxResponse){
        $_ajaxResponse = array('response'=>false,'message'=>'Unknown error occurred.');
    }
    header("Content-Type: application/json; charset=utf-8");
    echo json_encode($_ajaxResponse);
    die();
}