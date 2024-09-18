#!/bin/bash
cd /home/krisose/T05-Project-1
git pull
npm install
npm run build
mkdir dist/project1
mv dist/assets dist/project1/assets
sudo rsync -a dist /var/www/html/project1