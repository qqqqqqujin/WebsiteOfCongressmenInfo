<?php
header('Access-Control-Allow-Headers:Content-Type');
header('Access-Control-Allow-Methods:GET, POST, OPTIONS');
header('Access-Control-Allow-Origin:*');

if(isset($_GET['data'])){
    $sunlight = "http://104.198.0.197:8080/";
    $apikey = "apikey=e1911a84062040acb3ccb88f0283e7f2";


    if($_GET['data']=="legislators"){
        $legislatorURL = $sunlight."legislators?".$apikey."&per_page=all";
        $json = file_get_contents($legislatorURL);
    }
    else if($_GET['data']=="committees_5"){
        $committeeURL_5 = $sunlight."committees?".$apikey."&per_page=5"."&member_ids=".$_GET['id'];
        $json = file_get_contents($committeeURL_5);
    }
    else if($_GET['data']=="bills_5"){
        $billURL_5 = $sunlight."bills?".$apikey."&per_page=5"."&sponsor_id=".$_GET['id'];
        $json = file_get_contents($billURL_5);
    }
    else if($_GET['data']=="bills_active"){
        $billURL = $sunlight."bills?".$apikey."&per_page=50&history.active=true";
        $json = file_get_contents($billURL);
    }
    else if($_GET['data']=="bills_new"){
        $billURL = $sunlight."bills?".$apikey."&per_page=50&history.active=false";
        $json = file_get_contents($billURL);
    }
    else if($_GET['data']=="committees"){
        $committeeURL = $sunlight."committees?".$apikey."&per_page=all";
        $json = file_get_contents($committeeURL);
    }
    $content = json_decode($json,true);


    echo json_encode($content);
}


?>