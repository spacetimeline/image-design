<template>
  <div>
    <div class="footer-left">
    </div>
    <div class="footer-right">
      <div class="right-handle" v-if="isChecked">
        <FileInput :accept="'.json'" @change="(files: FileList) => loadFile(files)">
          <el-tooltip placement="top" :hide-after="0" content="上传文件">
            <IconUploadOne class="footer-button"/>
          </el-tooltip>
        </FileInput>
      </div>
      <div class="right-handle">
        <el-tooltip placement="top" :hide-after="0" content="下载文件">
          <IconDownloadOne class="footer-button" @click="exportFile()"/>
        </el-tooltip>
      </div>
      <!-- <div class="right-handle">
        <el-tooltip placement="top" :hide-after="0" content="保存模板">
          <IconSave class="footer-button" @click="exportFile()"/>
        </el-tooltip>
      </div> -->
    </div>
    <ExportFile v-model:visible="exportFileDialog" @close="exportFileHide" @save="exportFileHandle"></ExportFile>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import useCanvas from "@/views/Canvas/useCanvas"
import useHandleElement  from '@/hooks/useHandleElement'
import ExportFile from './components/index.vue'
import { storeToRefs } from 'pinia'
import { useFabricStore, useTemplatesStore } from '@/store'

const fabricStore = useFabricStore()
const { isChecked } = storeToRefs(fabricStore)
const exportFileDialog = ref(false)


const exportFileHide = () => {
  exportFileDialog.value = false
}

const exportFileHandle = () => {
  exportFileDialog.value = false
}

const exportFile = () => {
  exportFileDialog.value = true
}

const loadFile = (files: FileList) => {
  const jsonFile = files[0]
  if (!jsonFile) return
  const reader = new FileReader()
  const [ canvas ] = useCanvas()
  reader.onload = event => {
    const jsonContent = event.target?.result?.toString()
    if (!jsonContent) return
    const jsonData = JSON.parse(jsonContent)
    canvas.setViewportTransform(jsonData.viewportTransform)
    canvas.setZoom(jsonData.zoom)
  }
  reader.readAsText(jsonFile)
}

</script>

<style lang="scss" scoped>
.footer-left {
  display: flex;
  width: 80px;
  cursor: pointer;
  align-items: center;
}
.left-handle {
  height: 24px;
  flex: 1;
  position: relative;
  border-radius: $borderRadius;
  &:hover{
    background-color: #f1f1f1;
  }
  a {
    color: inherit;
  }
}

.footer-right {
  display: flex;
  cursor: pointer;
}

.footer-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 22px;
}

.right-handle {
  width: 40px;
  flex: 1;
  position: relative;
}
// .resize-handler {
//   height: 7px;
//   position: absolute;
//   top: -3px;
//   left: 0;
//   right: 0;
//   cursor: n-resize;
//   z-index: 2;
// }
</style>