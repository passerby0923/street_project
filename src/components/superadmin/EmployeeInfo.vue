<template>
    <div>
        <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 20px;">
            <el-input v-model="input" placeholder="请输入内容" style="width: 500px; margin-right: 10px;"></el-input>
            <el-button @click="query" type="primary">查询</el-button>
            <el-button @click="add" type="black">添加</el-button>
        </div>
        <el-table :data="paginatedData" height="calc(100vh - 200px)" style="width: 100%; border-spacing: 0;">
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="age" label="年龄"></el-table-column>
            <el-table-column prop="gender" label="性别 ('M' 男, 'F' 女)"></el-table-column>
            <el-table-column prop="department" label="部门"></el-table-column>
            <el-table-column prop="position" label="职位"></el-table-column>
            <el-table-column prop="hireDate" label="入职日期"></el-table-column>
            <el-table-column prop="salary" label="工资"></el-table-column>
            <el-table-column prop="phone" label="联系电话"></el-table-column>
            <el-table-column prop="email" label="电子邮件"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <div style="display: flex; justify-content: center; gap: 10px;">
                        <el-button @click="edit(scope.row)" type="primary" size="mini">修改</el-button>
                        <el-button @click="remove(scope.row)" type="danger" size="mini">删除</el-button>
                    </div>
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
    name: 'EmployeeInfo',
    data() {
        return {
            input: '',
            employeeData: [],
            currentPage: 1,
            pageSize: 12
        };
    },
    mounted() {
        this.fetchEmployees();
    },
    computed: {
        paginatedData() {
            const start = (this.currentPage - 1) * this.pageSize;
            return this.employeeData.slice(start, start + this.pageSize);
        },
        totalPages() {
            return Math.ceil(this.employeeData.length / this.pageSize);
        }
    },
    methods: {
        fetchEmployees() {
            axios.get('http://localhost:9999/employees/list').then(res => {
                this.employeeData = res.data;
            });
        },
        query() {
            console.log('查询内容:', this.input);
            // 根据输入内容进行过滤
            axios.get(`http://localhost:9999/employees/search?input=${this.input}`).then(res => {
                this.employeeData = res.data; // 更新为查询结果
                this.currentPage = 1; // 重置当前页
            });
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
         }
        ,
        edit(row) {
            console.log('修改行:', row);
            // 实现编辑功能
        },
        remove(row) {
            console.log('删除行:', row);
            // 实现删除功能
        },
        add() {
            console.log('添加用户');
            // 实现添加功能
        }
    }
}
</script>

<style>
/* 这里可以添加样式 */
</style>
