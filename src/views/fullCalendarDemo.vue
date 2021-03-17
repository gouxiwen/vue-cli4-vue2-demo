
<template>
  <div @click="visible = false" class='demo-app'>
    <!-- <div class='demo-app-sidebar'>
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
    </div> -->
    <div class='demo-app-main'>
      <FullCalendar
        class='demo-app-calendar'
        ref="fullCalendar"
        :options='calendarOptions'
      >
        <!-- <template v-slot:eventContent='arg'>
          <div class="event-wrap">
            <div class="color-block" :style="{backgroundColor: arg.event.backgroundColor}"></div>
            <div class="content">{{ arg.event.title }}，</div>
            <div class="content" v-if="arg.event.detail">{{arg.event.detail}}，</div>
            <div class="content">{{handleDateFormat(arg.event.start)}}-{{handleDateFormat(arg.event.end)}}</div>
          </div>
        </template> -->
      </FullCalendar>
    </div>
    <el-popover
      class="popperClass"
      :style="{'left': pLeft + 'px', 'top': pTop + 'px'}"
      :placement="position"
      width="400"
      trigger="click"
      v-model="visible">
      <div class="pop-solt" @click.stop="() => {}">
        这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容
        这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容
        这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容
        这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容
        这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容
        这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容
        这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容
        这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容 这里有很多内容
      </div>
      <el-button >click 激活</el-button>
    </el-popover>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
// import '@fullcalendar/common/main.css'
// import '@fullcalendar/timeline/main.css'
// import '@fullcalendar/resource-timeline/main.css'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import zhLocale from '@fullcalendar/core/locales/zh-cn';
import moment from "moment";
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
      visible: false,
      pLeft: 0,
      pTop: 0,
      position: 'right',
      calendarOptions: {
      //  schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives', // 开发使用的key，生产中使用需要购买许可证密钥
       schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source', // 网上找的
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
                  calendarApi.changeView('resourceTimeline');
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
        events:[], // 事件数据源，可以是你定义的一个数组，一个函数，一个返回json的接口
        eventSources:[], // 是指定多个数据源的途径，值为数组类型。eventSources是events选项的一种替代。eventSources里可以是数组数据、JSON数据、函数数据、数据源对象(Event Source Object)
        // initialEvents: INITIAL_EVENTS, // 初始化事件，也可以通过events的接口请求
        editable: true, // 默认false，是否允许事件编辑（可以整体拖动和调整持续时间，也就是结束时间），全局设置，单个事件的editable可以覆盖
        eventStartEditable: true, //  是否允许通过整体拖动编辑开始时间，全局设置，单个事件的startEditable可以覆盖
        eventResizableFromStart: true, // 默认false  是否允许编辑开始时间
        eventDurationEditable: true, //  是否允许编辑时间的持续时间，也就是结束时间，全局设置，单个事件的durationEditable可以覆盖
        eventResourceEditable: false, // 是否允许资源resources编辑，次选项默认false但是继承editable，如果要单独设置resources，则将editable设为false，将此设为true，全局设置，单个事件的resourceEditable可以覆盖
        selectable: true, // 是否允许用户单击或者拖拽日历中的天和时间隙
        selectMirror: true, // 用户拖动时是否绘制“占位符”事件。
        dayMaxEvents: false, // 限制一天的最大数，超出日历块高度后就用more显示，默认false
        dayMaxEventRows: false, // 限制一天的最大事件行数，超出行数后就用more显示，默认false
        weekends: true, // 是否显示周末
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        eventResize: this.handleEventResize,
        height: "100%",
        // locale: 'zh-cn'
        locale: zhLocale,
        firstDay: 0, // 第一天从周日开始
        // 自定义时间线的列
        resourceAreaColumns: [
          {
          group: true,
          field: 'building',
          headerContent: '分组'
        },
        {
          field: 'title',
          headerContent: '会议室'
        },
        {
          field: 'position',
          headerContent: '位置'
        }
      ],
        // 这里的id对应于于日程（event）中的resourceId
        resources: [
            {
              id: 0,
              building: '分组1',
              title: '1',
              position: '2003'
            },
            {
              id: 1,
              building: '分组1',
              title: '2',
              position: '2003'
            },
            {
              id: 2,
              building: '分组1',
              title: '3',
              position: '2003'
            },
            // {
            //   id: 'a',
            //   title: 'Room A'
            // },
            // {
            //   id: 'a1',
            //   parentId: 'a',
            //   title: 'Room A1'
            // },
            // {
            //   id: 'a2',
            //   parentId: 'a',
            //   title: 'Room A2'
            // }
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
      currentEvents: [],
      clickCount: 0, // 用来模拟双击事件
    }
  },
  mounted() {
      setTimeout(() => {
          this.calendarOptions.events = INITIAL_EVENTS
      }, 10);
  },
  methods: {
    hendleChangelangue() {
      this.calendarOptions.locale = this.calendarOptions.locale === zhLocale ? 'en' : zhLocale
    },
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
    },
    handleDateSelect(selectInfo) {
      this.clickCount++
      setTimeout(() => {
        if (this.clickCount === 2) {
          console.log('双击')
          this.handleDbClickSelect(selectInfo)
        } else if (this.clickCount === 1) {
          console.log('单击')
          this.handleClickSelect(selectInfo)
        }
        this.clickCount = 0
      },300)
    },
    handleClickSelect(selectInfo) {
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
    handleDbClickSelect() {
      
    },
    handleEventClick(clickInfo) {
      // clickInfo.el.style.borderColor = 'red'
      // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      //   clickInfo.event.remove()
      // }
      console.log(clickInfo)
      this.visible = true
      this.$nextTick(() => {
        let top,left
        let mouseY = clickInfo.jsEvent.clientY
        let mouseX = clickInfo.jsEvent.clientX
        let viewWidth = document.body.clientWidth // 页面视图宽度
        let viewHeight = document.body.clientHeight
        let popWidth = document.querySelector('.el-popover').offsetWidth
        let popHeight = document.querySelector('.el-popover').offsetHeight
        if (mouseY + popHeight < viewHeight) {
          top = mouseY
        }else if (mouseY + popHeight > viewHeight && mouseY - popHeight > 0) {
          top = mouseY - popHeight
        } else {
          top = 10
        }
        // 目标元素宽度
        let currentDomWidth = clickInfo.el.offsetWidth
        // 目标元素右边位置
        let currentDomRight = mouseX - clickInfo.jsEvent.layerX + currentDomWidth  + clickInfo.el.offsetLeft //  加上右padding
        // 目标元素左边位置
        let currentDomLeft = mouseX - clickInfo.jsEvent.layerX - clickInfo.el.offsetLeft // 减去左padding
        if (currentDomRight + popWidth < viewWidth ) {
          left = currentDomRight
        }else if (currentDomRight + popWidth > viewWidth && currentDomLeft - popWidth > 0) {
          left = currentDomLeft - popWidth
        } else {
          left = 10
        }
        this.pLeft = left
        this.pTop = top
        clickInfo.jsEvent.stopPropagation()
      })
    },
    handleEvents(events) {
      this.currentEvents = events
    },
    handleEventResize(events) {
      console.log('EventResize', events.event)
    },
    handleDateFormat(time, format = 'HH:mm') {
      return moment(time).format(format)
    }
  }
}
</script>

<style lang='scss'>
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
b {
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
  .event-wrap {
    display: flex;
    align-items: center;
    flex-flow: wrap;
    word-break: break-all;
    .color-block {
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }
    .content {
      font-size: 12px;
    }
  }
}
.fc {
  max-width: 1100px;
  margin: 0 auto;
}
.popperClass {
  position: fixed;
  z-index: 10;
  .pop-solt {
  }
  .el-button {
    display: none;
  }
}
</style>