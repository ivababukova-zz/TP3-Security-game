 <?php  

 $host = "storo";  
 $user = "2040038k";  
 $pass = "rose14"; 
 $dbname = "teamr1415";
 
 //Create the connection to the DB
 $conn = mysqli_connect($host, $user, $pass, $dbname);
 if (!$conn) {
    die('Could not connect: ' . mysqli_error($conn));
}

 ?> 
