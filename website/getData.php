<?php
$url="http://www.zillow.com/webservice/GetRegionChildren.htm?zws-id=X1-ZWz18r2dv9h4az_9prl8&state=la&city=batonrouge&childtype=neighborhood";
$ch = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_URL, $url);    // get the url contents

$data = curl_exec($ch); // execute curl request
curl_close($ch);

$xml = simplexml_load_string($data);
//echo($xml);
echo $xml->asXML();
//print_r($xml);
?>
