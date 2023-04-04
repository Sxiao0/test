const baseUrl = "https://edu.telking.com/api/";
// 请求echart数据的方法
function chartData(ajaxType = "GET", data, url = baseUrl) {
  return new Promise((resolved, rejected) => {
    myAjax(
      url,
      ajaxType,
      data,
      function (responseText) {
        resolved(responseText);
      },
      function (status) {
        rejected(status);
      }
    );
  });
}
// 曲线图
var graphChart = echarts.init(document.getElementById("graph-chart"));
var graphOption = {
  tooltip: {},
  xAxis: {
    data: [],
  },
  yAxis: {
    axisLabel: {
      formatter: function (value, index) {
        return value + "人";
      },
    },
  },
  lineStyle: {
    color: "#4c8af3",
  },
  series: [
    {
      name: "数据",
      type: "line",
      label: {
        show: true,
        color: "#6198f4",
      },
      smooth: true,
      areaStyle: {
        color: "#f3f6fd",
      },
      data: [],
      itemStyle: {
        normal: {
          color: "#86b0f8",
        },
      },
    },
  ],
};
chartData("GET", { type: "month" }).then((resultData) => {
  graphOption.xAxis.data = resultData.data.xAxis;
  graphOption.series[0].data = resultData.data.series;
  graphChart.setOption(graphOption);
});
// 饼状图
var pieChart = echarts.init(document.getElementById("pie-chart"));
var pieOption = {
  title: {
    left: "center",
  },
  tooltip: {
    trigger: "item",
  },
  series: [
    {
      name: "饼状图",
      type: "pie",
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
      data: [],
    },
  ],
};
// 柱状图
var histogramChart = echarts.init(document.getElementById("histogram-chart"));
var histogramOption = {
  xAxis: {
    data: [],
  },
  yAxis: {
    name: "商品数",
  },
  series: [
    {
      name: "销量",
      type: "bar",
      barWidth: 20,
      data: [],
      itemStyle: {
        normal: {
          color: "#4183f2",
        },
      },
    },
  ],
};
chartData("GET", { type: "week" }).then((resultData) => {
  // 柱状图数据
  histogramOption.xAxis.data = resultData.data.xAxis;
  histogramOption.series[0].data = resultData.data.series;
  histogramChart.setOption(histogramOption);
  // 饼状图数据
  var data = transformArrays(resultData.data.series, resultData.data.xAxis);
  pieOption.series[0].data = data;
  pieChart.setOption(pieOption);
});

// 点击导航栏
function toggleActiveClass(event) {
  const clickedItem = event.target.closest("li");
  if (clickedItem && clickedItem.nodeName === "LI") {
    clickedItem.parentNode.querySelectorAll("li").forEach((item) => {
      item.classList.remove("nav-active");
    });

    clickedItem.classList.add("nav-active");
  }
}
const listContainer = document.querySelector(".nav-content-right");
listContainer.addEventListener("click", toggleActiveClass);
