param ($enviroment,$tags)
Write-Host '***Start***' -ForegroundColor White -BackgroundColor DarkRed
Write-Host 'La prueba se ejecutara con las siguientes especificaciones'
Write-Host 'Ambiente: ' $enviroment
Write-Host 'tags: ' $tags
try {
    Write-Host '--> Si existe, se eliminaran los archivos dentro de las carpetas cypress/videos'
    rm -r cypress/videos -ErrorAction stop
    Write-Host '***Accion Finalizada***' -ForegroundColor DarkGreen
}catch {
    Write-Warning "No existe el path cypress/videos"
}
try {
    Write-Host '--> Si existe, se eliminaran los archivos dentro de las carpetas cypress/screenshots'
    rm -r cypress/screenshots -ErrorAction stop
    Write-Host '***Accion Finalizada***' -ForegroundColor DarkGreen
}catch {
    Write-Warning "No existe el path cypress/screenshots"
}
try {
    Write-Host '--> Si existe, se eliminaran los archivos dentro de las carpetas reports/cucumber-htmlreport.html/features'
    rm -r reports/cucumber-htmlreport.html/features -ErrorAction stop
}catch  {
    Write-Warning "No existe el path reports/cucumber-htmlreport.html/features"
}
try {
	Write-Host '--> Si existe, se eliminara el archivo reports/cucumber-htmlreport.html/index.html'
	rm reports/cucumber-htmlreport.html/index.html -ErrorAction stop
    Write-Host '***Accion Finalizada***' -ForegroundColor DarkGreen
}catch  {
    Write-Warning "No existe el archivo reports/cucumber-htmlreport.html/index.html"
}
try {
    Write-Host '--> Sobreescribiendo el archivo dataBase.json con el del ambiente seleccionado'
    cp cypress/fixtures/dataenviroment/$enviroment.json cypress/fixtures/dataenviroment/dataBase.json -ErrorAction stop
    Write-Host '***Accion Finalizada***' -ForegroundColor DarkGreen
}catch {
    Write-Error "No fue posible copiar el archivo de ambiente"
} 
try {
    Write-Host "***" -ForegroundColor Magenta
    Write-Host "***" -ForegroundColor Magenta
    Write-Host "***" -ForegroundColor Magenta
    Write-Host '--> Corriendo las pruebas'
    npx cypress run --env tags=@$tags
    Write-Host "*" -ForegroundColor Magenta
    Write-Host "***" -ForegroundColor Magenta
    Write-Host "***" -ForegroundColor Magenta
    Write-Host '***Accion Finalizada***' -ForegroundColor DarkGreen
}catch {
    Write-Error "No fue posible ejecutar las pruebas"
}
try{
    Write-Host '--> Generando el reporte html'
    node .\cucumber-html-report.js
    Write-Host '***Accion Finalizada***' -ForegroundColor DarkGreen
}catch {
    Write-Warning "No fue posible generar el reporte HTML"
}
Write-Host '***Finish***' -ForegroundColor White -BackgroundColor DarkRed