<template>
  <div id="commonTools">
    <a-card id="zhiJiangDictionary" size="default" :head-style="{'text-align':'right'}">
      <div slot="title">
        <a-icon type="book"/>
        方言词典
      </div>
      <a-input @blur="zdQuery" v-model="zdInputMessage" placeholder="想到什么词就搜搜看"></a-input>
    </a-card>
    <a-card id="cfQuerier" size="default" :head-style="{'text-align':'right'}">
      <div slot="title">
        <a-icon type="book"/>
        成分姬
      </div>
      <a-input-search @search="cfQuery" :loading="cfLoading" v-model="cfInputMessage"
                      placeholder="想到什么词就搜搜看"></a-input-search>
      <a-card :bordered="false" id="cfInnerCard" size="small"
              :head-style="{'text-align':'left','border':'none','padding':'0'}">
        <div slot="title">
          <a-divider id="cfInnerCardHeaderDivider" type="vertical"></a-divider>
          关注VUP
        </div>
        happy
        <a-card id="cfQueryCellsWrapper" :bordered="false">
          <!--          <a-card v-for="" :bordered="false"></a-card>-->
          <a-card :bordered="false">
            <a-avatar v-if="cfLoadedOnce" referrerPolicy="no-referrer" :src="this.$data.cfQueryList[0].face"></a-avatar>
          </a-card>
        </a-card>
      </a-card>
    </a-card>
  </div>
</template>

<script>
import {parseTime} from "../../../utils/time";
import {notification} from "ant-design-vue";

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
  data() {
    return {
      cfLoading: false,
      cfInputMessage: "",
      cfQueryList: [],
      cfLoadedOnce:false,
      zdLoading: false,
      zdInputMessage: "",
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
    }
  }
}
</script>

<style lang="less" scoped>
#commonTools {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100vw;
  height: 600px;
  background-color: grey;

  #zhiJiangDictionary {
    width: 300px;
    height: 300px;
  }

  #cfQuerier {
    width: 300px;

    #cfInnerCard {
      margin-top: 10px;

      #cfInnerCardHeaderDivider {
        margin-left: 0;
      }
    }
  }

}
</style>