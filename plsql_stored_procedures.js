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
 * PL/SQL Stored Procedures & Functions Repository
 * Part of Mohan's DBMS Portfolio 2026
 */

const plsqlSubprogramData = [
    { 
        q: "1. Write a stored procedure to display 'Hello Oracle' using DBMS_OUTPUT.", 
        ans: "CREATE OR REPLACE PROCEDURE hello_oracle AS\nBEGIN\n  DBMS_OUTPUT.PUT_LINE('Hello Oracle');\nEND;" 
    },
    { 
        q: "2. Write a stored procedure to display employee name for a given empno.", 
        ans: "CREATE OR REPLACE PROCEDURE get_emp_name(p_id NUMBER) AS\n  v_name VARCHAR2(20);\nBEGIN\n  SELECT ENAME INTO v_name FROM EMP WHERE EMPNO = p_id;\n  DBMS_OUTPUT.PUT_LINE('Name: ' || v_name);\nEND;" 
    },
    { 
        q: "3. Write a stored procedure to print salary of an employee.", 
        ans: "CREATE OR REPLACE PROCEDURE show_sal(p_id NUMBER) AS\n  v_sal NUMBER;\nBEGIN\n  SELECT SAL INTO v_sal FROM EMP WHERE EMPNO = p_id;\n  DBMS_OUTPUT.PUT_LINE('Salary: ' || v_sal);\nEND;" 
    },
    { 
        q: "4. Write a stored procedure to display all employees using cursor.", 
        ans: "CREATE OR REPLACE PROCEDURE list_emps AS\nBEGIN\n  FOR r IN (SELECT ENAME FROM EMP) LOOP\n    DBMS_OUTPUT.PUT_LINE(r.ENAME);\n  END LOOP;\nEND;" 
    },
    { 
        q: "5. Write a stored procedure to display department details.", 
        ans: "CREATE OR REPLACE PROCEDURE show_depts AS\nBEGIN\n  FOR r IN (SELECT * FROM DEPT) LOOP\n    DBMS_OUTPUT.PUT_LINE(r.DEPTNO || ' - ' || r.DNAME);\n  END LOOP;\nEND;" 
    },
    { 
        q: "6. Write a stored procedure that takes empno as input and displays employee details.", 
        ans: "CREATE OR REPLACE PROCEDURE emp_details(p_id IN NUMBER) AS\n  v_rec EMP%ROWTYPE;\nBEGIN\n  SELECT * INTO v_rec FROM EMP WHERE EMPNO = p_id;\n  DBMS_OUTPUT.PUT_LINE(v_rec.ENAME || ' works as ' || v_rec.JOB);\nEND;" 
    },
    { 
        q: "7. Write a stored procedure that takes department number and displays employees.", 
        ans: "CREATE OR REPLACE PROCEDURE dept_staff(p_dno IN NUMBER) AS\nBEGIN\n  FOR r IN (SELECT ENAME FROM EMP WHERE DEPTNO = p_dno) LOOP\n    DBMS_OUTPUT.PUT_LINE(r.ENAME);\n  END LOOP;\nEND;" 
    },
    { 
        q: "8. Write a procedure for employees earning more than a given input salary.", 
        ans: "CREATE OR REPLACE PROCEDURE high_earners(p_min_sal IN NUMBER) AS\nBEGIN\n  FOR r IN (SELECT ENAME, SAL FROM EMP WHERE SAL > p_min_sal) LOOP\n    DBMS_OUTPUT.PUT_LINE(r.ENAME || ': ' || r.SAL);\n  END LOOP;\nEND;" 
    },
    { 
        q: "9. Write a stored procedure with OUT parameter to return employee salary.", 
        ans: "CREATE OR REPLACE PROCEDURE get_sal_out(p_id IN NUMBER, p_sal OUT NUMBER) AS\nBEGIN\n  SELECT SAL INTO p_sal FROM EMP WHERE EMPNO = p_id;\nEND;" 
    },
    { 
        q: "10. Write a procedure with IN OUT parameter to update and return new salary.", 
        ans: "CREATE OR REPLACE PROCEDURE adj_sal(p_id IN NUMBER, p_sal IN OUT NUMBER) AS\nBEGIN\n  UPDATE EMP SET SAL = SAL + p_sal WHERE EMPNO = p_id;\n  SELECT SAL INTO p_sal FROM EMP WHERE EMPNO = p_id;\nEND;" 
    },
    { 
        q: "11. Write a stored procedure to insert a new employee record.", 
        ans: "CREATE OR REPLACE PROCEDURE add_emp(p_id NUMBER, p_name VARCHAR2, p_dno NUMBER) AS\nBEGIN\n  INSERT INTO EMP (EMPNO, ENAME, DEPTNO) VALUES (p_id, p_name, p_dno);\n  COMMIT;\nEND;" 
    },
    { 
        q: "12. Write a stored procedure to update employee salary based on empno.", 
        ans: "CREATE OR REPLACE PROCEDURE set_sal(p_id NUMBER, p_new_sal NUMBER) AS\nBEGIN\n  UPDATE EMP SET SAL = p_new_sal WHERE EMPNO = p_id;\n  COMMIT;\nEND;" 
    },
    { 
        q: "13. Write a stored procedure to delete an employee record.", 
        ans: "CREATE OR REPLACE PROCEDURE del_emp(p_id NUMBER) AS\nBEGIN\n  DELETE FROM EMP WHERE EMPNO = p_id;\n  COMMIT;\nEND;" 
    },
    { 
        q: "14. Write a stored procedure to increase salary of all employees by 10%.", 
        ans: "CREATE OR REPLACE PROCEDURE hike_all AS\nBEGIN\n  UPDATE EMP SET SAL = SAL * 1.10;\n  COMMIT;\nEND;" 
    },
    { 
        q: "15. Write a stored procedure to transfer employees between departments.", 
        ans: "CREATE OR REPLACE PROCEDURE xfer_dept(p_old NUMBER, p_new NUMBER) AS\nBEGIN\n  UPDATE EMP SET DEPTNO = p_new WHERE DEPTNO = p_old;\n  COMMIT;\nEND;" 
    },
    { 
        q: "16. Write a function to return square of a number.", 
        ans: "CREATE OR REPLACE FUNCTION get_sq(n NUMBER) RETURN NUMBER AS\nBEGIN\n  RETURN n * n;\nEND;" 
    },
    { 
        q: "17. Write a function to return employee salary based on empno.", 
        ans: "CREATE OR REPLACE FUNCTION fetch_sal(p_id NUMBER) RETURN NUMBER AS\n  v_sal NUMBER;\nBEGIN\n  SELECT SAL INTO v_sal FROM EMP WHERE EMPNO = p_id;\n  RETURN v_sal;\nEND;" 
    },
    { 
        q: "18. Write a function to return total number of employees.", 
        ans: "CREATE OR REPLACE FUNCTION total_staff RETURN NUMBER AS\n  v_count NUMBER;\nBEGIN\n  SELECT COUNT(*) INTO v_count FROM EMP;\n  RETURN v_count;\nEND;" 
    },
    { 
        q: "19. Write a function to return maximum salary from EMP table.", 
        ans: "CREATE OR REPLACE FUNCTION max_sal RETURN NUMBER AS\n  v_max NUMBER;\nBEGIN\n  SELECT MAX(SAL) INTO v_max FROM EMP;\n  RETURN v_max;\nEND;" 
    },
    { 
        q: "20. Write a function to return department name based on deptno.", 
        ans: "CREATE OR REPLACE FUNCTION get_dept_name(p_dno NUMBER) RETURN VARCHAR2 AS\n  v_name VARCHAR2(20);\nBEGIN\n  SELECT DNAME INTO v_name FROM DEPT WHERE DEPTNO = p_dno;\n  RETURN v_name;\nEND;" 
    },
    { 
        q: "21. Write a function to calculate bonus (10% of salary) and return it.", 
        ans: "CREATE OR REPLACE FUNCTION calc_bonus(p_id NUMBER) RETURN NUMBER AS\n  v_sal NUMBER;\nBEGIN\n  SELECT SAL INTO v_sal FROM EMP WHERE EMPNO = p_id;\n  RETURN v_sal * 0.10;\nEND;" 
    },
    { 
        q: "22. Write a function to return grade based on salary.", 
        ans: "CREATE OR REPLACE FUNCTION get_grade(p_sal NUMBER) RETURN CHAR AS\nBEGIN\n  IF p_sal > 3000 THEN RETURN 'A';\n  ELSIF p_sal > 1500 THEN RETURN 'B';\n  ELSE RETURN 'C'; END IF;\nEND;" 
    },
    { 
        q: "23. Write a function to check whether a number is even or odd.", 
        ans: "CREATE OR REPLACE FUNCTION check_eo(n NUMBER) RETURN VARCHAR2 AS\nBEGIN\n  RETURN CASE WHEN MOD(n,2)=0 THEN 'Even' ELSE 'Odd' END;\nEND;" 
    },
    { 
        q: "24. Write a function to return annual salary of an employee.", 
        ans: "CREATE OR REPLACE FUNCTION yr_sal(p_id NUMBER) RETURN NUMBER AS\nBEGIN\n  RETURN fetch_sal(p_id) * 12;\nEND;" 
    },
    { 
        q: "25. Write a function to return employee experience (years).", 
        ans: "CREATE OR REPLACE FUNCTION get_exp(p_id NUMBER) RETURN NUMBER AS\n  v_date DATE;\nBEGIN\n  SELECT HIREDATE INTO v_date FROM EMP WHERE EMPNO = p_id;\n  RETURN TRUNC(MONTHS_BETWEEN(SYSDATE, v_date)/12);\nEND;" 
    },
    { 
        q: "26. Write a procedure that calls a function to calculate bonus.", 
        ans: "CREATE OR REPLACE PROCEDURE proc_bonus(p_id NUMBER) AS\n  v_b NUMBER;\nBEGIN\n  v_b := calc_bonus(p_id);\n  DBMS_OUTPUT.PUT_LINE('Bonus is: ' || v_b);\nEND;" 
    },
    { 
        q: "27. Write a function and use it inside SQL query.", 
        ans: "-- Use function from Q22:\nSELECT ENAME, SAL, get_grade(SAL) FROM EMP;" 
    },
    { 
        q: "28. Write a procedure that uses function to update salary.", 
        ans: "CREATE OR REPLACE PROCEDURE update_via_func(p_id NUMBER) AS\nBEGIN\n  UPDATE EMP SET SAL = SAL + calc_bonus(p_id) WHERE EMPNO = p_id;\nEND;" 
    },
    { 
        q: "29. Function returns highest salary and use it in procedure.", 
        ans: "CREATE OR REPLACE PROCEDURE check_top AS\n  v_top NUMBER := max_sal();\nBEGIN\n  DBMS_OUTPUT.PUT_LINE('Current Max: ' || v_top);\nEND;" 
    },
    { 
        q: "30. Write a stored procedure to display top 5 highest paid employees.", 
        ans: "CREATE OR REPLACE PROCEDURE top_5 AS\nBEGIN\n  FOR r IN (SELECT * FROM (SELECT ENAME, SAL FROM EMP ORDER BY SAL DESC) WHERE ROWNUM <= 5) LOOP\n    DBMS_OUTPUT.PUT_LINE(r.ENAME || ' - ' || r.SAL);\n  END LOOP;\nEND;" 
    },
    { 
        q: "31. Write a stored function to return nth highest salary.", 
        ans: "CREATE OR REPLACE FUNCTION nth_sal(n NUMBER) RETURN NUMBER AS\n  v_sal NUMBER;\nBEGIN\n  SELECT DISTINCT SAL INTO v_sal FROM (SELECT SAL, DENSE_RANK() OVER (ORDER BY SAL DESC) as rnk FROM EMP) WHERE rnk = n;\n  RETURN v_sal;\nEND;" 
    },
    { 
        q: "32. Write a procedure to implement transaction (COMMIT / ROLLBACK).", 
        ans: "CREATE OR REPLACE PROCEDURE safe_hike(p_id NUMBER) AS\nBEGIN\n  UPDATE EMP SET SAL = SAL + 100 WHERE EMPNO = p_id;\n  IF SQL%NOTFOUND THEN ROLLBACK;\n  ELSE COMMIT; END IF;\nEXCEPTION\n  WHEN OTHERS THEN ROLLBACK;\nEND;" 
    },
    { 
        q: "33. Write a function that returns department-wise total salary.", 
        ans: "CREATE OR REPLACE FUNCTION dept_total(p_dno NUMBER) RETURN NUMBER AS\n  v_total NUMBER;\nBEGIN\n  SELECT SUM(SAL) INTO v_total FROM EMP WHERE DEPTNO = p_dno;\n  RETURN NVL(v_total, 0);\nEND;" 
    }
];

const container = document.getElementById('question-list');

function renderSubprograms() {
    if(!container) return;
    container.innerHTML = "";
    
    plsqlSubprogramData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'program-card';
        card.innerHTML = `
            <div class="question-header">
                <div>
                    <p><span class="q-number">${item.q}<span> </p>
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
                        <p>-- Checking Syntax... --</p>
                        <img class="output-img" src="img/sub_out_${index + 1}.png" alt="Execution Result" onerror="this.style.display='none'">
                        <p class="success-msg">>> Procedure/Function compiled successfully.</p>
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
        e.target.textContent = isActive ? 'Close Result' : 'Compile Object';
    }
});

renderSubprograms();