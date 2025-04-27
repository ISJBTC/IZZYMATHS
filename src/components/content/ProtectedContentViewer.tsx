
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ZoomIn, ZoomOut, Maximize, Download, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProtectedContentViewerProps {
  contentId?: string;
  initialContent?: React.ReactNode;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFullScreen: () => void;
}

const ProtectedContentViewer: React.FC<ProtectedContentViewerProps> = ({
  contentId,
  initialContent,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onFullScreen,
}) => {
  const [content, setContent] = useState<React.ReactNode>(initialContent);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // This would be replaced with actual Google Drive API integration
  useEffect(() => {
    if (contentId) {
      setIsLoading(true);
      // Simulate content loading from Google Drive
      setTimeout(() => {
        setIsLoading(false);
        // In a real implementation, this would fetch content from Google Drive
      }, 1000);
    }
  }, [contentId]);

  // Prevent right-click on content
  const preventRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: "Action restricted",
      description: "Right-clicking is disabled on protected content.",
      variant: "destructive",
    });
  };

  // Prevent keyboard shortcuts for screenshot, print, etc.
  useEffect(() => {
    const preventKeyboardShortcuts = (e: KeyboardEvent) => {
      // Prevent print screen (screenshot)
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        toast({
          title: "Screenshot blocked",
          description: "Taking screenshots of protected content is not allowed.",
          variant: "destructive",
        });
        return false;
      }
      
      // Prevent Ctrl+P (print) and Ctrl+S (save)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 's')) {
        e.preventDefault();
        toast({
          title: "Action blocked",
          description: "Printing or saving protected content is not allowed.",
          variant: "destructive",
        });
        return false;
      }
    };
    
    document.addEventListener('keydown', preventKeyboardShortcuts);
    
    return () => {
      document.removeEventListener('keydown', preventKeyboardShortcuts);
    };
  }, [toast]);

  // Add watermark with user info
  const Watermark = () => (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10 select-none">
      <div className="flex items-center justify-center h-full transform rotate-45 text-gray-500 text-xl">
        <div className="p-10 flex flex-col items-center">
          <Lock className="h-6 w-6 mb-2" />
          <p>Protected Content - MathMentor</p>
          <p>{new Date().toLocaleDateString()}</p>
          {/* In a real implementation, we'd include user-specific info here */}
          <p>Licensed to: Demo User</p>
        </div>
      </div>
    </div>
  );

  const handleDownloadAttempt = (e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: "Download restricted",
      description: "Content downloading is not allowed per our terms of service.",
      variant: "destructive",
    });
  };

  return (
    <div className="relative">
      {/* Content container with protection */}
      <div 
        className="bg-white rounded-lg shadow p-6 mt-px relative overflow-hidden"
        id="content-container"
        onContextMenu={preventRightClick}
      >
        {isLoading ? (
          <div className="py-20 text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading protected content...</p>
          </div>
        ) : (
          <>
            <Watermark />
            <div className="protected-content math-content relative" style={{ fontSize: `${zoomLevel}%` }}>
              {content}
            </div>
          </>
        )}
      </div>
      
      {/* Controls */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={onZoomOut}>
            <ZoomOut className="h-4 w-4 mr-2" />
            Zoom Out
          </Button>
          <span className="mx-2">{zoomLevel}%</span>
          <Button variant="outline" size="sm" onClick={onZoomIn}>
            <ZoomIn className="h-4 w-4 mr-2" />
            Zoom In
          </Button>
          <Button variant="outline" size="sm" onClick={onFullScreen}>
            <Maximize className="h-4 w-4 mr-2" />
            Full Screen
          </Button>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleDownloadAttempt} 
          className="flex items-center opacity-50 hover:opacity-100"
        >
          <Download className="h-4 w-4 mr-2" />
          Download (Restricted)
        </Button>
      </div>
    </div>
  );
};

export default ProtectedContentViewer;
