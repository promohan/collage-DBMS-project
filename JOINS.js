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


const joinQuestions = [
    { 
        q: "1. Display employee name and department name.", 
        ans: "SELECT E.ENAME, D.DNAME FROM EMP E JOIN DEPT D ON E.DEPTNO = D.DEPTNO;" 
    },
    { 
        q: "2. Display employee name, salary, and department location.", 
        ans: "SELECT E.ENAME, E.SAL, D.LOC FROM EMP E JOIN DEPT D ON E.DEPTNO = D.DEPTNO;" 
    },
    { 
        q: "3. Display employee name and department name for department 10.", 
        ans: "SELECT E.ENAME, D.DNAME FROM EMP E JOIN DEPT D ON E.DEPTNO = D.DEPTNO WHERE E.DEPTNO = 10;" 
    },
    { 
        q: "4. Display employee name and department name where salary > 2000.", 
        ans: "SELECT E.ENAME, D.DNAME FROM EMP E JOIN DEPT D ON E.DEPTNO = D.DEPTNO WHERE E.SAL > 2000;" 
    },
    { 
        q: "5. Display employee name, job, and department name.", 
        ans: "SELECT E.ENAME, E.JOB, D.DNAME FROM EMP E JOIN DEPT D ON E.DEPTNO = D.DEPTNO;" 
    },


    { q: "6. Display employee name and department location for CLERKs.", ans: "SELECT E.ENAME, D.LOC FROM EMP E JOIN DEPT D ON E.DEPTNO = D.DEPTNO WHERE E.JOB = 'CLERK';" },
    { q: "7. Display employee name and department name working in NEW YORK.", ans: "SELECT E.ENAME, D.DNAME FROM EMP E JOIN DEPT D ON E.DEPTNO = D.DEPTNO WHERE D.LOC = 'NEW YORK';" },
    { q: "8. Display employee name, department number, and department name.", ans: "SELECT E.ENAME, D.DEPTNO, D.DNAME FROM EMP E JOIN DEPT D ON E.DEPTNO = D.DEPTNO;" },
    { q: "9. Display employees hired after 1981 with department name.", ans: "SELECT E.*, D.DNAME FROM EMP E JOIN DEPT D ON E.DEPTNO = D.DEPTNO WHERE E.HIREDATE > '31-DEC-1981';" },
    { q: "10. Display employees with commission along with department name.", ans: "SELECT E.*, D.DNAME FROM EMP E JOIN DEPT D ON E.DEPTNO = D.DEPTNO WHERE E.COMM IS NOT NULL;" },
    { q: "11. Display employees whose salary is between 1500 and 3000 with department.", ans: "SELECT E.*, D.DNAME FROM EMP E JOIN DEPT D ON E.DEPTNO = D.DEPTNO WHERE E.SAL BETWEEN 1500 AND 3000;" },
    { q: "12. Display employees who are the only employee in their department.", ans: "SELECT * FROM EMP WHERE DEPTNO IN (SELECT DEPTNO FROM EMP GROUP BY DEPTNO HAVING COUNT(*) = 1);" },
    { q: "13. Display employees whose department has more than 3 employees.", ans: "SELECT E.*, D.DNAME FROM EMP E JOIN DEPT D ON E.DEPTNO = D.DEPTNO WHERE E.DEPTNO IN (SELECT DEPTNO FROM EMP GROUP BY DEPTNO HAVING COUNT(*) > 3);" },
    { q: "14. Display departments where no employee earns more than 2000.", ans: "SELECT DNAME FROM DEPT WHERE DEPTNO NOT IN (SELECT DEPTNO FROM EMP WHERE SAL > 2000);" },
    { q: "15. Display employees who earn more than at least one manager.", ans: "SELECT * FROM EMP WHERE SAL > ANY (SELECT SAL FROM EMP WHERE JOB = 'MANAGER');" },
    { q: "16. Display employees who share same job and department.", ans: "SELECT E1.ENAME, E1.JOB, E1.DEPTNO FROM EMP E1, EMP E2 WHERE E1.JOB = E2.JOB AND E1.DEPTNO = E2.DEPTNO AND E1.EMPNO != E2.EMPNO;" },
    { q: "17. Display employees working in same department as their manager.", ans: "SELECT E.ENAME FROM EMP E JOIN EMP M ON E.MGR = M.EMPNO WHERE E.DEPTNO = M.DEPTNO;" },
    { q: "18. Display employees whose manager works in a different department.", ans: "SELECT E.ENAME FROM EMP E JOIN EMP M ON E.MGR = M.EMPNO WHERE E.DEPTNO != M.DEPTNO;" },
    { q: "19. Display employees who are highest paid in their department.", ans: "SELECT * FROM EMP WHERE (DEPTNO, SAL) IN (SELECT DEPTNO, MAX(SAL) FROM EMP GROUP BY DEPTNO);" },
    { q: "20. Display employees earning more than their department average.", ans: "SELECT E.* FROM EMP E WHERE SAL > (SELECT AVG(SAL) FROM EMP WHERE DEPTNO = E.DEPTNO);" },
    { q: "21. Display department with maximum employees.", ans: "SELECT D.DNAME FROM DEPT D JOIN EMP E ON D.DEPTNO = E.DEPTNO GROUP BY D.DNAME HAVING COUNT(*) = (SELECT MAX(COUNT(*)) FROM EMP GROUP BY DEPTNO);" },
    { q: "22. Display department with highest total salary.", ans: "SELECT D.DNAME FROM DEPT D JOIN EMP E ON D.DEPTNO = E.DEPTNO GROUP BY D.DNAME HAVING SUM(SAL) = (SELECT MAX(SUM(SAL)) FROM EMP GROUP BY DEPTNO);" },
    { q: "23. Display department name and average salary.", ans: "SELECT D.DNAME, AVG(E.SAL) FROM EMP E JOIN DEPT D ON E.DEPTNO = D.DEPTNO GROUP BY D.DNAME;" },
    { q: "24. Display department name and total salary.", ans: "SELECT D.DNAME, SUM(E.SAL) FROM EMP E JOIN DEPT D ON E.DEPTNO = D.DEPTNO GROUP BY D.DNAME;" },
    { q: "25. Display department name and number of employees.", ans: "SELECT D.DNAME, COUNT(E.EMPNO) FROM DEPT D LEFT JOIN EMP E ON D.DEPTNO = E.DEPTNO GROUP BY D.DNAME;" },
    { q: "26. Display employees not assigned to any department.", ans: "SELECT * FROM EMP WHERE DEPTNO IS NULL;" },
    { q: "27. Display departments with no employees.", ans: "SELECT * FROM DEPT WHERE DEPTNO NOT IN (SELECT DISTINCT DEPTNO FROM EMP WHERE DEPTNO IS NOT NULL);" },
    { q: "28. Display all departments with employees (even if no employees).", ans: "SELECT D.* FROM DEPT D LEFT JOIN EMP E ON D.DEPTNO = E.DEPTNO;" },
    { q: "29. Display all employees with department name (even if no department).", ans: "SELECT E.ENAME, D.DNAME FROM EMP E LEFT JOIN DEPT D ON E.DEPTNO = D.DEPTNO;" },
    { q: "30. Display employees whose manager works in department 10.", ans: "SELECT E.* FROM EMP E JOIN EMP M ON E.MGR = M.EMPNO WHERE M.DEPTNO = 10;" },
    { q: "31. Display employees working under the same manager.", ans: "SELECT E1.ENAME, E2.ENAME FROM EMP E1 JOIN EMP E2 ON E1.MGR = E2.MGR WHERE E1.EMPNO < E2.EMPNO;" },
    { q: "32. Display employees earning more than their manager.", ans: "SELECT E.ENAME FROM EMP E JOIN EMP M ON E.MGR = M.EMPNO WHERE E.SAL > M.SAL;" },
    { q: "33. Display employee name and manager salary.", ans: "SELECT E.ENAME, M.SAL FROM EMP E JOIN EMP M ON E.MGR = M.EMPNO;" },
    { q: "34. Display employees who are managers.", ans: "SELECT DISTINCT M.* FROM EMP E JOIN EMP M ON E.MGR = M.EMPNO;" },
    { q: "35. Display employees who do not have managers.", ans: "SELECT * FROM EMP WHERE MGR IS NULL;" },
    { q: "36. Display employee name and manager name.", ans: "SELECT E.ENAME AS EMP, M.ENAME AS MGR FROM EMP E LEFT JOIN EMP M ON E.MGR = M.EMPNO;" },
    { q: "37. Display employees whose department location is DALLAS.", ans: "SELECT E.* FROM EMP E JOIN DEPT D ON E.DEPTNO = D.DEPTNO WHERE D.LOC = 'DALLAS';" },
    { q: "38. Display employees whose department is ACCOUNTING.", ans: "SELECT E.* FROM EMP E JOIN DEPT D ON E.DEPTNO = D.DEPTNO WHERE D.DNAME = 'ACCOUNTING';" },
    { q: "39. Display employees not working in department 30 with department name.", ans: "SELECT E.ENAME, D.DNAME FROM EMP E JOIN DEPT D ON E.DEPTNO = D.DEPTNO WHERE E.DEPTNO != 30;" },
    { q: "40. Display employees whose job is MANAGER with department location.", ans: "SELECT E.ENAME, D.LOC FROM EMP E JOIN DEPT D ON E.DEPTNO = D.DEPTNO WHERE E.JOB = 'MANAGER';" }
];


const container = document.getElementById('question-list');

function renderJoinCards() {
    if(!container) return;
    container.innerHTML = ""; 

    joinQuestions.forEach((item, index) => {
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
                        <span class="file-name">mohan${index + 1}.sql</span>
                    </div>
                    <img class="output-img" src="img/join_out_${index + 1}.png" alt="SQL Join Result">
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Initialize
renderJoinCards();

// Handle Expand/Collapse
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-btn')) {
        const card = e.target.closest('.program-card');
        card.classList.toggle('active');
        e.target.textContent = card.classList.contains('active') ? 'Hide Output' : 'Show Output';
    }
});