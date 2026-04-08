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


const subqueryQuestions = [
    { 
        q: "1. Display employees whose salary is greater than JONES.", 
        ans: "SELECT * FROM EMP WHERE SAL > (SELECT SAL FROM EMP WHERE ENAME = 'JONES');" 
    },
    { 
        q: "2. Display employees earning the same salary as SCOTT.", 
        ans: "SELECT * FROM EMP WHERE SAL = (SELECT SAL FROM EMP WHERE ENAME = 'SCOTT') AND ENAME != 'SCOTT';" 
    },
    { 
        q: "3. Display employees hired after ALLEN.", 
        ans: "SELECT * FROM EMP WHERE HIREDATE > (SELECT HIREDATE FROM EMP WHERE ENAME = 'ALLEN');" 
    },
    { 
        q: "4. Display employees working in the same department as BLAKE.", 
        ans: "SELECT * FROM EMP WHERE DEPTNO = (SELECT DEPTNO FROM EMP WHERE ENAME = 'BLAKE') AND ENAME != 'BLAKE';" 
    },
    { 
        q: "5. Display employees having the same job as MILLER.", 
        ans: "SELECT * FROM EMP WHERE JOB = (SELECT JOB FROM EMP WHERE ENAME = 'MILLER') AND ENAME != 'MILLER';" 
    },
    { 
        q: "6. Display employees earning less than the average salary.", 
        ans: "SELECT * FROM EMP WHERE SAL < (SELECT AVG(SAL) FROM EMP);" 
    },
    { 
        q: "7. Display employees earning more than the maximum salary of CLERKs.", 
        ans: "SELECT * FROM EMP WHERE SAL > (SELECT MAX(SAL) FROM EMP WHERE JOB = 'CLERK');" 
    },
    { 
        q: "8. Display employee(s) with the minimum salary.", 
        ans: "SELECT * FROM EMP WHERE SAL = (SELECT MIN(SAL) FROM EMP);" 
    },
    { 
        q: "9. Display employee(s) with the maximum salary.", 
        ans: "SELECT * FROM EMP WHERE SAL = (SELECT MAX(SAL) FROM EMP);" 
    },
    { 
        q: "10. Display employees working in departments located in NEW YORK.", 
        ans: "SELECT * FROM EMP WHERE DEPTNO = (SELECT DEPTNO FROM DEPT WHERE LOC = 'NEW YORK');" 
    },

    { q: "11. Display employees whose salary matches any salary in department 30.", ans: "SELECT * FROM EMP WHERE SAL IN (SELECT SAL FROM EMP WHERE DEPTNO = 30);" },
    { q: "12. Display employees earning more than all CLERKs.", ans: "SELECT * FROM EMP WHERE SAL > ALL (SELECT SAL FROM EMP WHERE JOB = 'CLERK');" },
    { q: "13. Display employees earning less than any MANAGER.", ans: "SELECT * FROM EMP WHERE SAL < ANY (SELECT SAL FROM EMP WHERE JOB = 'MANAGER');" },
    { q: "14. Display employees whose job appears in department 20.", ans: "SELECT * FROM EMP WHERE JOB IN (SELECT JOB FROM EMP WHERE DEPTNO = 20);" },
    { q: "15. Display employees whose department has at least one SALESMAN.", ans: "SELECT * FROM EMP WHERE DEPTNO IN (SELECT DEPTNO FROM EMP WHERE JOB = 'SALESMAN');" },
    { q: "16. Display employees earning the same salary as any CLERK.", ans: "SELECT * FROM EMP WHERE SAL IN (SELECT SAL FROM EMP WHERE JOB = 'CLERK');" },
    { q: "17. Display employees who are not working in departments of SALESMAN.", ans: "SELECT * FROM EMP WHERE DEPTNO NOT IN (SELECT DEPTNO FROM EMP WHERE JOB = 'SALESMAN');" },
    { q: "18. Display employees earning more than all employees in department 10.", ans: "SELECT * FROM EMP WHERE SAL > ALL (SELECT SAL FROM EMP WHERE DEPTNO = 10);" },
    { q: "19. Display employees whose department number is among departments with more than 3 employees.", ans: "SELECT * FROM EMP WHERE DEPTNO IN (SELECT DEPTNO FROM EMP GROUP BY DEPTNO HAVING COUNT(*) > 3);" },
    { q: "20. Display employees whose salary is greater than salary of their manager.", ans: "SELECT e.* FROM EMP e WHERE e.SAL > (SELECT m.SAL FROM EMP m WHERE m.EMPNO = e.MGR);" },
    { q: "21. Display jobs where average salary is greater than overall average salary.", ans: "SELECT JOB FROM EMP GROUP BY JOB HAVING AVG(SAL) > (SELECT AVG(SAL) FROM EMP);" },
    { q: "22. Display employees earning more than the department average salary.", ans: "SELECT * FROM EMP e WHERE SAL > (SELECT AVG(SAL) FROM EMP WHERE DEPTNO = e.DEPTNO);" },
    { q: "23. Display employees earning the highest salary in each department.", ans: "SELECT * FROM EMP WHERE (DEPTNO, SAL) IN (SELECT DEPTNO, MAX(SAL) FROM EMP GROUP BY DEPTNO);" },
    { q: "24. Display employees earning the lowest salary in each job.", ans: "SELECT * FROM EMP WHERE (JOB, SAL) IN (SELECT JOB, MIN(SAL) FROM EMP GROUP BY JOB);" },
    { q: "25. Display departments having total salary greater than department 20.", ans: "SELECT DEPTNO FROM EMP GROUP BY DEPTNO HAVING SUM(SAL) > (SELECT SUM(SAL) FROM EMP WHERE DEPTNO = 20);" },
    { q: "26. Display employees whose salary equals the maximum salary of their job.", ans: "SELECT * FROM EMP e WHERE SAL = (SELECT MAX(SAL) FROM EMP WHERE JOB = e.JOB);" },
    { q: "27. Display employees earning more than the overall average salary.", ans: "SELECT * FROM EMP WHERE SAL > (SELECT AVG(SAL) FROM EMP);" },
    { q: "28. Display department(s) having the maximum number of employees.", ans: "SELECT DEPTNO FROM EMP GROUP BY DEPTNO HAVING COUNT(*) = (SELECT MAX(COUNT(*)) FROM EMP GROUP BY DEPTNO);" },
    { q: "29. Display jobs having minimum average salary.", ans: "SELECT JOB FROM EMP GROUP BY JOB HAVING AVG(SAL) = (SELECT MIN(AVG(SAL)) FROM EMP GROUP BY JOB);" },
    { q: "30. Display employees earning more than the average salary of CLERKs.", ans: "SELECT * FROM EMP WHERE SAL > (SELECT AVG(SAL) FROM EMP WHERE JOB = 'CLERK');" },
    { q: "31. Display department(s) where average salary is highest.", ans: "SELECT DEPTNO FROM EMP GROUP BY DEPTNO HAVING AVG(SAL) = (SELECT MAX(AVG(SAL)) FROM EMP GROUP BY DEPTNO);" },
    { q: "32. Display employees earning more than the average salary of their own department.", ans: "SELECT * FROM EMP e WHERE SAL > (SELECT AVG(SAL) FROM EMP WHERE DEPTNO = e.DEPTNO);" },
    { q: "33. Display employees earning the maximum salary in their department.", ans: "SELECT * FROM EMP e WHERE SAL = (SELECT MAX(SAL) FROM EMP WHERE DEPTNO = e.DEPTNO);" },
    { q: "34. Display employees earning the minimum salary in their department.", ans: "SELECT * FROM EMP e WHERE SAL = (SELECT MIN(SAL) FROM EMP WHERE DEPTNO = e.DEPTNO);" },
    { q: "35. Display employees whose salary is greater than the average salary of their job.", ans: "SELECT * FROM EMP e WHERE SAL > (SELECT AVG(SAL) FROM EMP WHERE JOB = e.JOB);" },
    { q: "36. Display employees who are the only employee in their department.", ans: "SELECT * FROM EMP WHERE DEPTNO IN (SELECT DEPTNO FROM EMP GROUP BY DEPTNO HAVING COUNT(*) = 1);" },
    { q: "37. Display departments having employees earning more than 5000.", ans: "SELECT DISTINCT DEPTNO FROM EMP WHERE SAL > 5000;" },
    { q: "38. Display employees whose department has more than 3 employees.", ans: "SELECT * FROM EMP WHERE DEPTNO IN (SELECT DEPTNO FROM EMP GROUP BY DEPTNO HAVING COUNT(*) > 3);" },
    { q: "39. Display employees whose job has more than 2 employees.", ans: "SELECT * FROM EMP WHERE JOB IN (SELECT JOB FROM EMP GROUP BY JOB HAVING COUNT(*) > 2);" },
    { q: "40. Display employees working in departments where no one gets commission.", ans: "SELECT * FROM EMP WHERE DEPTNO NOT IN (SELECT DEPTNO FROM EMP WHERE COMM IS NOT NULL AND COMM > 0);" },
    { q: "41. Display employees whose department has at least one manager.", ans: "SELECT * FROM EMP WHERE DEPTNO IN (SELECT DEPTNO FROM EMP WHERE JOB = 'MANAGER');" },
    { q: "42. Display departments that have employees.", ans: "SELECT * FROM DEPT WHERE DEPTNO IN (SELECT DEPTNO FROM EMP);" },
    { q: "43. Display departments that have no employees.", ans: "SELECT * FROM DEPT WHERE DEPTNO NOT IN (SELECT DEPTNO FROM EMP);" },
    { q: "44. Display employees who are managers (have subordinates).", ans: "SELECT * FROM EMP WHERE EMPNO IN (SELECT MGR FROM EMP);" },
    { q: "45. Display employees who are not managers.", ans: "SELECT * FROM EMP WHERE EMPNO NOT IN (SELECT NVL(MGR,0) FROM EMP);" },
    { q: "46. Display employees working in departments where SALESMAN exists.", ans: "SELECT * FROM EMP WHERE DEPTNO IN (SELECT DEPTNO FROM EMP WHERE JOB = 'SALESMAN');" },
    { q: "47. Display departments where no SALESMAN exists.", ans: "SELECT * FROM DEPT WHERE DEPTNO NOT IN (SELECT DEPTNO FROM EMP WHERE JOB = 'SALESMAN');" },
    { q: "48. Display employees whose department has employees with commission.", ans: "SELECT * FROM EMP WHERE DEPTNO IN (SELECT DEPTNO FROM EMP WHERE COMM > 0);" },
    { q: "49. Display departments where all employees get commission.", ans: "SELECT DEPTNO FROM EMP GROUP BY DEPTNO HAVING COUNT(COMM) = COUNT(*);" },
    { q: "50. Display employees whose department has no CLERKs.", ans: "SELECT * FROM EMP WHERE DEPTNO NOT IN (SELECT DEPTNO FROM EMP WHERE JOB = 'CLERK');" },
    { q: "51. Display employees who work in departments located in CHICAGO.", ans: "SELECT * FROM EMP WHERE DEPTNO = (SELECT DEPTNO FROM DEPT WHERE LOC = 'CHICAGO');" },
    { q: "52. Display dept number and avg salary of employees whose salary is > 2000.", ans: "SELECT DEPTNO, AVG(SAL) FROM EMP WHERE SAL > 2000 GROUP BY DEPTNO;" },
    { q: "53. Display job and total salary of employees earning more than the dept average.", ans: "SELECT JOB, SUM(SAL) FROM EMP e WHERE SAL > (SELECT AVG(SAL) FROM EMP WHERE DEPTNO = e.DEPTNO) GROUP BY JOB;" },
    { q: "54. Display departments having average salary greater than overall average.", ans: "SELECT DEPTNO FROM EMP GROUP BY DEPTNO HAVING AVG(SAL) > (SELECT AVG(SAL) FROM EMP);" },
    { q: "55. Display job-wise employee count from employees earning more than 1500.", ans: "SELECT JOB, COUNT(*) FROM EMP WHERE SAL > 1500 GROUP BY JOB;" },
    { q: "56. Display departments having more than 2 employees earning commission.", ans: "SELECT DEPTNO FROM EMP WHERE COMM > 0 GROUP BY DEPTNO HAVING COUNT(*) > 2;" },
    { q: "57. Display job and maximum salary from employees hired after 1981.", ans: "SELECT JOB, MAX(SAL) FROM EMP WHERE HIREDATE > '31-DEC-1981' GROUP BY JOB;" },
    { q: "58. Display department-wise total salary excluding department 30.", ans: "SELECT DEPTNO, SUM(SAL) FROM EMP WHERE DEPTNO != 30 GROUP BY DEPTNO;" },
    { q: "59. Display departments having total salary greater than overall average.", ans: "SELECT DEPTNO FROM EMP GROUP BY DEPTNO HAVING SUM(SAL) > (SELECT AVG(SUM(SAL)) FROM EMP GROUP BY DEPTNO);" },
    { q: "60. Display job-wise average salary where department has > 3 employees.", ans: "SELECT JOB, AVG(SAL) FROM EMP WHERE DEPTNO IN (SELECT DEPTNO FROM EMP GROUP BY DEPTNO HAVING COUNT(*) > 3) GROUP BY JOB;" },
    { q: "61. Display department and job having maximum total salary.", ans: "SELECT DEPTNO, JOB FROM EMP GROUP BY DEPTNO, JOB HAVING SUM(SAL) = (SELECT MAX(SUM(SAL)) FROM EMP GROUP BY DEPTNO, JOB);" },
    { q: "62. Display employees earning the second highest salary.", ans: "SELECT * FROM EMP WHERE SAL = (SELECT MAX(SAL) FROM EMP WHERE SAL < (SELECT MAX(SAL) FROM EMP));" },
    { q: "63. Display employees earning more than the average salary of DALLAS departments.", ans: "SELECT * FROM EMP WHERE SAL > (SELECT AVG(SAL) FROM EMP WHERE DEPTNO IN (SELECT DEPTNO FROM DEPT WHERE LOC = 'DALLAS'));" },
    { q: "64. Display departments where maximum salary equals minimum salary.", ans: "SELECT DEPTNO FROM EMP GROUP BY DEPTNO HAVING MAX(SAL) = MIN(SAL);" },
    { q: "65. Display employees whose salary is < all MANAGERS but > any CLERK.", ans: "SELECT * FROM EMP WHERE SAL < ALL (SELECT SAL FROM EMP WHERE JOB = 'MANAGER') AND SAL > ANY (SELECT SAL FROM EMP WHERE JOB = 'CLERK');" },
    { q: "66. Display employees whose salary is equal to dept-wise second highest salary.", ans: "SELECT * FROM EMP e WHERE SAL = (SELECT MAX(SAL) FROM EMP WHERE DEPTNO = e.DEPTNO AND SAL < (SELECT MAX(SAL) FROM EMP WHERE DEPTNO = e.DEPTNO));" },
    { q: "67. Display employees earning more than the median salary.", ans: "SELECT * FROM EMP WHERE SAL > (SELECT MEDIAN(SAL) FROM EMP);" },
    { q: "68. Display employees whose salary is greater than 50% of employees.", ans: "SELECT * FROM EMP WHERE SAL > (SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY SAL) FROM EMP);" },
    { q: "69. Display employees earning the third highest salary.", ans: "SELECT * FROM EMP WHERE SAL = (SELECT MIN(SAL) FROM (SELECT DISTINCT SAL FROM EMP ORDER BY SAL DESC) WHERE ROWNUM <= 3);" }

];

const container = document.getElementById('question-list');

function renderSubqueries() {
    if(!container) return;
    container.innerHTML = ""; 

    subqueryQuestions.forEach((item, index) => {
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
                    <img class="output-img" src="img/sub_output${index + 1}.png" alt="SQL Result">
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Execute the render
renderSubqueries();

// Handle the "Show Output" click event
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-btn')) {
        const card = e.target.closest('.program-card');
        card.classList.toggle('active');
        e.target.textContent = card.classList.contains('active') ? 'Hide Output' : 'Show Output';
    }
});
