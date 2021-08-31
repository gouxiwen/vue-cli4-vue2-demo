<template>
  <div class="upload">
    <h1>七牛上传H5页面</h1>
    <div class="fl">
      <el-upload
        ref="upload"
        action="https://upload-z2.qiniup.com/"
        :multiple="false"
        :show-file-list="false"
        :before-upload="beforeUploadTest"
        :http-request="uploadRequest"
      >
        <el-button class="text">上传到测试环境</el-button> </el-upload
      >测试访问地址:
      <a class="a" :href="uploadFileObj.imageUrl" target="_blank">{{
        uploadFileObj.imageUrl
      }}</a>
    </div>
    <div class="fl">
      <el-upload
        ref="upload"
        action="https://upload-z2.qiniup.com/"
        :multiple="false"
        :show-file-list="false"
        :before-upload="beforeUploadPrd"
        :http-request="uploadRequest"
      >
        <el-button class="text">上传到生产环境</el-button> </el-upload
      >生产访问地址:
      <a class="a" :href="uploadFileObj.imageUrlPrd" target="_blank">{{
        uploadFileObj.imageUrlPrd
      }}</a>
    </div>
    <div @click="send">发消息</div>
    <div @click="send2">发消息2</div>
    <div @click="$router.push('/test1')">去test1</div>
    <a
      href="http://m.news.cctv.com/2020/04/19/ARTIsmqnDDKud0Ae7Db7ersm200419.shtml"
      target="_blank"
      class="a3"
      mon="ct=1&amp;a=1&amp;c=top&amp;pn=0"
      >重温习近平"4·19"重要讲话 打好互联网战"疫"</a
    >
  </div>
</template>

<script>
let qiniu = require("qiniu-js");
import http from "../config/http";
// import axios from 'axios'
const testQiniuUrl = ""; // 测试环境访问地址
const prodQiniuUrl = ""; // 正式环境访问地址
const testDemon = ""; // 测试环境
// const testDemon = ""; // 测试环境访问地址 代理不成功
// const prodDemon = ''; // 生产环境 直接访问不成功
const prodDemon = ""; //  代理成功
// let path = require('path'); // 启用node环境下可用
// import callPc from "../../packages/CallTlinkpc.min.js";
// import callPc from '../config/CallTlinkpc.js'
// let callPc = window.callPc
export default {
  name: "upload",
  props: {},
  data() {
    return {
      uploadFileObj: {
        file: null,
        imageUrl: "",
        imageUrlPrd: "",
        type: "",
        percent: 0,
      },
      appDemon: "",
      message: "",
      selectMembersUsers: [],
    };
  },
  mounted() {
    console.log('data', this.$data)
    // let _self = this
    // window.addEventListener("message", (event) => {
    //   console.log(event)
    //   if (event.origin.includes('chrome-extension://') || event.origin.includes('http://localhost:')) {
    //     if (event.data.type === 'callback') {
    //       _self[`${event.data.fun}`](event.data.data)
    //     } else if (event.data.type === 'push') {
    //       // 根据推送类型进行处理
    //     }
    //   }
    // }, false );
    // this.callTlinkpc('getUserInfo_cb')
    // let multiple = [
    //   {
    //     fun: "getUserInfo_cb",
    //   },
    //   {
    //     fun: "getUserInfo_cb",
    //   },
    //   // {
    //   //   fun: 'openContactDialog_cb',
    //   //   data: {
    //   //     selectMemberType: 'cc',
    //   //     selectMembersUsers: this.selectMembersUsers
    //   //   }
    //   // }
    // ];
    // // 只能调用立即返回的方法，不然会阻塞后面方法的执行
    // callPc.callTlinkpc2("initMultiple", multiple).then((res) => {
    //   console.log(res);
    // });
    // callPc.on("taskNotify", () => {
    //   console.log("taskNotify");
    // });
    // // 关闭窗口事件监听
    // callPc.on("windowClose_cb", async () => {
    //   try {
    //     let res = await this.$confirm("是否离开", "提示", {
    //       confirmButtonText: "确认",
    //       cancelButtonText: "取消",
    //       type: "warning",
    //       center: true,
    //     });
    //     if (res) callPc.cbToTlink("windowClose_cb", true);
    //   } catch (error) {
    //     console.log(error);
    //     callPc.cbToTlink("windowClose_cb", false);
    //   }
    // });
  },
  methods: {
    // send() {
    //   let data = {
    //     selectMemberType: "cc",
    //     selectMembersUsers: this.selectMembersUsers,
    //   };
    //   callPc.callTlinkpc("openContactDialog_cb", data).then((res) => {
    //     console.log(res);
    //     this.selectMembersUsers = res;
    //   });
    // },
    // send2() {
    //   let data = {
    //     selectMemberType: "cc",
    //     selectMembersUsers: this.selectMembersUsers,
    //   };
    //   callPc.callTlinkpc2("openContactDialog_cb", data).then((res) => {
    //     console.log("res2", res);
    //     this.selectMembersUsers = res;
    //   });
    // },
    async beforeUploadTest(file) {
      this.uploadFileObj.file = file;
      let type = file.name.substr(
        file.name.lastIndexOf("."),
        file.name.length - 1
      );
      this.uploadFileObj.type = type;
      this.appDemon = testDemon;
    },
    async beforeUploadPrd(file) {
      this.uploadFileObj.file = file;
      let type = file.name.substr(
        file.name.lastIndexOf("."),
        file.name.length - 1
      );
      this.uploadFileObj.type = type;
      this.appDemon = prodDemon;
    },
    uploadRequest() {
      this.upload(
        this.uploadFileObj.file,
        "",
        (next) => {
          this.uploadFileObj.percent = Math.ceil(next.total.percent * 0.99);
        },
        (error) => {
          this.$message({
            customClass: "alert",
            message: "上传失败",
          });
          console.log(error);
        },
        (complete) => {
          this.$message({
            customClass: "alert",
            message: "上传成功",
          });
          this.uploadFileObj.percent = 100;
          if (this.appDemon === prodDemon) {
            let url = prodQiniuUrl + complete.key;
            this.uploadFileObj.imageUrlPrd = url;
          } else {
            let url = testQiniuUrl + complete.key;
            this.uploadFileObj.imageUrl = url;
          }
        }
      );
    },
    async upload(file, uuid, next, error, complete) {
      try {
        let { data } = await this.getToken(file); // 获取token
        console.log("upload token", data);
        let fileName = file.name; // 文件资源名
        let putExtra = {
          fname: fileName, //文件原文件名
          params: {}, //用来放置自定义变量
          mimeType: null, //用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
        };
        let config = {
          useCdnDomain: true, //表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
          region: null, // 根据具体提示修改上传地区,当为 null 或 undefined 时，自动分析上传域名区域
          retryCount: 10,
          checkByMD5: true, // 分片上传用
        };
        var observable = qiniu.upload(file, fileName, data, putExtra, config);
        let sub = observable.subscribe(next, error, complete);
        if (uuid) this.subscriptions[uuid] = sub;
        return sub;
      } catch (error) {
        console.log("upload error", error);
      }
    },
    async getToken(file) {
      let fileName = file.name;
      /* 七牛文件上传 */
      let getUploadToken = this.appDemon + "gaea/qiniu/get.do"; // 获取token
      try {
        let res = await this.get(getUploadToken, { fileName });
        // let res = await axios.get(getUploadToken+ '?fileName='+ fileName)
        console.log(res);
        return { data: res.data };
      } catch (error) {
        console.log("getToken: ", error);
      }
    },
    post(url, body) {
      return http.post(url, body);
    },
    get(url, body) {
      return http.get(url, body);
    },
  },
  async beforeRouteLeave(to, from, next) {
    console.log("beforeleave");
    try {
      let res = await this.$confirm("是否离开", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      });
      if (res) next(true);
    } catch (error) {
      console.log(error);
      next(false);
    }
  },
  destroyed() {
    callPc.off("taskNotify");
    callPc.off("windowClose_cb");
    callPc.removeEventListener();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.upload {
  .fl {
    width: 50%;
    float: left;
    text-align: left;
  }
  .a {
    width: 100%;
    height: 50px;
  }
}
</style>
