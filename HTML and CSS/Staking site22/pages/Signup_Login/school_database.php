<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    <!-- Opening php tag -->
    <?php

        // Importing Database Config File
        include('config.php');

        // Connecting to The School Database
        $link = mysqli_connect(
            $nameServerDB,
            $userDB,
            $passwordDB,
            $nameDB
        );

        // Writing a Query
        $query = "SELECT * FROM student WHERE age = 17";

        // Successful Connection Check Condition
        if (!mysqli_connect_errno()) {

            // Successful Connection Message
            echo ("<script>alert('Database Connected')</script>");

            // Apllying the Query in Selected Database
            $runQuery = mysqli_query($link, $query);

            // Printing the Selected Row // تو کتاب نیست
            print_r(mysqli_fetch_array($runQuery)[3]);

        }
        else {

            // Unsuccessful Connection Message
            echo ("<script>alert('Connection Failed')</script>");

        }

    ?>

</body>
</html>