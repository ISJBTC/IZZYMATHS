import React, { useEffect, useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ZoomIn, ZoomOut, Maximize, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFViewerProps {
  pdfPath: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfPath }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [allPages, setAllPages] = useState(true);
  const [pdf, setPdf] = useState<any>(null);
  const { toast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleZoomIn = () => {
    if (scale < 2) setScale(prev => prev + 0.1);
  };

  const handleZoomOut = () => {
    if (scale > 0.5) setScale(prev => prev - 0.1);
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

  const toggleViewMode = () => setAllPages(!allPages);

  const nextPage = () => {
    if (pageNumber < (numPages || 1)) setPageNumber(pageNumber + 1);
  };

  const prevPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const preventRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: "Action restricted",
      description: "Right-clicking is disabled on protected content.",
      variant: "destructive",
    });
  };

  const handleSearch = async () => {
    if (!pdf || !searchText.trim()) return;

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((item: any) => item.str).join(' ');
      if (strings.toLowerCase().includes(searchText.toLowerCase())) {
        toast({ title: "Match Found", description: `Text found on page ${i}` });
        setPageNumber(i);
        setAllPages(false);
        return;
      }
    }

    toast({ title: "No Match", description: `No results for "${searchText}"`, variant: "destructive" });
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg" onContextMenu={preventRightClick}>
      <div className="p-4 border-b flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handleZoomOut}><ZoomOut className="h-4 w-4" /></Button>
          <span>{Math.round(scale * 100)}%</span>
          <Button variant="outline" size="icon" onClick={handleZoomIn}><ZoomIn className="h-4 w-4" /></Button>
          <Button variant="outline" size="icon" onClick={handleFullScreen}><Maximize className="h-4 w-4" /></Button>
          <Button variant="outline" onClick={toggleViewMode}>{allPages ? "Single Page" : "All Pages"}</Button>
        </div>

        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Search in document..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-64"
          />
          <Button onClick={handleSearch}><Search className="h-4 w-4 mr-2" />Search</Button>
        </div>

        {!allPages && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={prevPage} disabled={pageNumber <= 1}><ChevronLeft className="h-4 w-4" /></Button>
            <span>Page {pageNumber} of {numPages || '-'}</span>
            <Button variant="outline" size="icon" onClick={nextPage} disabled={pageNumber >= (numPages || 1)}><ChevronRight className="h-4 w-4" /></Button>
          </div>
        )}
      </div>

      <div
        id="pdf-container"
        ref={containerRef}
        className="overflow-auto p-4"
        style={{ maxHeight: 'calc(100vh - 200px)', WebkitUserSelect: 'none', userSelect: 'none' }}
      >
        <Document
          file={pdfPath}
          onLoadSuccess={(doc) => {
            setPdf(doc);
            onDocumentLoadSuccess(doc);
          }}
          loading={<div className="text-center py-10">Loading PDF...</div>}
          error={<div className="text-center py-10 text-red-500">Coming Soon.</div>}
          className="flex flex-col items-center"
        >
          {allPages ? (
            Array.from(new Array(numPages || 0), (_, index) => (
              <div key={`page_${index + 1}`} className="mb-8">
                <Page
                  pageNumber={index + 1}
                  scale={scale}
                  renderTextLayer={false} // <-- fixes odd text rendering issue
                  renderAnnotationLayer={false}
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
                renderTextLayer={false} // <-- fixes second page looking like text
                renderAnnotationLayer={false}
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
