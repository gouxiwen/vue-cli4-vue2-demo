<template>
  <div class="calendar">
    <vue-event-calendar
      :title="'日历'"
      :events="demoEvents"
      @day-changed="handleDayChanged"
      @month-changed="handleMonthChanged"
    >
      <template slot-scope="props">
        <div v-for="(event, index) in props.showEvents" :key="index" class="event-item">
          <!-- In here do whatever you want, make you owner event template -->
          {{event.date}}自定义事件
        </div>
      </template>
    </vue-event-calendar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      demoEvents: [
        {
          date: "2020/07/12", // Required
          title: "Foo", // Required
        },
        {
          date: "2020/07/15",
          title: "Bar",
          desc: "description",
          customClass: "disabled highlight", // Custom classes to an calendar cell
        },
      ],
    };
  },
  methods: {
    handleDayChanged(d) {
      console.log(d);
    },
    handleMonthChanged(m) {
      console.log(m);
    },
  },
};
</script>

<style lang="scss">
.calendar {
  .event {
    .date-num {
      color: red !important;
    }
    .is-event {
      border-color: red !important;
    }
  }
  .selected-day {
    .date-num {
      color: white !important;
    }
    .is-event {
      background-color: red !important;
    }
  }
}
</style>