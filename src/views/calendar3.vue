<template>
  <div class="calendar-wrapper">
    <div class="calendar-toolbar">
      <div class="prev" @click="prevMonth">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="current">{{ currentDateStr }}</div>
      <div class="next" @click="nextMonth">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <div class="calendar-week">
      <div class="week-item" v-for="item of weekList" :key="item">{{ item }}</div>
    </div>
    <div class="calendar-inner">
      <div
        class="calendar-item"
        v-for="(item, index) of calendarList"
        :key="index"
        :class="[item.disable ? 'disabled' : '', item.hasschedule ? 'hasschedule': '', item.checked ? 'checked' : '']"
        @click="handleCheck(item)"
      >{{ item.date }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: {}, // 当前时间
      weekList: ["日", "一", "二", "三", "四", "五", "六"],
      calendarList: [], // 用于遍历显示
      shareDate: new Date(), // 享元模式，用来做优化的
      checkedValue: "",
    };
  },
  computed: {
    // 显示当前时间
    currentDateStr() {
      let { year, month } = this.current;
      return `${year}年${this.pad(month + 1)}月`;
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.checkedValue = this.stringify(
        this.shareDate.getFullYear(),
        this.shareDate.getMonth(),
        this.shareDate.getDate()
      );
      // 初始化当前时间
      this.setCurrent();
      this.calendarCreator();
    },
    handleCheck(item) {
      console.log(item);
      if (item.disable) return;
      this.checkedValue = item.value;
      this.calendarList.forEach((i) => {
        if (i.value === item.value) {
          i.checked = true;
        } else {
          i.checked = false;
        }
      });
    },
    // 判断当前月有多少天
    getDaysByMonth(year, month) {
      return new Date(year, month + 1, 0).getDate();
    },
    getFirstDayByMonths(year, month) {
      return new Date(year, month, 1).getDay();
    },
    getLastDayByMonth(year, month) {
      return new Date(year, month + 1, 0).getDay();
    },
    // 对小于 10 的数字，前面补 0
    pad(str) {
      return str < 10 ? `0${str}` : str;
    },
    // 点击上一月
    prevMonth() {
      this.current.month--;
      // 因为 month的变化 会超出 0-11 的范围， 所以需要重新计算
      this.correctCurrent();
      // 生成新日期
      this.calendarCreator();
    },
    // 点击下一月
    nextMonth() {
      this.current.month++;
      // 因为 month的变化 会超出 0-11 的范围， 所以需要重新计算
      this.correctCurrent();
      // 生成新日期
      this.calendarCreator();
    },
    // 格式化时间，与主逻辑无关
    stringify(year, month, date) {
      let str = [year, this.pad(month + 1), this.pad(date)].join("-");
      return str;
    },
    // 设置或初始化 current
    setCurrent(d = new Date()) {
      let year = d.getFullYear();
      let month = d.getMonth();
      let date = d.getDate();
      this.current = {
        year,
        month,
        date,
      };
    },
    // 修正 current
    correctCurrent() {
      let { year, month, date } = this.current;

      let maxDate = this.getDaysByMonth(year, month);
      // 预防其他月跳转到2月，2月最多只有29天，没有30-31
      date = Math.min(maxDate, date);

      let instance = new Date(year, month, date);
      this.setCurrent(instance);
    },
    // 生成日期
    calendarCreator() {
      // 一天有多少毫秒
      const oneDayMS = 24 * 60 * 60 * 1000;

      let list = [];
      let { year, month } = this.current;

      // 当前月份第一天是星期几, 0-6
      let firstDay = this.getFirstDayByMonths(year, month);
      // 填充多少天
      // let prefixDaysLen = firstDay === 0 ? 6 : firstDay - 1; // 星期日在最后
      let prefixDaysLen = firstDay; // 星期日在最前
      // 毫秒数
      let begin = new Date(year, month, 1).getTime() - oneDayMS * prefixDaysLen;

      // 当前月份最后一天是星期几, 0-6
      let lastDay = this.getLastDayByMonth(year, month);
      // 填充多少天， 和星期的排放顺序有关
      // let suffixDaysLen = lastDay === 0 ? 0 : 7 - lastDay; // 星期日在最后
      let suffixDaysLen = 6 - lastDay; // 星期日在最前
      // 毫秒数
      let end =
        new Date(year, month + 1, 0).getTime() + oneDayMS * suffixDaysLen;

      while (begin <= end) {
        // 享元模式，避免重复 new Date
        this.shareDate.setTime(begin);
        let year = this.shareDate.getFullYear();
        let curMonth = this.shareDate.getMonth();
        let date = this.shareDate.getDate();
        let value = this.stringify(year, curMonth, date);
        list.push({
          year: year,
          month: curMonth,
          date: date,
          disable: curMonth !== month,
          value,
          checked: this.checkedValue === value ? true : false,
          hasschedule: true,
        });
        begin += oneDayMS;
      }

      this.calendarList = list;
    },
  },
};
</script>

<style lang="scss">
.calendar-wrapper {
  width: 326px;
  margin: 50px auto;
  overflow: hidden;
  border: 1px solid;
}

.calendar-toolbar {
  display: flex;
  height: 35px;
  align-items: center;
  margin: 0 12px;
  font-size: 16px;
  .prev,
  .next {
    cursor: pointer;
  }
  .current {
    flex: 1;
  }
}

.calendar-week {
  display: flex;
  justify-content: center;
  margin-top: 8px;
  font-size: 13px;
  font-weight: 600;
  .week-item {
    width: 32px;
    margin: 6px;
  }
}
.calendar-inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .calendar-item {
    float: left;
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    margin: 6px;
    font-size: 13px;
    font-weight: 500;
    color: #1e1e1e;
    cursor: pointer;
    &.disabled {
      color: #b0b0b0;
      cursor: not-allowed;
    }
    &.hasschedule {
      background: #ebf7fd;
      border-radius: 18px;
    }
    &.hasschedule.disabled {
      background: #f5f5f5;
      color: #b0b0b0;
    }
    &.checked {
      color: white;
      background: #00b6ff;
      border-radius: 18px;
    }
  }
}
</style>