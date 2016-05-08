<?php
ini_set('display_errors', '1');
session_start();
$counterObj = array();
$counter_name = "counter.txt";
echo "asdf";
// Check if a text file exists. If not create one and initialize it to zero.
// if (!file_exists($counter_name)) {
//   $f = fopen($counter_name, "w");
//   fwrite($f,"0");
//   fclose($f);
// }
// // // Read the current value of our counter file
// $f = fopen($counter_name,"r");
// $counterVal = fread($f, filesize($counter_name));
// fclose($f);
// // Has visitor been counted in this session?
// // If not, increase counter value by one
// if(!isset($_SESSION['hasVisited'])){
//   $_SESSION['hasVisited']="yes";
//   $counterVal+=1;
//   $f = fopen($counter_name, "w");
//   fwrite($f, $counterVal);
//   fclose($f); 
// }

// $str = str_pad($counterVal + 1, 5, 0, STR_PAD_LEFT);
// $counterObj ['counter'] = $str;

// echo "Hits: "+json_encode($counterObj)+ " and counting...";
?>