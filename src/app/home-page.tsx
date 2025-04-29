"use client"

import SelectFormat from "@/components/select-format"
import FileList from "@/components/file-list"
import InputFile from "@/components/input-file"
import { useState } from "react"
import { DEFAULT_FORMAT, DEFAULT_QUALITY } from "@/lib/constants"
import { Button } from "@/components/common/button"

export interface FileWithUrl {
  file: File,
  url?: string,
}

export default function HomePage() {
  const [files, setFiles] = useState<FileWithUrl[]>([])
  const [quality, setQuality] = useState(DEFAULT_QUALITY)
  const [format, setFormat] = useState(DEFAULT_FORMAT)
  const [isLoading, setIsLoading] = useState(false)

  async function convertFiles(file: File, format: string, quality: number) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('format', format)
    formData.append('quality', quality.toString())

    const response = await fetch('/api/convert', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to convert')
    }

    const blob = await response.blob()
    return blob
  }

  async function handleFileChange() {
    setIsLoading(true);

    for (const f of files.filter(f => !f.url)) {
      const blob = await convertFiles(f.file, format, quality);
      const url = URL.createObjectURL(blob);

      setFiles(prev => {
        const updatedFiles = [...prev];
        const index = updatedFiles.findIndex(file => file.file.name === f.file.name);
        if (index !== -1) {
          updatedFiles[index] = { ...updatedFiles[index], url };
        }
        return updatedFiles;
      });
    }

    setIsLoading(false);
  }

  return (
    <main className="px-7 py-10 overflow-x-hidden min-h-[calc(100vh-6rem)]">
      <div className="max-w-article mx-auto">
        <div className="prose max-w-none mb-4">
          <h1>Convert image</h1>
        </div>
        {!files.length ? (
          <InputFile setFiles={setFiles} />
        ) : (
          <FileList files={files} setFiles={setFiles} isLoading={isLoading} />
        )}
        <div className="prose max-w-none mt-4 flex flex-col">
          <h3>Image quality</h3>
          <input
            type="range"
            min="0"
            max="100"
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="slider"
            style={{
              background: `linear-gradient(to right, var(--foreground) ${quality}%, color-mix(in oklab, var(--foreground) 30%, transparent) ${quality}%)`,
            }}
          />
          <span className="text-center mt-4">{quality} / 100</span>
        </div>
        <div className="flex items-center gap-2">
          <SelectFormat format={format} setFormat={setFormat} />
          <Button
            disabled={files.every(f => f.url) || isLoading}
            onClick={handleFileChange}
          >
            {!isLoading ? "Convert" : "Loading"}
          </Button>
        </div>
        <div className="mt-4 text-foreground/70">
          <p>Images are never uploaded to the server, it&apos;s 100% client-side.</p>
        </div>
      </div>
    </main>
  )
}
