<template>
    <div>
        <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 20px;">
            <el-input v-model="input" placeholder="请输入内容" style="width: 500px; margin-right: 10px;"></el-input>
            <el-button @click="query" type="primary">查询</el-button>
            <el-button @click="add" type="black">添加</el-button>
        </div>
        <el-table :data="paginatedData" height="calc(100vh - 200px)" style="width: 100%">
            <el-table-column prop="username" label="用户名" width="180"></el-table-column>
            <el-table-column prop="password" label="密码" width="180"></el-table-column>
            <el-table-column prop="role" label="角色"></el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="primary" size="mini">修改</el-button>
                    <el-button @click="remove(scope.row)" type="danger" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div style="margin-top: 20px; text-align: center;">
            <el-button @click="prevPage" :disabled="currentPage === 1">上一页</el-button>
            <span>第 {{ currentPage }} 页 / 共 {{ totalPages }} 页</span>
            <el-button @click="nextPage" :disabled="currentPage === totalPages">下一页</el-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'UserInfo',
    data() {
        return {
            input: '',
            userData: [],
            currentPage: 1,
            pageSize: 12
        };
    },
    mounted() {
        axios.get('http://localhost:9999/users/list').then(res => {
            this.userData = res.data;
        });
    },
    computed: {
        paginatedData() {
            const start = (this.currentPage - 1) * this.pageSize;
            return this.userData.slice(start, start + this.pageSize);
        },
        totalPages() {
            return Math.ceil(this.userData.length / this.pageSize);
        }
    },
    methods: {
        query() {
            console.log('查询内容:', this.input);
            // 添加查询逻辑
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        edit(row) {
            console.log('修改行:', row);
        },
        remove(row) {
            console.log('删除行:', row);
        },
        add() {
            console.log('添加用户');
        }
    }
}
</script>

<style>
.el-main {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    padding: 20px;
    overflow: auto; /* 确保内容可以滚动 */
}
</style>
