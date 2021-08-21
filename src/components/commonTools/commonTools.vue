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
      happy
    </a-card>
  </div>
</template>

<script>
import {parseTime} from "../../../utils/time";
import {notification} from "ant-design-vue";
import vueScroll from 'vuescroll';

function copy(text) {
  const fakeElem = document.body.appendChild(
      document.createElement("textarea")
  );
  fakeElem.style.position = "absolute";
  fakeElem.style.left = "-9999px";
  fakeElem.setAttribute("readonly", "");
  fakeElem.value = text;
  fakeElem.select();
  try {
    return document.execCommand("copy");
  } catch (err) {
    return false;
  } finally {
    fakeElem.parentNode.removeChild(fakeElem);
  }
}

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
  methods: {
    zdQuery() {
      console.log(this.$data.zdInputMessage);
    },
    cfQuery() {
      this.$data.cfLoading = true;
      this.$data.cfQueryList = [];
      this.$request({
        url: `https://tools.asoulfan.com/api/cfj/?name=${this.$data.cfInputMessage}`,
        methods: "GET",
      })
          .then(this.cfSetSearchReady)
          .then(this.cfSetSearchResponse)
          .then(this.cfQueryCopyHandler)
          .catch(this.cfQueryError);
    },
    cfSetCopyText(item) {
      const {uname} = item;

      return uname;
    },
    cfSetSearchReady(success) {
      setTimeout(() => {
        this.$data.cfLoading = false;
      }, 1000);
      return success;
    },
    cfSetSearchResponse(response) {
      const {list} = response;
      this.$data.cfQueryMessageJSONObject = response;
      this.$data.cfQueryList = list || [];
    },
    cfQueryError(error) {
      console.log({message: error, type: "error"});
      notification.error({
        description: "请检查网络连接或稍作等待",
        message: "成分姬获取失败"
      });
      this.$data.cfLoading = false;
    },
    cfQueryCopyHandler() {
      const vupName = this.$data.cfQueryList.map(this.cfSetCopyText).join("、");
      const selectTime = parseTime(new Date(), "{y}-{m}-{d} {h}:{i}:{s}");
      const tmp = `@${this.cfInputMessage} 关注的VUP有：\r\n${vupName}\r\n查询时间：${selectTime}\r\n数据来源：@ProJectASF × https://b23.tv/cflHxi`;
      copy(tmp);
      console.log(this.$data.cfQueryList);
      notification.success({
        description: "成功",
        message: "已将精简版关注报告复制至剪贴板"
      });
      this.$data.cfLoading = false;
      this.$data.cfLoadedOnce = true;
      console.log(this.$data.cfQueryMessageJSONObject);
    }
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

          #cfQueryCellAvatar {

          }
        }
      }
    }
  }

}
</style>