<template>
  <div class="calendar1">
    <Calendar
      ref="Calendar"
      v-on:choseDay="clickDay"
      v-on:changeMonth="changeDate"
      v-on:isToday="clickToday"
      :markDateMore="arrMore"
      :sundayStart="true"
    ></Calendar>
    <button @click="preMonth">上个月</button>
    <button @click="nextMonth">下个月</button>
    <br />
    <input type="text" placeholder="eg:2018-12-12" v-model="toDate" />
    <button @click="toTheMonth(true)">跳转到这个月</button>
    <button @click="toTheMonth(false)">跳转到这个月(不选中日期）</button>
  </div>
</template>

<script>
//vue文件中引入
import Calendar from "vue-calendar-component";
//v-on:choseDay="clickDay"
//v-on:changeMonth="changeDate"
// v-on:isToday="clickToday"
// :markDate=arr // arr=['2018/4/1','2018/4/3'] 标记4月1日和4月3日 简单标记
//:markDateMore=arr // 多种不同的标记
// 第一个标记和第二个标记不能同时使用
// :agoDayHide='1514937600' //某个日期以前的不允许点击  时间戳10位
// :futureDayHide='1525104000' //某个日期以后的不允许点击  时间戳10位
// :sundayStart="true" //默认是周一开始 当是true的时候 是周日开始

export default {
  data() {
    return {
      // 简单标记
      arr: ["2020/8/1", "2080/8/3"],
      // 多个标记示例
      arrMore: [
        { date: "2020/8/1", className: "mark1" },
        { date: "2020/8/13", className: "mark2" },
      ],
      toDate: "",
    };
  },
  components: {
    Calendar,
  },
  methods: {
    clickDay(data) {
      console.log(data); //选中某天
    },
    changeDate(data) {
      console.log(data); //左右点击切换月份
    },
    clickToday(data) {
      console.log(data); // 跳到了本月
    },
    preMonth() {
      this.$refs.Calendar.PreMonth(new Date());
    },
    nextMonth() {
      this.$refs.Calendar.NextMonth(new Date());
    },
    toTheMonth(isSelect) {
      this.$refs.Calendar.ChoseMonth(this.toDate, isSelect);
    },
  },
};
</script>

<style lang="scss">
.calendar1 {
  .mark1 {
    background-color: red;
  }
  .mark2 {
    background-color: rgb(68, 0, 255);
  }
}
</style>