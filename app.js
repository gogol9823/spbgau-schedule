const days = ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"];
let group = localStorage.getItem("spbgau-group") || Object.keys(GROUPS)[0];
let week = localStorage.getItem("spbgau-week") || "even";
let selectedDay = localStorage.getItem("spbgau-day") || days[(new Date().getDay()+6)%7];

const $ = s => document.querySelector(s);
const groupSelect = $("#groupSelect"), schedule = $("#schedule"), daysNav=$("#days");

Object.entries(GROUPS).forEach(([id,g])=>{
  const o=document.createElement("option"); o.value=id; o.textContent=`${id} — ${g.title}`; groupSelect.appendChild(o);
});
groupSelect.value=group;

function updateToday(){
  const d=new Date();
  $("#todayDate").textContent=d.toLocaleDateString("ru-RU",{day:"numeric",month:"long"});
  const start=new Date("2026-09-01T00:00:00"), diff=Math.floor((d-start)/86400000);
  const n=diff>=0 ? Math.floor(diff/7)+1 : 0;
  $("#todayWeek").textContent=n ? `${n} учебная неделя · ${n%2===0?"чётная":"нечётная"}` : "До начала учебного периода";
}
function renderDays(){
  daysNav.innerHTML="";
  days.forEach(d=>{
    const b=document.createElement("button"); b.className="day"+(d===selectedDay?" active":"");
    b.innerHTML=`<strong>${d}</strong><small>${(GROUPS[group].days[d]||[]).length} занятий</small>`;
    b.onclick=()=>{selectedDay=d; localStorage.setItem("spbgau-day",d);render()};
    daysNav.appendChild(b);
  });
}
function render(){
  const g=GROUPS[group];
  $("#stats").innerHTML=`<div class="stat"><b>Группа</b>${group}</div><div class="stat"><b>Направление</b>${g.title}</div><div class="stat"><b>Куратор</b>${g.curator}</div><div class="stat"><b>Неделя</b>${week==="even"?"чётная":"нечётная"}</div>`;
  document.querySelectorAll(".week-toggle button").forEach(b=>b.classList.toggle("active",b.dataset.week===week));
  renderDays();
  const lessons=g.days[selectedDay]||[];
  schedule.innerHTML=`<h3 class="day-title">${selectedDay}</h3>`;
  if(!lessons.length){schedule.innerHTML+=`<div class="empty">Занятий нет или данные для этого дня не указаны в структурированной версии.</div>`;return}
  lessons.forEach((x,i)=>{
    const [time,subject,type,room]=x;
    const el=document.createElement("article"); el.className="lesson";
    el.innerHTML=`<div><div class="time">${time}</div><div class="num">${i+1} пара</div></div><div><div class="subject">${subject}</div><div class="meta">${type}</div></div><div class="room">${room}</div>`;
    schedule.appendChild(el);
  });
}
groupSelect.onchange=()=>{group=groupSelect.value;localStorage.setItem("spbgau-group",group);render()};
document.querySelectorAll(".week-toggle button").forEach(b=>b.onclick=()=>{week=b.dataset.week;localStorage.setItem("spbgau-week",week);render()});
$("#todayBtn").onclick=()=>{selectedDay=days[(new Date().getDay()+6)%7];render()};
$("#printBtn").onclick=()=>window.print();
updateToday();render();
