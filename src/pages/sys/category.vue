<template>
  <div class="category">
    <h2>栏目管理</h2>
    <!-- 按钮 -->
    <div>
      <el-button size="small" type="primary" @click="toAddHandler">添加</el-button>
      <el-button size="small" type="danger" @click="batchDeleteHandler">批量删除</el-button>
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="categories" size="mini" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="编号" />
        <el-table-column prop="name" label="栏目名称" />
        <el-table-column prop="num" label="序号" />
        <el-table-column label="图标">
            <template #default="record">
                <img :src="record.row.icon" alt="">
            </template>
        </el-table-column>
        <el-table-column prop="parentId" label="父栏目" />
        <el-table-column label="操作" width="60" align="center">
          <template #default="record">
            <i class="el-icon-delete" href="" @click.prevent="deleteHandler(record.row.id)" /> &nbsp;
            <i class="el-icon-edit-outline" href="" @click.prevent="editHandler(record.row)" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 模态框 -->
    <el-dialog :title="title" :visible.sync="visible" @close="dialogCloseHandler">
      <el-form ref="categoryForm" :model="category" :rules="rules">
        <el-form-item label="栏目名称" label-width="100px" prop="name">
          <el-input v-model="category.name" auto-complete="off" />
        </el-form-item>
        <el-form-item label="序号" label-width="100px" prop="num">
          <el-input v-model="category.num" auto-complete="off" />
        </el-form-item>
         <el-form-item label="所属栏目" label-width="100px" prop="categoryId">
          <el-select v-model="category.parentId">
            <el-option v-for="c in categories" :key="c.id" :label="c.name" :value="c.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="图标" label-width="100px">
             <!-- 上传插件 -->
            <el-upload
                class="upload-demo"
                action="http://134.175.154.93:6677/file/upload"
                :file-list="fileList"
                :on-success="uploadSuccessHandler"
                :limit="1"
                list-type="picture"
            >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <!-- /上传插件 -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeModal">取 消</el-button>
        <el-button size="small" type="primary" @click="submitHandler">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /模态框 -->
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      fileList:[],
      category: {},
      ids: [],
      rules: {
        name: [
          { required: true, message: '请输入栏目名称', trigger: 'blur' }
        ],
        num: [
          { required: true, message: '请输入序号', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState('category', ['categories', 'visible', 'title']),
    ...mapGetters('category', ['orderCategory', 'categorySize'])
  },
  created() {
    this.findAllCategories()
  },
  methods: {
    ...mapMutations('category', ['showModal', 'closeModal', 'setTitle']),
    ...mapActions('category', ['findAllCategories', 'saveOrUpdateCategory', 'deleteCategoryById', 'batchDeleteCategory']),
    // 普通方法
    handleSelectionChange(val) {
      this.ids = val.map(item => item.id)
    },
    toAddHandler() {
      // 1. 重置表单
      this.category = {}
      this.fileList=[]
      this.setTitle('添加栏目信息')
      // 2. 显示模态框
      this.showModal()
    },
    submitHandler() {
      // 校验
      this.$refs.categoryForm.validate((valid) => {
        // 如果校验通过
        if (valid) {
          const promise = this.saveOrUpdateCategory(this.category)
          promise.then((response) => {
            // promise为action函数的返回值，异步函数的返回值就是promise的then回调函数的参数
            this.$message({ type: 'success', message: response.statusText })
          })
        } else {
          return false
        }
      })
    },
    dialogCloseHandler() {
      this.$refs.categoryForm.resetFields()
      this.closeModal()
      this.fileList=[]
    },
    editHandler(row) {
      this.category = row
      this.fileList = []
      this.fileList.push({
          nam:'原图',
          url:row.photo
      })
      this.setTitle('修改栏目信息')
      this.showModal()
    },
    deleteHandler(id) {
      this.deleteCategoryById(id)
        .then((response) => {
          this.$message({ type: 'success', message: response.statusText })
        })
    },
    batchDeleteHandler() {
      this.batchDeleteCategory(this.ids)
        .then((response) => {
          this.$message({ type: 'success', message: response.statusText })
        })
    },
    uploadSuccessHandler(response){
        if(response.status === 200){
            const id = response.data.id
            const groupname = response.data.groupname
            const icon = 'http://134.175.154.93:8888/' + groupname + '/' + id
            this.category.icon = icon
            this.category = Object.assign({},this.category)
        }else {
        this.$message.error('上传接口异常')
      }
    }
    


  }

}
</script>
<style scoped>

</style>
