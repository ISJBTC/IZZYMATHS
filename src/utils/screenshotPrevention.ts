
/**
 * Utility for screenshot prevention techniques
 * Note: These methods can discourage but not 100% prevent screenshots
 * as browser/OS level security can override these protections
 */

// Detect and handle print screen key
export const blockPrintScreen = () => {
  document.addEventListener('keyup', (e) => {
    // Print Screen key code
    if (e.key === 'PrintScreen' || e.keyCode === 44) {
      e.preventDefault();
      console.log('Print screen attempted');
      
      // Alert user (optional)
      alert('Screenshots are not permitted for content protection reasons.');
      
      return false;
    }
  });
  
  // Block clipboard operations
  document.addEventListener('copy', (e) => {
    e.preventDefault();
    return false;
  });
};

// Mobile-specific protections
export const setupMobileProtections = () => {
  // Some iOS screenshot detection
  let lastResizeTime = Date.now();
  const resizeThreshold = 400; // ms
  
  window.addEventListener('resize', () => {
    // iOS often triggers resize when taking screenshots
    if (Date.now() - lastResizeTime < resizeThreshold) {
      console.log('Potential screenshot detected (resize method)');
    }
    lastResizeTime = Date.now();
  });
};

// Apply all screenshot prevention techniques
export const applyScreenshotPrevention = () => {
  // Apply CSS to make screenshots more difficult
  const style = document.createElement('style');
  style.innerHTML = `
    /* This makes screenshots show watermarks */
    body::before {
      content: "IZZYMATHS Protected Content";
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(200, 200, 200, 0.1);
      font-size: 5vw;
      font-weight: bold;
      pointer-events: none;
      transform: rotate(-45deg);
      z-index: 999;
      /* Only visible on screenshots, not normal viewing */
      animation: fade-in-out 0.001s linear infinite;
      opacity: 0.01;
    }
    
    /* Ensure image and content can't be easily grabbed */
    img, video, canvas, object, iframe {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      user-select: none;
      pointer-events: none;
    }
    
    /* Animation that triggers on screenshot */
    @keyframes fade-in-out {
      0% { opacity: 0.01; }
      50% { opacity: 0.01; }
      100% { opacity: 0.01; }
    }
  `;
  
  document.head.appendChild(style);
  
  // Apply JS-based protections
  blockPrintScreen();
  setupMobileProtections();
  
  // Set maximum protection for content
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });
};
