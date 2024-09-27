<template>
    <div id="app" class="login-container" style="position: relative; top: -63px;">
      <el-card class="login-card">
        <h2 class="login-title">用户注册</h2>
        <el-form :model="form" :rules="rules" ref="form" class="login-form">
          <!-- 用户名输入框 -->
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
  
          <!-- 密码输入框 -->
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
  
          <!-- 重复密码输入框 -->
          <el-form-item label="重复密码" prop="repassword">
            <el-input
              v-model="form.repassword"
              type="password"
              placeholder="请再次输入密码"
            ></el-input>
          </el-form-item>
  
          <!-- 按钮组 -->
          <el-form-item>
            <div class="button-group">
              <el-button type="default" @click="cancel" class="cancel-button">取消</el-button>
              <el-button type="primary" @click="regist" class="register-button">注册</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-card>
  
      <!-- 弹窗用于显示注册结果 -->
      <el-dialog :title="zhuce.title" :visible.sync="dialogVisible">
        <span>{{ zhuce.result }}</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">确定</el-button>
          <el-button v-if="registrationSuccess" type="primary" @click="goToLogin">立即登录</el-button>
        </span>
      </el-dialog>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // 表单数据
        form: {
          username: '',
          password: '',
          repassword: '',
        },
        // 表单验证规则
        rules: {
          username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
          repassword: [
            { required: true, message: '请重复输入密码', trigger: 'blur' },
            { validator: this.validatePassword, trigger: 'blur' }
          ],
        },
        // 弹窗内容
        zhuce: {
          title: '温馨提示',
          result: ''
        },
        // 弹窗显示状态
        dialogVisible: false,
        // 注册成功状态
        registrationSuccess: false
      };
    },
    methods: {
      // 取消按钮的点击事件，跳转到登录页面
      cancel() {
        this.$router.push('/login'); // 跳转到登录页面
      },
      // 注册按钮的点击事件
      regist() {
        // 验证表单数据的有效性
        this.$refs.form.validate((valid) => {
            if (valid) {
            this.dialogVisible = true; // 显示弹窗，表示正在提交
            // 发送注册请求
            this.request({
                url: 'http://localhost:9999/user/register',
                method: 'POST',
                body: {
                username: this.form.username,
                password: this.form.password,
                role: 'resident' // 设置默认角色为 'resident'
                }
            }).then(response => {
                // 处理服务器返回的结果
                if (response.status === 'success') {
                this.registrationSuccess = true;
                this.zhuce.result = response.message; // 使用服务器返回的消息
                } else {
                this.zhuce.result = response.message || '注册失败，请重试。';
                }
                
                // 自动关闭弹窗
                setTimeout(() => {
                this.dialogVisible = false; // 隐藏弹窗
                }, 50000); // 3秒后关闭
            }).catch(err => {
                this.zhuce.result = '请求失败，请重试。';
                this.dialogVisible = true; // 显示错误信息
            });
            }
        });
        },
      // 密码验证
      validatePassword(rule, value, callback) {
        if (value !== this.form.password) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      },
      // 注册成功后跳转到登录页面
      goToLogin() {
        this.$router.push('/'); // 跳转到登录页面
      },
      // 发送请求的方法
      request({ url, method = 'POST', body }) {
        return fetch(url, {
          method,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams(body).toString()
        })
        .then(response => response.json());
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f7fa;
  }
  .login-card {
    width: 400px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  .login-title {
    text-align: center;
    margin-bottom: 20px;
  }
  .login-form {
    padding: 0 20px;
  }
  .button-group {
    display: flex;
    justify-content: space-between;
  }
  .cancel-button {
    width: 48%;
  }
  .register-button {
    width: 48%;
  }
  </style>
  