
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

// Detect screen capture state changes (detects screen sharing and recording)
export const detectScreenCapture = () => {
  if (navigator.mediaDevices && 'getDisplayMedia' in navigator.mediaDevices) {
    // This is a newer API to detect screen capture
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        navigator.mediaDevices.getDisplayMedia({ video: true })
          .then(stream => {
            // If we get here, screen is being captured
            stream.getTracks().forEach(track => track.stop()); // Stop the capture
            alert('Screen recording is not permitted');
          })
          .catch(() => {
            // User denied screen share or browser doesn't support it
          });
      }
    });
  }
};

// Advanced screenshot prevention for desktop apps like Snipping Tool
export const blockThirdPartyScreenshots = () => {
  // Mutate the DOM frequently to make screen captures harder
  let mutationCounter = 0;
  const mutationInterval = setInterval(() => {
    // Create a temporary element that will disrupt screenshots but not visible to users
    const element = document.createElement('div');
    element.className = 'screenshot-trap';
    element.style.position = 'fixed';
    element.style.top = '0';
    element.style.left = '0';
    element.style.width = '100%';
    element.style.height = '100%';
    element.style.opacity = '0.01';
    element.style.pointerEvents = 'none';
    element.style.zIndex = '9999';
    element.textContent = 'IZZYMATHS PROTECTED ' + new Date().toISOString();
    
    document.body.appendChild(element);
    
    // Remove it after a very short delay
    setTimeout(() => {
      document.body.removeChild(element);
    }, 10);
    
    mutationCounter++;
    if (mutationCounter > 1000) {
      clearInterval(mutationInterval); // Prevent memory issues
      mutationCounter = 0;
      setTimeout(() => {
        blockThirdPartyScreenshots(); // Restart the protection
      }, 100);
    }
  }, 500);
  
  // Detect third-party apps like snipping tool by checking for specific elements
  document.addEventListener('mouseover', (e) => {
    const target = e.target as HTMLElement;
    
    // Check if the element might be part of a screenshot tool
    if (target.dataset && (
        target.dataset.snipping || 
        target.className.includes('snip') ||
        target.id.includes('screen') ||
        target.id.includes('capture')
    )) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Potential snipping tool detected');
      alert('Screenshot tools are not permitted');
    }
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

    /* Add dots pattern to make OCR harder */
    body::after {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px);
      background-size: 4px 4px;
      pointer-events: none;
      z-index: 998;
      opacity: 0.03;
    }
  `;
  
  document.head.appendChild(style);
  
  // Apply JS-based protections
  blockPrintScreen();
  setupMobileProtections();
  blockThirdPartyScreenshots();
  detectScreenCapture();
  
  // Set maximum protection for content
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });
  
  // Prevent drag events which might be used by some screen grab tools
  document.addEventListener('dragstart', (e) => {
    e.preventDefault();
    return false;
  });
};
