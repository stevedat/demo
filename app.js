// ===== i18n strings =====
const STR = {
  "vi-VN": {
    login_title:"Đăng nhập", tenant:"Trường (Tenant)", role:"Vai trò", email:"Email", password:"Mật khẩu", signin:"Đăng nhập", signout:"Đăng xuất", note_mock:"Demo tĩnh: không kiểm tra tài khoản thật.",
    platform_title:"Nền tảng (Super Admin)", tenants:"Tenants",
    admin_title:"Bảng điều khiển (Tenant Admin)", students:"Học sinh", invoices:"Hóa đơn 08/2025", expenses:"Chi phí 08/2025", policies:"Chính sách tính phí",
    teacher_title:"Giáo viên (lớp được phân công)", attendance_aug:"Attendance 08/2025 (tóm tắt)", health_trend:"Sức khỏe (W/H/BMI)", learning_skills:"Nhận xét & Kỹ năng (08/2025)",
    parent_title:"Phụ huynh", my_children:"Con của tôi", my_invoices:"Hóa đơn 08/2025", attendance_mini:"Attendance tóm tắt",
    add_student_title:"Thêm học sinh mới", student_name:"Họ và tên", student_class:"Lớp", student_gender:"Giới tính", student_dob:"Ngày sinh", add_student_btn:"Thêm học sinh",
    add_success:"Đã thêm học sinh mới", guard_denied:"Bạn không có quyền truy cập trang này. Đang quay về trang đăng nhập…"
  },
  "en-US": {
    login_title:"Sign in", tenant:"Tenant (School)", role:"Role", email:"Email", password:"Password", signin:"Sign in", signout:"Sign out", note_mock:"Static demo: no real auth.",
    platform_title:"Platform (Super Admin)", tenants:"Tenants",
    admin_title:"Dashboard (Tenant Admin)", students:"Students", invoices:"Invoices Aug/2025", expenses:"Expenses Aug/2025", policies:"Billing Policies",
    teacher_title:"Teacher (assigned classes)", attendance_aug:"Attendance Aug/2025 (summary)", health_trend:"Health (W/H/BMI)", learning_skills:"Learning & Skills (Aug/2025)",
    parent_title:"Parent", my_children:"My Children", my_invoices:"Invoices Aug/2025", attendance_mini:"Attendance summary",
    add_student_title:"Add new student", student_name:"Full name", student_class:"Class", student_gender:"Gender", student_dob:"Date of birth", add_student_btn:"Add student",
    add_success:"New student added", guard_denied:"You are not authorized for this page. Redirecting to login…"
  }
};

const qs = (k)=>new URLSearchParams(location.search).get(k);
const fmt = (n)=>n.toLocaleString('vi-VN');
const uid = ()=>'S'+Math.random().toString(36).slice(2,8).toUpperCase();

function updateQuery(kv){
  const p=new URLSearchParams(location.search);
  Object.entries(kv).forEach(([k,v])=>p.set(k,v));
  return '?'+p.toString();
}
function getLocale(){ return qs('locale') || localStorage.getItem('active_locale') || 'vi-VN'; }
function translate(){
  const loc = getLocale();
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n'); el.textContent = STR[loc][key] || el.textContent;
  });
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
      {id:"S1",name:"Nguyen Gia Bao",class:"KGA",gender:"male",dob:"2019-03-15",parent:{id:"P1",name:"Pham Van Binh",email:"binh.parent.sunshine@example.com"}},
      {id:"S2",name:"Tran My An",class:"KGA",gender:"female",dob:"2019-07-22",parent:{id:"P2",name:"Tran Thi Lan",email:"lan.parent.sunshine@example.com"}},
      {id:"S3",name:"Le Quang Huy",class:"KGA",gender:"male",dob:"2018-11-05",parent:{id:"P3",name:"Le Van Son",email:"son.parent.sunshine@example.com"}},
      {id:"S4",name:"Pham Minh Chau",class:"KGB",gender:"female",dob:"2019-01-30",parent:{id:"P4",name:"Pham Thi Dao",email:"dao.parent.sunshine@example.com"}},
      {id:"S5",name:"Do Bao Han",class:"KGB",gender:"female",dob:"2018-09-18",parent:{id:"P5",name:"Do Van Hieu",email:"hieu.parent.sunshine@example.com"}}
    ],
    rainbow:[
      {id:"R1S1",name:"Nguyen Minh Khoa",class:"R1",gender:"male",dob:"2019-04-10",parent:{id:"RP1",name:"Nguyen Van Cuong",email:"cuong.parent.rainbow@example.com"}},
      {id:"R1S2",name:"Tran Bao Chau",class:"R1",gender:"female",dob:"2019-08-12",parent:{id:"RP2",name:"Tran Thi Mai",email:"mai.parent.rainbow@example.com"}},
      {id:"R2S1",name:"Le Quoc Duy",class:"R2",gender:"male",dob:"2018-12-01",parent:{id:"RP3",name:"Le Van Tien",email:"tien.parent.rainbow@example.com"}},
      {id:"R2S2",name:"Pham Minh Anh",class:"R2",gender:"female",dob:"2019-02-25",parent:{id:"RP4",name:"Pham Thi Hoa",email:"hoa.parent.rainbow@example.com"}},
      {id:"R2S3",name:"Do Bao Linh",class:"R2",gender:"female",dob:"2018-10-20",parent:{id:"RP5",name:"Do Van Phuc",email:"phuc.parent.rainbow@example.com"}}
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

  const localeSel = document.getElementById('locale');
  if (localeSel) {
    const loc = getLocale();
    ['vi-VN','en-US'].forEach(l=>{
      const o=document.createElement('option'); o.value=l; o.textContent=(l==='vi-VN'?'Tiếng Việt':'English');
      if(l===loc) o.selected=true; localeSel.appendChild(o);
    });
    localeSel.onchange=()=>{ localStorage.setItem('active_locale', localeSel.value); location.search = updateQuery({locale:localeSel.value}); };
  }
  translate();

  // Sign out always redirects to /login.html
  const signout = document.getElementById('signout');
  if (signout) signout.onclick=()=>{
    localStorage.removeItem('active_role');
    localStorage.removeItem('active_tenant');
    location.href='login.html';
  };

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

  // Guard: Only allow correct role for each page
  if (requiredRole){
    const role = qs('role') || localStorage.getItem('active_role');
    // Map html role to code role
    const roleMap = {
      'tenant_admin': 'admin',
      'super_admin': 'super-admin',
      'teacher': 'teacher',
      'parent': 'parent'
    };
    if (roleMap[role] !== page && !(page==='admin' && role==='super_admin')){
      toast(STR[getLocale()].guard_denied);
      setTimeout(()=>location.href='login.html', 1200);
      return;
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
  kpis.innerHTML = DATA.tenants.map(t => cardKPI(t.name, [
    ["Students", t.students],
    ["Revenue Aug", fmt(t.revenue)+"₫"],
    ["Expense Aug", fmt(t.expense)+"₫"],
    ["State", t.state]
  ])).join('');

  const table = document.getElementById('tenant-table');
  table.innerHTML = thead(['Tenant','State','Students','Revenue Aug','Expense Aug']) +
    DATA.tenants.map(t => tr([t.name, badgeState(t.state), t.students, fmt(t.revenue)+'₫', fmt(t.expense)+'₫'])).join('');
}

function renderAdmin(){
  const t = qs('tenant') || localStorage.getItem('active_tenant') || 'sunshine';
  const tenant = DATA.tenants.find(x=>x.code===t);
  const pnl = tenant.revenue - tenant.expense;
  const kpis = document.getElementById('tenant-kpis');
  kpis.innerHTML = [
    cardMini("Students", tenant.students),
    cardMini("Revenue Aug", fmt(tenant.revenue)+"₫"),
    cardMini("Expense Aug", fmt(tenant.expense)+"₫"),
    cardMini("P&L Aug", (pnl>=0?'+':'')+fmt(pnl)+"₫", pnl>=0?'ok':'bad')
  ].join('');

  // Students list = base + custom, filtered by tenant_id
  const st = document.getElementById('students-table');
  const custom = loadCustomStudents(t).filter(s=>s.tenant_id===t);
  const studs = (DATA.students[t]||[]).concat(custom);
  st.innerHTML = thead(['ID','Name','Class']) + studs.map(s=>tr([s.id, s.name, s.class])).join('');

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

  // Add student form
  const classSel = document.getElementById('new-student-class');
  classSel.innerHTML = (DATA.classes[t]||[]).map(c=>`<option value="${c.code}">${c.name} (${c.code})</option>`).join('');

  document.getElementById('add-student').onclick = ()=>{
    const name = (document.getElementById('new-student-name').value||'').trim();
    const cls = document.getElementById('new-student-class').value;
    const gender = document.getElementById('new-student-gender').value;
    const dob = document.getElementById('new-student-dob').value || null;
    if (!name || !cls){ toast("Tên và Lớp là bắt buộc / Name & Class required"); return; }

    const id = uid();
    // Generate parent for this student
    const parentId = 'P' + id;
    const parentName = name.split(' ').slice(-2).join(' ') + ' Parent';
    const parentEmail = `parent.${id.toLowerCase()}@${t}.example.com`;
    const parent = { id: parentId, name: parentName, email: parentEmail };
    const newStu = { id, name, class: cls, gender, dob, tenant_id: t, parent };
    // Save to custom students
    const arr = loadCustomStudents(t); arr.push(newStu); saveCustomStudents(t, arr);

    // Add to parentChildren
    if (!DATA.parentChildren[t]) DATA.parentChildren[t] = [];
    DATA.parentChildren[t].push([id, name, cls, parentId]);

    // Add to invoices
    if (!DATA.invoicesAug[t]) DATA.invoicesAug[t] = [];
    DATA.invoicesAug[t].push([id, name, cls, 4000000]);

    // Add to attendance
    if (!DATA.attendanceSummaryAug) DATA.attendanceSummaryAug = [];
    DATA.attendanceSummaryAug.push([id, cls, "Absent: – | Late: –"]);

    // Add to health
    if (!DATA.healthAug) DATA.healthAug = [];
    DATA.healthAug.push([id, "110.0 cm", "18.0 kg", "15.0"]);

    // Add to skills
    if (!DATA.skillsAug) DATA.skillsAug = [];
    DATA.skillsAug.push([id, "new_skill", 3, "New student"]);

    const studs2 = (DATA.students[t]||[]).concat(arr.filter(s=>s.tenant_id===t));
    document.getElementById('students-table').innerHTML = thead(['ID','Name','Class']) + studs2.map(s=>tr([s.id, s.name, s.class])).join('');
    toast(STR[getLocale()].add_success + `: ${newStu.id} – ${newStu.name}`);
  };
}

function renderTeacher(){
  const att = document.getElementById('attendance-table');
  att.innerHTML = thead(['ID','Class','Summary']) +
    DATA.attendanceSummaryAug.map(r=>tr([r[0], r[1], r[2]])).join('');

  const ht = document.getElementById('health-table');
  ht.innerHTML = thead(['ID','Height','Weight','BMI']) +
    DATA.healthAug.map(r=>tr([r[0], r[1], r[2], r[3]])).join('');

  const sk = document.getElementById('skills-table');
  sk.innerHTML = thead(['ID','Skill','Score','Comment']) +
    DATA.skillsAug.map(r=>tr([r[0], r[1], r[2], r[3]])).join('');
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
  // BMI/health data 2 tháng gần nhất (giả lập 07/2025 và 08/2025)
  const healths = (DATA.healthAug||[]).filter(r=>r[0]===myChild.id);
  // Giả lập thêm dữ liệu tháng 07/2025 nếu chưa có
  const healthHistory = [
    {date:'07/2025', height:myChild.gender==='male'?110:109, weight:myChild.gender==='male'?17.5:17.0, bmi:myChild.gender==='male'?14.5:14.3},
    ...healths.map(r=>({date:'08/2025', height:parseFloat(r[1]), weight:parseFloat(r[2]), bmi:parseFloat(r[3])}))
  ];
  // Tuổi
  const dob = new Date(myChild.dob);
  const now = new Date('2025-08-01');
  const ageMonths = (now.getFullYear()-dob.getFullYear())*12 + (now.getMonth()-dob.getMonth());
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
      <div>Lớp: <b>${myChild.class}</b> | Tuổi: ${(ageMonths/12).toFixed(1)} năm</div>
      <div>Giáo viên chủ nhiệm: <b>${teacher?.name||'N/A'}</b> <a href="https://zalo.me/" target="_blank" style="margin-left:8px;color:#007bff;text-decoration:underline">Zalo</a></div>
    </div>
    <div class="card" style="margin-bottom:16px">
      <div style="font-weight:600">Sức khoẻ tháng 8/2025</div>
      <div>Cân nặng: <b>${healthHistory[1]?.weight||'N/A'} kg</b> | Chiều cao: <b>${healthHistory[1]?.height||'N/A'} cm</b> | BMI: <b>${healthHistory[1]?.bmi||'N/A'}</b></div>
      <div style="margin-top:8px">
        <canvas id="bmiChart" width="320" height="180"></canvas>
      </div>
      <div style="font-size:12px;color:#888">Đường nét đứt: BMI chuẩn Việt Nam cho ${myChild.gender==='male'?'bé trai':'bé gái'} cùng tuổi</div>
    </div>
    <div class="card" style="margin-bottom:16px">
      <div style="font-weight:600">Biểu đồ chiều cao/cân nặng 2 tháng gần nhất</div>
      <div style="margin-top:8px">
        <canvas id="hwChart" width="320" height="180"></canvas>
      </div>
    </div>
    <div class="card" style="margin-bottom:16px">
      <div style="font-weight:600">Lịch học tuần này</div>
      <table class="table" style="width:100%;margin-top:8px">
        <tr>${schedule.map(s=>`<th>${s.day}</th>`).join('')}</tr>
        <tr>${schedule.map((s,i)=>`<td style="${i===todayIdx?'background:#e3f2fd':''}">${s.subject}</td>`).join('')}</tr>
      </table>
      <div style="font-size:12px;color:#888">* Hôm nay: ${schedule[todayIdx]?.subject||''}</div>
    </div>
    <div class="card">
      <div style="font-weight:600">Học phí tháng 8/2025</div>
      <div>Số tiền: <b>${invoice?fmt(invoice[3])+'₫':'N/A'}</b> | Trạng thái: <span class="badge ok">Đã tạo</span></div>
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
