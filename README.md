# Blockmap-image-renderer
Converts Uint32 Arrays on Ethereum blockchain to an HTML5 canvas image using Murall's innovative Blockmap format

Runs on a server, use linux desktop terminal, Windows-Subsystem for linux or a VPS.  Run the following command to install:
# Installation
sudo apt install nodejs npm mariadb-server
sudo git clone https://github.com/orchardstreet/Blockmap-image-renderer
cd Blockmap-image-renderer
npm install --save dotenv mysql2 web3
sudo mysql -u root -p
create database test;
use test;
create table data(id INT, content LONGBLOB);
flush privileges;
exit;
node index.html
