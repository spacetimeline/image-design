
import { ref } from 'vue'
import { saveAs } from 'file-saver'
import { storeToRefs } from 'pinia'
import { useFabricStore, useTemplatesStore } from '@/store'
import { WorkSpaceThumbType, WorkSpaceClipType, WorkSpaceCommonType, WorkSpaceSafeType, propertiesToInclude } from '@/configs/canvas'
import { ImageFormat } from 'fabric'
import { downloadSVGFile, downloadLinkFile } from '@/utils/download'
import useCanvas from '@/views/Canvas/useCanvas'
import useCenter from '@/views/Canvas/useCenter'
import { handleMessage } from "@/worker/pdf"
import { exportFile } from '@/api/file'
// const worker = new PDFWorker()

export default () => {
  
  const Exporting = ref(false)
  const { showClip, showSafe } = storeToRefs(useFabricStore())
  const { currentTemplate } = storeToRefs(useTemplatesStore())
  // 导出图片
  const exportImage = (format: ImageFormat, quality: number, dpi: number, ignoreClip = true) => {
    Exporting.value = true
    const [ canvas ] = useCanvas()
    const { left, top, width, height } = useCenter()
    const zoom = canvas.getZoom()
    const viewportTransform = canvas.viewportTransform
    const activeObject = canvas.getActiveObject()
    const ignoreObjects = canvas.getObjects().filter(obj => WorkSpaceCommonType.includes(obj.id))
    if (ignoreClip) {
      ignoreObjects.map(item => item.set({visible: false}))
      canvas.renderAll()
    }
    if (activeObject) canvas.discardActiveObject()
    canvas.set({background: 'rgba(255,255,255,0)'})
    canvas.renderAll()
    const result = canvas.toDataURL({
      multiplier: 1 / zoom,
      quality: quality,
      format: format,
      width: width * zoom,
      height: height * zoom,
      left: left * zoom + viewportTransform[4],
      top: top * zoom + viewportTransform[5]
    })
    // const data = changeDataURLDPI(result, dpi)
    saveAs(result, `image-design-${Date.now()}.${format}`)
    Exporting.value = false
    ignoreObjects.map(item => item.set({visible: true}))
    canvas.getObjects().filter(obj => obj.id === WorkSpaceClipType).map(item => item.set({visible: showClip.value}))
    canvas.getObjects().filter(obj => obj.id === WorkSpaceSafeType).map(item => item.set({visible: showSafe.value}))
    if (activeObject) canvas.setActiveObject(activeObject)
    canvas.renderAll()
  }

  const getSVGData = () => {
    const [ canvas ] = useCanvas()
    const { left, top, width, height } = useCenter()
    canvas.renderAll()
    const data = canvas.toSVG({
      viewBox: {
        x: left,
        y: top,
        width: width,
        height: height,
      },
      width: width + 'px',
      height: height + 'px'
    }, (element) => element)
    return data
  }

  const getJSONData = () => {
    const [ canvas ] = useCanvas()
    const serializer = canvas.toObject(propertiesToInclude)
    serializer.workSpace = currentTemplate.value.workSpace
    serializer.zoom = currentTemplate.value.zoom
    serializer.width = currentTemplate.value.width
    serializer.height = currentTemplate.value.height
    return serializer
  }

  const exportSVG = () => {
    const [ canvas ] = useCanvas()
    const ignoreObjects = canvas.getObjects().filter(obj => WorkSpaceThumbType.includes(obj.id))
    ignoreObjects.map(item => item.set({visible: false}))
    canvas.renderAll()
    const data = getSVGData()
    downloadSVGFile(data, `image-design-${Date.now()}.svg`)
    ignoreObjects.map(item => item.set({visible: true}))
    canvas.getObjects().filter(obj => obj.id === WorkSpaceClipType).map(item => item.set({visible: showClip.value}))
    canvas.getObjects().filter(obj => obj.id === WorkSpaceSafeType).map(item => item.set({visible: showSafe.value}))
    canvas.renderAll()
  }

  // 导出PDF
  const exportPDF = async () => {
    const content = {
      data: getSVGData(),
      width: currentTemplate.value.width / currentTemplate.value.zoom,
      height: currentTemplate.value.height / currentTemplate.value.zoom,
    }
    const result = await exportFile(content)
    if (result && result.data.link) {
      downloadLinkFile(result.data.link, `image-design-${Date.now()}.pdf`)
    }
  }

  // 导出json
  const exportJSON = () => {
    const serializer = getJSONData()
    const blob = new Blob([JSON.stringify(serializer)])
    saveAs(blob, `image-design-${Date.now()}.json`)
  }

  return {
    exportImage,
    exportPDF,
    exportJSON,
    exportSVG,
    getJSONData,
    getSVGData,
    Exporting
  }
}