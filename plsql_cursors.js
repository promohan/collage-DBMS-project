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
 * PL/SQL Cursors: Explicit, Parameterized, and Updatable
 * Part of Mohan's DBMS Portfolio 2026
 */

const plsqlCursorData = [
    { 
        q: "1. Write a PL/SQL block to declare a cursor to fetch all employees from EMP table and display their names.", 
        ans: "DECLARE\n  CURSOR c_emp IS SELECT ENAME FROM EMP;\n  v_ename EMP.ENAME%TYPE;\nBEGIN\n  OPEN c_emp;\n  LOOP\n    FETCH c_emp INTO v_ename;\n    EXIT WHEN c_emp%NOTFOUND;\n    DBMS_OUTPUT.PUT_LINE('Name: ' || v_ename);\n  END LOOP;\n  CLOSE c_emp;\nEND;" 
    },
    { 
        q: "2. Write a PL/SQL block to fetch employee name and salary using cursor and display them.", 
        ans: "DECLARE\n  CURSOR c_sal IS SELECT ENAME, SAL FROM EMP;\n  v_name EMP.ENAME%TYPE;\n  v_sal EMP.SAL%TYPE;\nBEGIN\n  OPEN c_sal;\n  LOOP\n    FETCH c_sal INTO v_name, v_sal;\n    EXIT WHEN c_sal%NOTFOUND;\n    DBMS_OUTPUT.PUT_LINE(v_name || ' earns ' || v_sal);\n  END LOOP;\n  CLOSE c_sal;\nEND;" 
    },
    { 
        q: "3. Write a PL/SQL block to display employees whose salary is greater than 3000 using cursor.", 
        ans: "DECLARE\n  CURSOR c_high IS SELECT ENAME, SAL FROM EMP WHERE SAL > 3000;\n  r_high c_high%ROWTYPE;\nBEGIN\n  OPEN c_high;\n  LOOP\n    FETCH c_high INTO r_high;\n    EXIT WHEN c_high%NOTFOUND;\n    DBMS_OUTPUT.PUT_LINE(r_high.ENAME || ' has High Salary');\n  END LOOP;\n  CLOSE c_high;\nEND;" 
    },
    { 
        q: "4. Write a PL/SQL block to count number of employees using cursor.", 
        ans: "DECLARE\n  CURSOR c_count IS SELECT * FROM EMP;\n  v_row EMP%ROWTYPE;\n  v_total NUMBER := 0;\nBEGIN\n  OPEN c_count;\n  LOOP\n    FETCH c_count INTO v_row;\n    EXIT WHEN c_count%NOTFOUND;\n    v_total := v_total + 1;\n  END LOOP;\n  CLOSE c_count;\n  DBMS_OUTPUT.PUT_LINE('Total: ' || v_total);\nEND;" 
    },
    { 
        q: "5. Write a PL/SQL block to calculate total salary of all employees using cursor.", 
        ans: "DECLARE\n  CURSOR c_sum IS SELECT SAL FROM EMP;\n  v_sal NUMBER; v_total NUMBER := 0;\nBEGIN\n  FOR r IN c_sum LOOP\n    v_total := v_total + r.SAL;\n  END LOOP;\n  DBMS_OUTPUT.PUT_LINE('Total Payout: ' || v_total);\nEND;" 
    },
    { 
        q: "6. Write a PL/SQL block to fetch records one by one using OPEN, FETCH, and CLOSE.", 
        ans: "DECLARE\n  CURSOR c_life IS SELECT ENAME FROM EMP;\n  v_name EMP.ENAME%TYPE;\nBEGIN\n  OPEN c_life;\n  FETCH c_life INTO v_name;\n  DBMS_OUTPUT.PUT_LINE('First record: ' || v_name);\n  CLOSE c_life;\nEND;" 
    },
    { 
        q: "7. Write a PL/SQL block to display all employee records using cursor FOR LOOP.", 
        ans: "BEGIN\n  FOR r IN (SELECT * FROM EMP) LOOP\n    DBMS_OUTPUT.PUT_LINE(r.EMPNO || ' ' || r.ENAME);\n  END LOOP;\nEND;" 
    },
    { 
        q: "8. Write a PL/SQL block to display employee names and jobs using cursor FOR LOOP.", 
        ans: "DECLARE\n  CURSOR c_job IS SELECT ENAME, JOB FROM EMP;\nBEGIN\n  FOR r IN c_job LOOP\n    DBMS_OUTPUT.PUT_LINE(r.ENAME || ' is a ' || r.JOB);\n  END LOOP;\nEND;" 
    },
    { 
        q: "9. Write a PL/SQL block to display employees from department 10 using cursor FOR LOOP.", 
        ans: "BEGIN\n  FOR r IN (SELECT ENAME FROM EMP WHERE DEPTNO = 10) LOOP\n    DBMS_OUTPUT.PUT_LINE('Dept 10: ' || r.ENAME);\n  END LOOP;\nEND;" 
    },
    { 
        q: "10. Write a PL/SQL block to calculate total salary using cursor FOR LOOP.", 
        ans: "DECLARE\n  v_sum NUMBER := 0;\nBEGIN\n  FOR r IN (SELECT SAL FROM EMP) LOOP\n    v_sum := v_sum + r.SAL;\n  END LOOP;\n  DBMS_OUTPUT.PUT_LINE('Sum: ' || v_sum);\nEND;" 
    },
    { 
        q: "11. Write a PL/SQL block to display employees with salary greater than average.", 
        ans: "BEGIN\n  FOR r IN (SELECT ENAME FROM EMP WHERE SAL > (SELECT AVG(SAL) FROM EMP)) LOOP\n    DBMS_OUTPUT.PUT_LINE(r.ENAME || ' earns above average');\n  END LOOP;\nEND;" 
    },
    { 
        q: "12. Write a PL/SQL block to declare a parameterized cursor (deptno).", 
        ans: "DECLARE\n  CURSOR c_dept(p_dept NUMBER) IS SELECT ENAME FROM EMP WHERE DEPTNO = p_dept;\nBEGIN\n  FOR r IN c_dept(20) LOOP\n    DBMS_OUTPUT.PUT_LINE('Dept 20 Emp: ' || r.ENAME);\n  END LOOP;\nEND;" 
    },
    { 
        q: "13. Fetch employees whose salary is > given value using parameterized cursor.", 
        ans: "DECLARE\n  CURSOR c_min(p_sal NUMBER) IS SELECT ENAME, SAL FROM EMP WHERE SAL > p_sal;\nBEGIN\n  FOR r IN c_min(2500) LOOP\n    DBMS_OUTPUT.PUT_LINE(r.ENAME || ' | ' || r.SAL);\n  END LOOP;\nEND;" 
    },
    { 
        q: "14. Write a PL/SQL block to display employees based on job role using parameterized cursor.", 
        ans: "DECLARE\n  CURSOR c_job(p_role VARCHAR2) IS SELECT ENAME FROM EMP WHERE JOB = p_role;\nBEGIN\n  FOR r IN c_job('CLERK') LOOP\n    DBMS_OUTPUT.PUT_LINE('Clerk: ' || r.ENAME);\n  END LOOP;\nEND;" 
    },
    { 
        q: "15. Calculate total salary of a given department using parameterized cursor.", 
        ans: "DECLARE\n  CURSOR c_sum(p_dno NUMBER) IS SELECT SAL FROM EMP WHERE DEPTNO = p_dno;\n  v_total NUMBER := 0;\nBEGIN\n  FOR r IN c_sum(30) LOOP\n    v_total := v_total + r.SAL;\n  END LOOP;\n  DBMS_OUTPUT.PUT_LINE('Total Dept 30 Sal: ' || v_total);\nEND;" 
    },
    { 
        q: "16. Pass multiple parameters (deptno, job) to cursor.", 
        ans: "DECLARE\n  CURSOR c_multi(p_dno NUMBER, p_job VARCHAR2) IS \n    SELECT ENAME FROM EMP WHERE DEPTNO = p_dno AND JOB = p_job;\nBEGIN\n  FOR r IN c_multi(20, 'ANALYST') LOOP\n    DBMS_OUTPUT.PUT_LINE('Result: ' || r.ENAME);\n  END LOOP;\nEND;" 
    },
    { 
        q: "17. Update salary of employees using cursor with FOR UPDATE.", 
        ans: "DECLARE\n  CURSOR c_upd IS SELECT SAL FROM EMP FOR UPDATE;\nBEGIN\n  FOR r IN c_upd LOOP\n    UPDATE EMP SET SAL = SAL + 10 WHERE CURRENT OF c_upd;\n  END LOOP;\nEND;" 
    },
    { 
        q: "18. Increase salary by 10% using WHERE CURRENT OF.", 
        ans: "DECLARE\n  CURSOR c_inc IS SELECT SAL FROM EMP FOR UPDATE;\nBEGIN\n  FOR r IN c_inc LOOP\n    UPDATE EMP SET SAL = SAL * 1.10 WHERE CURRENT OF c_inc;\n  END LOOP;\nEND;" 
    },
    { 
        q: "19. Delete employees with salary less than 2000 using cursor.", 
        ans: "DECLARE\n  CURSOR c_del IS SELECT * FROM EMP WHERE SAL < 2000 FOR UPDATE;\nBEGIN\n  FOR r IN c_del LOOP\n    DELETE FROM EMP WHERE CURRENT OF c_del;\n  END LOOP;\nEND;" 
    },
    { 
        q: "20. Update job of employees using updatable cursor.", 
        ans: "DECLARE\n  CURSOR c_j IS SELECT JOB FROM EMP WHERE JOB = 'CLERK' FOR UPDATE;\nBEGIN\n  FOR r IN c_j LOOP\n    UPDATE EMP SET JOB = 'ASSISTANT' WHERE CURRENT OF c_j;\n  END LOOP;\nEND;" 
    },
    { 
        q: "21. Fetch records using cursor and modify values row-by-row.", 
        ans: "DECLARE\n  CURSOR c_mod IS SELECT COMM FROM EMP FOR UPDATE;\nBEGIN\n  FOR r IN c_mod LOOP\n    UPDATE EMP SET COMM = NVL(COMM, 0) + 50 WHERE CURRENT OF c_mod;\n  END LOOP;\nEND;" 
    },
    { 
        q: "22. Use explicit cursor and IF condition to display high salary employees.", 
        ans: "DECLARE\n  CURSOR c1 IS SELECT ENAME, SAL FROM EMP;\nBEGIN\n  FOR r IN c1 LOOP\n    IF r.SAL > 4000 THEN\n      DBMS_OUTPUT.PUT_LINE(r.ENAME || ' (Executive)');\n    END IF;\n  END LOOP;\nEND;" 
    },
    { 
        q: "23. Use cursor FOR LOOP and calculate bonus (10% of salary).", 
        ans: "BEGIN\n  FOR r IN (SELECT ENAME, SAL FROM EMP) LOOP\n    DBMS_OUTPUT.PUT_LINE(r.ENAME || ' Bonus: ' || (r.SAL * 0.10));\n  END LOOP;\nEND;" 
    },
    { 
        q: "24. Use parameterized cursor and loop through multiple departments.", 
        ans: "DECLARE\n  CURSOR c_d(p_d NUMBER) IS SELECT ENAME FROM EMP WHERE DEPTNO = p_d;\nBEGIN\n  FOR i IN (SELECT DEPTNO FROM DEPT) LOOP\n    DBMS_OUTPUT.PUT_LINE('--- Dept ' || i.DEPTNO || ' ---');\n    FOR e IN c_d(i.DEPTNO) LOOP\n      DBMS_OUTPUT.PUT_LINE(e.ENAME);\n    END LOOP;\n  END LOOP;\nEND;" 
    },
    { 
        q: "25. Update and display employee data using updatable cursor.", 
        ans: "DECLARE\n  CURSOR c_upd IS SELECT ENAME, SAL FROM EMP FOR UPDATE;\nBEGIN\n  FOR r IN c_upd LOOP\n    UPDATE EMP SET SAL = SAL + 1 WHERE CURRENT OF c_upd;\n    DBMS_OUTPUT.PUT_LINE('Adjusted: ' || r.ENAME);\n  END LOOP;\nEND;" 
    },
    { 
        q: "26. Display top 3 highest paid employees using cursor.", 
        ans: "DECLARE\n  CURSOR c_top IS SELECT ENAME, SAL FROM EMP ORDER BY SAL DESC;\n  v_count NUMBER := 0;\nBEGIN\n  FOR r IN c_top LOOP\n    DBMS_OUTPUT.PUT_LINE(r.ENAME || ' (' || r.SAL || ')');\n    v_count := v_count + 1;\n    EXIT WHEN v_count = 3;\n  END LOOP;\nEND;" 
    },
    { 
        q: "27. Simulate pagination (fetch limited rows using cursor).", 
        ans: "DECLARE\n  CURSOR c_pg IS SELECT ENAME FROM EMP;\n  v_row c_pg%ROWTYPE;\nBEGIN\n  OPEN c_pg;\n  FOR i IN 1..5 LOOP\n    FETCH c_pg INTO v_row;\n    EXIT WHEN c_pg%NOTFOUND;\n    DBMS_OUTPUT.PUT_LINE('Row ' || i || ': ' || v_row.ENAME);\n  END LOOP;\n  CLOSE c_pg;\nEND;" 
    },
    { 
        q: "28. Copy employee data into another table using cursor.", 
        ans: "BEGIN\n  FOR r IN (SELECT * FROM EMP) LOOP\n    INSERT INTO EMP_HISTORY (EID, NAME) VALUES (r.EMPNO, r.ENAME);\n  END LOOP;\nEND;" 
    },
    { 
        q: "29. Display department-wise employee count using cursor.", 
        ans: "DECLARE\n  CURSOR c_dept IS SELECT DEPTNO, COUNT(*) as cnt FROM EMP GROUP BY DEPTNO;\nBEGIN\n  FOR r IN c_dept LOOP\n    DBMS_OUTPUT.PUT_LINE('Dept ' || r.DEPTNO || ': ' || r.cnt || ' staff');\n  END LOOP;\nEND;" 
    },
    { 
        q: "30. Apply different salary increments based on job using cursor.", 
        ans: "DECLARE\n  CURSOR c_inc IS SELECT JOB, SAL FROM EMP FOR UPDATE;\nBEGIN\n  FOR r IN c_inc LOOP\n    IF r.JOB = 'CLERK' THEN\n      UPDATE EMP SET SAL = SAL + 100 WHERE CURRENT OF c_inc;\n    ELSIF r.JOB = 'SALESMAN' THEN\n      UPDATE EMP SET SAL = SAL + 200 WHERE CURRENT OF c_inc;\n    END IF;\n  END LOOP;\nEND;" 
    }
];

const container = document.getElementById('question-list');

function renderCursorLogic() {
    if(!container) return;
    container.innerHTML = "";
    
    plsqlCursorData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'program-card';
        card.innerHTML = `
            <div class="question-header">
                <div>
                    <p><span class="q-number">${item.q}</span> </p>
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
                        <p>-- Allocating Private SQL Area... --</p>
                        <img class="output-img" src="img/cursor_out_${index + 1}.png" alt="Cursor Result" onerror="this.style.display='none'">
                        <p class="success-msg">>> %FOUND: Records processed row-by-row.</p>
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
        e.target.textContent = isActive ? 'Close Cursor' : 'Open Cursor';
    }
});

renderCursorLogic();