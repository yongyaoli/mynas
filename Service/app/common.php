<?php

function execRFG_API($apid,$secret,$url, $command ) {
    /* put your APID and SECRET below */
    //$apid = '5c0e746fe4b0fda7a3be6d53';
    //$secret = '7341428a41adf7183e203fc5803e6e9f';

    /* do not modify below */
    $key = hex2bin($secret);
    $tm=time();
    $hash = hash_hmac("sha1",$tm.$command,$key);
    $api_url = $url."?apid=$apid&time=$tm&hash=$hash";

    $ch = curl_init($api_url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $command);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Content-Length: ' . strlen($command))
    );

    $result = curl_exec($ch);
    curl_close($ch);
    return $result;
}
