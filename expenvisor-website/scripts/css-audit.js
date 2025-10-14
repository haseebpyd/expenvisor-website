#!/usr/bin/env node

/**
 * CSS/HTML Responsiveness Audit Tool
 * 
 * This script performs automated checks for common responsive design issues:
 * - Viewport meta tag presence
 * - Fixed widths without responsive alternatives
 * - Missing responsive breakpoints
 * - Overflow issues
 * - Touch target sizes
 * - Typography scaling
 * - Image responsiveness
 * - Flexbox/Grid issues
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

class ResponsivenessAuditor {
  constructor() {
    this.issues = [];
    this.warnings = [];
    this.suggestions = [];
    this.stats = {
      filesScanned: 0,
      issuesFound: 0,
      warningsFound: 0,
      suggestionsFound: 0
    };
  }

  log(message, color = 'white') {
    console.log(`${colors[color]}${message}${colors.reset}`);
  }

  logSection(title) {
    console.log(`\n${colors.bold}${colors.cyan}${'='.repeat(60)}${colors.reset}`);
    console.log(`${colors.bold}${colors.cyan}${title}${colors.reset}`);
    console.log(`${colors.cyan}${'='.repeat(60)}${colors.reset}\n`);
  }

  addIssue(severity, file, line, message, suggestion = '') {
    const issue = {
      severity,
      file,
      line,
      message,
      suggestion,
      timestamp: new Date().toISOString()
    };

    if (severity === 'error') {
      this.issues.push(issue);
      this.stats.issuesFound++;
    } else if (severity === 'warning') {
      this.warnings.push(issue);
      this.stats.warningsFound++;
    } else {
      this.suggestions.push(issue);
      this.stats.suggestionsFound++;
    }
  }

  // Check for viewport meta tag
  checkViewportMeta(htmlContent, filePath) {
    if (!htmlContent.includes('<meta name="viewport"')) {
      this.addIssue('error', filePath, 0, 
        'Missing viewport meta tag', 
        'Add <meta name="viewport" content="width=device-width, initial-scale=1"> to <head>');
    } else if (!htmlContent.includes('width=device-width')) {
      this.addIssue('warning', filePath, 0,
        'Viewport meta tag missing width=device-width',
        'Update viewport meta tag to include width=device-width');
    }
  }

  // Check for fixed widths without responsive alternatives
  checkFixedWidths(cssContent, filePath) {
    const fixedWidthPatterns = [
      { pattern: /width:\s*(\d+)px(?!\s*\/\*.*responsive)/g, message: 'Fixed width in pixels without responsive alternative' },
      { pattern: /width:\s*(\d+)vw/g, message: 'Viewport width units may cause horizontal scroll' },
      { pattern: /min-width:\s*(\d+)px/g, message: 'Fixed min-width may break on small screens' },
      { pattern: /max-width:\s*100vw/g, message: 'max-width: 100vw can cause horizontal scroll' }
    ];

    let match;
    fixedWidthPatterns.forEach(({ pattern, message }) => {
      while ((match = pattern.exec(cssContent)) !== null) {
        const lineNumber = cssContent.substring(0, match.index).split('\n').length;
        this.addIssue('warning', filePath, lineNumber, 
          `${message}: ${match[0]}`,
          'Consider using responsive units (rem, %, or responsive breakpoints)');
      }
    });
  }

  // Check for missing responsive breakpoints
  checkResponsiveBreakpoints(cssContent, filePath) {
    const hasMediaQueries = /@media\s+\([^)]+\)/g.test(cssContent);
    const hasResponsiveClasses = /(sm:|md:|lg:|xl:|2xl:)/g.test(cssContent);
    
    if (!hasMediaQueries && !hasResponsiveClasses) {
      this.addIssue('warning', filePath, 0,
        'No responsive breakpoints found',
        'Consider adding media queries or responsive utility classes');
    }

    // Check for common breakpoint patterns
    const breakpointPatterns = [
      { pattern: /@media\s+\(max-width:\s*(\d+)px\)/g, name: 'max-width' },
      { pattern: /@media\s+\(min-width:\s*(\d+)px\)/g, name: 'min-width' }
    ];

    breakpointPatterns.forEach(({ pattern, name }) => {
      const matches = [...cssContent.matchAll(pattern)];
      if (matches.length > 0) {
        this.addIssue('suggestion', filePath, 0,
          `Found ${matches.length} ${name} media queries`,
          'Consider using mobile-first approach with min-width queries');
      }
    });
  }

  // Check for overflow issues
  checkOverflowIssues(cssContent, filePath) {
    const overflowPatterns = [
      { pattern: /overflow:\s*hidden/g, message: 'overflow: hidden may hide important content' },
      { pattern: /overflow-x:\s*hidden/g, message: 'overflow-x: hidden may indicate layout issues' },
      { pattern: /width:\s*100vw/g, message: 'width: 100vw can cause horizontal scroll' }
    ];

    overflowPatterns.forEach(({ pattern, message }) => {
      const matches = [...cssContent.matchAll(pattern)];
      matches.forEach(match => {
        const lineNumber = cssContent.substring(0, match.index).split('\n').length;
        this.addIssue('warning', filePath, lineNumber, message);
      });
    });
  }

  // Check for touch target sizes
  checkTouchTargets(cssContent, filePath) {
    const touchTargetPatterns = [
      { pattern: /height:\s*(\d+)px/g, message: 'Button height may be too small for touch' },
      { pattern: /padding:\s*(\d+)px/g, message: 'Padding may be too small for touch targets' }
    ];

    touchTargetPatterns.forEach(({ pattern, message }) => {
      const matches = [...cssContent.matchAll(pattern)];
      matches.forEach(match => {
        const value = parseInt(match[1]);
        if (value < 44) {
          const lineNumber = cssContent.substring(0, match.index).split('\n').length;
          this.addIssue('warning', filePath, lineNumber,
            `${message}: ${match[0]} (${value}px < 44px minimum)`,
            'Ensure touch targets are at least 44px for accessibility');
        }
      });
    });
  }

  // Check for typography scaling issues
  checkTypographyScaling(cssContent, filePath) {
    const typographyPatterns = [
      { pattern: /font-size:\s*(\d+)px/g, message: 'Fixed font size may not scale well' },
      { pattern: /line-height:\s*(\d+)px/g, message: 'Fixed line height may not scale with font size' }
    ];

    typographyPatterns.forEach(({ pattern, message }) => {
      const matches = [...cssContent.matchAll(pattern)];
      matches.forEach(match => {
        const lineNumber = cssContent.substring(0, match.index).split('\n').length;
        this.addIssue('suggestion', filePath, lineNumber,
          `${message}: ${match[0]}`,
          'Consider using rem units or clamp() for responsive typography');
      });
    });
  }

  // Check for image responsiveness
  checkImageResponsiveness(htmlContent, filePath) {
    const imgPatterns = [
      { pattern: /<img[^>]*width\s*=\s*["'](\d+)["'][^>]*>/g, message: 'Image with fixed width' },
      { pattern: /<img[^>]*height\s*=\s*["'](\d+)["'][^>]*>/g, message: 'Image with fixed height' },
      { pattern: /<img(?!.*class.*responsive)[^>]*>/g, message: 'Image without responsive class' }
    ];

    imgPatterns.forEach(({ pattern, message }) => {
      const matches = [...htmlContent.matchAll(pattern)];
      matches.forEach(match => {
        const lineNumber = htmlContent.substring(0, match.index).split('\n').length;
        this.addIssue('warning', filePath, lineNumber,
          message,
          'Add responsive classes or CSS for proper image scaling');
      });
    });
  }

  // Check for flexbox/grid issues
  checkLayoutIssues(cssContent, filePath) {
    const layoutPatterns = [
      { pattern: /display:\s*flex[^;]*(?!.*flex-wrap)/g, message: 'Flex container without flex-wrap may overflow' },
      { pattern: /display:\s*grid[^;]*(?!.*grid-template-columns)/g, message: 'Grid without explicit column definition' },
      { pattern: /flex:\s*\d+\s*\d+\s*(\d+)px/g, message: 'Fixed flex-basis may not be responsive' }
    ];

    layoutPatterns.forEach(({ pattern, message }) => {
      const matches = [...cssContent.matchAll(pattern)];
      matches.forEach(match => {
        const lineNumber = cssContent.substring(0, match.index).split('\n').length;
        this.addIssue('suggestion', filePath, lineNumber, message);
      });
    });
  }

  // Check for accessibility issues
  checkAccessibility(htmlContent, filePath) {
    const accessibilityPatterns = [
      { pattern: /<button(?!.*aria-label)[^>]*>/g, message: 'Button without aria-label' },
      { pattern: /<img(?!.*alt)[^>]*>/g, message: 'Image without alt attribute' },
      { pattern: /<a(?!.*aria-label)[^>]*href[^>]*>/g, message: 'Link without descriptive text or aria-label' }
    ];

    accessibilityPatterns.forEach(({ pattern, message }) => {
      const matches = [...htmlContent.matchAll(pattern)];
      matches.forEach(match => {
        const lineNumber = htmlContent.substring(0, match.index).split('\n').length;
        this.addIssue('warning', filePath, lineNumber, message);
      });
    });
  }

  // Scan a single file
  scanFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const ext = path.extname(filePath).toLowerCase();
      
      this.stats.filesScanned++;

      if (ext === '.html' || ext === '.tsx' || ext === '.jsx') {
        this.checkViewportMeta(content, filePath);
        this.checkImageResponsiveness(content, filePath);
        this.checkAccessibility(content, filePath);
      }

      if (ext === '.css' || ext === '.tsx' || ext === '.jsx') {
        this.checkFixedWidths(content, filePath);
        this.checkResponsiveBreakpoints(content, filePath);
        this.checkOverflowIssues(content, filePath);
        this.checkTouchTargets(content, filePath);
        this.checkTypographyScaling(content, filePath);
        this.checkLayoutIssues(content, filePath);
      }

    } catch (error) {
      this.addIssue('error', filePath, 0, `Error reading file: ${error.message}`);
    }
  }

  // Scan directory recursively
  scanDirectory(dirPath) {
    try {
      const items = fs.readdirSync(dirPath);
      
      items.forEach(item => {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          this.scanDirectory(fullPath);
        } else if (stat.isFile()) {
          const ext = path.extname(item).toLowerCase();
          if (['.html', '.css', '.tsx', '.jsx', '.ts', '.js'].includes(ext)) {
            this.scanFile(fullPath);
          }
        }
      });
    } catch (error) {
      this.addIssue('error', dirPath, 0, `Error scanning directory: ${error.message}`);
    }
  }

  // Generate report
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      stats: this.stats,
      issues: this.issues,
      warnings: this.warnings,
      suggestions: this.suggestions,
      summary: {
        totalIssues: this.issues.length + this.warnings.length + this.suggestions.length,
        criticalIssues: this.issues.length,
        warnings: this.warnings.length,
        suggestions: this.suggestions.length
      }
    };

    return report;
  }

  // Print results to console
  printResults() {
    this.logSection('RESPONSIVENESS AUDIT RESULTS');

    // Print summary
    this.log(`📊 Files Scanned: ${this.stats.filesScanned}`, 'blue');
    this.log(`❌ Critical Issues: ${this.stats.issuesFound}`, 'red');
    this.log(`⚠️  Warnings: ${this.stats.warningsFound}`, 'yellow');
    this.log(`💡 Suggestions: ${this.stats.suggestionsFound}`, 'cyan');
    this.log(`📈 Total: ${this.stats.issuesFound + this.stats.warningsFound + this.stats.suggestionsFound}`, 'white');

    // Print critical issues
    if (this.issues.length > 0) {
      this.logSection('CRITICAL ISSUES');
      this.issues.forEach((issue, index) => {
        this.log(`${index + 1}. ${colors.red}${issue.file}:${issue.line}${colors.reset}`, 'red');
        this.log(`   ${issue.message}`, 'white');
        if (issue.suggestion) {
          this.log(`   💡 ${issue.suggestion}`, 'yellow');
        }
        this.log('');
      });
    }

    // Print warnings
    if (this.warnings.length > 0) {
      this.logSection('WARNINGS');
      this.warnings.forEach((warning, index) => {
        this.log(`${index + 1}. ${colors.yellow}${warning.file}:${warning.line}${colors.reset}`, 'yellow');
        this.log(`   ${warning.message}`, 'white');
        if (warning.suggestion) {
          this.log(`   💡 ${warning.suggestion}`, 'cyan');
        }
        this.log('');
      });
    }

    // Print suggestions
    if (this.suggestions.length > 0) {
      this.logSection('SUGGESTIONS');
      this.suggestions.forEach((suggestion, index) => {
        this.log(`${index + 1}. ${colors.cyan}${suggestion.file}:${suggestion.line}${colors.reset}`, 'cyan');
        this.log(`   ${suggestion.message}`, 'white');
        if (suggestion.suggestion) {
          this.log(`   💡 ${suggestion.suggestion}`, 'magenta');
        }
        this.log('');
      });
    }

    // Print recommendations
    this.logSection('RECOMMENDATIONS');
    this.printRecommendations();
  }

  printRecommendations() {
    const recommendations = [
      'Use mobile-first approach with min-width media queries',
      'Implement responsive typography with clamp() or fluid typography',
      'Ensure all touch targets are at least 44px',
      'Use relative units (rem, em, %) instead of fixed pixels where possible',
      'Test on real devices, not just browser dev tools',
      'Implement proper image optimization and responsive images',
      'Use CSS Grid and Flexbox with proper responsive patterns',
      'Add proper ARIA labels and accessibility attributes',
      'Consider using CSS custom properties for consistent spacing',
      'Implement proper focus states for keyboard navigation'
    ];

    recommendations.forEach((rec, index) => {
      this.log(`${index + 1}. ${rec}`, 'green');
    });
  }

  // Save report to file
  saveReport(filename = 'responsiveness-audit-report.json') {
    const report = this.generateReport();
    const reportPath = path.join(process.cwd(), 'reports', filename);
    
    // Ensure reports directory exists
    const reportsDir = path.dirname(reportPath);
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    this.log(`\n📄 Report saved to: ${reportPath}`, 'green');
  }
}

// Main execution
async function main() {
  const auditor = new ResponsivenessAuditor();
  
  console.log(`${colors.bold}${colors.blue}🔍 CSS/HTML Responsiveness Audit Tool${colors.reset}\n`);
  
  // Get the project directory
  const projectDir = process.argv[2] || process.cwd();
  
  console.log(`📁 Scanning directory: ${projectDir}\n`);
  
  // Start scanning
  auditor.scanDirectory(projectDir);
  
  // Print results
  auditor.printResults();
  
  // Save report
  auditor.saveReport();
  
  // Exit with appropriate code
  const hasErrors = auditor.issues.length > 0;
  process.exit(hasErrors ? 1 : 0);
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = ResponsivenessAuditor;
