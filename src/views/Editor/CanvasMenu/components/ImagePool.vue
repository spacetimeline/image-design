<template>
  <div class="layout-pool">
    <el-row class="layout-search">
      <el-col :span="8">
        <FileInput @change="(files: FileList) => drawImage(files)">
          <el-button type="primary">
              <IconUpload />
              <span style="margin-left: 4px;">导入图片</span>
            </el-button>
        </FileInput>
      </el-col>
    </el-row>
    <el-tabs v-model="activeImage" class="layout-tabs">
      <el-tab-pane label="推荐图片" name="data">
        <IllustrationCategory/>
      </el-tab-pane>
      <el-tab-pane label="我的图片" name="self">
        我的图片
      </el-tab-pane>
      <el-tab-pane label="团队图片" name="team">团队图片</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getImageDataURL } from '@/utils/image'

import useHandleCreate from '@/hooks/useHandleCreate'
import IllustrationCategory from './ImageComponents/IllustrationCategory.vue'
const { createImageElement } = useHandleCreate()

const activeImage = ref('data')
const drawImage = (files: FileList) => {
  const imageFile = files[0]
  if (!imageFile) return
  getImageDataURL(imageFile).then(dataURL => createImageElement(dataURL))
}
</script>

<style lang="scss" scoped>
.layout-search {
  margin: 0 auto;
  width: 100%;
  padding: 20px 10px 10px;
  display: flex;  
  justify-content: center;
  align-items: center;
}
.layout-upload {
  justify-content: center;
}
.layout-tabs {
  width: 90%;
  margin: 0 auto;
}
.layout-templates {
  display: flex;
  flex-wrap: wrap;
  padding: 2px;
  .thumbnail {
    display: flex;
    width: 124px;
    margin: 2px;
  }
  .thumbnail img {
    outline: 1px solid $borderColor;
    margin: 0 5px;
    cursor: pointer;
    &:hover {
      outline-color: $themeColor;
    }
  }
}
.col-img {
  height: 100px;
  img {
    max-height: 100%;
  }
}
</style>
<style>
.el-tabs .el-tabs__nav {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  width: 100%;
}
</style>