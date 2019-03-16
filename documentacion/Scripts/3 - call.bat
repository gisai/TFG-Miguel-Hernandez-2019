cd "C:\Users\Javi-GISAI\Proyectos\WebDB\build\contracts"
del *.json

cd "C:\Users\Javi-GISAI\Proyectos\WebDB\"
call truffle compile
call truffle migrate