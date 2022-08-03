import Gantt from './gantt/src/index.js';
import panzoom from "panzoom";


var tasks = [
	{
		start: '2018-10-01',
		end: '2018-10-08',
		name: 'Redesign website',
		id: "Task 0",
		progress: 20
	},
	{
		start: '2018-10-03',
		end: '2018-10-06',
		name: 'Write new content',
		id: "Task 1",
		progress: 5,
		dependencies: 'Task 0'
	},
	{
		start: '2018-10-04',
		end: '2018-10-08',
		name: 'Apply new styles',
		id: "Task 2",
		progress: 10,
		dependencies: 'Task 1'
	},
	{
		start: '2018-10-08',
		end: '2018-10-09',
		name: 'Review',
		id: "Task 3",
		progress: 5,
		dependencies: 'Task 2'
	},
	{
		start: '2018-10-08',
		end: '2018-10-10',
		name: 'Deploy',
		id: "Task 4",
		progress: 0,
		dependencies: 'Task 2'
	},
	{
		start: '2018-10-11',
		end: '2018-10-11',
		name: 'Go Live!',
		id: "Task 5",
		progress: 0,
		dependencies: 'Task 4',
		custom_class: 'bar-milestone'
	}/*,
	{
		start: '2014-01-05',
		end: '2019-10-12',
		name: 'Long term task',
		id: "Task 6",
		progress: 0
	}*/
]

function z2f(num) {
   return  ( '00' + num ).slice( -2 );
}

function formatDate(date, format) {
    format = format.replace(/YYYY/, date.getFullYear());
    format = format.replace(/MM/, z2f(date.getMonth() + 1));
    format = format.replace(/DD/, z2f(date.getDate()));
    return format;
}

function make_date_old(diffDay, dt_str) {
  let old_dt = new Date(dt_str);
  console.log("old " + old_dt);
  let dt = Date(old_dt.getDate() + diffDay);
  let new_dt = new Date (dt);
  //console.log("new " + new_dt);
  return formatDate(new_dt,"YYYY-MM-DD");
}

function make_date(diffDay, dt_str) {
  
  let date = new Date(dt_str);
  console.log("old " + date);
  date.setDate( date.getDate() + diffDay);
  console.log("new " + date);
  return formatDate(date,"YYYY-MM-DD");
}
let today = new Date();
let startdt = new Date(tasks[0].start);
let diffTime = today.getTime() - startdt.getTime();
let diffDay = Math.floor(diffTime / (1000 * 60 * 60 * 24));

let new_tasks = [];
tasks.forEach(function(task){
  //console.log(task.start);
  //console.log(make_date(task.start));
  //console.log(make_date(task.end));
  new_tasks.push(
	  {
          start: make_date(diffDay,task.start),
          end  : make_date(diffDay,task.end),
          name : task.name,
          id   : task.id,
          progress   : task.progress,
          dependencies   : task.dependencies,
	  }
       );

});
console.log(new_tasks);

var gantt_chart = new Gantt(".gantt-target", new_tasks, {
//var gantt_chart = new Gantt(".gantt-target", tasks, {
	on_click: function (task) {
		console.log(task);
	},
	on_date_change: function(task, start, end) {
		console.log(task, start, end);
	},
	on_progress_change: function(task, progress) {
		console.log(task, progress);
	},
	on_view_change: function(mode) {
		console.log(mode);
	},
	//view_mode: 'Month',
	//view_mode: 'Week',
	view_mode: 'Day',
	//language: 'en'
	language: 'jp'
});

// grab the DOM SVG element that you want to be draggable/zoomable:
//var element = document.getElementById('scene')
var element = document.getElementById('gantt-container')

// and forward it it to panzoom.
panzoom(element)

//console.log(gantt_chart.tasks);

