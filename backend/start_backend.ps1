# Homelux Backend Startup Script
Write-Host "Activating virtual environment..." -ForegroundColor Cyan
.\venv\Scripts\activate

Write-Host "Starting Django server on port 6000..." -ForegroundColor Green
python manage.py runserver 6000
