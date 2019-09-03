<template>
  <div id="resource" class="padding">
    <el-row :gutter="10">
      <el-col>
        <el-card>
          <div slot="header">
            <h2>{{ resourceTitle }}</h2>
          </div>
          <el-row type="flex" justify="space-between">
            <el-col :xs="10" :xl="10">
              <div class="operateArea">
                <el-button type="primary" size="small" icon="el-icon-upload2" @click="uploadChange">上传</el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="delResource">删除</el-button>
                <el-button type="success" size="small" icon="el-icon-zoom-in" @click="onPreview">预览</el-button>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :md="24" :lg="19">
              <div id="resourceArea">
                <resource-thumbnail
                  v-for="item of resourceList"
                  :key="item.id"
                  :thumbnail="item.thumbnail"
                  :original="item.url"
                  :resource-name="item.name"
                  :item-data="item"
                  :radio-status="item.id === selected"
                  select-type="radio"
                  @select="resourceSelect"
                />
              </div>
              <el-pagination
                :total="pageTotal"
                :page-size="pageSize"
                style="float: right;margin-top: 2rem"
                layout="total, prev, pager, next"
                @current-change="pageChange"
              />
            </el-col>
            <el-col :md="24" :lg="5">
              <div id="resourceInfo">
                <el-card class="card-expand-details" shadow="hover">
                  <div slot="header">
                    <h2>资源信息</h2>
                  </div>
                  <el-form label-position="top" label-width="100px" inline class="table-expand-details">
                    <el-form-item label="资源名称">
                      <p>{{ selectedResourceInfo.name }}</p>
                    </el-form-item>
                    <el-form-item label="资源大小(MB)">
                      <p>{{ selectedResourceInfo.size }}</p>
                    </el-form-item>
                    <el-form-item v-if="templateType !== 'audio'" label="资源分辨率">
                      <p>{{ selectedResourceInfo.measure }}</p>
                    </el-form-item>
                    <el-form-item v-if="templateType !== 'image'" label="播放时长">
                      <p>{{ selectedResourceInfo.playTime }}</p>
                    </el-form-item>
                    <el-form-item label="上传者">
                      <p>{{ selectedResourceInfo.operator }}</p>
                    </el-form-item>
                    <el-form-item label="上传时间">
                      <p>{{ selectedResourceInfo.time }}</p>
                    </el-form-item>
                  </el-form>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      :title="uploadTitle"
      :visible.sync="uploadDialog"
      width="400px"
    >
      <el-upload
        ref="uploadResource"
        :data="uploadData"
        :auto-upload="false"
        :with-credentials="false"
        :action="uploadUrl"
        :accept="acceptType"
        :before-upload="uploadBefore"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        drag
        multiple
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或点击上传</div>
        <div slot="tip" class="el-upload__tip">{{ uploadTip }}</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="uploadDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmUpload">确 定</el-button>
      </span>
    </el-dialog>  <!--上传-->
    <el-dialog
      v-if="previewDialog"
      title="资源预览"
      :visible.sync="previewDialog"
      width="800px"
    >
      <div class="view">
        <video
          v-if="selectedResourceInfo.type ==='video'"
          id="myVideo"
          :key="selectedResourceInfo.id"
          preload="metadata"
          width="100%"
          height="100%"
          controls
          autoplay
        >
          <source id="video" :src="selectedResourceInfo.url" type="video/mp4">
        </video>
      </div>
    </el-dialog>  <!--视频预览-->
    <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="[selectedResourceInfo.url]" />
  </div>
</template>

<script>
import resourceThumbnail from '@/components/resourceThumbnail'

import {
  getImage,
  delImage,
  uploadImage,
  getVideo,
  delVideo,
  uploadVideo,
  delAudio} from '@/api/resource'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'

export default {
  name: 'Index',
  components: { ElImageViewer, resourceThumbnail },
  props: {
    templateType: {
      type: String,
      default: 'image'
    }
  },
  data() {
    return {
      resourceList: [],
      resourceTitle: '图片管理',
      groupTitle: '图片分组',
      selectedResource: [], // 被选中的资源
      selectedResourceInfo: {}, // 被选中资源的信息
      uploadTitle: '图片上传', // 弹窗标题
      uploadDialog: false,
      uploadTip: '', // 提示文字
      uploadUrl: '', // 请求地址
      acceptType: '', // 文件支持类型
      pageNo: 1,
      pageSize: 15,
      pageTotal: 0,
      searchContent: '',
      isSearch: false, // 是否搜索
      selected: '', // 单选
      previewDialog: false,
      showViewer: false
    }
  },
  computed: {
    uploadData() {
      return {
        treeId: this.treeId
      }
    }
  },
  watch: {},
  mounted() {
    this.checkType()
  },
  methods: {
    closeViewer() {
      this.showViewer = false
    },
    checkType() {
      switch (this.templateType) {
        case 'image':
          this.resourceTitle = '图片管理'
          this.groupTitle = '图片分组'
          this.uploadTitle = '图片上传'
          this.uploadUrl = uploadImage()
          this.uploadTip = '只允许上传图片文件'
          this.acceptType = 'image/*'
          break
        case 'video':
          this.resourceTitle = '视频管理'
          this.groupTitle = '视频分组'
          this.uploadTitle = '视频上传'
          this.uploadUrl = uploadVideo()
          this.uploadTip = '只允许上传视频文件'
          this.acceptType = 'video/*'
          break
        default :
          break
      }
      this.getResource()
      /* DOM加载完成后获取树数据*/
      /* this.$nextTick(function() {
        this.$refs.resourceTree.getTreeData(this.advSign)
      })*/
    },
    getResource() {
      const params = {
        pageSize: this.pageSize,
        pageNo: this.pageNo
      }
      if (this.isSearch) {
        params['name'] = this.searchContent
      }
      switch (this.templateType) {
        case 'image':
          getImage(params).then(res => {
            this.resourceList = res.cust.sources
            this.pageTotal = res.cust.pages.total
            this.isSearch = false
          })
          break
        case 'video':
          getVideo(params).then(res => {
            this.resourceList = res.cust.sources
            this.pageTotal = res.cust.pages.total
            this.isSearch = false
          })
          break
      }
    }, // 获取资源列表
    resourceSelect(data, id) {
      this.selected = id
      this.selectedResourceInfo = data
    }, // 选择资源
    delResource() {
      if (this.selectedResourceInfo.id === undefined) {
        this.$message({ type: 'warning', message: '未选择资源' })
        return false
      }
      this.$confirm('此操作将永久删除该项, 是否删除?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          id: this.selectedResourceInfo.id
        }
        switch (this.templateType) {
          case 'image':
            delImage(params).then(res => {
              this.$message({ type: 'success', message: res.info })
              this.getResource()
              this.selectedResourceInfo = {}
            })
            break
          case 'video':
            delVideo(params).then(res => {
              this.$message({ type: 'success', message: res.info })
              this.getResource()
              this.selectedResourceInfo = {}
            })
            break
          case 'audio':
            delAudio(params).then(res => {
              this.$message({ type: 'success', message: res.info })
              this.getResource()
              this.selectedResourceInfo = {}
            })
            break
        }
      })
    }, // 删除资源
    uploadChange() {
      this.uploadDialog = true
      if (this.$refs.uploadResource !== undefined) {
        this.$refs.uploadResource.clearFiles()
      }
    }, // 打开上传窗口
    confirmUpload() {
      this.$refs.uploadResource.submit()
    }, // 确认上传
    uploadBefore(file) {}, // 上传前
    uploadSuccess(response, file, fileList) {
      const type = response.code !== '0000' ? 'error' : 'success'
      this.$message({ type: type, message: response.info })
      const status = fileList.every(item => {
        return item.status === 'success'
      })
      if (status) {
        this.uploadDialog = false
        this.getResource()
      }
    }, // 上传成功
    uploadError(err, file, fileList) {
      setTimeout(() => {
        this.$message({ type: 'error', message: err.status })
        this.uploadDialog = false
      }, 1000)
    }, // 上传失败
    pageChange(val) {
      this.pageNo = val
      this.getResource()
    }, // 分页
    onPreview() {
      if (this.selectedResourceInfo.type === 'image') {
        this.showViewer = true
      } else {
        this.previewDialog = true
      }
    }
  }
}
</script>

<style scoped lang="scss">
  #resourceArea{
    min-height: 624px;

      .card-expand-details{
        margin-top: 10px;
        height: 100%;
    }

      .table-expand-details-operate{
        .el-form-item{
          .el-card__body{
            height: 600px
          }
        }
      }
  }
  .table-expand-details{
    font-size: 0;
    .el-form-item{
      margin-right: 0;
      margin-bottom: 0;
      width: 100%;
      /deep/ label{
        font-weight: bold;
        color: #99a9bf
      }
      p{
        min-width: 100px;
        overflow-wrap: break-word
      }

      // overflow: hidden
      // text-overflow: ellipsis
      // white-space: nowrap
      /deep/ .el-form-item__label{
        padding: 0
      }
    }
  }
  .view{
    position: relative;
    width: 760px;
  }

</style>
