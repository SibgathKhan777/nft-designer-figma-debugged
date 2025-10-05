#!/bin/bash

echo "🚀 Starting NFT Designer Services..."

# Function to start a service in background
start_service() {
    local service_name=$1
    local service_dir=$2
    local command=$3
    
    echo "📦 Starting $service_name..."
    cd "$service_dir"
    $command &
    local pid=$!
    echo "✅ $service_name started with PID: $pid"
    cd - > /dev/null
}

# Start Backend API
start_service "Backend API" "backend" "npm run dev"

# Start Web Signer
start_service "Web Signer" "web-signer" "npm start"

echo ""
echo "🎉 All services started!"
echo ""
echo "📍 Service URLs:"
echo "   Backend API: http://localhost:3001"
echo "   Web Signer:  http://localhost:3000"
echo "   Health Check: http://localhost:3001/health"
echo ""
echo "💡 To stop all services, press Ctrl+C or run: pkill -f 'npm run dev' && pkill -f 'npm start'"

# Wait for services to start
sleep 5

# Check if services are running
echo "🔍 Checking service status..."
if curl -s http://localhost:3001/health > /dev/null 2>&1; then
    echo "✅ Backend API is running"
else
    echo "❌ Backend API is not responding"
fi

if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Web Signer is running"
else
    echo "❌ Web Signer is not responding"
fi

echo ""
echo "🎯 Services are ready! You can now:"
echo "   1. Open http://localhost:3000 in your browser for Web Signer"
echo "   2. Use the Figma plugin to create NFTs"
echo "   3. Check http://localhost:3001/health for API status"

# Keep script running to maintain services
wait
