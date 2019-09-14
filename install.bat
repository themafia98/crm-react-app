cls
@echo off 

set pathProject = ""
set /P pathProject=Enter path (Default: C:\Dev\Frontend\crm-react-app\):

if NOT DEFINED pathProject (
    echo Set default path to project C:\Dev\Frontend\crm-react-app\
    set pathProject=C:\Dev\Frontend\crm-react-app\
)

cd %pathProject%

cd client
echo %cd%
echo Install Client start
call yarn install

cd ../server
echo %cd%
echo Install Server start
call yarn install

echo Install end.
pause
exit