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



/**
 * PL/SQL Data Retrieval & Attributes (%TYPE, %ROWTYPE, SELECT INTO)
 * Part of Mohan's DBMS Portfolio 2026
 */

const plsqlRetrievalData = [
    { 
        q: "1. Write a PL/SQL block to fetch employee name from EMP table for empno = 7369 and display it.", 
        ans: "DECLARE\n  v_ename VARCHAR2(20);\nBEGIN\n  SELECT ENAME INTO v_ename FROM EMP WHERE EMPNO = 7369;\n  DBMS_OUTPUT.PUT_LINE('Employee Name: ' || v_ename);\nEND;" 
    },
    { 
        q: "2. Write a PL/SQL block to retrieve salary of an employee and print it.", 
        ans: "DECLARE\n  v_sal NUMBER;\nBEGIN\n  SELECT SAL INTO v_sal FROM EMP WHERE EMPNO = 7788;\n  DBMS_OUTPUT.PUT_LINE('Salary: ' || v_sal);\nEND;" 
    },
    { 
        q: "3. Write a PL/SQL block to fetch employee name and job using a single SELECT statement.", 
        ans: "DECLARE\n  v_ename VARCHAR2(20);\n  v_job VARCHAR2(20);\nBEGIN\n  SELECT ENAME, JOB INTO v_ename, v_job FROM EMP WHERE EMPNO = 7902;\n  DBMS_OUTPUT.PUT_LINE(v_ename || ' is a ' || v_job);\nEND;" 
    },
    { 
        q: "4. Write a PL/SQL block to display department number of an employee using SELECT INTO.", 
        ans: "DECLARE\n  v_deptno NUMBER;\nBEGIN\n  SELECT DEPTNO INTO v_deptno FROM EMP WHERE ENAME = 'SMITH';\n  DBMS_OUTPUT.PUT_LINE('Dept Number: ' || v_deptno);\nEND;" 
    },
    { 
        q: "5. Write a PL/SQL block to fetch hiredate of an employee and display it.", 
        ans: "DECLARE\n  v_hdate DATE;\nBEGIN\n  SELECT HIREDATE INTO v_hdate FROM EMP WHERE EMPNO = 7369;\n  DBMS_OUTPUT.PUT_LINE('Hired on: ' || v_hdate);\nEND;" 
    },
    { 
        q: "6. Write a PL/SQL block to count total number of employees using SELECT INTO.", 
        ans: "DECLARE\n  v_count NUMBER;\nBEGIN\n  SELECT COUNT(*) INTO v_count FROM EMP;\n  DBMS_OUTPUT.PUT_LINE('Total Employees: ' || v_count);\nEND;" 
    },
    { 
        q: "7. Write a PL/SQL block to declare a variable using %TYPE based on EMP.SAL and display salary.", 
        ans: "DECLARE\n  v_sal EMP.SAL%TYPE;\nBEGIN\n  v_sal := 5000;\n  DBMS_OUTPUT.PUT_LINE('Salary using %TYPE: ' || v_sal);\nEND;" 
    },
    { 
        q: "8. Write a PL/SQL block to declare variables for employee name and job using %TYPE.", 
        ans: "DECLARE\n  v_ename EMP.ENAME%TYPE;\n  v_job EMP.JOB%TYPE;\nBEGIN\n  SELECT ENAME, JOB INTO v_ename, v_job FROM EMP WHERE EMPNO = 7839;\n  DBMS_OUTPUT.PUT_LINE(v_ename || ' - ' || v_job);\nEND;" 
    },
    { 
        q: "9. Write a PL/SQL block to fetch salary using %TYPE variable and display it.", 
        ans: "DECLARE\n  v_sal EMP.SAL%TYPE;\nBEGIN\n  SELECT SAL INTO v_sal FROM EMP WHERE EMPNO = 7566;\n  DBMS_OUTPUT.PUT_LINE('Fetched Salary: ' || v_sal);\nEND;" 
    },
    { 
        q: "10. Write a PL/SQL block to calculate annual salary using %TYPE variable.", 
        ans: "DECLARE\n  v_sal EMP.SAL%TYPE;\n  v_annual NUMBER;\nBEGIN\n  SELECT SAL INTO v_sal FROM EMP WHERE EMPNO = 7782;\n  v_annual := v_sal * 12;\n  DBMS_OUTPUT.PUT_LINE('Annual Salary: ' || v_annual);\nEND;" 
    },
    { 
        q: "11. Write a PL/SQL block to update salary using %TYPE variable.", 
        ans: "DECLARE\n  v_new_sal EMP.SAL%TYPE := 4000;\nBEGIN\n  UPDATE EMP SET SAL = v_new_sal WHERE EMPNO = 7900;\n  DBMS_OUTPUT.PUT_LINE('Salary Updated.');\nEND;" 
    },
    { 
        q: "12. Write a PL/SQL block to declare a variable using %TYPE from DEPT table.", 
        ans: "DECLARE\n  v_dname DEPT.DNAME%TYPE;\nBEGIN\n  SELECT DNAME INTO v_dname FROM DEPT WHERE DEPTNO = 10;\n  DBMS_OUTPUT.PUT_LINE('Dept Name: ' || v_dname);\nEND;" 
    },
    { 
        q: "13. Write a PL/SQL block to declare a record using %ROWTYPE for EMP table.", 
        ans: "DECLARE\n  v_emp_rec EMP%ROWTYPE;\nBEGIN\n  DBMS_OUTPUT.PUT_LINE('Record variable for EMP declared.');\nEND;" 
    },
    { 
        q: "14. Write a PL/SQL block to fetch complete employee record using %ROWTYPE and display fields.", 
        ans: "DECLARE\n  v_emp EMP%ROWTYPE;\nBEGIN\n  SELECT * INTO v_emp FROM EMP WHERE EMPNO = 7369;\n  DBMS_OUTPUT.PUT_LINE(v_emp.ENAME || ' works in Dept ' || v_emp.DEPTNO);\nEND;" 
    },
    { 
        q: "15. Write a PL/SQL block to display employee name, salary, and job using %ROWTYPE.", 
        ans: "DECLARE\n  v_e EMP%ROWTYPE;\nBEGIN\n  SELECT * INTO v_e FROM EMP WHERE EMPNO = 7839;\n  DBMS_OUTPUT.PUT_LINE(v_e.ENAME || ' | ' || v_e.JOB || ' | ' || v_e.SAL);\nEND;" 
    },
    { 
        q: "16. Write a PL/SQL block to update salary using %ROWTYPE variable.", 
        ans: "DECLARE\n  v_emp EMP%ROWTYPE;\nBEGIN\n  SELECT * INTO v_emp FROM EMP WHERE EMPNO = 7499;\n  UPDATE EMP SET SAL = v_emp.SAL + 500 WHERE EMPNO = v_emp.EMPNO;\nEND;" 
    },
    { 
        q: "17. Write a PL/SQL block to insert a record using %ROWTYPE.", 
        ans: "DECLARE\n  v_emp EMP%ROWTYPE;\nBEGIN\n  v_emp.EMPNO := 9000; v_emp.ENAME := 'MOHAN'; v_emp.DEPTNO := 10;\n  INSERT INTO EMP VALUES v_emp;\nEND;" 
    },
    { 
        q: "18. Write a PL/SQL block to fetch employee details based on empno using %ROWTYPE.", 
        ans: "DECLARE\n  v_record EMP%ROWTYPE;\nBEGIN\n  SELECT * INTO v_record FROM EMP WHERE EMPNO = 7521;\n  DBMS_OUTPUT.PUT_LINE('Details: ' || v_record.ENAME);\nEND;" 
    },
    { 
        q: "19. Write a PL/SQL block using SELECT, %TYPE, and output statement together.", 
        ans: "DECLARE\n  v_name EMP.ENAME%TYPE;\nBEGIN\n  SELECT ENAME INTO v_name FROM EMP WHERE EMPNO = 7698;\n  DBMS_OUTPUT.PUT_LINE('Processed Name: ' || v_name);\nEND;" 
    },
    { 
        q: "20. Write a PL/SQL block to fetch employee details using %ROWTYPE and display all columns.", 
        ans: "DECLARE\n  v_row EMP%ROWTYPE;\nBEGIN\n  SELECT * INTO v_row FROM EMP WHERE EMPNO = 7788;\n  DBMS_OUTPUT.PUT_LINE(v_row.EMPNO || ' ' || v_row.ENAME || ' ' || v_row.JOB);\nEND;" 
    },
    { 
        q: "21. Write a PL/SQL block to calculate bonus (10% of salary) using %TYPE.", 
        ans: "DECLARE\n  v_sal EMP.SAL%TYPE;\n  v_bonus NUMBER;\nBEGIN\n  SELECT SAL INTO v_sal FROM EMP WHERE EMPNO = 7934;\n  v_bonus := v_sal * 0.10;\n  DBMS_OUTPUT.PUT_LINE('Bonus: ' || v_bonus);\nEND;" 
    },
    { 
        q: "22. Write a PL/SQL block to fetch record and update salary if less than 2000.", 
        ans: "DECLARE\n  v_emp EMP%ROWTYPE;\nBEGIN\n  SELECT * INTO v_emp FROM EMP WHERE EMPNO = 7369;\n  IF v_emp.SAL < 2000 THEN\n    UPDATE EMP SET SAL = SAL + 200 WHERE EMPNO = v_emp.EMPNO;\n  END IF;\nEND;" 
    },
    { 
        q: "23. Write a PL/SQL block to fetch highest salary using SELECT INTO and %TYPE.", 
        ans: "DECLARE\n  v_max_sal EMP.SAL%TYPE;\nBEGIN\n  SELECT MAX(SAL) INTO v_max_sal FROM EMP;\n  DBMS_OUTPUT.PUT_LINE('Highest Salary: ' || v_max_sal);\nEND;" 
    },
    { 
        q: "24. Write a PL/SQL block to fetch employee with highest salary using %ROWTYPE.", 
        ans: "DECLARE\n  v_rich_emp EMP%ROWTYPE;\nBEGIN\n  SELECT * INTO v_rich_emp FROM EMP WHERE SAL = (SELECT MAX(SAL) FROM EMP);\n  DBMS_OUTPUT.PUT_LINE('Top Earner: ' || v_rich_emp.ENAME);\nEND;" 
    },
    { 
        q: "25. Write a PL/SQL block to display employees in specific dept using loop and %ROWTYPE.", 
        ans: "BEGIN\n  FOR r IN (SELECT * FROM EMP WHERE DEPTNO = 20) LOOP\n    DBMS_OUTPUT.PUT_LINE(r.ENAME || ' works in Dept 20');\n  END LOOP;\nEND;" 
    },
    { 
        q: "26. Write a PL/SQL block to increase salary of employees department-wise using %TYPE.", 
        ans: "DECLARE\n  v_inc EMP.SAL%TYPE := 500;\nBEGIN\n  UPDATE EMP SET SAL = SAL + v_inc WHERE DEPTNO = 30;\n  DBMS_OUTPUT.PUT_LINE('Dept 30 Salaries Updated.');\nEND;" 
    },
    { 
        q: "27. Write a PL/SQL block to fetch and display all records using cursor and %ROWTYPE.", 
        ans: "DECLARE\n  CURSOR c1 IS SELECT * FROM EMP;\n  v_emp EMP%ROWTYPE;\nBEGIN\n  OPEN c1;\n  LOOP\n    FETCH c1 INTO v_emp;\n    EXIT WHEN c1%NOTFOUND;\n    DBMS_OUTPUT.PUT_LINE(v_emp.ENAME);\n  END LOOP;\n  CLOSE c1;\nEND;" 
    },
    { 
        q: "28. Write a PL/SQL block to copy data from EMP to another table using %ROWTYPE.", 
        ans: "DECLARE\n  v_row EMP%ROWTYPE;\nBEGIN\n  SELECT * INTO v_row FROM EMP WHERE EMPNO = 7839;\n  INSERT INTO EMP_BACKUP VALUES v_row;\n  DBMS_OUTPUT.PUT_LINE('Record Copied.');\nEND;" 
    }
];

const container = document.getElementById('question-list');

function renderRetrievalLogic() {
    if(!container) return;
    container.innerHTML = "";
    
    plsqlRetrievalData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'program-card';
        card.innerHTML = `
            <div class="question-header">
                <div>
                    <p><span class="q-number"> ${item.q}</span></p>
                    <div class="ans-box">
                        <pre><code>${item.ans}</code></pre>
                    </div>
                </div>
                <button class="toggle-btn">Show Output</button>
            </div>
            <div class="expand-content">
                <div class="code-editor">
                    <div class="editor-header">
                        <div class="dots"><span class="r"></span><span class="y"></span><span class="g"></span>OUTPUT</div>
                    </div>
                    <div class="output-placeholder">
                        <p>-- Connecting to Database... --</p>
                        <img class="output-img" src="img/retrieval_out_${index + 1}.png" alt="Retrieval Output" onerror="this.style.display='none'">
                        <p class="success-msg">>> Query executed. Data successfully mapped to attributes.</p>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-btn')) {
        const card = e.target.closest('.program-card');
        const isActive = card.classList.toggle('active');
        e.target.textContent = isActive ? 'Close Result' : 'Fetch Data';
    }
});

renderRetrievalLogic();