
const qs = (k)=>new URLSearchParams(location.search).get(k);
// Helper: render fixed child card for parent
function renderParentChildCard(containerId) {
  const t = qs('tenant') || localStorage.getItem('active_tenant') || 'sunshine';
  const parentEmail = localStorage.getItem('active_email') || '';
  const students = (DATA.students[t]||[]);
  const myChild = students.find(s => s.parent && s.parent.email === parentEmail);
  const el = document.getElementById(containerId);
  if (!myChild) {
    el.innerHTML = '<div style="color:red">Không tìm thấy học sinh cho phụ huynh này.</div>';
    return;
  }
  el.innerHTML = `<div class="card" style="margin-bottom:16px">
    <div style="font-size:20px;font-weight:700">${myChild.name}</div>
    <div>Lớp: <b>${myChild.class}</b> | Ngày sinh: <b>${myChild.dob}</b> | Giới tính: <b>${myChild.gender==='male'?'Nam':'Nữ'}</b></div>
  </div>`;
}
// Parent Health page
if (location.pathname.endsWith('parent-health.html')) {
  renderParentChildCard('parent-child-card');
  const t = qs('tenant') || localStorage.getItem('active_tenant') || 'sunshine';
  const parentEmail = localStorage.getItem('active_email') || '';
  const students = (DATA.students[t]||[]);
  const myChild = students.find(s => s.parent && s.parent.email === parentEmail);
  const dash = document.getElementById('parent-health-dashboard');
  if (!myChild) { dash.innerHTML = ''; }
  else {
    // Dữ liệu sức khoẻ 6 tháng gần nhất
    let months = ['03/2025','04/2025','05/2025','06/2025','07/2025','08/2025'];
    let healths = months.map((m,i)=>{
      let h = (DATA.healthAug||[]).find(r=>r[0]===myChild.id && m==='08/2025');
      if(h) return {date:m, height:parseFloat(h[1]), weight:parseFloat(h[2]), bmi:parseFloat(h[3])};
      // giả lập tăng dần
      return {date:m, height:110+i*1.5, weight:17+i*0.6, bmi:parseFloat(( (17+i*0.6) / (((110+i*1.5)/100)**2)).toFixed(1))};
    });
    // Filter tháng
    dash.innerHTML = `<div class="card"><b>Biểu đồ sức khoẻ 6 tháng gần nhất</b><br>
      <label>Xem tối đa <select id='health-months'>${[2,3,4,5,6].map(n=>`<option value='${n}'>${n} tháng</option>`)}</select></label>
      <canvas id="healthChart" width="320" height="180"></canvas>
    </div>
    <div class="card"><b>BMI hiện tại: ${healths[5].bmi}</b> | Chuẩn: ${myChild.gender==='male'?15.5:15.2}<br>
      <span style='color:#1976d2'>${healths[5].bmi < (myChild.gender==='male'?15.5:15.2)?'Cần tăng cân':'Bình thường'}</span>
    </div>`;
    setTimeout(()=>{
      let n = 6;
      const draw = ()=>{
        const ctx = document.getElementById('healthChart').getContext('2d');
        ctx.clearRect(0,0,320,180);
        ctx.strokeStyle = '#888'; ctx.beginPath(); ctx.moveTo(40,160); ctx.lineTo(300,160); ctx.moveTo(40,160); ctx.lineTo(40,20); ctx.stroke();
        // Cân nặng
        ctx.strokeStyle = '#fbc02d'; ctx.beginPath();
        healths.slice(-n).forEach((h,i)=>{
          const x = 40 + i*50;
          const y = 160-h.weight*6;
          if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
          ctx.arc(x,y,3,0,2*Math.PI); ctx.moveTo(x,y);
        });
        ctx.stroke();
        ctx.fillStyle = '#fbc02d'; ctx.fillText('Cân nặng', 250, 50);
        // Chiều cao
        ctx.strokeStyle = '#43a047'; ctx.beginPath();
        healths.slice(-n).forEach((h,i)=>{
          const x = 40 + i*50;
          const y = 160-h.height;
          if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
          ctx.arc(x,y,3,0,2*Math.PI); ctx.moveTo(x,y);
        });
        ctx.stroke();
        ctx.fillStyle = '#43a047'; ctx.fillText('Chiều cao', 250, 30);
        healths.slice(-n).forEach((h,i)=>ctx.fillText(h.date, 40+i*50-10, 170));
      };
      draw();
      document.getElementById('health-months').onchange = e=>{ n=+e.target.value; draw(); };
    },100);
  }
}
// Parent Study page
if (location.pathname.endsWith('parent-study.html')) {
  renderParentChildCard('parent-child-card');
  const t = qs('tenant') || localStorage.getItem('active_tenant') || 'sunshine';
  const parentEmail = localStorage.getItem('active_email') || '';
  const students = (DATA.students[t]||[]);
  const myChild = students.find(s => s.parent && s.parent.email === parentEmail);
  const dash = document.getElementById('parent-study-dashboard');
  if (!myChild) { dash.innerHTML = ''; }
  else {
    // Lịch học tuần
    const schedule = [
      {day:'Thứ 2',subject:'Toán, Vẽ'},
      {day:'Thứ 3',subject:'Văn, Âm nhạc'},
      {day:'Thứ 4',subject:'Tiếng Anh, Thể dục'},
      {day:'Thứ 5',subject:'Khoa học, Vẽ'},
      {day:'Thứ 6',subject:'Kỹ năng sống, Âm nhạc'}
    ];
    // Kỹ năng
    const skills = [
      {name:'Tự phục vụ',week:'Thứ 2'},
      {name:'Giao tiếp',week:'Thứ 3'},
      {name:'Vẽ hình',week:'Thứ 4'},
      {name:'Nhận biết số',week:'Thứ 5'},
      {name:'Chơi nhóm',week:'Thứ 6'}
    ];
    // Sự kiện
    const events = [
      {date:'2025-09-15',title:'Khai giảng'},
      {date:'2025-09-20',title:'Tham quan bảo tàng'}
    ];
    dash.innerHTML = `
      <div class="card"><b>Lịch học tuần này</b><table class="table" style="width:100%;margin-top:8px">
        <tr>${schedule.map(s=>`<th>${s.day}</th>`).join('')}</tr>
        <tr>${schedule.map(s=>`<td>${s.subject}</td>`).join('')}</tr>
      </table></div>
      <div class="card"><b>Kỹ năng đã học</b><ul>${skills.map(s=>`<li>${s.name} (${s.week})</li>`).join('')}</ul></div>
      <div class="card"><b>Sự kiện sắp tới</b><ul>${events.map(e=>`<li>${e.date}: ${e.title}</li>`).join('')}</ul></div>
    `;
  }
}
// Parent Fee page
if (location.pathname.endsWith('parent-fee.html')) {
  renderParentChildCard('parent-child-card');
  const t = qs('tenant') || localStorage.getItem('active_tenant') || 'sunshine';
  const parentEmail = localStorage.getItem('active_email') || '';
  const students = (DATA.students[t]||[]);
  const myChild = students.find(s => s.parent && s.parent.email === parentEmail);
  const dash = document.getElementById('parent-fee-dashboard');
  if (!myChild) { dash.innerHTML = ''; }
  else {
    // Học phí 6 tháng gần nhất
    let months = ['03/2025','04/2025','05/2025','06/2025','07/2025','08/2025'];
    let fees = months.map((m,i)=>{
      let inv = (DATA.invoicesAug[t]||[]).find(r=>r[0]===myChild.id && m==='08/2025');
      if(inv) return {date:m, amount:inv[3], status:inv[3]%2===0?'Đã thanh toán':'Chưa thanh toán'};
      // giả lập
      let amt = 4000000+i*100000;
      return {date:m, amount:amt, status:amt%2===0?'Đã thanh toán':'Chưa thanh toán'};
    });

    // Hàm sinh bảng kê động từng tháng
    function getFeeItems(monthIdx) {
      // Tháng 9 mới có cơ sở vật chất, các tháng khác là 0
      let isSep = months[monthIdx].startsWith('09/');
      let items = [
        {label:'Học phí tổng',amount:2000000},
        {label:'Phí bán trú',amount:800000},
        {label:'Cơ sở vật chất',amount:monthIdx===0?600000:0},
        {label:'Môn năng khiếu',amount:200000},
        {label:'Tiền ăn',amount:400000},
        {label:'Ngoại khoá',amount:monthIdx===2?300000:0}, // ví dụ tháng 5 có ngoại khoá
        {label:'Giảm học phí',amount:-200000}
      ];
      return items.filter(i=>i.amount!==0||i.label==='Giảm học phí'||i.label==='Học phí tổng');
    }

    // Hiện modal bảng kê
    function showFeeModal(monthIdx) {
      const modal = document.getElementById('fee-modal');
      const title = document.getElementById('fee-modal-title');
      const body = document.getElementById('fee-modal-body');
      title.textContent = `Bảng kê chi tiết học phí tháng ${months[monthIdx]}`;
      const items = getFeeItems(monthIdx);
      body.innerHTML = `<ul style='padding-left:18px'>${items.map(i=>`<li>${i.label}: <b>${i.amount.toLocaleString('vi-VN')}₫</b></li>`).join('')}</ul>`;
      modal.style.display = 'flex';
    }

    // Đóng modal
    setTimeout(()=>{
      const modal = document.getElementById('fee-modal');
      document.getElementById('fee-modal-close').onclick = ()=>{modal.style.display='none';};
      modal.onclick = e=>{if(e.target===modal)modal.style.display='none';};
    },200);

    dash.innerHTML = `
      <div class="card"><b>Học phí tháng 8/2025</b><br>Số tiền: <b>${fees[5].amount.toLocaleString('vi-VN')}₫</b> | Trạng thái: <span class="badge ${fees[5].status==='Đã thanh toán'?'ok':'bad'}">${fees[5].status}</span></div>
      <div class="card"><b>Bảng kê chi tiết</b> <button id='btn-fee-breakdown' style='margin-left:8px;padding:2px 10px;font-size:14px'>Xem</button></div>
      <div class="card" style="text-align:center"><b>Chuyển khoản</b><br><div style="margin:8px 0 4px 0">Số tài khoản: <b>123456789</b><br>Chủ tài khoản: <b>Trường ${t==='sunshine'?'Sunshine':'Rainbow'}</b><br>Cú pháp: <b>${myChild.id} ${myChild.name} HP0825</b></div><img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=demo" style="display:block;margin:12px auto 0 auto"></div>
      <div class="card"><b>Học phí các tháng trước</b><ul style='padding-left:18px'>${fees.slice(0,5).reverse().map((f,idx)=>{
        const realIdx = 4-idx;
        return `<li style='cursor:pointer;color:#1976d2' class='fee-prev-item' data-month='${realIdx}'>${months[realIdx]}: <b>${f.amount.toLocaleString('vi-VN')}₫</b> <span class="badge ${f.status==='Đã thanh toán'?'ok':'bad'}">${f.status}</span></li>`;
      }).join('')}</ul></div>
    `;

    // Sự kiện xem bảng kê tháng hiện tại
    setTimeout(()=>{
      document.getElementById('btn-fee-breakdown').onclick = ()=>showFeeModal(5);
      document.querySelectorAll('.fee-prev-item').forEach(el=>{
        el.onclick = ()=>showFeeModal(+el.getAttribute('data-month'));
      });
    },100);
  }
}
const fmt = (n)=>n.toLocaleString('vi-VN');
const uid = ()=>'S'+Math.random().toString(36).slice(2,8).toUpperCase();

function updateQuery(kv){
  const p=new URLSearchParams(location.search);
  Object.entries(kv).forEach(([k,v])=>p.set(k,v));
  return '?'+p.toString();
}

const DATA = {
  tenants: [
    { code:"sunshine", name:"Sunshine Kindergarten", state:"active", students:10, revenue:44090000, expense:45256000, admin: {id:"A1", name:"Nguyen Van A", email:"admin.sunshine@example.com"} },
    { code:"rainbow", name:"Rainbow School", state:"active", students:5, revenue:22000000, expense:21000000, admin: {id:"A2", name:"Tran Thi B", email:"admin.rainbow@example.com"} }
  ],
  classes: {
    sunshine:[
      {code:"KGA",name:"Kindergarten A",block:"kindergarten",teacher:{id:"T1",name:"Le Teacher 1",email:"teacher1.sunshine@example.com"}},
      {code:"KGB",name:"Kindergarten B",block:"preparatory",teacher:{id:"T2",name:"Pham Teacher 2",email:"teacher2.sunshine@example.com"}}
    ],
    rainbow:[
      {code:"R1",name:"Rainbow A",block:"kindergarten",teacher:{id:"T3",name:"Nguyen Teacher 1",email:"teacher1.rainbow@example.com"}},
      {code:"R2",name:"Rainbow B",block:"preparatory",teacher:{id:"T4",name:"Tran Teacher 2",email:"teacher2.rainbow@example.com"}}
    ]
  },
  students: {
    sunshine:[
      {id:"S1",name:"Nguyen Gia Bao",class:"KGA",gender:"male",dob:"2019-03-15",parent:{id:"P1",name:"Pham Van Binh",email:"binh.parent.sunshine@example.com"}, allergies:"Không", notes:"Ăn ngoan, thích vẽ", address:"12 Lê Lợi, Q.1", phone:"0901234567"},
      {id:"S2",name:"Tran My An",class:"KGA",gender:"female",dob:"2019-07-22",parent:{id:"P2",name:"Tran Thi Lan",email:"lan.parent.sunshine@example.com"}, allergies:"Trứng", notes:"Cần chú ý khi vận động", address:"34 Nguyễn Huệ, Q.1", phone:"0902345678"},
      {id:"S3",name:"Le Quang Huy",class:"KGA",gender:"male",dob:"2018-11-05",parent:{id:"P3",name:"Le Van Son",email:"son.parent.sunshine@example.com"}, allergies:"Không", notes:"Thích toán, hơi nhút nhát", address:"56 Pasteur, Q.3", phone:"0903456789"},
      {id:"S4",name:"Pham Minh Chau",class:"KGB",gender:"female",dob:"2019-01-30",parent:{id:"P4",name:"Pham Thi Dao",email:"dao.parent.sunshine@example.com"}, allergies:"Sữa", notes:"Năng động, thích múa", address:"78 Hai Bà Trưng, Q.1", phone:"0904567890"},
      {id:"S5",name:"Do Bao Han",class:"KGB",gender:"female",dob:"2018-09-18",parent:{id:"P5",name:"Do Van Hieu",email:"hieu.parent.sunshine@example.com"}, allergies:"Không", notes:"Chăm chỉ, thích đọc truyện", address:"90 Lý Tự Trọng, Q.1", phone:"0905678901"},
      {id:"S6",name:"Nguyen Nhat Nam",class:"KGB",gender:"male",dob:"2019-05-10",parent:{id:"P6",name:"Nguyen Thi Hoa",email:"hoa.parent.sunshine@example.com"}, allergies:"Không", notes:"Thích bóng đá", address:"11 Nguyễn Đình Chiểu, Q.3", phone:"0906789012"}
    ],
    rainbow:[
      {id:"R1S1",name:"Nguyen Minh Khoa",class:"R1",gender:"male",dob:"2019-04-10",parent:{id:"RP1",name:"Nguyen Van Cuong",email:"cuong.parent.rainbow@example.com"}, allergies:"Không", notes:"Thích thể thao", address:"12 Lê Lợi, Q.5", phone:"0911234567"},
      {id:"R1S2",name:"Tran Bao Chau",class:"R1",gender:"female",dob:"2019-08-12",parent:{id:"RP2",name:"Tran Thi Mai",email:"mai.parent.rainbow@example.com"}, allergies:"Tôm", notes:"Vui vẻ, thích hát", address:"34 Nguyễn Huệ, Q.5", phone:"0912345678"},
      {id:"R2S1",name:"Le Quoc Duy",class:"R2",gender:"male",dob:"2018-12-01",parent:{id:"RP3",name:"Le Van Tien",email:"tien.parent.rainbow@example.com"}, allergies:"Không", notes:"Thích vẽ, thích toán", address:"56 Pasteur, Q.5", phone:"0913456789"},
      {id:"R2S2",name:"Pham Minh Anh",class:"R2",gender:"female",dob:"2019-02-25",parent:{id:"RP4",name:"Pham Thi Hoa",email:"hoa.parent.rainbow@example.com"}, allergies:"Không", notes:"Năng động, thích múa", address:"78 Hai Bà Trưng, Q.5", phone:"0914567890"},
      {id:"R2S3",name:"Do Bao Linh",class:"R2",gender:"female",dob:"2018-10-20",parent:{id:"RP5",name:"Do Van Phuc",email:"phuc.parent.rainbow@example.com"}, allergies:"Không", notes:"Chăm chỉ, thích đọc truyện", address:"90 Lý Tự Trọng, Q.5", phone:"0915678901"},
      {id:"R2S4",name:"Hoang Gia Huy",class:"R2",gender:"male",dob:"2019-06-15",parent:{id:"RP6",name:"Hoang Thi Dao",email:"dao.parent.rainbow@example.com"}, allergies:"Không", notes:"Thích piano", address:"22 Nguyễn Văn Cừ, Q.5", phone:"0916789012"}
    ]
  },
  invoicesAug: {
    sunshine:[["S1","Nguyen Gia Bao","KGA",4230000],["S2","Tran My An","KGA",4210000],["S3","Le Quang Huy","KGA",4100000],["S4","Pham Minh Chau","KGB",4320000],["S5","Do Bao Han","KGB",3940000],["S6","Nguyen Nhat Nam","KGB",4820000],["S7","Hoang Quynh","KGB",4650000],["S8","Vo Thanh Long","KGB",4790000],["S9","Phan Bao Tram","KGB",4440000],["S10","Dang Gia Han","KGB",4590000]],
    rainbow:[["R1S1","Nguyen Minh Khoa","R1",4200000],["R1S2","Tran Bao Chau","R1",4100000],["R2S1","Le Quoc Duy","R2",4300000],["R2S2","Pham Minh Anh","R2",4200000],["R2S3","Do Bao Linh","R2",4200000]]
  },
  expensesAug: {
    sunshine:[["Food","192 meals × 18,000",3456000],["TeachingMaterial","Books & supplies",1000000],["StaffCost","Teachers salaries",24000000],["Operations","Utilities & rent",14000000],["Marketing","Aug campaigns",2500000],["Medical","Consumables",300000]],
    rainbow:[["Food","100 meals × 18,000",1800000],["TeachingMaterial","Books & supplies",500000],["StaffCost","Teachers salaries",12000000],["Operations","Utilities & rent",7000000],["Marketing","Aug campaigns",1000000],["Medical","Consumables",150000]]
  },
  policies: ["Absent = not_charge (no session, no meal)","Late = meal_deduction (session charged, meal not charged)","Invoice = Tuition + Meals + Language/Talent + Facility + Event","Discounts: sibling / scholarship / custom"],
  attendanceSummaryAug: [
    ["S1","KGA","Absent: 07/08 | Late: 05/08"],["S2","KGA","Absent: 20/08 | Late: –"],["S3","KGA","Absent: 21/08 | Late: 05/08, 13/08"],["S4","KGB","Absent: – | Late: –"],["S5","KGB","Absent: 07/08, 20/08, 29/08 | Late: 12/08"],["S6","KGB","Absent: – | Late: –"],["S7","KGB","Absent: 21/08 | Late: 06/08"],["S8","KGB","Absent: 19/08 | Late: –"],["S9","KGB","Absent: 07/08 | Late: 05/08, 14/08"],["S10","KGB","Absent: 08/08, 18/08, 27/08 | Late: 13/08"],
    ["R1S1","R1","Absent: 01/08 | Late: 02/08"],["R1S2","R1","Absent: 03/08 | Late: –"],["R2S1","R2","Absent: – | Late: 05/08"],["R2S2","R2","Absent: – | Late: –"],["R2S3","R2","Absent: 10/08 | Late: 12/08"]
  ],
  healthAug: [
    ["S1","114.5 cm","20.5 kg","15.6"],["S2","113.5 cm","19.6 kg","15.2"],["S3","115.5 cm","20.8 kg","15.6"],["S4","114.5 cm","20.2 kg","15.4"],["S5","112.5 cm","19.3 kg","15.3"],["S6","117.5 cm","21.6 kg","15.6"],["S7","116.5 cm","21.0 kg","15.4"],["S8","117.5 cm","21.4 kg","15.5"],["S9","115.5 cm","20.3 kg","15.2"],["S10","116.5 cm","20.9 kg","15.4"],
    ["R1S1","110.0 cm","18.0 kg","14.9"],["R1S2","111.0 cm","18.5 kg","15.1"],["R2S1","112.0 cm","19.0 kg","15.2"],["R2S2","113.0 cm","19.5 kg","15.3"],["R2S3","114.0 cm","20.0 kg","15.4"]
  ],
  skillsAug: [
    ["S1","phonics_recognition",4,"Shares actively"],["S2","cutting_shapes",4,"Good circles"],["S3","basic_vocabulary",4,"Topic words"],["S4","phonics_recognition",5,"Model for class"],["S5","pencil_grip",3,"Improve posture"],["S6","sight_words",4,"~30 words"],["S7","self_care",4,"Cleans up"],["S8","write_letters",4,"Even strokes"],["S9","simple_sentences",3,"Needs confidence"],["S10","teamwork",4,"Positive interactions"],
    ["R1S1","phonics_recognition",4,"Good progress"],["R1S2","cutting_shapes",4,"Nice work"],["R2S1","basic_vocabulary",4,"Knows topic words"],["R2S2","phonics_recognition",5,"Model for class"],["R2S3","pencil_grip",3,"Needs improvement"]
  ],
  parentChildren: {
    sunshine:[
      ["S1","Nguyen Gia Bao","KGA","P1"],
      ["S2","Tran My An","KGA","P2"],
      ["S3","Le Quang Huy","KGA","P3"],
      ["S4","Pham Minh Chau","KGB","P4"],
      ["S5","Do Bao Han","KGB","P5"]
    ],
    rainbow:[
      ["R1S1","Nguyen Minh Khoa","R1","RP1"],
      ["R1S2","Tran Bao Chau","R1","RP2"],
      ["R2S1","Le Quoc Duy","R2","RP3"],
      ["R2S2","Pham Minh Anh","R2","RP4"],
      ["R2S3","Do Bao Linh","R2","RP5"]
    ]
  }
};

function lsKeyStudents(t){ return `kindy_custom_${t}_students`; }
function loadCustomStudents(t){ try { return JSON.parse(localStorage.getItem(lsKeyStudents(t))||'[]'); } catch(e){ return []; } }
function saveCustomStudents(t, arr){ localStorage.setItem(lsKeyStudents(t), JSON.stringify(arr)); }

function showAccountInfo() {
  const role = localStorage.getItem('active_role') || '';
  const tenant = localStorage.getItem('active_tenant') || '';
  const locale = localStorage.getItem('active_locale') || 'vi-VN';
  let name = '', email = '', roleLabel = role;
  if (role === 'super_admin') {
    name = 'Super Admin';
    email = 'super.admin@example.com';
    roleLabel = 'Super Admin';
  } else if (role === 'tenant_admin') {
    const t = DATA.tenants.find(x=>x.code===tenant);
    name = t?.admin?.name || '';
    email = t?.admin?.email || '';
    roleLabel = 'Tenant Admin';
  } else if (role === 'teacher') {
    // Lấy teacher theo tenant và email
    const teachers = (DATA.classes[tenant]||[]).map(c=>c.teacher);
    const emailStored = localStorage.getItem('active_email') || '';
    const teacher = teachers.find(t=>t.email===emailStored) || teachers[0];
    name = teacher?.name || '';
    email = teacher?.email || '';
    roleLabel = 'Teacher';
  } else if (role === 'parent') {
    const emailStored = localStorage.getItem('active_email') || '';
    const students = (DATA.students[tenant]||[]);
    const stu = students.find(s=>s.parent && s.parent.email===emailStored);
    name = stu?.parent?.name || '';
    email = stu?.parent?.email || '';
    roleLabel = 'Parent';
  }
  const html = `<div class="card" style="min-width:220px"><b>${roleLabel}</b><br>${name}<br><span style='font-size:12px;color:#888'>${email}</span><br><span style='font-size:12px'>Tenant: ${tenant}</span></div>`;
  const box = document.createElement('div');
  box.innerHTML = html;
  box.style.position = 'fixed'; box.style.top = '60px'; box.style.right = '20px'; box.style.zIndex = 9999; box.style.background = '#fff'; box.style.border = '1px solid #ccc'; box.style.padding = '16px'; box.style.borderRadius = '8px';
  box.onclick = ()=>box.remove();
  document.body.appendChild(box);
  setTimeout(()=>{ if(document.body.contains(box)) box.remove(); }, 6000);
}

(function init(){
  const page = document.body.dataset.page;
  const requiredRole = document.body.dataset.requiredRole || null;

  // Add account button to header if not exists
  setTimeout(()=>{
    if (!document.getElementById('account-btn')) {
      const header = document.querySelector('.topbar .controls') || document.querySelector('.topbar');
      if (header) {
        const btn = document.createElement('button');
        btn.id = 'account-btn';
        btn.className = 'ghost';
        btn.textContent = 'Tài khoản';
        btn.style.marginLeft = '8px';
        btn.onclick = showAccountInfo;
        header.appendChild(btn);
      }
    }
  }, 200);

  // Đảm bảo nút đăng xuất trên tất cả các trang đều redirect về login.html
  setTimeout(()=>{
    document.querySelectorAll('#signout').forEach(signout=>{
      signout.onclick=()=>{
        localStorage.removeItem('active_role');
        localStorage.removeItem('active_tenant');
        localStorage.removeItem('active_email');
        localStorage.removeItem('active_locale');
        location.href='login.html';
      };
    });
  }, 200);

  const tenantSel = document.getElementById('tenant');
  if (tenantSel) {
    const t = qs('tenant') || localStorage.getItem('active_tenant') || 'sunshine';
    const list = DATA.tenants.map(x=>x.code);
    list.forEach(code=>{
      const o=document.createElement('option'); o.value=code; o.textContent=DATA.tenants.find(x=>x.code===code).name;
      if(code===t) o.selected=true; tenantSel.appendChild(o);
    });
    tenantSel.onchange=()=>{ localStorage.setItem('active_tenant', tenantSel.value); location.search = updateQuery({tenant:tenantSel.value}); };
  }

  // Guard: Only allow correct role and school/class/student for each page
  if (requiredRole){
    const role = qs('role') || localStorage.getItem('active_role');
    const tenant = qs('tenant') || localStorage.getItem('active_tenant');
    const email = localStorage.getItem('active_email') || '';
    // Map html role to code role
    const roleMap = {
      'tenant_admin': 'admin',
      'super_admin': 'super-admin',
      'teacher': 'teacher',
      'parent': 'parent'
    };
    // Super admin truy cập mọi trường
    if (role==='super_admin') {
      // pass
    } else if (role==='tenant_admin') {
      // Admin chỉ truy cập trường của họ
      if (page==='admin' && tenant) {
        const admin = DATA.tenants.find(x=>x.code===tenant)?.admin;
        if (!admin || admin.email!==email) {
          toast(STR[getLocale()].guard_denied);
          setTimeout(()=>location.href='login.html', 1200);
          return;
        }
      }
    } else if (role==='teacher') {
      // Teacher chỉ truy cập đúng trường và class của mình
      const teacherClasses = (DATA.classes[tenant]||[]).filter(c=>c.teacher?.email===email);
      if (!teacherClasses.length) {
        toast(STR[getLocale()].guard_denied);
        setTimeout(()=>location.href='login.html', 1200);
        return;
      }
    } else if (role==='parent') {
      // Parent chỉ truy cập đúng trường và đúng học sinh của mình
      const students = (DATA.students[tenant]||[]);
      const myChild = students.find(s=>s.parent && s.parent.email===email);
      if (!myChild) {
        toast(STR[getLocale()].guard_denied);
        setTimeout(()=>location.href='login.html', 1200);
        return;
      }
    }
    // Restrict /admin/** to only admin/super-admin
    if (page==='admin' && !(role==='tenant_admin'||role==='super_admin')){
      toast(STR[getLocale()].guard_denied);
      setTimeout(()=>location.href='login.html', 1200);
      return;
    }
    // Restrict /super-admin to only super_admin
    if (page==='super-admin' && role!=='super_admin'){
      toast(STR[getLocale()].guard_denied);
      setTimeout(()=>location.href='login.html', 1200);
      return;
    }
  }

  if (page==='super-admin') renderPlatform();
  if (page==='admin') renderAdmin();
  if (page==='teacher') renderTeacher();
  if (page==='parent') renderParent();
})();

function renderPlatform(){
  const kpis = document.getElementById('platform-kpis');
  // Card trường: tổng số lớp, tổng số học sinh, học sinh theo lớp, tổng số giáo viên
  kpis.innerHTML = DATA.tenants.map(t => {
    const classes = DATA.classes[t.code]||[];
    const students = DATA.students[t.code]||[];
    const teachers = classes.map(c=>c.teacher).filter(Boolean);
    const studentsByClass = classes.map(c=>`<div>Lớp ${c.code}: <b>${students.filter(s=>s.class===c.code).length}</b></div>`).join('');
    return `<div class="card"><b>${t.name}</b><br>
      Tổng số lớp: <b>${classes.length}</b><br>
      Tổng số học sinh: <b>${students.length}</b><br>
      ${studentsByClass}
      Tổng số giáo viên: <b>${teachers.length}</b>
    </div>`;
  }).join('');

  // Card tenants: chỉ tên, State (có thể đổi), Admin tenant
  const table = document.getElementById('tenant-table');
  table.innerHTML = thead(['Tenant','State','Admin']) +
    DATA.tenants.map(t =>
      tr([
        t.name,
        `<select onchange="window.updateTenantState&&window.updateTenantState('${t.code}',this.value)">
          <option value="active"${t.state==='active'?' selected':''}>Active</option>
          <option value="pending"${t.state==='pending'?' selected':''}>Pending</option>
          <option value="inactive"${t.state==='inactive'?' selected':''}>Inactive</option>
        </select>`,
        t.admin?.name||''
      ])
    ).join('');

  // Students list = base + custom, filtered by tenant_id
  const st = document.getElementById('students-table');
  st.innerHTML = thead(['ID','Name','Class']) + students.map(s=>tr([s.id, s.name, s.class])).join('');

  // Invoices
  const inv = document.getElementById('invoices-table');
  inv.innerHTML = thead(['ID','Name','Class','Total']) +
    (DATA.invoicesAug[t]||[]).map(r=>tr([r[0], r[1], r[2], fmt(r[3])+'₫'])).join('');

  // Expenses
  const ex = document.getElementById('expenses-table');
  ex.innerHTML = thead(['Category','Detail','Amount']) +
    (DATA.expensesAug[t]||[]).map(r=>tr([r[0], r[1], fmt(r[2])+'₫'])).join('');

  // Policies
  const pl = document.getElementById('policy-list');
  pl.innerHTML = DATA.policies.map(p=>`<li>${p}</li>`).join('');

}

function renderTeacher(){
  // Lấy thông tin giáo viên, lớp, học sinh
  const t = qs('tenant') || localStorage.getItem('active_tenant') || 'sunshine';
  const email = localStorage.getItem('active_email') || '';
  const classes = (DATA.classes[t]||[]);
  const myClass = classes.find(c=>c.teacher?.email===email) || classes[0];
  const students = (DATA.students[t]||[]).filter(s=>s.class===myClass.code);
  // Card 1: tên lớp, tổng sĩ số, nam, nữ
  const total = students.length;
  const male = students.filter(s=>s.gender==='male').length;
  const female = students.filter(s=>s.gender==='female').length;
  // Card 2: tổng status học phí bé của lớp
  const invoices = (DATA.invoicesAug[t]||[]).filter(i=>i[2]===myClass.code);
  const paid = invoices.filter(i=>i[3]%2===0).length;
  const unpaid = invoices.length - paid;
  // Card 3: thời khoá biểu/lịch ăn uống
  const schedule = [
    {time:'7:30', activity:'Đón trẻ, ăn sáng'},
    {time:'8:30', activity:'Học Toán/Văn/Anh'},
    {time:'10:00', activity:'Chơi ngoài trời'},
    {time:'11:00', activity:'Ăn trưa, nghỉ trưa'},
    {time:'14:00', activity:'Học kỹ năng, vẽ'},
    {time:'15:00', activity:'Ăn xế, chơi tự do'},
    {time:'16:00', activity:'Trả trẻ'}
  ];
  // Card 4: điểm danh
  // Giả lập: bé có "Absent" là nghỉ, còn lại là đi học
  const attData = (DATA.attendanceSummaryAug||[]).filter(r=>r[1]===myClass.code);
  let present = 0, absent = 0;
  students.forEach(s => {
    const att = attData.find(a=>a[0]===s.id);
    if(att && att[2].includes('Absent')) absent++;
    else present++;
  });
  // Card 5: nhận xét & ghi chú từ admin
  const notes = [
    {date:'2025-08-01',note:'Lưu ý: kiểm tra sức khoẻ các bé đầu tháng.'},
    {date:'2025-08-15',note:'Tổ chức hoạt động ngoài trời.'}
  ];
  // Render card view
  const container = document.querySelector('main.container');
  container.innerHTML = `
    <h1>Dashboard Giáo viên</h1>
    <div class="card" style="margin-bottom:16px">
      <b>Lớp: ${myClass.name} (${myClass.code})</b><br>
      Tổng sĩ số: <b>${total}</b> | Nam: <b>${male}</b> | Nữ: <b>${female}</b>
    </div>
    <div class="card" style="margin-bottom:16px">
      <b>Học phí tháng 8/2025</b><br>
      Đã đóng: <b>${paid}</b> bé | Chưa đóng: <b>${unpaid}</b> bé
    </div>
    <div class="card" style="margin-bottom:16px">
      <b>Thời khoá biểu & lịch ăn uống</b>
      <table class="table" style="width:100%;margin-top:8px">
        <tr><th>Thời gian</th><th>Hoạt động</th></tr>
        ${schedule.map(s=>`<tr><td>${s.time}</td><td>${s.activity}</td></tr>`).join('')}
      </table>
    </div>
    <div class="card" style="margin-bottom:16px">
      <b>Điểm danh hôm nay (${new Date().toLocaleDateString('vi-VN')})</b><br>
      <div style="margin:8px 0">
        <b>Đi học:</b> ${present} bé &nbsp; <b>Nghỉ:</b> ${absent} bé
      </div>
      <button class="primary" style="margin-right:8px" onclick="alert('Cập nhật điểm danh thành công!')">Cập nhật điểm danh</button>
      <button class="primary" onclick="alert('Cập nhật sức khoẻ thành công!')">Cập nhật Sức khoẻ</button>
    </div>
    <div class="card">
      <b>Nhận xét & ghi chú từ admin</b>
      <ul>${notes.map(n=>`<li>${n.date}: ${n.note}</li>`).join('')}</ul>
    </div>
  `;
}

function renderParent(){
  const t = qs('tenant') || localStorage.getItem('active_tenant') || 'sunshine';
  const parentEmail = localStorage.getItem('active_email') || '';
  // Find student for this parent
  const students = (DATA.students[t]||[]);
  const myChild = students.find(s => s.parent && s.parent.email === parentEmail);
  const dash = document.getElementById('parent-dashboard');
  if (!myChild) {
    dash.innerHTML = '<div style="color:red">Không tìm thấy học sinh cho phụ huynh này.</div>';
    return;
  }
  // Lấy giáo viên chủ nhiệm
  const classInfo = (DATA.classes[t]||[]).find(c=>c.code===myChild.class);
  const teacher = classInfo?.teacher;
  // BMI/health data 2 tháng gần nhất (giả lập 07/2025 và 08/2025, luôn đủ dữ liệu)
  let healths = (DATA.healthAug||[]).filter(r=>r[0]===myChild.id);
  // Đảm bảo luôn có 2 tháng
  let h7 = {date:'07/2025', height:myChild.gender==='male'?110:109, weight:myChild.gender==='male'?17.5:17.0, bmi:myChild.gender==='male'?14.5:14.3};
  let h8 = healths.length ? {date:'08/2025', height:parseFloat(healths[0][1]), weight:parseFloat(healths[0][2]), bmi:parseFloat(healths[0][3])} : {date:'08/2025', height:h7.height+2, weight:h7.weight+0.5, bmi:((h7.weight+0.5)/(((h7.height+2)/100)**2)).toFixed(1)};
  const healthHistory = [h7, h8];
  // Tuổi làm tròn
  const dob = new Date(myChild.dob);
  const now = new Date('2025-08-01');
  const ageMonths = (now.getFullYear()-dob.getFullYear())*12 + (now.getMonth()-dob.getMonth());
  const age = Math.round(ageMonths/12);
  // BMI chuẩn mẫu
  const refBMI = myChild.gender==='male' ? 15.5 : 15.2;
  // Lịch học tuần mẫu
  const weekDays = ['Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6'];
  const todayIdx = (new Date()).getDay()-1; // 0=Monday
  const schedule = [
    {day:'Thứ 2',subject:'Toán, Vẽ'},
    {day:'Thứ 3',subject:'Văn, Âm nhạc'},
    {day:'Thứ 4',subject:'Tiếng Anh, Thể dục'},
    {day:'Thứ 5',subject:'Khoa học, Vẽ'},
    {day:'Thứ 6',subject:'Kỹ năng sống, Âm nhạc'}
  ];
  // Học phí tháng hiện tại
  const invoice = (DATA.invoicesAug[t]||[]).find(r=>r[0]===myChild.id);
  dash.innerHTML = `
    <div class="card" style="margin-bottom:16px">
      <div style="font-size:20px;font-weight:700">${myChild.name}</div>
      <div>Lớp: <b>${myChild.class}</b> | Tuổi: <b>${age}</b></div>
      <div>Giáo viên chủ nhiệm: <b>${teacher?.name||'N/A'}</b> <a href="https://zalo.me/" target="_blank" style="margin-left:8px;color:#007bff;text-decoration:underline">Zalo</a></div>
    </div>
    <div class="card" style="margin-bottom:16px">
      <div style="font-weight:600">Sức khoẻ & biểu đồ tháng gần nhất</div>
      <div>Cân nặng: <b>${healthHistory[1]?.weight||'N/A'} kg</b> | Chiều cao: <b>${healthHistory[1]?.height||'N/A'} cm</b> | BMI: <b>${healthHistory[1]?.bmi||'N/A'}</b></div>
      <div style="margin-top:8px">
        <canvas id="bmiChart" width="320" height="180"></canvas>
      </div>
      <div style="margin-top:8px">
        <canvas id="hwChart" width="320" height="180"></canvas>
      </div>
      <div style="font-size:12px;color:#888">Đường nét đứt: BMI chuẩn Việt Nam cho ${myChild.gender==='male'?'bé trai':'bé gái'} cùng tuổi</div>
    </div>
    <div class="card" style="margin-bottom:16px">
      <div style="font-weight:600">Lịch học tuần này</div>
      <table class="table" style="width:100%;margin-top:8px">
        <tr>${schedule.map(s=>`<th>${s.day}</th>`).join('')}</tr>
        <tr>${schedule.map((s,i)=>`<td style="${i===todayIdx?'background:#e3f2fd':''}">${s.subject}<br><span style='font-size:11px;color:#888'>Ăn sáng: 7:30<br>Ăn trưa: 11:00<br>Ăn xế: 15:00</span></td>`).join('')}</tr>
      </table>
      <div style="font-size:12px;color:#888">* Hôm nay: ${schedule[todayIdx]?.subject||''}</div>
    </div>
    <div class="card">
      <div style="font-weight:600">Học phí tháng 8/2025</div>
      <div>Số tiền: <b>${invoice?fmt(invoice[3])+'₫':'N/A'}</b> | Trạng thái: <span class="badge ${invoice&&invoice[3]%2===0?'ok':'bad'}">${invoice?(invoice[3]%2===0?'Đã thanh toán':'Chưa thanh toán'):'N/A'}</span></div>
    </div>
  `;
  // Vẽ biểu đồ BMI
  setTimeout(()=>{
    const ctx = document.getElementById('bmiChart').getContext('2d');
    ctx.clearRect(0,0,320,180);
    ctx.strokeStyle = '#888'; ctx.beginPath(); ctx.moveTo(40,160); ctx.lineTo(300,160); ctx.moveTo(40,160); ctx.lineTo(40,20); ctx.stroke();
    // BMI 2 tháng
    ctx.strokeStyle = '#007bff'; ctx.beginPath();
    healthHistory.forEach((h,i)=>{
      const x = 40 + i*120;
      const y = 160-h.bmi*8;
      if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      ctx.arc(x,y,3,0,2*Math.PI); ctx.moveTo(x,y);
    });
    ctx.stroke();
    // BMI chuẩn
    ctx.setLineDash([5,5]);
    ctx.strokeStyle = '#f00'; ctx.beginPath();
    ctx.moveTo(40,160-refBMI*8);
    ctx.lineTo(300,160-refBMI*8);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#f00';
    ctx.fillText('BMI chuẩn: '+refBMI, 180, 160-refBMI*8-5);
    ctx.fillStyle = '#007bff';
    healthHistory.forEach((h,i)=>ctx.fillText(h.date, 40+i*120-10, 170));
  }, 100);
  // Vẽ biểu đồ chiều cao/cân nặng
  setTimeout(()=>{
    const ctx = document.getElementById('hwChart').getContext('2d');
    ctx.clearRect(0,0,320,180);
    ctx.strokeStyle = '#888'; ctx.beginPath(); ctx.moveTo(40,160); ctx.lineTo(300,160); ctx.moveTo(40,160); ctx.lineTo(40,20); ctx.stroke();
    // Chiều cao
    ctx.strokeStyle = '#43a047'; ctx.beginPath();
    healthHistory.forEach((h,i)=>{
      const x = 40 + i*120;
      const y = 160-h.height;
      if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      ctx.arc(x,y,3,0,2*Math.PI); ctx.moveTo(x,y);
    });
    ctx.stroke();
    ctx.fillStyle = '#43a047'; ctx.fillText('Chiều cao', 250, 30);
    // Cân nặng
    ctx.strokeStyle = '#fbc02d'; ctx.beginPath();
    healthHistory.forEach((h,i)=>{
      const x = 40 + i*120;
      const y = 160-h.weight*6;
      if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      ctx.arc(x,y,3,0,2*Math.PI); ctx.moveTo(x,y);
    });
    ctx.stroke();
    ctx.fillStyle = '#fbc02d'; ctx.fillText('Cân nặng', 250, 50);
    healthHistory.forEach((h,i)=>ctx.fillText(h.date, 40+i*120-10, 170));
  }, 120);
}

// ===== UI helpers =====
function thead(cols){ return `<thead><tr>${cols.map(c=>`<th>${c}</th>`).join('')}</tr></thead><tbody>`; }
function tr(cols){ return `<tr>${cols.map(c=>`<td>${c}</td>`).join('')}</tr>`; }
function cardMini(label, value, kind){
  const cls = kind==='ok'?'badge ok':kind==='bad'?'badge bad':'badge';
  return `<div class="card"><div>${label}</div><div style="margin-top:8px;font-size:20px;font-weight:700">${value}</div><div style="margin-top:10px"><span class="${cls}">${kind?kind.toUpperCase():'INFO'}</span></div></div>`;
}
function cardKPI(title, rows){
  return `<div class="card"><div style="font-weight:700">${title}</div>${rows.map(r=>`
    <div style="display:flex;justify-content:space-between;margin-top:8px"><span>${r[0]}</span><span style="font-weight:700">${r[1]}</span></div>`).join('')}</div>`;
}
function badgeState(s){
  const m = {active:'ok',pending:'warn',off:'bad',archived:'bad'};
  const k = m[s]||'';
  return `<span class="badge ${k}">${s.toUpperCase()}</span>`;
}
function toast(msg){
  const el = document.createElement('div');
  el.className = 'toast'; el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(()=>{ el.remove(); }, 1800);
}
