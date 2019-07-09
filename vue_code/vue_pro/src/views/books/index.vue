<template>
	<div>
		<el-container>
			<el-menu
					default-active="2"
					class="self-side-menu"
					@open="handleMenuOpen"
					@select="handleMenuSelect"
					background-color="#545c64"
					text-color="#fff"
					active-text-color="#ffd04b">
				<el-submenu index="1">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>导航一</span>
					</template>
					<el-menu-item-group>
						<template slot="title">分组一</template>
						<el-menu-item index="1-1">选项1</el-menu-item>
						<el-menu-item index="1-2">选项2</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group title="分组2">
						<el-menu-item index="1-3">选项3</el-menu-item>
					</el-menu-item-group>
					<el-submenu index="1-4">
						<template slot="title">选项4</template>
						<el-menu-item index="1-4-1">选项1</el-menu-item>
					</el-submenu>
				</el-submenu>
				<el-menu-item index="2">
					<i class="el-icon-menu"></i>
					<span slot="title">导航二</span>
				</el-menu-item>
				<el-menu-item index="3" disabled>
					<i class="el-icon-document"></i>
					<span slot="title">导航三</span>
				</el-menu-item>
				<el-menu-item index="4">
					<i class="el-icon-setting"></i>
					<span slot="title">导航四</span>
				</el-menu-item>
			</el-menu>
			<el-container :class="setContainerH()">
				<el-header>
					<div class="self-title-text">书籍列表</div>
					<div class="self-button-top">
						<el-button type="success" size="small" style="width: 100px;" icon="el-icon-plus"
								   @click="showAddView">新增
						</el-button>
						<el-button type="info" size="small" style="width: 100px" icon="el-icon-refresh"
								   @click="refresh">
							刷新
						</el-button>
					</div>
				</el-header>
				<el-main>
					<el-table ref="multipleSelect" :data="books" tooltip-effect="dark" border stripe
							  v-loading="tableLoading"
							  :height="setTableH()">
						<el-table-column type="selection" width="36px" align="center"></el-table-column>
						<el-table-column prop="id" label="书籍ID" align="center" width=""></el-table-column>
						<el-table-column prop="title" label="书籍名称" align="center" width=""></el-table-column>
						<el-table-column prop="author" label="作者名" align="center" width=""></el-table-column>
						<el-table-column prop="press" label="出版社" align="center" width=""></el-table-column>
						<el-table-column prop="price" label="书本单价" align="center" width=""></el-table-column>
						<el-table-column prop="inventory" label="库存量" align="center" width=""></el-table-column>
						<el-table-column label="操作" align="center">
							<template #default="scope">
								<el-button type="text" @click="editBook(scope.row)">编辑</el-button>
								<el-button type="text" @click="delBook(scope.row)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="self-button-bottom">
						<el-pagination :current-page="currentPage" :page-sizes="[10,20,50,100]" :page-size="pageSize"
									   layout="total,sizes,prev,pager,next,jumper" :total="total"
									   @size-change="handleSizeChange"
									   @current-change="handleCurrentChange"></el-pagination>
					</div>
				</el-main>
			</el-container>
		</el-container>
		<el-form :model="book" ref="book" :rules="rules">
			<div style="text-align: left">
				<el-dialog width="70%" :title="dialogTitle" :visible.sync="dialogVisible">
					<el-row style="padding-left: 40px">
						<el-col :span="6">
							<el-form-item prop="id" label="书籍ID：">
								<el-input v-model="book.id" size="small" style="width: 150px"
										  prefix-icon="el-icon-edit"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item prop="title" label="书籍名称：">
								<el-input v-model="book.title" size="small" style="width: 150px"
										  prefix-icon="el-icon-edit"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item prop="author" label="作者名：">
								<el-input v-model="book.author" size="small" style="width: 150px"
										  prefix-icon="el-icon-edit"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item prop="press" label="出版社：">
								<el-input v-model="book.press" size="small" style="width: 150px"
										  prefix-icon="el-icon-edit"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row style="padding-left: 40px">
						<el-col :span="6">
							<el-form-item prop="price" label="书本单价：">
								<el-input v-model="book.price" size="small" style="width: 150px"
										  prefix-icon="el-icon-edit"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item prop="inventory" label="库存量：">
								<el-input v-model="book.inventory" size="small" style="width: 150px"
										  prefix-icon="el-icon-edit"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<template v-slot:footer>
						<el-button size="large" @click="emptyParam">取消</el-button>
						<el-button type="primary" @click="addABook('book')">确定</el-button>
					</template>
				</el-dialog>
			</div>
		</el-form>
	</div>
</template>

<script>
    export default {
        name: "Books",
        components: {},
        data() {
            return {
                books: [],
                book: {
                    _id: null,
                    id: null,
                    title: null,
                    author: null,
                    press: null,
                    price: null,
                    inventory: null,
                },
                dialogTitle: null,
                dialogVisible: false,
                tableLoading: false,
                currentPage: 1,
                pageSize: 20,
                total: 0,
                rules: {
                    id: [{required: true, message: '必填，不可为空', trigger: 'change'}],
                    title: [{required: true, message: '必填，不可为空', trigger: 'change'}],
                    author: [{required: true, message: '必填，不可为空', trigger: 'change'}],
                    press: [{required: true, message: '必填，不可为空', trigger: 'change'}],
                    price: [{required: true, message: '必填，不可为空', trigger: 'change'}],
                    inventory: [{required: true, message: '必填，不可为空', trigger: 'change'}]
                },
            }
        },
        methods: {
            refresh() {
                this.emptyParam()
                this.loadBooks()
            },
            emptyParam() {
                this.tableLoading = false
                this.dialogVisible = false
                Object.keys(this.book).forEach(key => this.book[key] = null)
                this.$refs.multipleSelect.clearSelection()
                this.$refs.book.resetFields()
            },
            addABook(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.tableLoading = true
                        console.log(this.book.id)
                        if (this.book._id) {
                            this.putRequest('/books', this.book).then(res => {
                                this.tableLoading = false
                                if (res.data.code === 3) {
                                    this.emptyParam()
                                    this.loadBooks()
                                }
                            })
                        } else {
                            this.postRequest('/books', this.book).then(res => {
                                this.tableLoading = false
                                if (res.data.code === 1) {
                                    this.emptyParam()
                                    this.loadBooks()
                                }
                            })
                        }
                    } else {
                        return false
                    }
                })
            },
            showAddView() {
                this.dialogTitle = '新增书籍'
                this.dialogVisible = true
            },
            loadBooks() {
                this.tableLoading = true
                Object.keys(this.book).forEach(key => {
                    if (this.book[key] == '') {
                        this.book[key] = null
                    }
                })
                let param = this.book
                param.page = this.currentPage
                param.size = this.pageSize
                this.getRequest('/books', param).then(res => {
                    this.tableLoading = false
                    if (res.data.code === 0) {
                        this.books = res.data.list
                        this.total = res.data.total
                    }
                })
            },
            handleSizeChange(val) {
                this.pageSize = val
                this.loadBooks()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.loadBooks()
            },
            editBook(row) {
                this.dialogTitle = '编辑书籍信息'
                this.dialogVisible = true
                this.book._id = row._id
                this.book.id = row.id
                this.book.title = row.title
                this.book.author = row.author
                this.book.press = row.press
                this.book.price = row.price
                this.book.inventory = row.inventory
            },
            delBook(row) {
                this.$confirm('确定删除' + row.title + '的信息么？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.tableLoading = true
                    this.deleteRequest('/books', row).then(res => {
                        this.tableLoading = false
                        if (res.data.code === 2) {
                            this.emptyParam()
                            this.loadBooks()
                        }
                    })
                }).catch(() => {
                })
            },
            handleMenuOpen(index, indexPath) {
                console.log(index, indexPath)
            },
            handleMenuSelect(index, indexPath) {
                console.log(index, indexPath)
            },
        },
        mounted() {
            this.loadBooks()
        }
    }
</script>

<style scoped>

</style>
