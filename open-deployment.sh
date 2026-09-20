#!/bin/bash

# VALORÉ Shop - Auto-open deployed apps

FRONTEND_URL="https://shop-app-te6c.vercel.app"
BACKEND_URL="https://shop-app-0fiy.onrender.com"

echo "================================"
echo "VALORÉ Shop - Opening Deployment"
echo "================================"
echo ""
echo "Frontend: $FRONTEND_URL"
echo "Backend: $BACKEND_URL"
echo ""

# Check if servers are accessible
echo "Checking server status..."

if curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL" | grep -q "200\|301\|302"; then
    echo "✓ Frontend is accessible"
else
    echo "⚠ Frontend may be unavailable"
fi

if curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL" | grep -q "200\|301\|302"; then
    echo "✓ Backend is accessible"
else
    echo "⚠ Backend may be unavailable"
fi

echo ""
echo "Opening in default browser..."

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

echo "Done!"
