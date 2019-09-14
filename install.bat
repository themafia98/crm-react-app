@echo off 

set mydrive=C:\ 
set mypath=Dev\Frontend\crm-react-app\
cd %mydrive%
cd %mypath%

cd client
call yarn install
cd ../server
call yarn install
pause