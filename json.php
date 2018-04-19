<?php
     header('Access-Control-Allow-Headers:Content-Type');
header('Access-Control-Allow-Methods:GET, POST, OPTIONS');
header('Access-Control-Allow-Origin:*');
    $sunlight = "http://congress.api.sunlightfoundation.com/";
    $apikey = "&apikey=e1911a84062040acb3ccb88f0283e7f2";
//    $sunlight = "http://congress.api.sunlightfoundation.com/";
//   // $apikey = "&apikey=e1911a84062040acb3ccb88f0283e7f2";
//if(isset($_GET['database']) && isset($_GET['apikey'])){
//    $database = $_GET['apikey'];
//    $apikey = $_GET['apikey'];
//    if($database != 'bills'){
//        $url = $sunlight.$database."?"."apikey=".$apikey."&per_page=all";
//    }
//    else{
//        
//    }
//    
//    
//
//$json = file_get_contents($url);
//$content = json_decode($json,true);
// 
//
//echo json_encode($content);    
//}


$arrContextOptions=array(
                    "ssl"=>array(
                    "verify_peer"=>false,
                    "verify_peer_name"=>false,
                    ),
                  ); 

$legislatorURL = $sunlight."legislators?".$apikey."&per_page=all";
    

$json = file_get_contents("$legislatorURL", false, stream_context_create($arrContextOptions));
$content = json_decode($json,true);
 

echo json_encode($content);

    




?>