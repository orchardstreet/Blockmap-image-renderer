
# Blockmap-image-renderer
Converts Uint32 Arrays on Ethereum blockchain to an HTML5 canvas image using Murall's innovative Blockmap format

Runs on a server.  Use a linux desktop terminal, WSL, or a linux VPS.  Run the following commands to install:
# Installation
Configure your server to serve index.html first, and then upgrade connections to your-site-name.com/socket to a websockets connection

put the name-of-your-site.com/socket on line 3 of client/websocket.js

sudo apt install nodejs npm mariadb-server

git clone https://github.com/orchardstreet/Blockmap-image-renderer

cd Blockmap-image-renderer

npm init

npm install --save dotenv mysql2 web3 ws

sudo mysql -u root -p

create database test;

use test;

create table data(id INT, content LONGBLOB);

exit;

vi .env   #enter the following in the .env file and then save the file in the main directory:

-----------------------------

DB_HOST='your database host'

DB_USER='root'

DB_PASSWORD='your database password, if any'

DB_DATABASE='test'

DB_WAITCON=true

DB_CONLIMIT=50

DB_QUEUELIMIT=0

---------------------------

node index.html
