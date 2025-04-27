
// A simplified device fingerprinting utility
// In a production app, you would use a more sophisticated approach

export const generateDeviceFingerprint = (): string => {
  // This is a simplified implementation
  // In a real application, you'd use a proper fingerprinting library
  const userAgent = navigator.userAgent;
  const screenInfo = `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const language = navigator.language;
  
  // Create a simple hash from these values
  // This is NOT cryptographically secure - just for demonstration
  const fingerprintString = `${userAgent}|${screenInfo}|${timezone}|${language}`;
  
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < fingerprintString.length; i++) {
    const char = fingerprintString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return Math.abs(hash).toString(16);
};

export const storeDeviceFingerprint = (userId: string): void => {
  const fingerprint = generateDeviceFingerprint();
  localStorage.setItem(`device_fingerprint_${userId}`, fingerprint);
};

export const validateDeviceFingerprint = (userId: string): boolean => {
  const storedFingerprint = localStorage.getItem(`device_fingerprint_${userId}`);
  if (!storedFingerprint) return false;
  
  const currentFingerprint = generateDeviceFingerprint();
  return storedFingerprint === currentFingerprint;
};
