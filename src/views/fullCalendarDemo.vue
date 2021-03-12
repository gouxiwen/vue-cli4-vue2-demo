
<template>
  <div class='demo-app'>
    <div class='demo-app-sidebar'>
      <div class='demo-app-sidebar-section'>
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to delete it</li>
        </ul>
      </div>
      <div class='demo-app-sidebar-section'>
        <label>
          <input
            type='checkbox'
            :checked='calendarOptions.weekends'
            @change='handleWeekendsToggle'
          />
          toggle weekends
        </label>
      </div>
      <div class='demo-app-sidebar-section'>
        <h2>All Events ({{ currentEvents.length }})</h2>
        <ul>
          <li v-for='event in currentEvents' :key='event.id'>
            <b>{{ event.startStr }}</b>
            <i>{{ event.title }}</i>
          </li>
        </ul>
      </div>
    </div>
    <div class='demo-app-main'>
      <FullCalendar
        class='demo-app-calendar'
        ref="fullCalendar"
        :options='calendarOptions'
      >
        <template v-slot:eventContent='arg'>
          <b>{{ arg.timeText }}</b>
          <div>{{ arg.event.title }}</div>
        </template>
      </FullCalendar>
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import '@fullcalendar/common/main.css'
import '@fullcalendar/timeline/main.css'
import '@fullcalendar/resource-timeline/main.css'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import zhLocale from '@fullcalendar/core/locales/zh-cn';
export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    let calendarApi, self = this
    this.$nextTick(() => {
      calendarApi = this.$refs.fullCalendar.getApi()
      // console.log(calendarApi)
    })
    return {
      calendarOptions: {
       schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives', // 开发使用的key，生产中使用需要购买许可证密钥
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
          resourceTimelinePlugin
        ],
        customButtons: {
            myRTLViewButton: {
                text: '时间线',
                click() {
                    calendarApi.changeView('resourceTimeline')
                }
            },
            mylocalButton: {
                text: '切换语言',
                click() {
                    self.hendleChangelangue()
                }
            }
        },
        headerToolbar: {
          left: 'prev,next today mylocalButton',
          center: 'title',
          right: 'timeGridDay,timeGridWeek,dayGridMonth,myRTLViewButton,myView'
          // right: 'myMothViewButton,myWeekViewButton,myDayViewButton'
        },
        initialView: 'dayGridMonth',
        initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        editable: true, // 是否允许事件编辑
        selectable: true, // 是否允许用户单击或者拖拽日历中的天和时间隙
        selectMirror: true, // 用户拖动时是否绘制“占位符”事件。
        dayMaxEvents: false, // 限制一天的最大数，超出日历块高度后就用more显示，默认false
        dayMaxEventRows: false, // 限制一天的最大事件行数，超出行数后就用more显示，默认false
        weekends: true, // 是否显示周末
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        // locale: 'zh-cn'
        locale: zhLocale,
        firstDay: 0, // 第一天从周日开始
        // 这里的id对应于于日程（event）中的resourceId
        resources: [
            {
            id: 0,
            title: '1',
          },
            {
            id: 1,
            title: '2',
          },
        ],
        // 自定义时间线视图显示3个月
        views: {
          myView: {
            type: 'resourceTimeline',
            // duration: { month: 2 }
            visibleRange: function(currentDate) {
              // Generate a new date for manipulating in the next step
              var startDate = new Date(currentDate.valueOf())
              var endDate = new Date(currentDate.valueOf())

              // Adjust the start & end dates, respectively
              startDate.setDate(startDate.getDate() - 15) // One day in the past
              endDate.setDate(startDate.getDate() + 91) // Two days into the future

              return { start: startDate, end: endDate }
            },
            buttonText: '自定义视图'
          }
        },
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: []
    }
  },
  methods: {
    hendleChangelangue() {
      this.calendarOptions.locale = this.calendarOptions.locale === zhLocale ? 'en' : zhLocale
    },
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
    },
    handleDateSelect(selectInfo) {
      let title = prompt('Please enter a new title for your event')
      let calendarApi = selectInfo.view.calendar
      calendarApi.unselect() // clear date selection
      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        })
      }
    },
    handleEventClick(clickInfo) {
      clickInfo.el.style.borderColor = 'red'
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
      }
    },
    handleEvents(events) {
      this.currentEvents = events
    }
  }
}
</script>

<style lang='css'>
h2 {
  margin: 0;
  font-size: 16px;
}
ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}
li {
  margin: 1.5em 0;
  padding: 0;
}
b { /* used for event dates/times */
  margin-right: 3px;
}
.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}
.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}
.demo-app-sidebar-section {
  padding: 2em;
}
.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}
.fc { /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}
</style>