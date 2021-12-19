import _ from 'lodash'; // js 處理資料用
import './scss/style.scss';
// 你可以指定所需要的插件
import { Tooltip, Toast, Popover } from 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
var $ = require("jquery");
// const Chart = require('chart.js');
import Chart from 'chart.js/auto';
import { plugin } from 'postcss';

// Log Test
console.log('456');

var bg_color =  [
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 99, 132, 0.2)',
    // 'rgba(255, 206, 86, 0.2)',
    // 'rgba(75, 192, 192, 0.2)',
    // 'rgba(153, 102, 255, 0.2)',
    // 'rgba(255, 159, 64, 0.2)'
];
var border_color = [
    'rgba(54, 162, 235, 1)',
    'rgba(255, 99, 132, 1)',
    // 'rgba(255, 206, 86, 1)',
    // 'rgba(75, 192, 192, 1)',
    // 'rgba(153, 102, 255, 1)',
    // 'rgba(255, 159, 64, 1)'
];
$(function () {
    $('li').each(function () {
        $(this).on('click', function () {
            var target = $(this).attr('data-bs-target');
            target.collapse('toggle');
        })
    })
    
    const plugin = {
        id: 'custom_canvas_background_color',
        beforeDraw: (chart) => {
          const ctx = chart.canvas.getContext('2d');
        //   chart.canvas.parentNode.style.height = '700px'; // 用父層自訂寬高
        //   chart.canvas.parentNode.style.width = '300px';
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over'; // 合成效果：將新圖形化在舊圖形之下
          ctx.fillStyle = '#E7EFF9'; // 套用填滿圖形及顏色
          ctx.fillRect(0, 0, chart.width, chart.height); // 繪製矩形：起始點及寬高
          ctx.restore();
        }
    };
    

    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: []
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true // 數據從零開始
                }
            },
            maintainAspectRatio: false, // 取消固定寬高（原始畫布縱橫比）
            // aspectRatio: 2,
        },
        plugins: [plugin],
    });
    getData(myChart);
    
});

function getData(chart) {
    $.ajax({
        type: "GET",
        url: "https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json",
        // data: "data",
        dataType: "JSON",
        success: function (response) {
            // Log Test
            console.log(response);
            // 只顯示一組比較
            chart.data.labels.push('前端從業性別人數')
            var i = 0;
            var gender = _.groupBy(response,'gender');
            _.forEach(gender,function(value,key) {
                // 兩組 dataset
                chart.data.datasets.push({
                    label: key+'人數',
                    data: [value.length],
                    backgroundColor: bg_color[i],
                    borderColor: border_color[i],
                    borderWidth: 2
                })
                i++;
            })
            chart.update(); // 更新圖表
        }
    });
}
// function collapseAll (subNav) {
//     var target = subNav.attr('data-bs-target');
//     target.collapse('toggle');
// }
