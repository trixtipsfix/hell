<?php
$nonce  = rand(1000000,999999999);
header("Content-Security-Policy: default-src 'none'; script-src 'nonce-$nonce' 'self';");

echo "Back to PHP : D";
?>

<script src="/challenge/script.js"></script> <!-- Just loading goog library -->
<div id="output"></div>
<html>

<script nonce="<?=$nonce?>">

function check(link)
{
  try
  {
    url_obJ = goog.Uri.parse(link);
    host = url_obJ.getDomain();

    if(host.endsWith("flagyard.com") && host.length < 20)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  catch(e)
  {
    console.log(e);
    return false;
  }
}

window.addEventListener(
  "message",
  async (event) => {
    let data = event.data;
    if (typeof data !== "string") return;
    data = JSON.parse(data);
    const link = data.link;
    if (check(link))
    {
      await fetch(link).then(response => response.text()).then(data => document.getElementById("output").innerHTML=data);
    }
  },
  false
);
</script>
