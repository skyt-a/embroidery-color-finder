import { useEffect, useRef, MouseEvent } from "react";
import { SelectedColor } from "../types/thread";
import { rgbToHex } from "../utils/colorUtils";

interface ColorPickerProps {
  imageUrl: string;
  onColorSelect: (color: SelectedColor) => void;
}

const ColorPicker = ({ imageUrl, onColorSelect }: ColorPickerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      imageRef.current = image;
      drawImage();
    };
  }, [imageUrl]);

  const drawImage = () => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // キャンバスのサイズを画像に合わせる
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
  };

  const handleCanvasClick = (e: MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // スケーリングを考慮した座標の計算
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const pixelX = Math.floor(x * scaleX);
    const pixelY = Math.floor(y * scaleY);

    const pixel = ctx.getImageData(pixelX, pixelY, 1, 1).data;
    const color: SelectedColor = {
      rgb: {
        r: pixel[0],
        g: pixel[1],
        b: pixel[2],
      },
      hex: rgbToHex(pixel[0], pixel[1], pixel[2]),
    };

    onColorSelect(color);
  };

  return (
    <div className="w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="max-w-full h-auto cursor-crosshair border border-gray-300 rounded-lg"
        style={{ maxHeight: "70vh" }}
      />
    </div>
  );
};

export default ColorPicker;
