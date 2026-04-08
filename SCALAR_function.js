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


const dateQueryList = [
    {
        q: "1. Display employee name, hire date, current date, and days worked.",
        ans: "SELECT ENAME, HIREDATE, SYSDATE, ROUND(SYSDATE - HIREDATE) AS DAYS_WORKED FROM EMP;"
    },
    {
        q: "2. Display employee name and hire date in format: Monday, January 01, 2024.",
        ans: "SELECT ENAME, TO_CHAR(HIREDATE, 'Day, Month DD, YYYY') FROM EMP;"
    },
    {
        q: "3. Find employees who joined in the same month as the current system date.",
        ans: "SELECT * FROM EMP WHERE TO_CHAR(HIREDATE, 'MM') = TO_CHAR(SYSDATE, 'MM');"
    },
    {
        q: "4. Display employee name and the next Monday after their hire date.",
        ans: "SELECT ENAME, NEXT_DAY(HIREDATE, 'MONDAY') FROM EMP;"
    },
    {
        q: "5. Display employee name and the last day of their joining month.",
        ans: "SELECT ENAME, LAST_DAY(HIREDATE) FROM EMP;"
    },
    {
        q: "6. Find employees who have completed more than 10 years in the company.",
        ans: "SELECT * FROM EMP WHERE MONTHS_BETWEEN(SYSDATE, HIREDATE) / 12 > 10;"
    },
    {
        q: "7. Display employee name and number of months worked in the company.",
        ans: "SELECT ENAME, ROUND(MONTHS_BETWEEN(SYSDATE, HIREDATE)) FROM EMP;"
    },
    {
        q: "8. Display name, hire date, and hire date after adding 3 years and 6 months.",
        ans: "SELECT ENAME, HIREDATE, ADD_MONTHS(HIREDATE, 42) FROM EMP;"
    },

    // --- DATE FUNCTIONS (Cont.) ---
    { q: "9. Find employees hired between two given dates (use TO_DATE).", ans: "SELECT * FROM EMP WHERE HIREDATE BETWEEN TO_DATE('01-JAN-1981','DD-MON-YYYY') AND TO_DATE('31-DEC-1982','DD-MON-YYYY');" },
    { q: "10. Display the difference in years between SYSDATE and hire date (rounded).", ans: "SELECT ENAME, ROUND(MONTHS_BETWEEN(SYSDATE, HIREDATE)/12) AS YEARS_EXP FROM EMP;" },

    // --- NUMERIC FUNCTIONS ---
    { q: "11. Display employee name and salary rounded to the nearest 1000.", ans: "SELECT ENAME, ROUND(SAL, -3) FROM EMP;" },
    { q: "12. Display salary truncated to 2 decimal places.", ans: "SELECT TRUNC(SAL, 2) FROM EMP;" },
    { q: "13. Display employee name and square root of salary.", ans: "SELECT ENAME, SQRT(SAL) FROM EMP;" },
    { q: "14. Find the absolute difference between salary and 5000.", ans: "SELECT ABS(SAL - 5000) FROM EMP;" },
    { q: "15. Display salary rounded up to the nearest integer.", ans: "SELECT CEIL(SAL) FROM EMP;" },
    { q: "16. Display salary rounded down to the nearest integer.", ans: "SELECT FLOOR(SAL) FROM EMP;" },
    { q: "17. Generate a random number between 1 and 500 for each employee.", ans: "SELECT ENAME, DBMS_RANDOM.VALUE(1, 500) FROM EMP;" },
    { q: "18. Display remainder when salary is divided by 2000.", ans: "SELECT MOD(SAL, 2000) FROM EMP;" },
    { q: "19. Display salary raised to the power of 3.", ans: "SELECT POWER(SAL, 3) FROM EMP;" },
    { q: "20. Round salary to nearest hundred and thousand (two columns).", ans: "SELECT ROUND(SAL, -2), ROUND(SAL, -3) FROM EMP;" },

    // --- STRING FUNCTIONS ---
    { q: "21. Display employee names in uppercase and lowercase in two columns.", ans: "SELECT UPPER(ENAME), LOWER(ENAME) FROM EMP;" },
    { q: "22. Display employee name and its length.", ans: "SELECT ENAME, LENGTH(ENAME) FROM EMP;" },
    { q: "23. Display first 4 characters of employee name.", ans: "SELECT SUBSTR(ENAME, 1, 4) FROM EMP;" },
    { q: "24. Concatenate employee name and job using - symbol.", ans: "SELECT ENAME || '-' || JOB FROM EMP;" },
    { q: "25. Replace all occurrences of letter 'A' with '#' in employee names.", ans: "SELECT REPLACE(ENAME, 'A', '#') FROM EMP;" },
    { q: "26. Display position of first occurrence of 'E' in employee name.", ans: "SELECT INSTR(ENAME, 'E') FROM EMP;" },
    { q: "27. Remove leading and trailing spaces from employee name.", ans: "SELECT TRIM(ENAME) FROM EMP;" },
    { q: "28. Display employee name with first letter capital and rest lowercase.", ans: "SELECT INITCAP(ENAME) FROM EMP;" },
    { q: "29. Display last 3 characters of employee name.", ans: "SELECT SUBSTR(ENAME, -3) FROM EMP;" },
    { q: "30. Pad employee name with * on the left to make total length 10.", ans: "SELECT LPAD(ENAME, 10, '*') FROM EMP;" },
    { q: "31. Display employee name with spaces removed.", ans: "SELECT REPLACE(ENAME, ' ', '') FROM EMP;" },
    { q: "32. Display employee names starting with 'S'.", ans: "SELECT ENAME FROM EMP WHERE ENAME LIKE 'S%';" },
    { q: "33. Count number of characters excluding spaces.", ans: "SELECT LENGTH(REPLACE(ENAME, ' ', '')) FROM EMP;" },
    { q: "34. Display employee name reversed.", ans: "SELECT REVERSE(ENAME) FROM EMP;" },
    { q: "35. Extract domain name from email column.", ans: "SELECT SUBSTR(EMAIL, INSTR(EMAIL, '@') + 1) FROM EMP;" },

    // --- CONVERSION FUNCTIONS ---
    { q: "36. Convert current date into format: DD/MM/YYYY.", ans: "SELECT TO_CHAR(SYSDATE, 'DD/MM/YYYY') FROM DUAL;" },
    { q: "37. Convert string '15-AUG-2020' into DATE format.", ans: "SELECT TO_DATE('15-AUG-2020', 'DD-MON-YYYY') FROM DUAL;" },
    { q: "38. Convert salary into character with currency format (₹10,000).", ans: "SELECT TO_CHAR(SAL, 'L99,999') FROM EMP;" },
    { q: "39. Convert number 12345 into string with commas.", ans: "SELECT TO_CHAR(12345, '99,999') FROM DUAL;" },
    { q: "40. Convert hire date into format: Month DD, YYYY.", ans: "SELECT TO_CHAR(HIREDATE, 'Month DD, YYYY') FROM EMP;" },
    { q: "41. Convert string column to number and perform arithmetic.", ans: "SELECT TO_NUMBER('1000') + SAL FROM EMP;" },
    { q: "42. Handle invalid date format using TO_DATE safely.", ans: "SELECT TO_DATE('2024-01-01', 'YYYY-MM-DD') FROM DUAL;" },
    { q: "43. Convert SYSDATE into year only.", ans: "SELECT TO_CHAR(SYSDATE, 'YYYY') FROM DUAL;" },
    { q: "44. Convert salary into string and concatenate with text.", ans: "SELECT 'Salary is ' || TO_CHAR(SAL) FROM EMP;" },
    { q: "45. Display hire date in multiple formats (3 columns).", ans: "SELECT TO_CHAR(HIREDATE,'MM/YY'), TO_CHAR(HIREDATE,'MON-DD'), TO_CHAR(HIREDATE,'DAY') FROM EMP;" },

    // --- GENERAL & NULL FUNCTIONS ---
    { q: "46. Display employee name and salary. If salary is NULL, display 0.", ans: "SELECT ENAME, NVL(SAL, 0) FROM EMP;" },
    { q: "47. Display employee name and commission. If NULL, display 'No Commission'.", ans: "SELECT ENAME, NVL(TO_CHAR(COMM), 'No Commission') FROM EMP;" },
    { q: "48. Use NVL2 to show commission status (Has/No Commission).", ans: "SELECT ENAME, NVL2(COMM, 'Has Commission', 'No Commission') FROM EMP;" },
    { q: "49. Use COALESCE to display first non-null among salary, commission, bonus.", ans: "SELECT ENAME, COALESCE(SAL, COMM, 0) FROM EMP;" },
    { q: "50. Display employee salary; if NULL replace with average salary.", ans: "SELECT ENAME, NVL(SAL, (SELECT AVG(SAL) FROM EMP)) FROM EMP;" },
    { q: "51. Use NULLIF to compare salary and commission.", ans: "SELECT NULLIF(SAL, COMM) FROM EMP;" },
    { q: "52. Replace NULL department name with 'No Department'.", ans: "SELECT NVL(DNAME, 'No Department') FROM DEPT;" },
    { q: "53. Display employees whose commission is NULL.", ans: "SELECT * FROM EMP WHERE COMM IS NULL;" },
    { q: "54. Use DECODE to categorize salary (Low/Medium/High).", ans: "SELECT ENAME, DECODE(TRUNC(SAL/2000), 0, 'Low', 1, 'Medium', 'High') FROM EMP;" },
    { q: "55. Use CASE to categorize employees based on experience.", ans: "SELECT ENAME, CASE WHEN (SYSDATE-HIREDATE)/365 > 10 THEN 'Senior' ELSE 'Junior' END FROM EMP;" },
    { q: "56. Display job; if NULL show 'Unknown Job'.", ans: "SELECT NVL(JOB, 'Unknown Job') FROM EMP;" },
    { q: "57. Use NVL with date columns.", ans: "SELECT NVL(HIREDATE, SYSDATE) FROM EMP;" },
    { q: "58. Display employee name and bonus; if NULL calculate 10% of salary.", ans: "SELECT ENAME, NVL(COMM, SAL*0.1) FROM EMP;" },
    { q: "59. Use COALESCE with multiple NULL columns.", ans: "SELECT COALESCE(COMM, SAL, 0) FROM EMP;" },
    { q: "60. Combine NVL and TO_CHAR for formatted output.", ans: "SELECT NVL(TO_CHAR(COMM, '$999.99'), 'Zero') FROM EMP;" }
];


const dateContainer = document.getElementById('question-list');

function renderDateQueries() {
    if (!dateContainer) return;
    dateContainer.innerHTML = "";

    dateQueryList.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'program-card';
        card.innerHTML = `
            <div class="question-header">
                <div>
                    <p><span class="q-number"></span> ${item.q}</p>
                    <p><span class="q-number">Ans></span> <code>${item.ans}</code></p>
                </div>
                <button class="toggle-btn">Show Output</button>
            </div>
            <div class="expand-content">
                <div class="code-editor">
                    <div class="editor-header">
                        <div class="dots"><span class="r"></span><span class="y"></span><span class="g"></span>OUTPUT</div>
                    </div>
                    <img class="output-img" src="img/date_output_${index + 1}.png" alt="SQL Date Function Result">
                </div>
            </div>
        `;
        dateContainer.appendChild(card);
    });
}

// Initial Render
renderDateQueries();

// Toggle Logic
dateContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-btn')) {
        const card = e.target.closest('.program-card');
        card.classList.toggle('active');
        e.target.textContent = card.classList.contains('active') ? 'Hide Output' : 'Show Output';
    }
});