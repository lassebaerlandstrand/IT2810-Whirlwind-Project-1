#!/bin/bash
cd /home/krisose/T05-Project-1
git pull
npm install
npm run build
sudo rm -rf /var/www/html/project1/ 
sudo mv dist /var/www/html/project1/