<template>
  <div class="calendar">
    <div class="cal-header">
      <span class="cal-title">{{timeTitle}}</span>
      <div class="cal-btn">
        <!-- <div class="cal-left" @click="prevMonth()">上个月</div> -->
        <div class="cal-left" @click="changeMonth(--nowMonth)">上个月</div>
        <span class="cal-time" @click="toToday()">今天</span>
        <!-- <div class="cal-right" @click="nextMonth()">下个月</div> -->
        <div class="cal-right" @click="changeMonth(++nowMonth)">下个月</div>
      </div>
    </div>
    <div class="cal-table">
      <!-- 周 -->
      <div class="cal-week">
        <span class="week" v-for="(item,index) in weeks" :key="'week'+index">星期{{item}}</span>
      </div>
      <div class="cal-day">
        <!-- 每一天 -->
        <div class="day" v-for="dayId in 42" :key="'day'+dayId">
          <span
            v-if="dayId <= beginDay"
            class="gray"
            @click="changeActive"
            :data-str="getStr(1,nowMonth - 1,lastMaxDay - (beginDay - dayId))"
          >
            <!-- 上个月的日子，如果当前dayId编号小于开始日，就渲染上个月的最后一天 -->
            <!-- {{ lastMaxDay + (dayId - beginDay) }} -->
            {{ lastMaxDay - (beginDay - dayId) }}
          </span>

          <span
            v-else-if="dayId > beginDay && (dayId - beginDay) <= maxDayNum"
            :class="[(getStr(2,nowMonth, dayId - beginDay) == todayStr && 'today'),(dayId - beginDay == dayActive && 'active')]"
            @click="changeActive"
            :data-str="getStr(2,nowMonth, dayId - beginDay)"
          >
            <!-- 本月的日子，如果前边的编号大于开始日，就开始渲染(当前格子的dayId - 开始编号beginDay)。比如当前格子dayId是7，beginDay是6，那么从1-6格子都不渲染，以第七个格子为起始从1开始渲染。 -->
            {{dayId - beginDay}}
          </span>

          <span
            v-else
            class="gray"
            @click="changeActive"
            :data-str="getStr(3,nowMonth + 1, dayId - (maxDayNum + beginDay))"
          >
            <!-- 下个月的日子，如果当前dayId编号-beginDay的数都超过本月最大天数了，就不能再递增，应从1开始了。问题是怎么从1重新递增？那就是当前dayId减去已经渲染过的div总数 -->
            {{ dayId - (maxDayNum + beginDay) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const { log } = console;

export default {
  data() {
    return {
      todayStr: new Date().toLocaleDateString(),
      nowYear: null, //今年
      nowMonth: null, //本月
      nowDay: null, //今日
      nowWeek: null, //本周
      // beginDay: null,//本月开始在星期几
      // maxDayNum: null,//本月最大天数
      dayActive: null, //选中的天数
      timeTitle: "", //顶部日期文案
      weeks: ["日", "一", "二", "三", "四", "五", "六"] //周数据
    };
  },
  created() {
    this.init();
    this.dayActive = this.nowDay;
    /* studyDatePrototype(); */
  },
  computed: {
    beginDay() {
      let beginDay = new Date(this.nowYear, this.nowMonth - 1, 1).getDay();
      return beginDay;
    },
    maxDayNum() {
      let maxDayNum = new Date(this.nowYear, this.nowMonth, 0).getDate();
      return maxDayNum;
    },
    lastMaxDay() {
      let lastMaxDay = new Date(this.nowYear, this.nowMonth - 1, 0).getDate();
      return lastMaxDay;
    }
  },
  methods: {
    init(str) {
      this.timeTitle = this.formatDate(str);
    },
    toToday() {
      // 回到今天
      this.init(this.todayStr);
    },
    changeMonth(m){
      if (m < 1) {
        // 切换上个月
        this.nowMonth = 12;
        this.nowYear--;
      }
      // 切换下个月
      if (m > 12) {
        this.nowMonth = 1;
        this.nowYear++;
      }
      this.dayActive > this.maxDayNum && (this.dayActive = this.maxDayNum);
      this.init(`${this.nowYear}/${this.nowMonth}/${this.dayActive}`);
    },
    prevMonth() {
      // 切换上个月
      if (--this.nowMonth < 1) {
        this.nowMonth = 12;
        this.nowYear--;
      }
      if(this.dayActive > this.maxDayNum){
        this.dayActive = this.maxDayNum;
      }
      let target = `${this.nowYear}/${this.nowMonth}/${this.dayActive}`;
      log(target);
      this.init(target);
    },
    nextMonth() {
      // 切换下个月
      if (++this.nowMonth > 12) {
        this.nowMonth = 1;
        this.nowYear++;
      }
      log(this.dayActive,this.maxDayNum)
      if(this.dayActive > this.maxDayNum){
        // 因为三个按钮都会走init，所以放到这里
        this.dayActive = this.maxDayNum;
        log(this.dayActive)
      }
      let target = `${this.nowYear}/${this.nowMonth}/${this.dayActive}`;
      log(target);
      this.init(target);
    },
    getStr(type, month, day) {
      let year = this.nowYear,//预设值为今年
        result = ""; 
      if (type == 1 && month < 1) {
        //上个月是12月，表示去年
        month = 12;
        --year;
      }
      if (type == 3 && month > 12) {
        //下个月是1月，表示明年
        month = 1;
        ++year;
      }
      result = `${year}/${month}/${day}`;
      return result;
    },
    changeActive(e) {
      // 切换年月日
      this.dayActive = e.target.dataset.str.match(/\d+$/g);
      log(this.dayActive)
      this.init(e.target.dataset.str);
    },
    formatDate(specified = null) {
      // 获取时间
      function add0(n) {
        return (n = n < 10 ? "0" + n : n);
      }
      let date = specified ? new Date(specified) : new Date(),
        year = (this.nowYear = date.getFullYear()),
        month = (this.nowMonth = date.getMonth() + 1),
        day = (this.nowDay = add0(date.getDate())),
        week = (this.nowWeek = this.weeks[date.getDay()]);
      return year + "年" + add0(month) + "月" + day + "日  星期" + week;
    },
    studyDatePrototype() {
      // 获取Date.prototype
      let obj = Date.prototype;
      let arr = Object.getOwnPropertyNames(obj);
      let haveGetArr = arr.filter(el => {
        // 只过滤get方法和toString的系列方法
        return el.indexOf("get") !== -1 || el.indexOf("String") !== -1;
      });
      let haveSetArr = arr.filter(el => {
        return el.indexOf("set") !== -1;
      });
      log(haveGetArr);
      log(haveSetArr);
      log(obj, arr);
      for (var dd of arr) {
        // for (var dd of haveGetArr) {
        log(dd, " 结果：", Date.prototype[dd].call(new Date()));
      }
    }
  }
};
</script>
<style>
.calendar {
  border: 1px solid #eee;
  padding: 15px;
  min-width: 480px;
}
/* header */
.cal-header {
  display: block;
  /* text-align: center; */
  line-height: 35px;
  font-size: 24px;
  overflow: hidden;
}

.cal-btn {
  float: right;
}
.cal-time {
  border: 1px solid tomato;
  font-size: 12px;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
}
.cal-time:hover {
  background: rgba(255, 99, 71, 0.3);
}
.cal-left,
.cal-right {
  display: inline-block;
  vertical-align: text-bottom;
  width: 0;
  height: 0;
  text-indent: -9999px;
  border-radius: 5px;
  border: 14px solid transparent;
  cursor: pointer;
}
.cal-left {
  /* float: left; */
  border-right-color: tomato;
  border-left: 0px;
  margin-right: 5px;
}
.cal-left:hover {
  border-right-color: rgb(238, 86, 59);
}
.cal-right {
  /* float: right; */
  border-left-color: tomato;
  border-right: 0px;
  margin-left: 5px;
}
.cal-right:hover {
  border-left-color: rgb(238, 86, 59);
}
/* cal-table */
.cal-table {
  padding-top: 8px;
}
/* week */
.cal-week {
  color: #fff;
  background: tomato;
  padding: 4px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cal-week .week {
  display: block;
  flex: 1;
  width: 100%;
  text-align: center;
}
/* cal-day */
.cal-day {
  width: 100%;
  display: grid;
  grid-template-columns: 14.2% 14.3% 14.3% 14.3% 14.3% 14.3% 14.2%;
  /* grid-template-rows: 14.3% 14.3% 14.3%; */
  border-left: 1px dotted rgba(255, 99, 71, 0.3);
}
.day {
  height: 60px;
  line-height: 60px;
  text-align: center;
  cursor: pointer;
}
.day span {
  display: block;
  border-bottom: 1px dotted rgba(255, 99, 71, 0.3);
  border-right: 1px dotted rgba(255, 99, 71, 0.3);
  border-top: 1px solid transparent;
  border-left: 1px solid transparent;
}
.day span.active,
.day span:hover {
  border: 1px solid tomato;
}
.day span.today {
  background: rgba(255, 99, 71, 0.3);
}
.day span.gray {
  color: #eee;
}
</style>

