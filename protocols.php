<?php
// HTTP
$url = 'https://website.com/api'; // Replace with your URL
$ch = curl_init($url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);

if ($response === false) {
    echo 'Error making the request: ' . curl_error($ch);
} else {
    echo 'Response: ' . $response;
}

curl_close($ch);
?>

<?php
//SSH
use phpseclib3\Net\SSH2;

$ssh = new SSH2('example.com');
if (!$ssh->login('username', 'password')) {
    exit('SSH login failed');
}

echo $ssh->exec('SSH command');
?>

<?php
use phpseclib3\Net\SSH2;

$ssh = new SSH2('website.com');
if (!$ssh->login('username', 'password')) {
    exit('SSH login failed');
}

echo $ssh->exec('SSH command');
?>

<?php
// FTP/FTPS
$ftp_server = "ftp.WEBSITE.com";
$ftp_user = "username";
$ftp_pass = "password";

$conn_id = ftp_connect($ftp_server);
$login = ftp_login($conn_id, $ftp_user, $ftp_pass);

if ($login) {
    echo "Connected via FTP.<br>";
    // Other FTP operations can be performed here
    ftp_close($conn_id);
} else {
    echo "Failed to connect via FTP.<br>";
}
?>

<?php
// TCP/IP
$host = '127.0.0.1';
$port = 12345;

$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
if ($socket === false) {
    echo "Failed to create socket: " . socket_strerror(socket_last_error());
}

$result = socket_connect($socket, $host, $port);
if ($result === false) {
    echo "Failed to connect to socket: " . socket_strerror(socket_last_error());
}

$message = "Hello, server!";
socket_write($socket, $message, strlen($message));

$response = socket_read($socket, 1024);
echo "Server Response: " . $response;

socket_close($socket);
?>
