-- CreateTable
CREATE TABLE "thread_colors" (
    "id" SERIAL NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "colorNumber" TEXT NOT NULL,
    "name" TEXT,
    "rgbR" INTEGER NOT NULL,
    "rgbG" INTEGER NOT NULL,
    "rgbB" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "thread_colors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "thread_colors_manufacturer_colorNumber_key" ON "thread_colors"("manufacturer", "colorNumber");
