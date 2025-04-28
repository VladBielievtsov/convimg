import { LoaderCircle, X } from 'lucide-react'
import React, { Dispatch, SetStateAction } from 'react'
import { Button } from './common/button'
import { FileWithUrl } from '@/app/home-page'
import { Link } from './common/link'

interface Props {
  files: FileWithUrl[],
  setFiles: Dispatch<SetStateAction<FileWithUrl[]>>
  isLoading: boolean
}

export default function FileList({ files, setFiles, isLoading }: Props) {
  const removeFile = (id: number) => {
    setFiles((prev) => {
      const newFiles = [...prev]
      newFiles.splice(id, 1)
      return newFiles
    })
  }

  return (
    <div className="w-full">
      {files.map((file, id) => (
        <div key={id} className="flex items-center justify-between border-b border-foreground/50 w-full">
          <div className="py-3.5 min-w-0">
            <div className="w-full flex items-center gap-2">
              <p className="truncate min-w-0">{file.file.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              disabled={isLoading && !file.url}
              variant="ghost"
              size="icon"
              className='h-9 w-9'
              onClick={() => removeFile(id)}
            >
              <X size={20} />
            </Button>
            {isLoading && !file.url && (
              <div>
                <LoaderCircle size={20} className='animate-spin' />
              </div>
            )}
            {file.url && (
              <Link
                href={file.url}
                download
              >
                Download
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
