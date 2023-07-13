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
$sql = "select date_format(date, '%Y-%m-%d %H:00:00') as date, count(1) as count";
$sql .= " from messages";
$sql .= " where datediff(curdate(),date) <= 1"; //filter out bad data
$sql .= " group by 1";
$sql .= " order by date asc"; //highcarts requires you order dates in asc order


if ($result = $db->query($sql)) {
    if ($debug == 1) {echo "fetched data! <br/><br/>";}
    // $row = mysqli_fetch_array($result, MYSQLI_NUM);
    while($row = $result->fetch_array()){
        $rows[] = $row;
    }
    foreach($rows as $row){
        $datetime = strtotime($row['date'])*1000;
        $count = (int)$row['count'];
        $data[] = array($datetime, $count);
    }
    echo(json_encode($data));
    $result->close();
} else {
    echo "Error: " . $sql . "<br>" . $db->error;
}

$db->close();

?>
