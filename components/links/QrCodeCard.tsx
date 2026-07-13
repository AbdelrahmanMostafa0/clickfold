"use client";

import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function QrCodeCard({
  url,
  slug,
}: {
  url: string;
  slug: string;
}) {
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
    <div className="bg-[#0a0a0a] border border-white/8 rounded-lg p-4 flex items-center gap-4">
      <div className="bg-white rounded-md p-2 shrink-0">
        <QRCodeCanvas ref={canvasRef} value={url} size={96} level="M" />
      </div>
      <div className="min-w-0">
        <p className="text-white text-sm font-medium">QR Code</p>
        <p className="text-[#666] text-xs mt-0.5 mb-3">
          Scan to open this link
        </p>
        <Button
          type="button"
          size="sm"
          onClick={handleDownload}
          className="bg-white/10 hover:bg-white/15 text-white border-0"
        >
          <Download className="size-3.5 mr-1.5" />
          Download PNG
        </Button>
      </div>
    </div>
  );
}
