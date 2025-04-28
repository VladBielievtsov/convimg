import { DEFAULT_FORMAT, DEFAULT_QUALITY } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";
import sharp from 'sharp'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File
  const format = (formData.get('format') as string) || DEFAULT_FORMAT
  const quality = parseInt(formData.get('quality') as string) || DEFAULT_QUALITY

  if (!file) {
    return new NextResponse('No file uploaded', { status: 400 })
  }

  const arrayBuffer = await file.arrayBuffer()
  const inputBuffer = Buffer.from(arrayBuffer)

  const outputBuffer = await sharp(inputBuffer)
    .toFormat(format as "png" | "jpeg" | "webp" | "avif", { quality })
    .toBuffer()

  return new NextResponse(outputBuffer, {
    status: 200,
    headers: {
      'Content-Type': `image/${format}`,
      'Content-Disposition': `attachment; filename="converted.${format}"`,
    },
  })
}
