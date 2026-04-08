document.addEventListener('DOMContentLoaded', () => {
    // Select all buttons using Event Delegation
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('toggle-btn')) {
            const button = e.target;
            const card = button.closest('.program-card');
            const content = card.querySelector('.expand-content');

            // Toggle active state
            card.classList.toggle('active');

            // Smoothly update button text
            if (card.classList.contains('active')) {
                button.textContent = 'Hide Output';
                // Optional: Scroll card into view when opened
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                button.textContent = 'Show Output';
            }
        }
    });
});


const dqlFilterQuestions = [
    { 
        q: "Display employees whose salary is greater than 3000.", 
        ans: "SELECT * FROM EMP WHERE SAL > 3000;" 
    },
    { 
        q: "Display employees working in department 10.", 
        ans: "SELECT * FROM EMP WHERE DEPTNO = 10;" 
    },
    { 
        q: "Display employees whose job is 'CLERK'.", 
        ans: "SELECT * FROM EMP WHERE JOB = 'CLERK';" 
    },
    { 
        q: "Display employees hired after 01-JAN-81.", 
        ans: "SELECT * FROM EMP WHERE HIREDATE > '01-JAN-81';" 
    },
    { 
        q: "Display employees whose salary is less than 1500.", 
        ans: "SELECT * FROM EMP WHERE SAL < 1500;" 
    },
    { 
        q: "Display employees whose salary is > 2000 and job is 'MANAGER'.", 
        ans: "SELECT * FROM EMP WHERE SAL > 2000 AND JOB = 'MANAGER';" 
    },
    { 
        q: "Display employees working in department 10 or 20.", 
        ans: "SELECT * FROM EMP WHERE DEPTNO IN (10, 20);" 
    },
    { 
        q: "Display employees whose job is 'SALESMAN' and salary > 1500.", 
        ans: "SELECT * FROM EMP WHERE JOB = 'SALESMAN' AND SAL > 1500;" 
    },
  
    { q: "Display employees who are either CLERK or ANALYST.", ans: "SELECT * FROM EMP WHERE JOB IN ('CLERK', 'ANALYST');" },
    { q: "Display employees hired before 1982 and working in department 30.", ans: "SELECT * FROM EMP WHERE HIREDATE < '01-JAN-82' AND DEPTNO = 30;" },
    { q: "Display employees working in departments 10, 20, or 30.", ans: "SELECT * FROM EMP WHERE DEPTNO IN (10, 20, 30);" },
    { q: "Display employees whose job is not MANAGER or CLERK.", ans: "SELECT * FROM EMP WHERE JOB NOT IN ('MANAGER', 'CLERK');" },
    { q: "Display employees whose department is not 10.", ans: "SELECT * FROM EMP WHERE DEPTNO != 10;" },
    { q: "Display employees whose salary is between 1000 and 3000.", ans: "SELECT * FROM EMP WHERE SAL BETWEEN 1000 AND 3000;" },
    { q: "Display employees hired between 01-JAN-81 and 31-DEC-81.", ans: "SELECT * FROM EMP WHERE HIREDATE BETWEEN '01-JAN-81' AND '31-DEC-81';" },
    { q: "Display all employees ordered by salary in ascending order.", ans: "SELECT * FROM EMP ORDER BY SAL ASC;" },
    { q: "Display all employees ordered by salary in descending order.", ans: "SELECT * FROM EMP ORDER BY SAL DESC;" },
    { q: "Display employees ordered by hire date.", ans: "SELECT * FROM EMP ORDER BY HIREDATE;" },
    { q: "Display employees ordered by department number and salary.", ans: "SELECT * FROM EMP ORDER BY DEPTNO, SAL;" },
    { q: "Display employees ordered by job (ascending) and salary (descending).", ans: "SELECT * FROM EMP ORDER BY JOB ASC, SAL DESC;" },
    { q: "Display employee names ordered alphabetically.", ans: "SELECT ENAME FROM EMP ORDER BY ENAME;" },
    { q: "Display employees of department 30 ordered by salary.", ans: "SELECT * FROM EMP WHERE DEPTNO = 30 ORDER BY SAL;" },
    { q: "Display employees ordered by annual salary.", ans: "SELECT ENAME, SAL*12 AS ANNUAL_SAL FROM EMP ORDER BY ANNUAL_SAL;" },
    { q: "Display employees ordered by commission.", ans: "SELECT * FROM EMP ORDER BY COMM;" },
    { q: "Display employees ordered by job and name.", ans: "SELECT * FROM EMP ORDER BY JOB, ENAME;" },
    { q: "Display employee name as Employee_Name.", ans: "SELECT ENAME AS Employee_Name FROM EMP;" },
    { q: "Display salary as Monthly_Salary.", ans: "SELECT SAL AS Monthly_Salary FROM EMP;" },
    { q: "Display employee name and job with aliases.", ans: "SELECT ENAME AS Name, JOB AS Designation FROM EMP;" },
    { q: "Display department number as Dept_No.", ans: "SELECT DEPTNO AS Dept_No FROM EMP;" },
    { q: "Display employee name and salary with meaningful aliases.", ans: "SELECT ENAME AS Staff_Name, SAL AS Salary FROM EMP;" },
    { q: "Display commission as Incentive.", ans: "SELECT COMM AS Incentive FROM EMP;" },
    { q: "Display employee name, job, and salary with aliases, ordered by job.", ans: "SELECT ENAME AS Name, JOB AS Work, SAL AS Salary FROM EMP ORDER BY JOB;" },
    { q: "Display employees of department 30 whose salary > 1500, ordered by salary.", ans: "SELECT * FROM EMP WHERE DEPTNO = 30 AND SAL > 1500 ORDER BY SAL;" },
    { q: "Display employees whose commission is NOT NULL, ordered by commission.", ans: "SELECT * FROM EMP WHERE COMM IS NOT NULL ORDER BY COMM;" },
    { q: "Display employees whose salary is between 1500 and 3000, ordered by salary.", ans: "SELECT * FROM EMP WHERE SAL BETWEEN 1500 AND 3000 ORDER BY SAL;" },
    { q: "Display employee name and department, ordered by department and name.", ans: "SELECT ENAME, DEPTNO FROM EMP ORDER BY DEPTNO, ENAME;" },
    { q: "Display employees whose name starts with 'S', ordered by salary.", ans: "SELECT * FROM EMP WHERE ENAME LIKE 'S%' ORDER BY SAL;" },
    { q: "Display employees hired before 1982 with aliases, ordered by hire date.", ans: "SELECT ENAME AS Name, HIREDATE AS Joined FROM EMP WHERE HIREDATE < '01-JAN-82' ORDER BY HIREDATE;" },
    { q: "Display employee name as Name and salary as Pay for department 10.", ans: "SELECT ENAME AS Name, SAL AS Pay FROM EMP WHERE DEPTNO = 10;" },
    { q: "Display employees whose commission is NULL, ordered by salary descending.", ans: "SELECT * FROM EMP WHERE COMM IS NULL ORDER BY SAL DESC;" },
    { q: "Display employee name and annual salary, ordered by annual salary.", ans: "SELECT ENAME, SAL*12 AS ANNUAL_PAY FROM EMP ORDER BY ANNUAL_PAY;" },
    { q: "Display employees whose commission is NULL but job is SALESMAN.", ans: "SELECT * FROM EMP WHERE COMM IS NULL AND JOB = 'SALESMAN';" },
    { q: "Display employees whose manager is NULL and salary > 4000.", ans: "SELECT * FROM EMP WHERE MGR IS NULL AND SAL > 4000;" },
    { q: "Display employees who do not earn commission and work in department 20.", ans: "SELECT * FROM EMP WHERE COMM IS NULL AND DEPTNO = 20;" },
    { q: "Display employees whose commission is NOT NULL and department is 30.", ans: "SELECT * FROM EMP WHERE COMM IS NOT NULL AND DEPTNO = 30;" },
    { q: "Display employees whose commission is NULL or salary > 3000.", ans: "SELECT * FROM EMP WHERE COMM IS NULL OR SAL > 3000;" },
    { q: "Display employees whose commission is NULL and salary > 2000.", ans: "SELECT * FROM EMP WHERE COMM IS NULL AND SAL > 2000;" },
    { q: "Display employees whose manager is not NULL.", ans: "SELECT * FROM EMP WHERE MGR IS NOT NULL;" },
    { q: "Display employees who do not have a manager.", ans: "SELECT * FROM EMP WHERE MGR IS NULL;" },
    { q: "Display employees who are getting commission.", ans: "SELECT * FROM EMP WHERE COMM IS NOT NULL AND COMM > 0;" }
];


// Reference to your HTML container
const container = document.getElementById('question-list');

function renderDQLFilters() {
    if(!container) return;
    
    container.innerHTML = ""; // Clear existing content

    dqlFilterQuestions.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'program-card';
        card.innerHTML = `
            <div class="question-header">
                <div>
                    <p><span class="q-number">Q${index + 1}.</span> ${item.q}</p>
                    <p><span class="q-number">Ans></span> <code>${item.ans}</code></p>
                </div>
                <button class="toggle-btn">Show Output</button>
            </div>
            <div class="expand-content">
                <div class="code-editor">
                    <div class="editor-header">
                        <div class="dots"><span class="r"></span><span class="y"></span><span class="g"></span>OUTPUT</div>
                        <span class="file-name">mohan${index + 1}.sql</span>
                    </div>
                    <img class="output-img" src="img/filter_output${index + 1}.png" alt="SQL Filter Result">
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Execute the render
renderDQLFilters();

// Event Listener for the "Show Output" buttons
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-btn')) {
        const card = e.target.closest('.program-card');
        card.classList.toggle('active');
        e.target.textContent = card.classList.contains('active') ? 'Hide Output' : 'Show Output';
    }
});