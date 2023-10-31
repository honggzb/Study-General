<?php


/*
    Get data from the mysql database and return it in json format
*/
    
  
//setup global vars
$debug = $_GET['debug'];
$format = $_GET['format'];

if($format=='json'){ 
    header("Content-type: text/json"); 
}


$db = new mysqli(getenv('IP'), getenv('C9_USER'), '', 'c9', 3306);

if (mysqli_connect_error()) {
    die('Connect Error (' . mysqli_connect_errno() . ') '
            . mysqli_connect_error());
}

    if ($debug == 1) {echo 'Success... ' . $db->host_info . "\n";}

// get data
$sql = "select date_format(convert_tz(date, '+00:00', '-07:00'), '%a') as name, count(1) as count";
$sql .= " from messages";
$sql .= " where date > '1970-01-01'"; //filter out bad data
$sql .= " group by 1";
$sql .= " order by dayofweek(date) asc"; //highcarts requires you order dates in asc order
    

if ($result = $db->query($sql)) {

    if ($debug == 1) {echo "fetched data! <br/><br/>";}


    while($row = $result->fetch_array()){
        $rows[] = $row;
    }
    
    foreach($rows as $row){
        
        $names[] = $row['name'];
        $series[] = (int)$row['count'];
        
    }
    
    $data[0] = $names;
    $data[1] = $series;
    
    echo(json_encode($data));
    // echo(json_encode($names));
    
    $result->close();

} else {
    echo "Error: " . $sql . "<br>" . $db->error;
}

$db->close();

?>

