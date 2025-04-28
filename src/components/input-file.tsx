import { FileWithUrl } from "@/app/home-page"
import { Upload } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

interface Props {
  setFiles: Dispatch<SetStateAction<FileWithUrl[]>>
}

export default function InputFile({ setFiles }: Props) {
  return (
    <label className="grid justify-center border-dashed border-[3px] border-foreground/50 hover:border-foreground/100 transition-colors py-12 px-6 rounded-xl text-center cursor-pointer">
      <Upload className="mx-auto mb-2" />
      <span>Drop images here<br /> or click to select</span>
      <input
        type="file"
        className="w-0 h-0 opacity-0 invisible"
        multiple
        accept="image/*"
        onChange={(e) => {
          const files = e.target.files
          if (files) {
            const fileArray = Array.from(files).map(file => ({ file }))
            setFiles(fileArray)
          }
        }}
      />
    </label>
  )
}
