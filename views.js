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


const viewQuestions = [
    { 
        q: "1. Create a view to display employee name, salary, and department number.", 
        ans: "CREATE VIEW EMP_BASIC_VW AS SELECT ENAME, SAL, DEPTNO FROM EMP;" 
    },
    { 
        q: "2. Create a view to display employee name and department name by joining tables.", 
        ans: "CREATE VIEW EMP_DEPT_VW AS SELECT E.ENAME, D.DNAME FROM EMP E JOIN DEPT D ON E.DEPTNO = D.DEPTNO;" 
    },
    { 
        q: "3. Create a view to display employees working in department 10.", 
        ans: "CREATE VIEW DEPT10_VW AS SELECT * FROM EMP WHERE DEPTNO = 10;" 
    },
    { 
        q: "4. Create a view to display employee name, job, and annual salary (SAL * 12).", 
        ans: "CREATE VIEW EMP_ANNUAL_SAL_VW AS SELECT ENAME, JOB, (SAL * 12) AS ANNUAL_SAL FROM EMP;" 
    },
    { 
        q: "5. Create a view to display department name and location from DEPT table.", 
        ans: "CREATE VIEW DEPT_INFO_VW AS SELECT DNAME, LOC FROM DEPT;" 
    },


    { id: "V6", q: "6. Create a view for employee name, department name, and location.", ans: "CREATE VIEW EMP_DEPT_LOC_VW AS SELECT E.ENAME, D.DNAME, D.LOC FROM EMP E JOIN DEPT D ON E.DEPTNO = D.DEPTNO;" },
    { id: "V7", q: "7. Create a view to display employees earning more than 3000.", ans: "CREATE VIEW HIGH_EARNERS_VW AS SELECT * FROM EMP WHERE SAL > 3000;" },
    { id: "V8", q: "8. Create a view for department-wise total salary.", ans: "CREATE VIEW DEPT_SAL_SUM_VW AS SELECT DEPTNO, SUM(SAL) AS TOTAL_SAL FROM EMP GROUP BY DEPTNO;" },
    { id: "V9", q: "9. Create a view to display only managers (JOB = 'MANAGER').", ans: "CREATE VIEW MANAGER_ONLY_VW AS SELECT * FROM EMP WHERE JOB = 'MANAGER';" },
    { id: "V10", q: "10. Create a view with column aliases for name and salary.", ans: "CREATE VIEW EMP_PAY_VW (Employee, Monthly_Salary) AS SELECT ENAME, SAL FROM EMP;" },
    { id: "V11", q: "11. Create a view for Dept 20 with WITH CHECK OPTION.", ans: "CREATE VIEW DEPT20_SECURE_VW AS SELECT * FROM EMP WHERE DEPTNO = 20 WITH CHECK OPTION;" },
    { id: "V12", q: "12. Insert a new employee into the Dept 20 view.", ans: "INSERT INTO DEPT20_SECURE_VW (EMPNO, ENAME, DEPTNO) VALUES (101, 'MOHAN', 20);" },
    { id: "V13", q: "13. Try inserting Dept 30 into the Dept 20 secure view.", ans: "INSERT INTO DEPT20_SECURE_VW (EMPNO, ENAME, DEPTNO) VALUES (102, 'ROHIT', 30); -- ERROR: Check violation" },
    { id: "V14", q: "14. Update department number from 20 to 30 through secure view.", ans: "UPDATE DEPT20_SECURE_VW SET DEPTNO = 30 WHERE EMPNO = 101; -- ERROR: Restricted" },
    { id: "V15", q: "15. Create a view for salary > 2000 with WITH CHECK OPTION.", ans: "CREATE VIEW SAL_2K_VW AS SELECT * FROM EMP WHERE SAL > 2000 WITH CHECK OPTION;" },
    { id: "V16", q: "16. Create a READ ONLY view to display employee details.", ans: "CREATE VIEW EMP_REPORT_VW AS SELECT * FROM EMP WITH READ ONLY;" },
    { id: "V17", q: "17. Create a READ ONLY view for employee and department names.", ans: "CREATE VIEW JOIN_READ_VW AS SELECT E.ENAME, D.DNAME FROM EMP E JOIN DEPT D ON E.DEPTNO = D.DEPTNO WITH READ ONLY;" },
    { id: "V18", q: "18. Try updating salary through a READ ONLY view.", ans: "UPDATE EMP_REPORT_VW SET SAL = 4000 WHERE EMPNO = 7369; -- ERROR: Read-only" },
    { id: "V19", q: "19. Try inserting a new employee through a READ ONLY view.", ans: "INSERT INTO EMP_REPORT_VW (EMPNO, ENAME) VALUES (103, 'ALEX'); -- ERROR: Read-only" },
    { id: "V20", q: "20. Create a READ ONLY view for employees in department 10.", ans: "CREATE VIEW DEPT10_READ_ONLY_VW AS SELECT * FROM EMP WHERE DEPTNO = 10 WITH READ ONLY;" },
    { id: "MV21", q: "21. Create a materialized view for employee name and salary.", ans: "CREATE MATERIALIZED VIEW MV_EMP_SAL AS SELECT ENAME, SAL FROM EMP;" },
    { id: "MV22", q: "22. Create a materialized view for employee-dept join.", ans: "CREATE MATERIALIZED VIEW MV_EMP_DEPT_JOIN AS SELECT E.ENAME, D.DNAME FROM EMP E, DEPT D WHERE E.DEPTNO = D.DEPTNO;" },
    { id: "MV23", q: "23. Create a materialized view with REFRESH COMPLETE.", ans: "CREATE MATERIALIZED VIEW MV_REFRESH_COMP REFRESH COMPLETE AS SELECT * FROM EMP;" },
    { id: "MV24", q: "24. Create a materialized view with REFRESH FAST.", ans: "CREATE MATERIALIZED VIEW MV_FAST_REF REFRESH FAST AS SELECT * FROM EMP;" },
    { id: "MV25", q: "25. Create a materialized view with REFRESH ON COMMIT.", ans: "CREATE MATERIALIZED VIEW MV_AUTO_REF REFRESH ON COMMIT AS SELECT * FROM EMP;" },
    { id: "MV26", q: "26. Create a materialized view for dept-wise total salary.", ans: "CREATE MATERIALIZED VIEW MV_DEPT_TOTAL AS SELECT DEPTNO, SUM(SAL) FROM EMP GROUP BY DEPTNO;" },
    { id: "MV27", q: "27. Create a materialized view with BUILD IMMEDIATE.", ans: "CREATE MATERIALIZED VIEW MV_IMMED BUILD IMMEDIATE AS SELECT * FROM EMP;" },
    { id: "MV28", q: "28. Create a materialized view with BUILD DEFERRED.", ans: "CREATE MATERIALIZED VIEW MV_DEFER BUILD DEFERRED AS SELECT * FROM EMP;" },
    { id: "MV29", q: "29. Refresh a materialized view manually.", ans: "EXEC DBMS_MVIEW.REFRESH('MV_EMP_SAL');" },
    { id: "MV30", q: "30. Drop a materialized view created on EMP table.", ans: "DROP MATERIALIZED VIEW MV_EMP_SAL;" },
    { id: "V31", q: "31. Create join view with WITH CHECK OPTION.", ans: "CREATE VIEW JOIN_RESTRICT_VW AS SELECT E.ENAME, D.DNAME, E.DEPTNO FROM EMP E JOIN DEPT D ON E.DEPTNO = D.DEPTNO WITH CHECK OPTION;" },
    { id: "V32", q: "32. Create join view that is READ ONLY.", ans: "CREATE VIEW JOIN_SAL_REPORT_VW AS SELECT E.ENAME, D.DNAME, E.SAL FROM EMP E JOIN DEPT D ON E.DEPTNO = D.DEPTNO WITH READ ONLY;" },
    { id: "V33", q: "33. Create view for highest salary in each department.", ans: "CREATE VIEW DEPT_PEAK_SAL_VW AS SELECT D.DNAME, MAX(E.SAL) AS HIGHEST_SAL FROM EMP E JOIN DEPT D ON E.DEPTNO = D.DEPTNO GROUP BY D.DNAME;" },
    { id: "MV34", q: "34. Create a materialized view for highest department salary.", ans: "CREATE MATERIALIZED VIEW MV_DEPT_PEAK_SAL AS SELECT D.DNAME, MAX(E.SAL) FROM EMP E, DEPT D WHERE E.DEPTNO = D.DEPTNO GROUP BY D.DNAME;" },
    { id: "V35", q: "35. Create a view that hides salary for security purpose.", ans: "CREATE VIEW EMP_SECURE_DATA_VW AS SELECT ENAME, DEPTNO FROM EMP;" }

];

const viewContainer = document.getElementById('question-list');

function renderViewCards() {
    if(!viewContainer) return;
    viewContainer.innerHTML = ""; 

    viewQuestions.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'program-card';
        card.innerHTML = `
            <div class="question-header">
                <div>
                    <p><span class="q-number">Q${index + 1}.</span> ${item.q}</p>
                    <p><span class="q-number">Ans:</span> <code>${item.ans}</code></p>
                </div>
                <button class="toggle-btn">Show Output</button>
            </div>
            <div class="expand-content">
                <div class="code-editor">
                    <div class="editor-header">
                        <div class="dots"><span class="r"></span><span class="y"></span><span class="g"></span>OUTPUT</div>
                    </div>
                    <img class="output-img" src="img/view_out_${index + 1}.png" alt="SQL View Execution Result">
                </div>
            </div>
        `;
        viewContainer.appendChild(card);
    });
}

// Initial Render
renderViewCards();

// Interactive Logic
viewContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-btn')) {
        const card = e.target.closest('.program-card');
        card.classList.toggle('active');
        e.target.textContent = card.classList.contains('active') ? 'Hide Output' : 'Show Output';
    }
});
