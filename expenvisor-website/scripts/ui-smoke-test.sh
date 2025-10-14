#!/bin/bash

# UI Responsiveness Smoke Test Script
# This script tests the website across different viewport sizes

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Create reports directory
mkdir -p reports/ui-screenshots

echo -e "${BLUE}🚀 Starting UI Responsiveness Smoke Test${NC}"

# Check if dev server is running
if ! curl -s http://localhost:3000 > /dev/null; then
    echo -e "${YELLOW}⚠️  Dev server not running. Starting dev server...${NC}"
    npm run dev &
    DEV_PID=$!
    
    # Wait for server to start
    echo -e "${YELLOW}⏳ Waiting for dev server to start...${NC}"
    for i in {1..30}; do
        if curl -s http://localhost:3000 > /dev/null; then
            echo -e "${GREEN}✅ Dev server started successfully${NC}"
            break
        fi
        sleep 2
    done
    
    if ! curl -s http://localhost:3000 > /dev/null; then
        echo -e "${RED}❌ Failed to start dev server${NC}"
        exit 1
    fi
fi

# Test viewports
VIEWPORTS=(
    "320x568:iPhone SE"
    "375x812:iPhone 12"
    "414x896:iPhone 12 Pro Max"
    "768x1024:iPad"
    "1024x768:iPad Landscape"
    "1366x768:Desktop Small"
    "1920x1080:Desktop Large"
)

echo -e "${BLUE}📱 Testing viewports...${NC}"

# Function to take screenshot
take_screenshot() {
    local viewport=$1
    local device=$2
    local width=$(echo $viewport | cut -d'x' -f1)
    local height=$(echo $viewport | cut -d'x' -f2)
    
    echo -e "${YELLOW}📸 Taking screenshot for ${device} (${viewport})${NC}"
    
    # Use Puppeteer to take screenshot
    node -e "
    const puppeteer = require('puppeteer');
    
    (async () => {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        
        await page.setViewport({ width: ${width}, height: ${height} });
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
        
        // Wait for animations to complete
        await page.waitForTimeout(2000);
        
        await page.screenshot({ 
            path: 'reports/ui-screenshots/${device// /_}-${viewport}.png',
            fullPage: true
        });
        
        await browser.close();
        console.log('Screenshot saved for ${device}');
    })();
    " 2>/dev/null || echo -e "${RED}❌ Failed to take screenshot for ${device}${NC}"
}

# Check if Puppeteer is available
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found. Please install Node.js to run this script.${NC}"
    exit 1
fi

# Check if Puppeteer is installed
if ! node -e "require('puppeteer')" 2>/dev/null; then
    echo -e "${YELLOW}⚠️  Puppeteer not found. Installing...${NC}"
    npm install puppeteer --save-dev
fi

# Take screenshots for each viewport
for viewport_info in "${VIEWPORTS[@]}"; do
    IFS=':' read -r viewport device <<< "$viewport_info"
    take_screenshot "$viewport" "$device"
done

# Generate test report
echo -e "${BLUE}📊 Generating test report...${NC}"

cat > reports/ui-test-report.md << EOF
# UI Responsiveness Test Report

## Test Summary
- **Date**: $(date)
- **Viewports Tested**: ${#VIEWPORTS[@]}
- **Screenshots**: reports/ui-screenshots/

## Test Results

### Viewport Tests
EOF

for viewport_info in "${VIEWPORTS[@]}"; do
    IFS=':' read -r viewport device <<< "$viewport_info"
    echo "- ✅ ${device} (${viewport})" >> reports/ui-test-report.md
done

cat >> reports/ui-test-report.md << EOF

## Checklist

### Critical Issues
- [ ] No horizontal scroll on any viewport
- [ ] All text readable on mobile (320px+)
- [ ] Navigation works on all devices
- [ ] Touch targets minimum 44px
- [ ] All interactive elements accessible

### High Priority
- [ ] Consistent spacing across all components
- [ ] Responsive typography scaling
- [ ] Proper grid behavior on all screens
- [ ] Smooth animations on mobile
- [ ] Fast loading times

### Medium Priority
- [ ] Advanced accessibility features
- [ ] Performance optimizations
- [ ] Visual regression testing
- [ ] Cross-browser compatibility
- [ ] Documentation updates

## Screenshots
Screenshots are available in the \`reports/ui-screenshots/\` directory.

## Next Steps
1. Review screenshots for visual issues
2. Test interactive elements manually
3. Verify accessibility compliance
4. Check performance metrics
5. Update documentation as needed

EOF

echo -e "${GREEN}✅ Test completed successfully!${NC}"
echo -e "${BLUE}📁 Screenshots saved to: reports/ui-screenshots/${NC}"
echo -e "${BLUE}📄 Report generated: reports/ui-test-report.md${NC}"

# Clean up if we started the dev server
if [ ! -z "$DEV_PID" ]; then
    echo -e "${YELLOW}🛑 Stopping dev server...${NC}"
    kill $DEV_PID 2>/dev/null || true
fi

echo -e "${GREEN}🎉 UI Responsiveness Smoke Test Complete!${NC}"
