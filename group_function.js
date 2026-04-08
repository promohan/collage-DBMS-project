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



const aggregateQuestions = [
    { 
        q: "Display the total number of employees.", 
        ans: "SELECT COUNT(*) FROM EMP;" 
    },
    { 
        q: "Display the total salary of all employees.", 
        ans: "SELECT SUM(SAL) FROM EMP;" 
    },
    { 
        q: "Display the average salary of all employees.", 
        ans: "SELECT AVG(SAL) FROM EMP;" 
    },
    { 
        q: "Display the highest salary.", 
        ans: "SELECT MAX(SAL) FROM EMP;" 
    },
    { 
        q: "Display the lowest salary.", 
        ans: "SELECT MIN(SAL) FROM EMP;" 
    },
    { 
        q: "Display the total number of departments in EMP table.", 
        ans: "SELECT COUNT(DISTINCT DEPTNO) FROM EMP;" 
    },
    { 
        q: "Display the number of employees who are managers.", 
        ans: "SELECT COUNT(DISTINCT MGR) FROM EMP;" 
    },
    { 
        q: "Display the total commission paid to employees.", 
        ans: "SELECT SUM(COMM) FROM EMP;" 
    },
    { 
        q: "Display the average commission.", 
        ans: "SELECT AVG(COMM) FROM EMP;" 
    },
    { q: "10. Display the number of employees who are getting commission.", ans: "SELECT COUNT(COMM) FROM EMP WHERE COMM > 0;" },
    { q: "11. Display department-wise total salary.", ans: "SELECT DEPTNO, SUM(SAL) FROM EMP GROUP BY DEPTNO;" },
    { q: "12. Display department-wise average salary.", ans: "SELECT DEPTNO, AVG(SAL) FROM EMP GROUP BY DEPTNO;" },
    { q: "13. Display department-wise number of employees.", ans: "SELECT DEPTNO, COUNT(*) FROM EMP GROUP BY DEPTNO;" },
    { q: "14. Display job-wise number of employees.", ans: "SELECT JOB, COUNT(*) FROM EMP GROUP BY JOB;" },
    { q: "15. Display job-wise total salary.", ans: "SELECT JOB, SUM(SAL) FROM EMP GROUP BY JOB;" },
    { q: "16. Display job-wise maximum salary.", ans: "SELECT JOB, MAX(SAL) FROM EMP GROUP BY JOB;" },
    { q: "17. Display job-wise minimum salary.", ans: "SELECT JOB, MIN(SAL) FROM EMP GROUP BY JOB;" },
    { q: "18. Display department-wise maximum salary.", ans: "SELECT DEPTNO, MAX(SAL) FROM EMP GROUP BY DEPTNO;" },
    { q: "19. Display department-wise minimum salary.", ans: "SELECT DEPTNO, MIN(SAL) FROM EMP GROUP BY DEPTNO;" },
    { q: "20. Display department-wise average commission.", ans: "SELECT DEPTNO, AVG(COMM) FROM EMP GROUP BY DEPTNO;" },
    { q: "21. Display department-wise job-wise number of employees.", ans: "SELECT DEPTNO, JOB, COUNT(*) FROM EMP GROUP BY DEPTNO, JOB;" },
    { q: "22. Display department-wise job-wise total salary.", ans: "SELECT DEPTNO, JOB, SUM(SAL) FROM EMP GROUP BY DEPTNO, JOB;" },
    { q: "23. Display department-wise job-wise average salary.", ans: "SELECT DEPTNO, JOB, AVG(SAL) FROM EMP GROUP BY DEPTNO, JOB;" },
    { q: "24. Display job-wise department-wise maximum salary.", ans: "SELECT JOB, DEPTNO, MAX(SAL) FROM EMP GROUP BY JOB, DEPTNO;" },
    { q: "25. Display job-wise department-wise minimum salary.", ans: "SELECT JOB, DEPTNO, MIN(SAL) FROM EMP GROUP BY JOB, DEPTNO;" },
    { q: "26. Display department and job having highest total salary.", ans: "SELECT DEPTNO, JOB, SUM(SAL) FROM EMP GROUP BY DEPTNO, JOB HAVING SUM(SAL) = (SELECT MAX(SUM(SAL)) FROM EMP GROUP BY DEPTNO, JOB);" },
    { q: "27. Display department where sum of salaries is maximum.", ans: "SELECT DEPTNO FROM EMP GROUP BY DEPTNO HAVING SUM(SAL) = (SELECT MAX(SUM(SAL)) FROM EMP GROUP BY DEPTNO);" },
    { q: "28. Display job having minimum average salary.", ans: "SELECT JOB FROM EMP GROUP BY JOB HAVING AVG(SAL) = (SELECT MIN(AVG(SAL)) FROM EMP GROUP BY JOB);" },
    { q: "29. Display jobs having average salary greater than department-wise average salary.", ans: "SELECT JOB, AVG(SAL) FROM EMP GROUP BY JOB HAVING AVG(SAL) > (SELECT AVG(SAL) FROM EMP);" },
    { q: "30. Display department having highest number of employees.", ans: "SELECT DEPTNO FROM EMP GROUP BY DEPTNO HAVING COUNT(*) = (SELECT MAX(COUNT(*)) FROM EMP GROUP BY DEPTNO);" },
    { q: "31. Display jobs whose total salary is more than salary of all CLERKs combined.", ans: "SELECT JOB FROM EMP GROUP BY JOB HAVING SUM(SAL) > (SELECT SUM(SAL) FROM EMP WHERE JOB = 'CLERK');" },
    { q: "32. Display departments having same number of employees.", ans: "SELECT COUNT(*), DEPTNO FROM EMP GROUP BY DEPTNO HAVING COUNT(*) IN (SELECT COUNT(*) FROM EMP GROUP BY DEPTNO GROUP BY COUNT(*) HAVING COUNT(*) > 1);" },
    { q: "33. Display jobs where max salary is equal to department 20 max salary.", ans: "SELECT JOB FROM EMP GROUP BY JOB HAVING MAX(SAL) = (SELECT MAX(SAL) FROM EMP WHERE DEPTNO = 20);" },
    { q: "34. Display department having minimum total salary.", ans: "SELECT DEPTNO FROM EMP GROUP BY DEPTNO HAVING SUM(SAL) = (SELECT MIN(SUM(SAL)) FROM EMP GROUP BY DEPTNO);" },
    { q: "35. Display job having highest average salary.", ans: "SELECT JOB FROM EMP GROUP BY JOB HAVING AVG(SAL) = (SELECT MAX(AVG(SAL)) FROM EMP GROUP BY JOB);" },
    { q: "36. Display department number and total salary where average salary is greater than overall average salary.", ans: "SELECT DEPTNO, SUM(SAL) FROM EMP GROUP BY DEPTNO HAVING AVG(SAL) > (SELECT AVG(SAL) FROM EMP);" },
    { q: "37. Display job-wise count of employees not getting commission.", ans: "SELECT JOB, COUNT(*) FROM EMP WHERE COMM IS NULL OR COMM = 0 GROUP BY JOB;" },
    { q: "38. Display departments where no employee gets commission.", ans: "SELECT DEPTNO FROM EMP GROUP BY DEPTNO HAVING SUM(NVL(COMM, 0)) = 0;" },
    { q: "39. Display departments where all employees get commission.", ans: "SELECT DEPTNO FROM EMP GROUP BY DEPTNO HAVING COUNT(COMM) = COUNT(*);" },
    { q: "40. Display job-wise average commission.", ans: "SELECT JOB, AVG(COMM) FROM EMP GROUP BY JOB;" },
    { q: "41. Display department-wise count of employees where manager is NULL.", ans: "SELECT DEPTNO, COUNT(*) FROM EMP WHERE MGR IS NULL GROUP BY DEPTNO;" },
    { q: "42. Display number of employees without commission.", ans: "SELECT COUNT(*) FROM EMP WHERE COMM IS NULL OR COMM = 0;" },
    { q: "43. Display total commission paid (ignore NULLs).", ans: "SELECT SUM(COMM) FROM EMP;" },
    { q: "44. Display department-wise average commission excluding NULLs.", ans: "SELECT DEPTNO, AVG(COMM) FROM EMP WHERE COMM IS NOT NULL GROUP BY DEPTNO;" },
    { q: "45. Display job-wise total commission.", ans: "SELECT JOB, SUM(COMM) FROM EMP GROUP BY JOB;" },
    { q: "46. Display department-wise count of employees getting commission.", ans: "SELECT DEPTNO, COUNT(COMM) FROM EMP GROUP BY DEPTNO;" },
    { q: "47. Display jobs having more than one manager.", ans: "SELECT JOB FROM EMP GROUP BY JOB HAVING COUNT(DISTINCT MGR) > 1;" },
    { q: "48. Display departments having employees with commission.", ans: "SELECT DISTINCT DEPTNO FROM EMP WHERE COMM > 0;" },
    { q: "49. Display job-wise average salary where total salary > 5000.", ans: "SELECT JOB, AVG(SAL) FROM EMP GROUP BY JOB HAVING SUM(SAL) > 5000;" },
    { q: "50. Display department-wise total salary where employee count > 4.", ans: "SELECT DEPTNO, SUM(SAL) FROM EMP GROUP BY DEPTNO HAVING COUNT(*) > 4;" },
    { q: "51. Display jobs whose minimum salary is less than 1000.", ans: "SELECT JOB FROM EMP GROUP BY JOB HAVING MIN(SAL) < 1000;" },
    { q: "52. Display departments having maximum salary greater than 4000.", ans: "SELECT DEPTNO FROM EMP GROUP BY DEPTNO HAVING MAX(SAL) > 4000;" },
    { q: "53. Display jobs having more than 2 employees.", ans: "SELECT JOB FROM EMP GROUP BY JOB HAVING COUNT(*) > 2;" },
    { q: "54. Display departments whose total salary is greater than 10000.", ans: "SELECT DEPTNO FROM EMP GROUP BY DEPTNO HAVING SUM(SAL) > 10000;" },
    { q: "55. Display jobs having average salary greater than 2500.", ans: "SELECT JOB FROM EMP GROUP BY JOB HAVING AVG(SAL) > 2500;" },
    { q: "56. Display departments having more than 3 employees.", ans: "SELECT DEPTNO FROM EMP GROUP BY DEPTNO HAVING COUNT(*) > 3;" },
    { q: "57. Display dept-wise count where job is SALESMAN and job-wise total comm.", ans: "SELECT DEPTNO, COUNT(*) FROM EMP WHERE JOB = 'SALESMAN' GROUP BY DEPTNO; SELECT JOB, SUM(COMM) FROM EMP WHERE COMM IS NOT NULL GROUP BY JOB;" },
    { q: "58. Display job-wise max salary where salary > 1500.", ans: "SELECT JOB, MAX(SAL) FROM EMP WHERE SAL > 1500 GROUP BY JOB;" },
    { q: "59. Display department-wise total salary excluding department 30.", ans: "SELECT DEPTNO, SUM(SAL) FROM EMP WHERE DEPTNO != 30 GROUP BY DEPTNO;" },
    { q: "60. Display job-wise average salary where department is 20.", ans: "SELECT JOB, AVG(SAL) FROM EMP WHERE DEPTNO = 20 GROUP BY JOB;" },
    { q: "61. Display department-wise number of employees where commission is NOT NULL.", ans: "SELECT DEPTNO, COUNT(*) FROM EMP WHERE COMM IS NOT NULL GROUP BY DEPTNO;" },
    { q: "62. Display job-wise total salary for CLERK and MANAGER.", ans: "SELECT JOB, SUM(SAL) FROM EMP WHERE JOB IN ('CLERK', 'MANAGER') GROUP BY JOB;" },
    { q: "63. Display department-wise average salary for employees hired after 1981.", ans: "SELECT DEPTNO, AVG(SAL) FROM EMP WHERE HIREDATE > '31-DEC-1981' GROUP BY DEPTNO;" },
    { q: "64. Display job-wise employee count where salary > 2000.", ans: "SELECT JOB, COUNT(*) FROM EMP WHERE SAL > 2000 GROUP BY JOB;" },
    { q: "65. Display department-wise total salary for department numbers greater than 10.", ans: "SELECT DEPTNO, SUM(SAL) FROM EMP WHERE DEPTNO > 10 GROUP BY DEPTNO;" },
    { q: "66. Display department and job having maximum number of employees.", ans: "SELECT DEPTNO, JOB FROM EMP GROUP BY DEPTNO, JOB HAVING COUNT(*) = (SELECT MAX(COUNT(*)) FROM EMP GROUP BY DEPTNO, JOB);" },
    { q: "67. Display department-wise job-wise employee count.", ans: "SELECT DEPTNO, JOB, COUNT(*) FROM EMP GROUP BY DEPTNO, JOB;" },
    { q: "68. Display department-wise job-wise total commission.", ans: "SELECT DEPTNO, JOB, SUM(COMM) FROM EMP GROUP BY DEPTNO, JOB;" },
    { q: "69. Display department and job having lowest average salary.", ans: "SELECT DEPTNO, JOB FROM EMP GROUP BY DEPTNO, JOB HAVING AVG(SAL) = (SELECT MIN(AVG(SAL)) FROM EMP GROUP BY DEPTNO, JOB);" }

];

const container = document.getElementById('question-list');

function renderAggregate() {
    if(!container) return;
    container.innerHTML = ""; 

    aggregateQuestions.forEach((item, index) => {
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
                    <img class="output-img" src="img/agg_output${index + 1}.png" alt="Aggregate Result">
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

renderAggregate();

// Toggle logic for the "Show Output" button
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-btn')) {
        const card = e.target.closest('.program-card');
        card.classList.toggle('active');
        e.target.textContent = card.classList.contains('active') ? 'Hide Output' : 'Show Output';
    }
});



