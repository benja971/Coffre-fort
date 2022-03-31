Start-Process -FilePath "C:\Program Files\Google\Chrome\Application\chrome.exe" -ArgumentList "--new-window", "--app=http://localhost:8001/", "-NoNewWindow"
Set-Location C:\Users\benja\OneDrive\Fac\L3\Projet_de_developpement\Gestion_de_stages
Start-Process powershell {npm upgrade; npm i; npm run start:nodemon}
Start-Process powershell {npm run sass}