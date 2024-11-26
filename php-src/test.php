<?php
if (!isset($_COOKIE['secret']) || $_COOKIE['secret'] !== "redacted")
{
    die("admin only");
}

echo "welcome<br>";
if(isset($_POST['cmd']))
{
    if ( strlen($_POST['cmd']) <= 47 && !preg_match('/require|include|once|file|eval/i',$_POST['cmd']) && (ctype_alnum(str_replace(["'","/","[","]",",",";","(",")"," "], '', $_POST['cmd']))) )
    {
        echo eval("echo " . $_POST['cmd'] . ";");
        die();
    }
    else
    {
        die("Catched");
    }
}


?>
