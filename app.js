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
  // Hàm đổi trạng thái state
  window.updateTenantState = (code, state) => {
    const ten = DATA.tenants.find(x=>x.code===code);
    if(ten) ten.state = state;
  };
}

function renderAdmin(){
  const t = qs('tenant') || localStorage.getItem('active_tenant') || 'sunshine';
  const tenant = DATA.tenants.find(x=>x.code===t);
  // Bổ sung dữ liệu demo nếu thiếu
  if (!DATA.classes[t]) DATA.classes[t] = [
    {code:t+"A",name:"Lớp A",block:"kindergarten",teacher:{id:"T1",name:"GV 1",email:"teacher1."+t+"@example.com"}},
    {code:t+"B",name:"Lớp B",block:"preparatory",teacher:{id:"T2",name:"GV 2",email:"teacher2."+t+"@example.com"}}
  ];
  if (!DATA.students[t]) DATA.students[t] = [];
  if (!DATA.invoicesAug[t]) DATA.invoicesAug[t] = [];
  if (!DATA.expensesAug[t]) DATA.expensesAug[t] = [];
  // Tổng số lớp, tổng số học sinh, tổng học sinh theo lớp
  const classes = DATA.classes[t];
  const students = (DATA.students[t]||[]).concat(loadCustomStudents(t).filter(s=>s.tenant_id===t));
  const totalClasses = classes.length;
  const totalStudents = students.length;
  const studentsByClass = classes.map(c=>({class:c.code, count:students.filter(s=>s.class===c.code).length}));
  // Tổng thu học phí toàn trường, theo lớp, còn chưa thu
  const invoices = DATA.invoicesAug[t]||[];
  const totalFee = invoices.reduce((a,b)=>a+(b[3]||0),0);
  const feeByClass = classes.map(c=>({class:c.code, sum:invoices.filter(i=>i[2]===c.code).reduce((a,b)=>a+(b[3]||0),0)}));
  const unpaid = invoices.filter(i=>i[3]%2!==0).reduce((a,b)=>a+(b[3]||0),0);
  // Tổng chi tháng, chi giáo viên, chi các môn học
  const expenses = DATA.expensesAug[t]||[];
  const totalExpense = expenses.reduce((a,b)=>a+(b[2]||0),0);
  const teacherExpense = expenses.filter(e=>e[0]==='StaffCost').reduce((a,b)=>a+(b[2]||0),0);
  const subjectExpense = expenses.filter(e=>e[0]==='TeachingMaterial'||e[0]==='Language'||e[0]==='Talent').reduce((a,b)=>a+(b[2]||0),0);
  // Tổng chi phí thức ăn, giáo cụ & học liệu
  const foodExpense = expenses.filter(e=>e[0]==='Food').reduce((a,b)=>a+(b[2]||0),0);
  const supplyExpense = expenses.filter(e=>e[0]==='TeachingMaterial').reduce((a,b)=>a+(b[2]||0),0);
  // Lịch hoạt động sắp tới (demo)
  const events = [
    {date:'2025-09-15',title:'Khai giảng năm học mới',scope:'Trường'},
    {date:'2025-09-20',title:'Tham quan bảo tàng',scope:'Lớp '+classes[0].code},
    {date:'2025-09-25',title:'Ngày hội thể thao',scope:'Trường'}
  ];
  // Card view
  const kpis = document.getElementById('tenant-kpis');
  kpis.innerHTML = [
    `<div class="card"><b>Tổng số lớp:</b> ${totalClasses}<br><b>Tổng số học sinh:</b> ${totalStudents}<br>${studentsByClass.map(s=>`<div>Lớp ${s.class}: <b>${s.count}</b></div>`).join('')}</div>`,
    `<div class="card"><b>Tổng thu học phí:</b> ${fmt(totalFee)}₫<br>${feeByClass.map(f=>`<div>Lớp ${f.class}: <b>${fmt(f.sum)}₫</b></div>`).join('')}<br><b>Học phí chưa thu:</b> ${fmt(unpaid)}₫</div>`,
    `<div class="card"><b>Tổng chi tháng:</b> ${fmt(totalExpense)}₫<br><b>Chi giáo viên:</b> ${fmt(teacherExpense)}₫<br><b>Chi các môn học:</b> ${fmt(subjectExpense)}₫</div>`,
    `<div class="card"><b>Chi phí thức ăn:</b> ${fmt(foodExpense)}₫<br><b>Chi giáo cụ & học liệu:</b> ${fmt(supplyExpense)}₫</div>`,
    `<div class="card"><b>Lịch hoạt động sắp tới</b><ul>${events.map(e=>`<li>${e.date}: ${e.title} (${e.scope})</li>`).join('')}</ul></div>`
  ].join('');

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
