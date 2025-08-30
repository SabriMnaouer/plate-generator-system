import { Plate } from '../types'

export const drawCanvas = (
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  plates: Plate[],
  imageLoaded: boolean
): void => {
  if (!canvas || !image || plates.length === 0 || !imageLoaded) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const totalWidth = plates.reduce((sum, plate) => sum + plate.width, 0)
  const maxHeight = Math.max(...plates.map(plate => plate.height))

  const pixelsPerCm = 2
  canvas.width = totalWidth * pixelsPerCm
  canvas.height = maxHeight * pixelsPerCm

  ctx.fillStyle = '#f8f9fa'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const motifSourceX = 30
  const motifSourceY = 180
  const motifSourceWidth = 520
  const motifSourceHeight = 220

  let currentX = 0
  plates.forEach((plate, index) => {
    const plateWidth = plate.width * pixelsPerCm
    const plateHeight = plate.height * pixelsPerCm

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(currentX + 2, 2, plateWidth - 2, plateHeight - 2)
    ctx.fillStyle = '#e0e0e0'
    ctx.fillRect(currentX, 0, plateWidth, plateHeight)
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(currentX, 0, plateWidth - 2, plateHeight - 2)

    const imageWidth = motifSourceWidth
    const imageHeight = motifSourceHeight

    const needsMirroring = totalWidth > 300
    let effectiveImageWidth = imageWidth

    if (needsMirroring) {
      effectiveImageWidth = imageWidth * 2
    }

    const plateStartX = plates.slice(0, index).reduce((sum, p) => sum + p.width, 0)
    const sourceX = (plateStartX / totalWidth) * effectiveImageWidth
    const sourceWidth = (plate.width / totalWidth) * effectiveImageWidth

    if (sourceX < imageWidth) {
      const availableWidth = Math.min(sourceWidth, imageWidth - sourceX)
      const drawWidth = (availableWidth / effectiveImageWidth) * totalWidth * pixelsPerCm

      ctx.drawImage(
        image,
        motifSourceX + sourceX, motifSourceY, availableWidth, imageHeight,
        currentX, 0, drawWidth, plateHeight
      )

      if (sourceWidth > availableWidth) {
        const remainingWidth = sourceWidth - availableWidth
        const mirrorSourceX = imageWidth - remainingWidth
        const remainingDrawWidth = plateWidth - drawWidth

        ctx.save()
        ctx.scale(-1, 1)
        ctx.drawImage(
          image,
          motifSourceX + mirrorSourceX, motifSourceY, remainingWidth, imageHeight,
          -(currentX + plateWidth), 0, remainingDrawWidth, plateHeight
        )
        ctx.restore()
      }
    } else {
      const mirrorSourceX = effectiveImageWidth - sourceX
      const mirrorSourceWidth = Math.min(sourceWidth, imageWidth)

      ctx.save()
      ctx.scale(-1, 1)
      ctx.drawImage(
        image,
        motifSourceX + mirrorSourceX - mirrorSourceWidth, motifSourceY, mirrorSourceWidth, imageHeight,
        -(currentX + plateWidth), 0, plateWidth, plateHeight
      )
      ctx.restore()
    }

    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
    ctx.font = '14px Arial'
    ctx.fillText((index + 1).toString(), currentX + 5, 20)

    currentX += plateWidth
  })
}

