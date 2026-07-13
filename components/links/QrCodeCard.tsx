"use client";

import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function QrCodeCard({ url, slug }: { url: string; slug: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `${slug}-qr.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="border-2 border-foreground bg-background p-4">
      <div className="mb-4 w-fit border border-foreground bg-white p-3">
        <QRCodeCanvas ref={canvasRef} value={url} size={128} level="M" />
      </div>
      <p className="font-bold">Campaign QR</p>
      <p className="mb-4 mt-1 text-xs leading-5 text-muted-foreground">Place it on print, packaging, or an event screen.</p>
      <Button type="button" size="sm" onClick={handleDownload} variant="outline" className="border-2 border-foreground bg-card">
        <Download className="size-3.5" />
        Download PNG
      </Button>
    </div>
  );
}
