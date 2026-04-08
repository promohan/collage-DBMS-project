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

const wildcardQuestions = [
    { 
        q: "Display employees whose name starts with 'A'.", 
        ans: "SELECT * FROM EMP WHERE ENAME LIKE 'A%';" 
    },
    { 
        q: "Display employees whose name starts with 'S'.", 
        ans: "SELECT * FROM EMP WHERE ENAME LIKE 'S%';" 
    },
    { 
        q: "Display employees whose name ends with 'N'.", 
        ans: "SELECT * FROM EMP WHERE ENAME LIKE '%N';" 
    },
    { 
        q: "Display employees whose name ends with 'R'.", 
        ans: "SELECT * FROM EMP WHERE ENAME LIKE '%R';" 
    },
    { 
        q: "Display employees whose name contains 'LL'.", 
        ans: "SELECT * FROM EMP WHERE ENAME LIKE '%LL%';" 
    },
    { q: "6. Display employees whose name contains 'AR'.", ans: "SELECT * FROM EMP WHERE ENAME LIKE '%AR%';" },
    { q: "7. Display employees whose job starts with 'M'.", ans: "SELECT * FROM EMP WHERE JOB LIKE 'M%';" },
    { q: "8. Display employees whose job ends with 'AN'.", ans: "SELECT * FROM EMP WHERE JOB LIKE '%AN';" },
    { q: "9. Display employees whose job contains 'CL'.", ans: "SELECT * FROM EMP WHERE JOB LIKE '%CL%';" },
    { q: "10. Display departments whose location starts with 'N'.", ans: "SELECT * FROM DEPT WHERE LOC LIKE 'N%';" },
    { q: "11. Display employees whose name has exactly 4 characters.", ans: "SELECT * FROM EMP WHERE ENAME LIKE '____';" },
    { q: "12. Display employees whose name has exactly 5 characters.", ans: "SELECT * FROM EMP WHERE ENAME LIKE '_____';" },
    { q: "13. Display employees whose name has 'A' as the second character.", ans: "SELECT * FROM EMP WHERE ENAME LIKE '_A%';" },
    { q: "14. Display employees whose name has 'L' as the third character.", ans: "SELECT * FROM EMP WHERE ENAME LIKE '__L%';" },
    { q: "15. Display employees whose job has exactly 6 characters.", ans: "SELECT * FROM EMP WHERE JOB LIKE '______';" },
    { q: "16. Display employees whose name starts with any letter but ends with 'N'.", ans: "SELECT * FROM EMP WHERE ENAME LIKE '%N';" },
    { q: "17. Display employees whose job starts with any one character and ends with 'ER'.", ans: "SELECT * FROM EMP WHERE JOB LIKE '_%ER';" },
    { q: "18. Display employees whose name has 'A' as the first and 'N' as the last character.", ans: "SELECT * FROM EMP WHERE ENAME LIKE 'A%N';" },
    { q: "19. Display employees whose name has exactly 2 characters before 'E'.", ans: "SELECT * FROM EMP WHERE ENAME LIKE '__E%';" },
    { q: "20. Display employees whose name has exactly 1 character after 'A'.", ans: "SELECT * FROM EMP WHERE ENAME LIKE '%A_';" },
    { q: "21. Display employees whose name starts with 'A' and ends with 'N'.", ans: "SELECT * FROM EMP WHERE ENAME LIKE 'A%N';" },
    { q: "22. Display employees whose name contains 'E' anywhere.", ans: "SELECT * FROM EMP WHERE ENAME LIKE '%E%';" },
    { q: "23. Display employees whose name does not contain 'A'.", ans: "SELECT * FROM EMP WHERE ENAME NOT LIKE '%A%';" },
    { q: "24. Display employees whose job contains 'MAN'.", ans: "SELECT * FROM EMP WHERE JOB LIKE '%MAN%';" },
    { q: "25. Display employees whose job does not start with 'C'.", ans: "SELECT * FROM EMP WHERE JOB NOT LIKE 'C%';" },
    { q: "26. Display employees whose name contains two 'L' consecutively.", ans: "SELECT * FROM EMP WHERE ENAME LIKE '%LL%';" },
    { q: "27. Display employees whose name starts with 'J' and has 'S' anywhere.", ans: "SELECT * FROM EMP WHERE ENAME LIKE 'J%S%';" },
    { q: "28. Display employees whose job starts with 'S' and ends with 'AN'.", ans: "SELECT * FROM EMP WHERE JOB LIKE 'S%AN';" },
    { q: "29. Display employees whose name contains 'A' as the second last character.", ans: "SELECT * FROM EMP WHERE ENAME LIKE '%A_';" },
    { q: "30. Display employees whose name contains exactly one character between 'A' and 'E'.", ans: "SELECT * FROM EMP WHERE ENAME LIKE '%A_E%';" },
    { q: "31. Display employees whose name starts with 'S' and salary > 2000.", ans: "SELECT * FROM EMP WHERE ENAME LIKE 'S%' AND SAL > 2000;" },
    { q: "32. Display employees whose job ends with 'MAN' and department is 20.", ans: "SELECT * FROM EMP WHERE JOB LIKE '%MAN' AND DEPTNO = 20;" },
    { q: "33. Display employees whose name contains 'A' and commission is NULL.", ans: "SELECT * FROM EMP WHERE ENAME LIKE '%A%' AND COMM IS NULL;" },
    { q: "34. Display employees whose job starts with 'C' and salary < 1500.", ans: "SELECT * FROM EMP WHERE JOB LIKE 'C%' AND SAL < 1500;" },
    { q: "35. Display employees whose name ends with 'S' and hired after 1981.", ans: "SELECT * FROM EMP WHERE ENAME LIKE '%S' AND HIREDATE > '31-DEC-1981';" },
    { q: "36. Display employees whose name starts with 'M' and department is not 10.", ans: "SELECT * FROM EMP WHERE ENAME LIKE 'M%' AND DEPTNO != 10;" },
    { q: "37. Display employees whose job contains 'ER' and salary between 2000 and 3000.", ans: "SELECT * FROM EMP WHERE JOB LIKE '%ER%' AND SAL BETWEEN 2000 AND 3000;" },
    { q: "38. Display employees whose name starts with 'A' or job starts with 'S'.", ans: "SELECT * FROM EMP WHERE ENAME LIKE 'A%' OR JOB LIKE 'S%';" },
    { q: "39. Display employees whose name contains 'I' and manager is NOT NULL.", ans: "SELECT * FROM EMP WHERE ENAME LIKE '%I%' AND MGR IS NOT NULL;" },
    { q: "40. Display employees whose name ends with 'N' and commission is NOT NULL.", ans: "SELECT * FROM EMP WHERE ENAME LIKE '%N' AND COMM IS NOT NULL;" },
    { q: "41. Display name (alias) starts with 'S', ordered alphabetically.", ans: "SELECT ENAME AS Name FROM EMP WHERE ENAME LIKE 'S%' ORDER BY ENAME;" },
    { q: "42. Display name and salary (alias) contains 'A', ordered by salary.", ans: "SELECT ENAME, SAL AS Pay FROM EMP WHERE ENAME LIKE '%A%' ORDER BY SAL;" },
    { q: "43. Display job starts with 'M', ordered by job and salary.", ans: "SELECT * FROM EMP WHERE JOB LIKE 'M%' ORDER BY JOB, SAL;" },
    { q: "44. Display name ends with 'E', ordered by hire date.", ans: "SELECT * FROM EMP WHERE ENAME LIKE '%E' ORDER BY HIREDATE;" },
    { q: "45. Display name and annual salary where name starts with 'J'.", ans: "SELECT ENAME, SAL*12 AS Annual_Salary FROM EMP WHERE ENAME LIKE 'J%';" },
    { q: "46. Display name contains 'R', ordered by department.", ans: "SELECT * FROM EMP WHERE ENAME LIKE '%R%' ORDER BY DEPTNO;" },
    { q: "47. Display employee name (alias) where job ends with 'AN'.", ans: "SELECT ENAME AS Employee FROM EMP WHERE JOB LIKE '%AN';" },
    { q: "48. Display name starts with 'K', ordered by salary DESC.", ans: "SELECT * FROM EMP WHERE ENAME LIKE 'K%' ORDER BY SAL DESC;" },
    { q: "49. Display name contains 'L', ordered by name and salary.", ans: "SELECT * FROM EMP WHERE ENAME LIKE '%L%' ORDER BY ENAME, SAL;" },
    { q: "50. Display job starts with 'C', ordered by job.", ans: "SELECT * FROM EMP WHERE JOB LIKE 'C%' ORDER BY JOB;" },
    { q: "51. Display exactly 6 characters and ends with 'R'.", ans: "SELECT * FROM EMP WHERE ENAME LIKE '_____R';" },
    { q: "52. Display 'A' as the third character from start.", ans: "SELECT * FROM EMP WHERE ENAME LIKE '__A%';" },
    { q: "53. Display 'E' as the second character from end.", ans: "SELECT * FROM EMP WHERE ENAME LIKE '%E_';" },
    { q: "54. Display at least two characters before 'A'.", ans: "SELECT * FROM EMP WHERE ENAME LIKE '__%A%';" },
    { q: "55. Display job contains exactly one 'A'.", ans: "SELECT * FROM EMP WHERE JOB LIKE '%A%' AND JOB NOT LIKE '%A%A%';" },
    { q: "56. Display name does not start with a vowel.", ans: "SELECT * FROM EMP WHERE ENAME NOT LIKE 'A%' AND ENAME NOT LIKE 'E%' AND ENAME NOT LIKE 'I%' AND ENAME NOT LIKE 'O%' AND ENAME NOT LIKE 'U%';" },
    { q: "57. Display job does not contain 'ER'.", ans: "SELECT * FROM EMP WHERE JOB NOT LIKE '%ER%';" },
    { q: "58. Display name starts and ends with same character.", ans: "/* Standard SQL doesn't support backreferences in LIKE, usually requires REGEXP or SUBSTR */ SELECT * FROM EMP WHERE SUBSTR(ENAME,1,1) = SUBSTR(ENAME,-1,1);" },
    { q: "59. Display name contains both 'A' and 'E'.", ans: "SELECT * FROM EMP WHERE ENAME LIKE '%A%' AND ENAME LIKE '%E%';" },
    { q: "60. Display name contains 'A' but not as first character.", ans: "SELECT * FROM EMP WHERE ENAME LIKE '_%A%';" }
];

// Reference to your lab container
const container = document.getElementById('question-list');

function renderWildcards() {
    if(!container) return;
    
    container.innerHTML = ""; // Clear previous content

    wildcardQuestions.forEach((item, index) => {
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
                    <img class="output-img" src="img/wildcard_output${index + 1}.png" alt="SQL Wildcard Result">
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Call the function to display the questions
renderWildcards();

// Maintain the toggle functionality
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-btn')) {
        const card = e.target.closest('.program-card');
        card.classList.toggle('active');
        e.target.textContent = card.classList.contains('active') ? 'Hide Output' : 'Show Output';
    }
});