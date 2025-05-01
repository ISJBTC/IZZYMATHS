
import React, { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ZoomIn, ZoomOut, Maximize, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFViewerProps {
  pdfPath: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfPath }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(-1);
  const { toast } = useToast();
  const [allPages, setAllPages] = useState(true);
  const documentRef = useRef<any>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setSearchResults([]);
    setCurrentSearchIndex(-1);
  }

  const handleZoomIn = () => {
    if (scale < 2) {
      setScale(prev => prev + 0.1);
    }
  };

  const handleZoomOut = () => {
    if (scale > 0.5) {
      setScale(prev => prev - 0.1);
    }
  };

  const handleFullScreen = () => {
    const element = document.getElementById('pdf-container');
    if (element) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        element.requestFullscreen().catch(err => {
          toast({
            title: "Error",
            description: `Could not enable full-screen mode: ${err.message}`,
            variant: "destructive",
          });
        });
      }
    }
  };

  const handleSearch = async () => {
    if (!searchText.trim() || !documentRef.current) {
      return;
    }

    try {
      const pdfDocument = await documentRef.current.getDocument();
      const results: any[] = [];
      
      toast({
        title: "Searching",
        description: "Looking for matches in document...",
      });

      // Search through all pages
      for (let i = 1; i <= pdfDocument.numPages; i++) {
        const page = await pdfDocument.getPage(i);
        const textContent = await page.getTextContent();
        const text = textContent.items.map((item: any) => item.str).join(' ');
        
        if (text.toLowerCase().includes(searchText.toLowerCase())) {
          results.push({
            pageNumber: i,
            text
          });
        }
      }

      setSearchResults(results);
      
      if (results.length > 0) {
        setCurrentSearchIndex(0);
        if (!allPages) {
          setPageNumber(results[0].pageNumber);
        }
        
        toast({
          title: "Search Results",
          description: `Found ${results.length} matches for "${searchText}"`,
        });
      } else {
        setCurrentSearchIndex(-1);
        toast({
          title: "No Results",
          description: `No matches found for "${searchText}"`,
        });
      }
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search Error",
        description: "Failed to search the document",
        variant: "destructive",
      });
    }
  };

  const navigateSearchResults = (direction: 'next' | 'prev') => {
    if (searchResults.length === 0) return;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentSearchIndex + 1) % searchResults.length;
    } else {
      newIndex = (currentSearchIndex - 1 + searchResults.length) % searchResults.length;
    }
    
    setCurrentSearchIndex(newIndex);
    if (!allPages) {
      setPageNumber(searchResults[newIndex].pageNumber);
    }
  };

  const nextPage = () => {
    if (pageNumber < (numPages || 1)) {
      setPageNumber(pageNumber + 1);
    }
  };

  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const toggleViewMode = () => {
    setAllPages(!allPages);
  };

  const preventRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: "Action restricted",
      description: "Right-clicking is disabled on protected content.",
      variant: "destructive",
    });
  };

  return (
    <div 
      className="w-full bg-white rounded-lg shadow-lg"
      onContextMenu={preventRightClick}
    >
      <div className="p-4 border-b flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span>{Math.round(scale * 100)}%</span>
          <Button variant="outline" size="icon" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleFullScreen}>
            <Maximize className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={toggleViewMode}>
            {allPages ? "Single Page" : "All Pages"}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Search in document..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-64"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          {searchResults.length > 0 && (
            <>
              <Button variant="outline" size="sm" onClick={() => navigateSearchResults('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                {currentSearchIndex + 1} of {searchResults.length}
              </span>
              <Button variant="outline" size="sm" onClick={() => navigateSearchResults('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
        {!allPages && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={prevPage} disabled={pageNumber <= 1}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span>
              Page {pageNumber} of {numPages || '-'}
            </span>
            <Button variant="outline" size="icon" onClick={nextPage} disabled={pageNumber >= (numPages || 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      <div 
        id="pdf-container"
        className="overflow-auto p-4"
        style={{ 
          maxHeight: 'calc(100vh - 200px)',
          WebkitUserSelect: 'none',
          userSelect: 'none'
        }}
      >
        <Document
          file={pdfPath}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="text-center py-10">Loading PDF...</div>}
          error={<div className="text-center py-10 text-red-500">Failed to load PDF. Please check if the file exists at {pdfPath}.</div>}
          className="flex flex-col items-center"
          inputRef={documentRef}
          options={{
            cMapUrl: 'https://unpkg.com/pdfjs-dist@3.4.120/cmaps/',
            cMapPacked: true,
          }}
        >
          {allPages ? (
            Array.from(new Array(numPages || 0), (_, index) => (
              <div key={`page_${index + 1}`} className="mb-8 flex flex-col items-center">
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  scale={scale}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  className="shadow-lg mx-auto"
                />
                <div className="text-center mt-2 text-sm text-gray-500">
                  Page {index + 1} of {numPages}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center">
              <Page
                pageNumber={pageNumber}
                scale={scale}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                className="shadow-lg"
              />
            </div>
          )}
        </Document>
      </div>
    </div>
  );
};

export default PDFViewer;
