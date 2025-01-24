import { useEffect, useState } from "react";
import { SelectedColor, ThreadColor } from "../types/thread";

interface ManufacturerColors {
  manufacturer: string;
  colors: (ThreadColor & { difference: number })[];
}

interface ThreadColorResultsProps {
  selectedColor: SelectedColor;
}

const ThreadColorResults = ({ selectedColor }: ThreadColorResultsProps) => {
  const [manufacturerColors, setManufacturerColors] = useState<
    ManufacturerColors[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getGoogleSearchUrl = (manufacturer: string, colorNumber: string) => {
    const searchQuery = encodeURIComponent(
      `${manufacturer} 刺繍糸 ${colorNumber}`
    );
    return `https://www.google.com/search?q=${searchQuery}`;
  };

  useEffect(() => {
    const fetchThreadColors = async () => {
      try {
        setIsLoading(true);
        const { r, g, b } = selectedColor.rgb;
        const response = await fetch(`/api/thread-colors?r=${r}&g=${g}&b=${b}`);

        if (!response.ok) {
          throw new Error("Failed to fetch thread colors");
        }
        const data = await response.json();
        setManufacturerColors(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "刺繍糸データの取得に失敗しました"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchThreadColors();
  }, [selectedColor]);

  if (error) {
    return (
      <div className="w-full p-4 bg-red-50 rounded-lg">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full p-4">
        <p className="text-gray-600 font-medium">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-6 text-gray-800">
        選択した色に近い刺繍糸
      </h2>

      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-lg shadow-sm"
            style={{ backgroundColor: selectedColor.hex }}
          />
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">選択した色</p>
            <p className="font-mono text-sm font-medium text-gray-800">
              RGB: {selectedColor.rgb.r}, {selectedColor.rgb.g},{" "}
              {selectedColor.rgb.b}
            </p>
            <p className="font-mono text-sm font-medium text-gray-800">
              HEX: {selectedColor.hex}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
        {manufacturerColors.map(({ manufacturer, colors }) => (
          <div
            key={manufacturer}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
          >
            <h3 className="font-bold text-lg mb-4 text-gray-800">
              {manufacturer}
            </h3>
            {colors.map((color) => (
              <div
                key={color.id}
                className="p-4 bg-gray-50 rounded-lg space-y-4"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-16 h-16 rounded-lg shadow-sm flex-shrink-0"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div>
                    <p className="text-base font-medium text-gray-800 mb-2">
                      {color.name || `#${color.colorNumber}`}
                    </p>
                    <p className="font-mono text-sm font-medium text-gray-700">
                      色番号: {color.colorNumber}
                    </p>
                    <p className="font-mono text-sm font-medium text-gray-700">
                      RGB: {color.rgb.r}, {color.rgb.g}, {color.rgb.b}
                    </p>
                    <p className="font-mono text-sm font-medium text-gray-700">
                      色差: {color.difference}
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <a
                    href={getGoogleSearchUrl(manufacturer, color.colorNumber)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-1.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                    </svg>
                    詳細を検索
                  </a>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreadColorResults;
