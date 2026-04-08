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



const dmlQuestions = [
    {
        q: "Insert a record into STUDENT table with values: SID = 101, SNAME = 'RAHUL', AGE = 20, COURSE = 'MCA'.",
        ans: "INSERT INTO STUDENT (SID, SNAME, AGE, COURSE) VALUES (101, 'RAHUL', 20, 'MCA');"
    },
    {
        q: "Insert a record into EMPLOYEE table with EID = 201, ENAME = 'ANITA', SALARY = 45000, DEPTNO = 10.",
        ans: "INSERT INTO EMPLOYEE (EID, ENAME, SALARY, DEPTNO) VALUES (201, 'ANITA', 45000, 10);"
    },
    {
        q: "Insert a new department into DEPT table; DEPTNO = 50, DNAME = 'TRAINING', LOC = 'DELHI'.",
        ans: "INSERT INTO DEPT (DEPTNO, DNAME, LOC) VALUES (50, 'TRAINING', 'DELHI');"
    },
    {
        q: "Insert a record into BOOK table with only BOOK_ID, TITLE, and PRICE.",
        ans: "INSERT INTO BOOK (BOOK_ID, TITLE, PRICE) VALUES (501, 'DBMS Guide', 550);"
    },
    {
        q: "Insert multiple rows into COURSE table.",
        ans: "INSERT ALL \n  INTO COURSE VALUES (1, 'Java', 6) \n  INTO COURSE VALUES (2, 'Python', 4) \nSELECT * FROM DUAL;"
    },
    { q: "6. Insert data into EMP_COPY table from the EMP table.", ans: "INSERT INTO EMP_COPY SELECT * FROM EMP;" },
    { q: "7. Insert employees from EMP whose salary is greater than 3000 into EMP_HIGH_SAL.", ans: "INSERT INTO EMP_HIGH_SAL SELECT * FROM EMP WHERE SAL > 3000;" },
    { q: "8. Insert employees hired after 1981 into EMP_NEW_HIRE.", ans: "INSERT INTO EMP_NEW_HIRE SELECT * FROM EMP WHERE HIREDATE > '31-DEC-1981';" },
    { q: "9. Insert department numbers and names from DEPT into a table called DEPT_BACKUP.", ans: "INSERT INTO DEPT_BACKUP (DEPTNO, DNAME) SELECT DEPTNO, DNAME FROM DEPT;" },
    { q: "10. Insert employee names and salaries into a table EMP_SALARY_RECORD.", ans: "INSERT INTO EMP_SALARY_RECORD (ENAME, SAL) SELECT ENAME, SAL FROM EMP;" },
    { q: "11. Update the salary of employee SMITH to 2000.", ans: "UPDATE EMP SET SAL = 2000 WHERE ENAME = 'SMITH';" },
    { q: "12. Increase salary of all employees by 10%.", ans: "UPDATE EMP SET SAL = SAL * 1.10;" },
    { q: "13. Update the department number of employee ALLEN to 20.", ans: "UPDATE EMP SET DEPTNO = 20 WHERE ENAME = 'ALLEN';" },
    { q: "14. Update commission of SALESMAN to 500.", ans: "UPDATE EMP SET COMM = 500 WHERE JOB = 'SALESMAN';" },
    { q: "15. Update job of employee MILLER to MANAGER.", ans: "UPDATE EMP SET JOB = 'MANAGER' WHERE ENAME = 'MILLER';" },
    { q: "16. Increase salary of employees in department 10 by 20%.", ans: "UPDATE EMP SET SAL = SAL * 1.20 WHERE DEPTNO = 10;" },
    { q: "17. Update salary of employees whose job is CLERK to 1500.", ans: "UPDATE EMP SET SAL = 1500 WHERE JOB = 'CLERK';" },
    { q: "18. Update location of department 30 to MUMBAI.", ans: "UPDATE DEPT SET LOC = 'MUMBAI' WHERE DEPTNO = 30;" },
    { q: "19. Update commission of employees who have NULL commission to 100.", ans: "UPDATE EMP SET COMM = 100 WHERE COMM IS NULL;" },
    { q: "20. Update salary of employees who earn less than average salary.", ans: "UPDATE EMP SET SAL = SAL * 1.05 WHERE SAL < (SELECT AVG(SAL) FROM EMP);" },
    { q: "21. Delete employee SMITH from EMP table.", ans: "DELETE FROM EMP WHERE ENAME = 'SMITH';" },
    { q: "22. Delete all employees working in department 30.", ans: "DELETE FROM EMP WHERE DEPTNO = 30;" },
    { q: "23. Delete employees whose salary is less than 1000.", ans: "DELETE FROM EMP WHERE SAL < 1000;" },
    { q: "24. Delete employees hired before 1981.", ans: "DELETE FROM EMP WHERE HIREDATE < '01-JAN-1981';" },
    { q: "25. Delete employees who do not receive commission.", ans: "DELETE FROM EMP WHERE COMM IS NULL OR COMM = 0;" },
    { q: "26. Delete departments located in CHICAGO.", ans: "DELETE FROM DEPT WHERE LOC = 'CHICAGO';" },
    { q: "27. Delete employees whose job is CLERK.", ans: "DELETE FROM EMP WHERE JOB = 'CLERK';" },
    { q: "28. Delete employees earning the minimum salary.", ans: "DELETE FROM EMP WHERE SAL = (SELECT MIN(SAL) FROM EMP);" },
    { q: "29. Delete employees working in departments located in NEW YORK.", ans: "DELETE FROM EMP WHERE DEPTNO IN (SELECT DEPTNO FROM DEPT WHERE LOC = 'NEW YORK');" },
    { q: "30. Delete employees whose manager number is NULL.", ans: "DELETE FROM EMP WHERE MGR IS NULL;" }
];


// Reference to the container in lab.html
const container = document.getElementById('question-list');

// Function to render the DML cards
function renderDML() {
    if (!container) return;

    container.innerHTML = ""; // Clear any existing content

    dmlQuestions.forEach((item, index) => {
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
                    <img class="output-img" src="img/dml_output${index + 1}.png" alt="DML Output">
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Initial Render
renderDML();

// Unified Toggle Logic (Event Delegation)
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-btn')) {
        const card = e.target.closest('.program-card');
        card.classList.toggle('active');

        // Update button text smoothly
        e.target.textContent = card.classList.contains('active') ? 'Hide Output' : 'Show Output';
    }
});