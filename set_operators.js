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


const setOpQuestions = [
    { 
        q: "1. Display all department numbers from both EMP and DEPT tables using UNION.", 
        ans: "SELECT DEPTNO FROM EMP UNION SELECT DEPTNO FROM DEPT;" 
    },
    { 
        q: "2. Display all department numbers from EMP and DEPT including duplicates using UNION ALL.", 
        ans: "SELECT DEPTNO FROM EMP UNION ALL SELECT DEPTNO FROM DEPT;" 
    },
    { 
        q: "3. Display department numbers that are present in both EMP and DEPT using INTERSECT.", 
        ans: "SELECT DEPTNO FROM EMP INTERSECT SELECT DEPTNO FROM DEPT;" 
    },
    { 
        q: "4. Display department numbers that are present in EMP but not in DEPT using MINUS.", 
        ans: "SELECT DEPTNO FROM EMP MINUS SELECT DEPTNO FROM DEPT;" 
    },
    { 
        q: "5. Display department numbers that are present in DEPT but not assigned to any employee.", 
        ans: "SELECT DEPTNO FROM DEPT MINUS SELECT DEPTNO FROM EMP;" 
    },

    { q: "6. Display employee names and department names in a single column using UNION.", ans: "SELECT ENAME FROM EMP UNION SELECT DNAME FROM DEPT;" },
    { q: "7. Display all employee names and department names, including duplicates.", ans: "SELECT ENAME FROM EMP UNION ALL SELECT DNAME FROM DEPT;" },
    { q: "8. Jobs that exist in EMP and also as department names in DEPT.", ans: "SELECT JOB FROM EMP INTERSECT SELECT DNAME FROM DEPT;" },
    { q: "9. Display employee names that are not department names.", ans: "SELECT ENAME FROM EMP MINUS SELECT DNAME FROM DEPT;" },
    { q: "10. Department locations that are not used by any employee.", ans: "SELECT LOC FROM DEPT MINUS SELECT D.LOC FROM DEPT D JOIN EMP E ON D.DEPTNO = E.DEPTNO;" },
    { q: "11. Display employee names from department 10 and 20 using UNION.", ans: "SELECT ENAME FROM EMP WHERE DEPTNO = 10 UNION SELECT ENAME FROM EMP WHERE DEPTNO = 20;" },
    { q: "12. Display names from department 10 and 20 including duplicates.", ans: "SELECT ENAME FROM EMP WHERE DEPTNO = 10 UNION ALL SELECT ENAME FROM EMP WHERE DEPTNO = 20;" },
    { q: "13. Employees in departments that exist in DEPT table (INTERSECT).", ans: "SELECT ENAME FROM EMP WHERE DEPTNO IN (SELECT DEPTNO FROM EMP INTERSECT SELECT DEPTNO FROM DEPT);" },
    { q: "14. Employees whose department does not exist in DEPT table (MINUS).", ans: "SELECT ENAME FROM EMP WHERE DEPTNO IN (SELECT DEPTNO FROM EMP MINUS SELECT DEPTNO FROM DEPT);" },
    { q: "15. Department numbers that have employees and exist in DEPT.", ans: "SELECT DEPTNO FROM EMP INTERSECT SELECT DEPTNO FROM DEPT;" },
    { q: "16. Unique job roles and unique department names in one result.", ans: "SELECT JOB FROM EMP UNION SELECT DNAME FROM DEPT;" },
    { q: "17. Common values between employee job and department location.", ans: "SELECT JOB FROM EMP INTERSECT SELECT LOC FROM DEPT;" },
    { q: "18. Employee names who are not assigned to any valid department.", ans: "SELECT ENAME FROM EMP WHERE DEPTNO NOT IN (SELECT DEPTNO FROM DEPT);" },
    { q: "19. Combine: Employees earning > 2000 and Employees from dept 10.", ans: "SELECT ENAME FROM EMP WHERE SAL > 2000 UNION SELECT ENAME FROM EMP WHERE DEPTNO = 10;" },
    { q: "20. Employees in dept 10 but not in dept 20 using MINUS.", ans: "SELECT ENAME FROM EMP WHERE DEPTNO = 10 MINUS SELECT ENAME FROM EMP WHERE DEPTNO = 20;" },
    { q: "21. Dept numbers in EMP and DEPT, excluding department 10.", ans: "(SELECT DEPTNO FROM EMP INTERSECT SELECT DEPTNO FROM DEPT) MINUS SELECT 10 FROM DUAL;" },
    { q: "22. Employee and department names in one result sorted alphabetically.", ans: "SELECT ENAME FROM EMP UNION SELECT DNAME FROM DEPT ORDER BY 1;" },
    { q: "23. Department numbers that appear in EMP more than once.", ans: "SELECT DEPTNO FROM EMP GROUP BY DEPTNO HAVING COUNT(*) > 1;" },
    { q: "24. Employees from departments in NEW YORK and DALLAS using UNION.", ans: "SELECT E.ENAME FROM EMP E JOIN DEPT D ON E.DEPTNO = D.DEPTNO WHERE D.LOC = 'NEW YORK' UNION SELECT E.ENAME FROM EMP E JOIN DEPT D ON E.DEPTNO = D.DEPTNO WHERE D.LOC = 'DALLAS';" },
    { q: "25. Combine: Salary > 3000 and Job = 'MANAGER' (No duplicates).", ans: "SELECT ENAME FROM EMP WHERE SAL > 3000 UNION SELECT ENAME FROM EMP WHERE JOB = 'MANAGER';" }
];

const setOpContainer = document.getElementById('question-list');

function renderSetOperators() {
    if(!setOpContainer) return;
    setOpContainer.innerHTML = ""; 

    setOpQuestions.forEach((item, index) => {
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
                    <img class="output-img" src="img/set_op_${index + 1}.png" alt="SQL Set Operator Result">
                </div>
            </div>
        `;
        setOpContainer.appendChild(card);
    });
}

// Execute Render
renderSetOperators();

// Generic Toggle Logic
setOpContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-btn')) {
        const card = e.target.closest('.program-card');
        card.classList.toggle('active');
        e.target.textContent = card.classList.contains('active') ? 'Hide Output' : 'Show Output';
    }
});
