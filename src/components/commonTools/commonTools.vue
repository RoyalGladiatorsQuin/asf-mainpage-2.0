<template>
  <div id="commonTools">
    <a-card id="zhiJiangDictionary" size="default" :head-style="{'text-align':'right'}">
      <div slot="title">
        <a-icon type="book"/>
        方言词典
      </div>
      <a-input @blur="zdQuery" v-model="zdInputMessage" placeholder="想到什么词就搜搜看"></a-input>
    </a-card>
    <a-card id="cfQuerier" size="small" :head-style="{'text-align':'right'}"
            :body-style="{'padding':'20px','padding-bottom':'0'}">
      <div slot="title">
        <a-icon type="book"/>
        成分姬
      </div>
      <a-input-search @search="cfQuery" :loading="cfLoading" v-model="cfInputMessage"
                      placeholder="想到什么词就搜搜看"></a-input-search>
      <a-card :bordered="false" id="cfInnerCard" size="small"
              :head-style="{'text-align':'left','border':'none','padding':'0'}" :body-style="{'padding-top':'0px'}">
        <div slot="title">
          <a-divider id="cfInnerCardHeaderDivider" type="vertical"></a-divider>
          关注VUP
        </div>
        <a-card :bordered="false" v-if="cfLoadedOnce" id="cfQueryCellsWrapper"
                :body-style="{'padding':'0'}">
          <!--          :body-style=" {
                  'padding':'0','overflow-x': 'hidden','overflow-y':'auto','max-height':'100px'}"-->
          <vue-scroll :ops="ops">
            <a-comment id="cfQueryCell" v-for="data in cfQueryMessageJSONObject.list" v-bind:key="data.uname" :author="data.uname">
              <a-avatar slot="avatar" id="cfQueryCellAvatar" :src="data.face"></a-avatar>
              <p slot="content" style="margin-bottom: 0; text-align: left;text-indent: 2em; font-size: 10px;">{{
                  data.sign
                }}</p>
            </a-comment>
          </vue-scroll>
        </a-card>
      </a-card>
    </a-card>
    <a-card id="cnki" size="small" :head-style="{'text-align':'right'}"
            :body-style="{'padding':'20px','padding-bottom':'0'}">
      <div slot="title"><a-icon type="book"/>枝网查重</div>
      <a-textarea v-model="cnkiSearch" style="resize:none; width:200px" placeholder="输入文章内容" :autoSize="{minRows:3, maxRows:6} "></a-textarea>
      <div style="display: flex;justify-content: space-between;margin: 10px 0 10px 0">
        <a-button  style="background-color: transparent;border: none;padding: 0 10px 0 10px; box-shadow: black 0 0 0 0 inset;">
          <a-icon type="link" />
          查看更多
        </a-button>
        <a-button @click="cnkiSubmit" style=" padding: 0 10px 0 10px;  border-radius: 1px; ">
          复制结果
        </a-button>
      </div>
      </a-card>

  </div>
</template>

<script>
import {parseTime} from "../../../utils/time";
import {notification} from "ant-design-vue";
import vueScroll from 'vuescroll';
import copy from "../../../utils/copy";
import axios from 'axios';
export default {
  name: "commonTools",
  components: {
    vueScroll,
  },
  data() {
    return {
      cfLoading: false,
      cfInputMessage: "",
      cfQueryList: [],
      cfQueryMessageJSONObject: {
        "code": 0,
        "message": 0,
        "ttl": 0,
        "data": {
          "list": [
            {
              "mid": 0,
              "attribute": 0,
              "mtime": 0,
              "tag": null,
              "special": 0,
              "contract_info": {
                "is_contractor": false,
                "ts": 0,
                "is_contract": false
              },
              "uname": "",
              "face": "",
              "sign": "",
              "official_verify": {
                "type": 0,
                "desc": ""
              },
              "vip": {
                "vipType": 0,
                "vipDueDate": 0,
                "dueRemark": "",
                "accessStatus": 0,
                "vipStatus": 1,
                "vipStatusWarn": "",
                "themeType": 0,
                "label": {
                  "path": "",
                  "text": "",
                  "label_theme": "annual_vip",
                  "text_color": "#FFFFFF",
                  "bg_style": 1,
                  "bg_color": "#FB7299",
                  "border_color": ""
                },
                "avatar_subscript": 1,
                "nickname_color": "#FB7299",
                "avatar_subscript_url": " "
              }
            }]
        }
      },
      cfLoadedOnce: false,
      zdLoading: false,
      zdInputMessage: "",
      cnkiLoading: false,
      cnkiSearch: '',
      cnkiResult:[],
      cnkiAlike:[],
      cnkiMaxSearchLength: 1000,
      ops: {
        vuescroll: {
          mode: 'native',
          sizeStrategy: 'percent',
          detectResize: true,
          locking: true,
        },
        scrollPanel: {
          scrollingX: false,
          scrollingY: true,
          speed: 100,
          easing: "easeInOutQuint",
          maxHeight: "200"
        },
        rail: {
          background: 'grey',
          opacity: 0.2,
          size: '6px',
          gutterOfEnds: "10px",
          gutterOfSide: '0px',
        },
        bar: {
          keepShow: false,
          background: 'black',
          minSize: 0,
          size: '6px',
        }
      }
    }
  },
  mounted(){
    this.$data.cnkiResult = {
      related: false,
      rate: 0
    }
    this.$data.alike = []
  },
  methods: {
    zdQuery() {
      console.log(this.$data.zdInputMessage);
    },
    cfQuery() {
      this.$data.cfLoading = true;
      this.$data.cfQueryList = [];
      axios.get('https://tools.asoulfan.com/api/cfj/', { params: { name: this.$data.cfInputMessage }})
          .then(res => {
            const {list} = res.data.data;
            this.$data.cfQueryMessageJSONObject = res.data.data;
            this.$data.cfQueryList = list || [];
          })
          .then(this.cfQueryCopyHandler)
          .catch(err => {
            notification.error({
              description: "请检查网络连接或稍作等待",
              message: "成分姬获取失败"
            });
            console.log(err);
          })
          .finally(() => {
            this.$data.cfLoading = false;
          })
    },

    cfQueryCopyHandler() {
      const vupName = this.$data.cfQueryList.map(
          function (item){
            const {uname} = item;
            return uname;
          })
          .join("、");
      const selectTime = parseTime(new Date(), "{y}-{m}-{d} {h}:{i}:{s}");
      const tmp = `@${this.cfInputMessage} 关注的VUP有：\r\n${vupName}\r\n查询时间：${selectTime}\r\n数据来源：@ProJectASF × https://b23.tv/cflHxi`;
      copy(tmp);
      notification.success({
        description: "成功",
        message: "已将精简版关注报告复制至剪贴板"
      });
      this.$data.cfLoading = false;
      this.$data.cfLoadedOnce = true;
    },
    cnkiHandleCopyText() {
      let tmp = '';   //复制文字
      let rate = this.toPercent(this.$data.cnkiResult.rate);  //总文字复制比
      let selectTime = parseTime(new Date(), "{y}-{m}-{d} {h}:{i}:{s}");   //查重时间
      //没有重复小作文
      if(this.$data.cnkiResult.related.length === 0) {
        tmp = `@ProJectASF × 枝网文本复制检测报告[简洁]\r\n查重时间：${selectTime}\r\n总文字复制比：${rate}\r\n\r\n查重结果仅作参考，请注意辨别是否为原创`
      }
      else {
        let createTime = parseTime(this.$data.cnkiResult.related[0].reply.ctime, "{y}-{m}-{d} {h}:{i}:{s}");  //发布时间
        tmp = `@ProJectASF × 枝网文本复制检测报告[简洁]\r\n查重时间：${selectTime}\r\n总文字复制比：${rate}\r\n相似小作文：${this.$data.cnkiResult.related[0].reply_url}\r\n作者：${this.$data.cnkiResult.related[0].reply.m_name}\r\n发表时间：${createTime}\r\n\r\n查重结果仅作参考，请注意辨别是否为原创`
      }
      const status = copy(tmp)
      if (status) {
        console.log({ message: "复制成功,适度玩梗捏", type: "success"});
        notification.success({
          description: "适度玩梗捏",
          message: "精简版关注报告复制成功"
        });
      } else {
        notification.error({
          description: "请检查网络或稍作等待",
          message: "复制失败"
        });
        console.log({ message: "复制失败", type: "error"});
      }
    },
    cnkiSubmit(){
      if(this.$data.cnkiSearch.length < 10) {
        notification.warn({description: '至少十个字捏', message: '输入内容过短'});
        return;
      }

      this.$data.cnkiLoading = true;
      axios.post('https://asoulcnki.asia/v1/api/check', {text: this.$data.cnkiSearch})
          .then(res => {
            const data = res.data.data
            if (res.data.code) {
              console.log({message: data.message, type: 'error'})
              return
            }
            if (data.related.length === 0) {
              console.log({message: '没有重复的小作文捏', type: 'success'});
              return
            }
            data.related.forEach(s => {
              s.reply.createTime = parseTime(s.reply.ctime, '{y}/{m}/{d} {h}:{i}')
            });
            this.$data.cnkiResult = data
            this.$data.cnkiAlike = data.related;
          })
          .then(this.cnkiHandleCopyText)
          .catch(err => {
            console.log({message: err, type: 'error'})
          })
          .finally(() => {
            this.$data.cnkiLoading = false;
          })
    },
    toPercent(){
      const point = this.$data.cnkiResult.rate
      return Number(point * 100).toFixed(2) + '%';
    },
  }
}
</script>

<style lang="less" scoped>
.ant-comment-inner {
  padding: 0 !important;
}

#commonTools {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100vw;
  height: 600px;
  background-color: grey;

  /deep/ .ant-comment-inner {
    padding-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
  }

  #zhiJiangDictionary {
    width: 300px;
    height: 300px;
  }

  #cfQuerier {
    width: 300px;

    #cfInnerCard {
      margin-top: 10px;

      #cfQueryCellsWrapper {

        #cfQueryCell {
          text-align: left;
        }
      }
    }
  }
  #cnki{

  }
}
</style>