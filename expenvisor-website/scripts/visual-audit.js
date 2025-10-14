#!/usr/bin/env node

/**
 * Visual Responsiveness Audit Tool
 * 
 * This script uses Puppeteer to audit actual rendered pages for:
 * - Horizontal scroll detection
 * - Element overflow issues
 * - Touch target validation
 * - Typography scaling verification
 * - Layout breakage detection
 * - Performance metrics
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m'
};

class VisualResponsivenessAuditor {
  constructor() {
    this.browser = null;
    this.page = null;
    this.results = {
      viewports: [],
      issues: [],
      warnings: [],
      suggestions: [],
      performance: {},
      screenshots: []
    };
    this.viewports = [
      { name: 'Mobile Portrait', width: 375, height: 667 },
      { name: 'Mobile Landscape', width: 667, height: 375 },
      { name: 'Tablet Portrait', width: 768, height: 1024 },
      { name: 'Tablet Landscape', width: 1024, height: 768 },
      { name: 'Desktop Small', width: 1366, height: 768 },
      { name: 'Desktop Large', width: 1920, height: 1080 }
    ];
  }

  log(message, color = 'white') {
    console.log(`${colors[color]}${message}${colors.reset}`);
  }

  logSection(title) {
    console.log(`\n${colors.bold}${colors.cyan}${'='.repeat(60)}${colors.reset}`);
    console.log(`${colors.bold}${colors.cyan}${title}${colors.reset}`);
    console.log(`${colors.cyan}${'='.repeat(60)}${colors.reset}\n`);
  }

  async init() {
    this.log('🚀 Initializing browser...', 'blue');
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    this.page = await this.browser.newPage();
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async auditPage(url, viewport) {
    this.log(`📱 Testing ${viewport.name} (${viewport.width}x${viewport.height})...`, 'yellow');
    
    await this.page.setViewport({
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 1
    });

    try {
      await this.page.goto(url, { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });

      // Wait for animations to complete
      await this.page.waitForTimeout(2000);

      const viewportResult = {
        viewport: viewport.name,
        dimensions: `${viewport.width}x${viewport.height}`,
        issues: [],
        warnings: [],
        suggestions: [],
        metrics: {}
      };

      // Check for horizontal scroll
      const hasHorizontalScroll = await this.page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      if (hasHorizontalScroll) {
        viewportResult.issues.push({
          type: 'horizontal-scroll',
          message: 'Page has horizontal scroll',
          severity: 'error'
        });
      }

      // Check for overflow issues
      const overflowIssues = await this.page.evaluate(() => {
        const issues = [];
        const elements = document.querySelectorAll('*');
        
        elements.forEach(el => {
          const rect = el.getBoundingClientRect();
          const style = window.getComputedStyle(el);
          
          // Check if element overflows viewport
          if (rect.right > window.innerWidth || rect.left < 0) {
            issues.push({
              element: el.tagName,
              className: el.className,
              message: `Element overflows viewport (right: ${rect.right}, width: ${window.innerWidth})`,
              severity: 'warning'
            });
          }
          
          // Check for fixed positioning issues
          if (style.position === 'fixed' && (rect.right > window.innerWidth || rect.left < 0)) {
            issues.push({
              element: el.tagName,
              className: el.className,
              message: 'Fixed positioned element overflows viewport',
              severity: 'error'
            });
          }
        });
        
        return issues;
      });

      viewportResult.issues.push(...overflowIssues);

      // Check touch target sizes
      const touchTargetIssues = await this.page.evaluate(() => {
        const issues = [];
        const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [role="button"]');
        
        interactiveElements.forEach(el => {
          const rect = el.getBoundingClientRect();
          const minSize = 44; // Minimum touch target size
          
          if (rect.width < minSize || rect.height < minSize) {
            issues.push({
              element: el.tagName,
              className: el.className,
              message: `Touch target too small (${rect.width}x${rect.height}px, minimum: ${minSize}px)`,
              severity: 'warning'
            });
          }
        });
        
        return issues;
      });

      viewportResult.warnings.push(...touchTargetIssues);

      // Check typography scaling
      const typographyIssues = await this.page.evaluate(() => {
        const issues = [];
        const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div');
        
        textElements.forEach(el => {
          const style = window.getComputedStyle(el);
          const fontSize = parseFloat(style.fontSize);
          const lineHeight = parseFloat(style.lineHeight);
          
          // Check for very small text on mobile
          if (window.innerWidth <= 768 && fontSize < 14) {
            issues.push({
              element: el.tagName,
              className: el.className,
              message: `Text too small on mobile (${fontSize}px)`,
              severity: 'warning'
            });
          }
          
          // Check for poor line height
          if (lineHeight < 1.2) {
            issues.push({
              element: el.tagName,
              className: el.className,
              message: `Poor line height (${lineHeight})`,
              severity: 'suggestion'
            });
          }
        });
        
        return issues;
      });

      viewportResult.suggestions.push(...typographyIssues);

      // Check for layout issues
      const layoutIssues = await this.page.evaluate(() => {
        const issues = [];
        const flexContainers = document.querySelectorAll('[style*="display: flex"], .flex');
        
        flexContainers.forEach(container => {
          const rect = container.getBoundingClientRect();
          const children = container.children;
          
          if (children.length > 0) {
            let totalWidth = 0;
            Array.from(children).forEach(child => {
              totalWidth += child.getBoundingClientRect().width;
            });
            
            if (totalWidth > rect.width) {
              issues.push({
                element: container.tagName,
                className: container.className,
                message: 'Flex container children overflow',
                severity: 'warning'
              });
            }
          }
        });
        
        return issues;
      });

      viewportResult.warnings.push(...layoutIssues);

      // Get performance metrics
      const metrics = await this.page.metrics();
      viewportResult.metrics = {
        layoutCount: metrics.LayoutCount,
        recalcStyleCount: metrics.RecalcStyleCount,
        jsHeapUsedSize: metrics.JSHeapUsedSize,
        jsHeapTotalSize: metrics.JSHeapTotalSize
      };

      // Take screenshot
      const screenshotPath = `reports/screenshots/${viewport.name.replace(/\s+/g, '-').toLowerCase()}-${viewport.width}x${viewport.height}.png`;
      await this.page.screenshot({ 
        path: screenshotPath,
        fullPage: true 
      });

      viewportResult.screenshot = screenshotPath;
      this.results.screenshots.push(screenshotPath);

      this.results.viewports.push(viewportResult);

      // Log results for this viewport
      const totalIssues = viewportResult.issues.length + viewportResult.warnings.length + viewportResult.suggestions.length;
      if (totalIssues > 0) {
        this.log(`   ❌ Found ${totalIssues} issues`, 'red');
      } else {
        this.log(`   ✅ No issues found`, 'green');
      }

    } catch (error) {
      this.log(`   ❌ Error testing viewport: ${error.message}`, 'red');
      viewportResult.issues.push({
        type: 'test-error',
        message: error.message,
        severity: 'error'
      });
    }
  }

  async runAudit(url = 'http://localhost:3001') {
    try {
      await this.init();
      
      this.logSection('VISUAL RESPONSIVENESS AUDIT');
      this.log(`🌐 Testing URL: ${url}`, 'blue');
      this.log(`📱 Testing ${this.viewports.length} viewports\n`, 'blue');

      // Ensure reports directory exists
      const reportsDir = path.join(process.cwd(), 'reports');
      if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir, { recursive: true });
      }

      const screenshotsDir = path.join(reportsDir, 'screenshots');
      if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
      }

      // Test each viewport
      for (const viewport of this.viewports) {
        await this.auditPage(url, viewport);
      }

      // Generate summary
      this.generateSummary();
      
      // Save detailed report
      this.saveReport();

    } catch (error) {
      this.log(`❌ Audit failed: ${error.message}`, 'red');
      throw error;
    } finally {
      await this.cleanup();
    }
  }

  generateSummary() {
    this.logSection('AUDIT SUMMARY');

    let totalIssues = 0;
    let totalWarnings = 0;
    let totalSuggestions = 0;

    this.results.viewports.forEach(viewport => {
      totalIssues += viewport.issues.length;
      totalWarnings += viewport.warnings.length;
      totalSuggestions += viewport.suggestions.length;
    });

    this.log(`📊 Viewports Tested: ${this.results.viewports.length}`, 'blue');
    this.log(`❌ Critical Issues: ${totalIssues}`, 'red');
    this.log(`⚠️  Warnings: ${totalWarnings}`, 'yellow');
    this.log(`💡 Suggestions: ${totalSuggestions}`, 'cyan');
    this.log(`📈 Total Issues: ${totalIssues + totalWarnings + totalSuggestions}`, 'white');

    // Show issues by viewport
    this.logSection('ISSUES BY VIEWPORT');
    this.results.viewports.forEach(viewport => {
      const total = viewport.issues.length + viewport.warnings.length + viewport.suggestions.length;
      if (total > 0) {
        this.log(`${viewport.name} (${viewport.dimensions}):`, 'yellow');
        viewport.issues.forEach(issue => {
          this.log(`  ❌ ${issue.message}`, 'red');
        });
        viewport.warnings.forEach(warning => {
          this.log(`  ⚠️  ${warning.message}`, 'yellow');
        });
        viewport.suggestions.forEach(suggestion => {
          this.log(`  💡 ${suggestion.message}`, 'cyan');
        });
        this.log('');
      }
    });

    // Performance summary
    this.logSection('PERFORMANCE METRICS');
    this.results.viewports.forEach(viewport => {
      this.log(`${viewport.name}:`, 'blue');
      this.log(`  Layout Count: ${viewport.metrics.layoutCount}`, 'white');
      this.log(`  Style Recalc: ${viewport.metrics.recalcStyleCount}`, 'white');
      this.log(`  JS Heap Used: ${Math.round(viewport.metrics.jsHeapUsedSize / 1024 / 1024)}MB`, 'white');
      this.log('');
    });
  }

  saveReport() {
    const reportPath = path.join(process.cwd(), 'reports', 'visual-audit-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    this.log(`📄 Detailed report saved to: ${reportPath}`, 'green');
    this.log(`📸 Screenshots saved to: reports/screenshots/`, 'green');
  }
}

// Main execution
async function main() {
  const auditor = new VisualResponsivenessAuditor();
  const url = process.argv[2] || 'http://localhost:3001';
  
  try {
    await auditor.runAudit(url);
    process.exit(0);
  } catch (error) {
    console.error('Audit failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = VisualResponsivenessAuditor;
