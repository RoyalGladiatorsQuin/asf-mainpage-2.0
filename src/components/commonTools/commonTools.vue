<template>
  <div id="commonTools">
    <a-card id="zhiJiangDictionary" size="small">
      <a-icon type="book"/>
      方言词典
      <a-input @blur="zdQuery" v-model="zdInputMessage" placeholder="想到什么词就搜搜看"></a-input>
    </a-card>
    <a-card id="cfQuerier" size="small" extra="happy">
      <a-icon type="book"/>
      成分姬
      <a-input v-model="cfInputMessage" placeholder="想到什么词就搜搜看"></a-input>
      <a-button @click="cfQuery"></a-button>
    </a-card>
  </div>
</template>

<script>
import {parseTime} from "../../../utils/time";

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
      zdLoading: false,
      zdInputMessage: "",
    }
  },
  methods: {
    zdQuery() {
      console.log(this.$data.zdInputMessage);
    },
    cfQuery() {
      this.$data.zdLoading = true;
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
      console.log("query success");
      return success;
    },
    cfSetSearchResponse(response) {
      const {list} = response;

      this.$data.cfQueryList = list || [];
      console.log("response set");
    },
    cfQueryError(error) {
      console.log({message: error, type: "error"});
      this.$data.cfLoading = false;
    },
    cfQueryCopyHandler() {
      console.log(this.$data.cfQueryList)
      const vupName = this.$data.cfQueryList.map(this.cfSetCopyText).join("、");
      const selectTime = parseTime(new Date(), "{y}-{m}-{d} {h}:{i}:{s}");
      const tmp = `@${this.cfInputMessage} 关注的VUP有：\r\n${vupName}\r\n查询时间：${selectTime}\r\n数据来源：@ProJectASF × http://b23.tv/cflHxi`;
      console.log(tmp);
      copy(tmp);
      console.log("copied");
      this.$data.cfLoading = false;
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
  height: 500px;
  background-color: grey;

  #zhiJiangDictionary {
    width: 300px;
    height: 300px;
  }

  #cfQuerier {
    width: 300px;
    height: 300px;
  }

}
</style>