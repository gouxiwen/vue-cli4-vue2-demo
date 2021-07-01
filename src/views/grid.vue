<template>
  <div>
    <div>栅格(grid)是一种自适应布局，能根据不同终端自动伸缩容器的宽高。flex根据轴线(axis)布局，看起来像是一维布局；而grid针对网格线(grid line)布局，看起来更像是二维布局。</div>
    <div class="grid-demo">
      <div class="containter1">
        <div class="item item1">1</div>
        <div class="item item2">2</div>
        <div class="item item3">3</div>
        <div class="item item1">1</div>
        <div class="item item2">没有定义对应的行，按照最小高度填充</div>
        <div class="item item3">没有定义对应的行，按照最小高度填充</div>
      </div>
      <div class="containter2">
        <div class="item item1">列：repeat函数+百分比</div>
        <div class="item item2">列：repeat函数+百分比</div>
        <div class="item item3">列：repeat函数+百分比</div>
        <div class="item item4">1</div>
        <div class="item item5">2</div>
        <div class="item item6">3</div>
        <div class="item item7">4</div>
      </div>
      <div class="containter3">
        <div class="item item1">列：repeat函数auto-fill</div>
        <div class="item item2">1</div>
        <div class="item item3">1</div>
        <div class="item item4">1</div>
        <div class="item item5">2</div>
        <div class="item item6">3</div>
        <div class="item item7">4</div>
      </div>
      <div class="containter4">
        <div class="item item1">1fr</div>
        <div class="item item2">2fr，是前一列的2倍</div>
        <div class="item item3">1</div>
        <div class="item item1">1</div>
        <div class="item item2">2</div>
        <div class="item item3">3</div>
        <div class="item item3">4</div>
      </div>
      <div class="containter5">
        <div class="item item1">1</div>
        <div class="item item2">2</div>
        <div class="item item3">3</div>
        <div class="item item1">4</div>
        <div class="item item2">5</div>
        <div class="item item3">6</div>
        <div class="item item3">7</div>
      </div>
      <div class="containter6">
        <div class="item item1">1</div>
        <div class="item item2">2</div>
        <div class="item item3">3</div>
        <div class="item item1">4</div>
        <div class="item item2">5</div>
        <div class="item item3">6</div>
        <div class="item item3">7</div>
      </div>
      <div>实例：垂直居中</div>
      <div class="containter7">
        <div class="item">我要垂直居中</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .grid-demo {
    .containter1 {
      display: grid;
      grid-template-columns: [c1] 100px [c2] 100px [c3]; // c1表示网格线名称
      grid-template-rows: [r1] 100px [r2] 100px [r3]; // r1表示网格线名称
      border: 1px solid;
      .item1 {
        background-color: red;
      }
      .item2 {
        background-color: rgb(111, 0, 255);
      }
      .item3 {
        background-color: rgb(148, 42, 130);
      }
    }
    .containter2 {
      display: grid;
      grid-template-columns: repeat(3, 33.33%);
      grid-template-rows: repeat(2, 100px);
      grid-auto-rows: 50px;  // 指定自动生成的网格高度，默认更加内容填充
      border: 1px solid;
      margin-top: 5px;
      .item {
         background-color: rgb(199, 231, 147);
      }
      .item1 {
        background-color: red;
        grid-column-start: 2;
        grid-column-end: 4; // 1号项目的左边框是第二根垂直网格线，右边框是第四根垂直网格线。
      }
      .item2 {
        background-color: rgb(111, 0, 255);
      }
      .item3 {
        background-color: rgb(148, 42, 130);
      }
    }
    .containter3 {
      display: grid;
      grid-template-columns: repeat(auto-fill, 100px);
      border: 1px solid;
      margin-top: 5px;
      width: 350px;
      .item1 {
        background-color: red;
      }
      .item2 {
        background-color: rgb(111, 0, 255);
      }
      .item3 {
        background-color: rgb(148, 42, 130);
      }
    }
    .containter4 {
      display: grid;
      grid-template-columns: 1fr 2fr;
      // grid-row-gap: 20px;
      // grid-column-gap: 20px;
      // 简写为：gap: 20px 20px;
      gap: 20px 20px;
      border: 1px solid;
      margin-top: 5px;
      .item1 {
        background-color: red;
      }
      .item2 {
        background-color: rgb(111, 0, 255);
      }
      .item3 {
        background-color: rgb(148, 42, 130);
      }
    }
    .containter5 {
      display: grid;
      grid-template-columns: 100px 100px 100px;
      grid-template-rows: 100px 100px 100px;
      grid-auto-flow: column;
      border: 1px solid;
      margin-top: 5px;
      .item1 {
        background-color: red;
      }
      .item2 {
        background-color: rgb(111, 0, 255);
      }
      .item3 {
        background-color: rgb(148, 42, 130);
      }
    }
    .containter6 {
      display: grid;
      grid-template-columns: 100px 100px 100px;
      grid-template-rows: 100px 100px 100px;
      place-items: start end; // place-items属性是align-items属性和justify-items属性的合并简写形式。
      place-content: space-around space-evenly; // place-content属性是align-content属性和justify-content属性的合并简写形式。
      border: 1px solid;
      margin-top: 5px;
      .item1 {
        background-color: red;
      }
      .item2 {
        background-color: rgb(111, 0, 255);
      }
      .item3 {
        background-color: rgb(148, 42, 130);
      }
    }
    .containter7 {
      border: 1px solid;
      margin-top: 5px;
      height: 300px;
      display: grid;
      place-items: center center;
      .item {
         background-color: red;
         width: 100px;
         height: 100px;
      }
    }
  }
</style>