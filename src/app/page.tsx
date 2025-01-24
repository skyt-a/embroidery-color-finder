"use client";

import { useState } from "react";
import { SelectedColor } from "../types/thread";
import ImageUploader from "../components/ImageUploader";
import ColorPicker from "../components/ColorPicker";
import ThreadColorResults from "../components/ThreadColorResults";
import Modal from "../components/Modal";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<SelectedColor | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setSelectedImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleColorSelect = (color: SelectedColor) => {
    setSelectedColor(color);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            刺繍糸カラーファインダー
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            画像から色を選択して、最適な刺繍糸の色を見つけることができます
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                画像をアップロード
              </h2>
              <ImageUploader onImageUpload={handleImageUpload} />
            </div>
          </div>

          {selectedImage && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  色を選択
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  画像をクリックして、探したい色を選択してください
                </p>
                <ColorPicker
                  imageUrl={selectedImage}
                  onColorSelect={handleColorSelect}
                />
              </div>
            </div>
          )}

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            {selectedColor && (
              <ThreadColorResults selectedColor={selectedColor} />
            )}
          </Modal>
        </div>
      </div>
    </main>
  );
}
