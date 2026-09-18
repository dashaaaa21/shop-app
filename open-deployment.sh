#!/bin/bash

# VALORÉ Shop - Auto-open deployed apps

FRONTEND_URL="https://shop-app-te6c.vercel.app"
BACKEND_URL="https://shop-app-0fiy.onrender.com"

echo "Opening VALORÉ Shop deployment..."
echo "Frontend: $FRONTEND_URL"
echo "Backend: $BACKEND_URL"

# Open in default browser
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open "$FRONTEND_URL"
    sleep 2
    open "$BACKEND_URL"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open "$FRONTEND_URL"
    sleep 2
    xdg-open "$BACKEND_URL"
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    # Windows
    start "$FRONTEND_URL"
    timeout /t 2
    start "$BACKEND_URL"
fi

echo "Done! Frontend and backend should now be opening..."
