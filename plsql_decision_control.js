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
 * PL/SQL Control Flow: IF, CASE, and Loops
 * Part of Mohan's DBMS Portfolio 2026
 */

const plsqlControlData = [
    { 
        q: "1. Write a PL/SQL block to check if a number is positive.", 
        ans: "DECLARE\n  num NUMBER := 10;\nBEGIN\n  IF num > 0 THEN\n    DBMS_OUTPUT.PUT_LINE('Number is Positive');\n  END IF;\nEND;" 
    },
    { 
        q: "2. Write a PL/SQL block to check if an employee's salary is greater than 3000.", 
        ans: "DECLARE\n  v_sal NUMBER := 3500;\nBEGIN\n  IF v_sal > 3000 THEN\n    DBMS_OUTPUT.PUT_LINE('Salary is greater than 3000');\n  END IF;\nEND;" 
    },
    { 
        q: "3. Write a PL/SQL block to check if a given number is even.", 
        ans: "DECLARE\n  num NUMBER := 8;\nBEGIN\n  IF MOD(num, 2) = 0 THEN\n    DBMS_OUTPUT.PUT_LINE('Number is Even');\n  END IF;\nEND;" 
    },
    { 
        q: "4. Write a PL/SQL block to display a message if today is Monday.", 
        ans: "BEGIN\n  IF TO_CHAR(SYSDATE, 'Day') LIKE 'Monday%' THEN\n    DBMS_OUTPUT.PUT_LINE('Happy Monday!');\n  END IF;\nEND;" 
    },
    { 
        q: "5. Write a PL/SQL block to check if a number is divisible by 5.", 
        ans: "DECLARE\n  num NUMBER := 25;\nBEGIN\n  IF MOD(num, 5) = 0 THEN\n    DBMS_OUTPUT.PUT_LINE('Divisible by 5');\n  END IF;\nEND;" 
    },
    { 
        q: "6. Write a PL/SQL block to check whether a number is even or odd.", 
        ans: "DECLARE\n  num NUMBER := 7;\nBEGIN\n  IF MOD(num, 2) = 0 THEN\n    DBMS_OUTPUT.PUT_LINE('Even');\n  ELSE\n    DBMS_OUTPUT.PUT_LINE('Odd');\n  END IF;\nEND;" 
    },
    { 
        q: "7. Write a PL/SQL block to check whether a number is positive or negative.", 
        ans: "DECLARE\n  num NUMBER := -5;\nBEGIN\n  IF num >= 0 THEN\n    DBMS_OUTPUT.PUT_LINE('Positive');\n  ELSE\n    DBMS_OUTPUT.PUT_LINE('Negative');\n  END IF;\nEND;" 
    },
    { 
        q: "8. Write a PL/SQL block to compare two numbers and display the greater one.", 
        ans: "DECLARE\n  a NUMBER := 20; b NUMBER := 40;\nBEGIN\n  IF a > b THEN\n    DBMS_OUTPUT.PUT_LINE('Greater: ' || a);\n  ELSE\n    DBMS_OUTPUT.PUT_LINE('Greater: ' || b);\n  END IF;\nEND;" 
    },
    { 
        q: "9. Write a PL/SQL block to check whether a student passed (marks >= 40) or failed.", 
        ans: "DECLARE\n  marks NUMBER := 45;\nBEGIN\n  IF marks >= 40 THEN\n    DBMS_OUTPUT.PUT_LINE('Result: PASS');\n  ELSE\n    DBMS_OUTPUT.PUT_LINE('Result: FAIL');\n  END IF;\nEND;" 
    },
    { 
        q: "10. Write a PL/SQL block to check if salary is above average (fixed value 4000).", 
        ans: "DECLARE\n  v_sal NUMBER := 4200;\nBEGIN\n  IF v_sal > 4000 THEN\n    DBMS_OUTPUT.PUT_LINE('Above Average');\n  ELSE\n    DBMS_OUTPUT.PUT_LINE('Below Average');\n  END IF;\nEND;" 
    },
    { 
        q: "11. Write a PL/SQL block to assign grades based on marks (80-A, 60-B, 40-C).", 
        ans: "DECLARE\n  m NUMBER := 65;\nBEGIN\n  IF m >= 80 THEN DBMS_OUTPUT.PUT_LINE('A');\n  ELSIF m >= 60 THEN DBMS_OUTPUT.PUT_LINE('B');\n  ELSIF m >= 40 THEN DBMS_OUTPUT.PUT_LINE('C');\n  ELSE DBMS_OUTPUT.PUT_LINE('Fail');\n  END IF;\nEND;" 
    },
    { 
        q: "12. Write a PL/SQL block to find the greatest of three numbers.", 
        ans: "DECLARE\n  a NUMBER := 5; b NUMBER := 15; c NUMBER := 10;\nBEGIN\n  IF a > b AND a > c THEN DBMS_OUTPUT.PUT_LINE(a);\n  ELSIF b > c THEN DBMS_OUTPUT.PUT_LINE(b);\n  ELSE DBMS_OUTPUT.PUT_LINE(c);\n  END IF;\nEND;" 
    },
    { 
        q: "13. Write a PL/SQL block to check if a number is Positive, Negative, or Zero.", 
        ans: "DECLARE\n  n NUMBER := 0;\nBEGIN\n  IF n > 0 THEN DBMS_OUTPUT.PUT_LINE('Positive');\n  ELSIF n < 0 THEN DBMS_OUTPUT.PUT_LINE('Negative');\n  ELSE DBMS_OUTPUT.PUT_LINE('Zero');\n  END IF;\nEND;" 
    },
    { 
        q: "14. Write a PL/SQL block to categorize salary (High/Medium/Low).", 
        ans: "DECLARE\n  s NUMBER := 3500;\nBEGIN\n  IF s > 5000 THEN DBMS_OUTPUT.PUT_LINE('High');\n  ELSIF s >= 3000 THEN DBMS_OUTPUT.PUT_LINE('Medium');\n  ELSE DBMS_OUTPUT.PUT_LINE('Low');\n  END IF;\nEND;" 
    },
    { 
        q: "15. Write a PL/SQL block to calculate bonus based on job role.", 
        ans: "DECLARE\n  v_job VARCHAR2(20) := 'MANAGER'; v_bonus NUMBER;\nBEGIN\n  IF v_job = 'MANAGER' THEN v_bonus := 1000;\n  ELSIF v_job = 'ANALYST' THEN v_bonus := 500;\n  ELSE v_bonus := 100;\n  END IF;\n  DBMS_OUTPUT.PUT_LINE('Bonus: ' || v_bonus);\nEND;" 
    },
    { 
        q: "16. Write a PL/SQL block using CASE to display day of week (1-7).", 
        ans: "DECLARE\n  d NUMBER := 2;\nBEGIN\n  CASE d\n    WHEN 1 THEN DBMS_OUTPUT.PUT_LINE('Sunday');\n    WHEN 2 THEN DBMS_OUTPUT.PUT_LINE('Monday');\n    ELSE DBMS_OUTPUT.PUT_LINE('Other Day');\n  END CASE;\nEND;" 
    },
    { 
        q: "17. Write a PL/SQL block using CASE to assign grades based on marks.", 
        ans: "DECLARE\n  m NUMBER := 85;\nBEGIN\n  CASE\n    WHEN m >= 80 THEN DBMS_OUTPUT.PUT_LINE('Grade: A');\n    WHEN m >= 60 THEN DBMS_OUTPUT.PUT_LINE('Grade: B');\n    ELSE DBMS_OUTPUT.PUT_LINE('Grade: F');\n  END CASE;\nEND;" 
    },
    { 
        q: "18. Write a PL/SQL block using CASE to check whether a number is even or odd.", 
        ans: "DECLARE\n  n NUMBER := 10;\nBEGIN\n  CASE MOD(n, 2)\n    WHEN 0 THEN DBMS_OUTPUT.PUT_LINE('Even');\n    ELSE DBMS_OUTPUT.PUT_LINE('Odd');\n  END CASE;\nEND;" 
    },
    { 
        q: "19. Write a PL/SQL block using CASE to display dept name based on ID.", 
        ans: "DECLARE\n  id NUMBER := 20;\nBEGIN\n  CASE id\n    WHEN 10 THEN DBMS_OUTPUT.PUT_LINE('Accounting');\n    WHEN 20 THEN DBMS_OUTPUT.PUT_LINE('Research');\n    ELSE DBMS_OUTPUT.PUT_LINE('Other');\n  END CASE;\nEND;" 
    },
    { 
        q: "20. Write a PL/SQL block using CASE to categorize salary.", 
        ans: "DECLARE\n  s NUMBER := 6000;\nBEGIN\n  CASE \n    WHEN s > 5000 THEN DBMS_OUTPUT.PUT_LINE('High');\n    ELSE DBMS_OUTPUT.PUT_LINE('Standard');\n  END CASE;\nEND;" 
    },
    { 
        q: "21. Write a PL/SQL block to print 1 to 10 but skip 5 using CONTINUE.", 
        ans: "BEGIN\n  FOR i IN 1..10 LOOP\n    IF i = 5 THEN CONTINUE; END IF;\n    DBMS_OUTPUT.PUT_LINE(i);\n  END LOOP;\nEND;" 
    },
    { 
        q: "22. Write a PL/SQL block to display only odd numbers between 1 and 20.", 
        ans: "BEGIN\n  FOR i IN 1..20 LOOP\n    CONTINUE WHEN MOD(i, 2) = 0;\n    DBMS_OUTPUT.PUT_LINE(i);\n  END LOOP;\nEND;" 
    },
    { 
        q: "23. Write a PL/SQL block to skip multiples of 3 while printing 1-15.", 
        ans: "BEGIN\n  FOR i IN 1..15 LOOP\n    CONTINUE WHEN MOD(i, 3) = 0;\n    DBMS_OUTPUT.PUT_LINE(i);\n  END LOOP;\nEND;" 
    },
    { 
        q: "24. Write a PL/SQL block to skip employees with salary < 2000 in a loop.", 
        ans: "DECLARE\n  CURSOR c1 IS SELECT SAL FROM EMP;\nBEGIN\n  FOR r IN c1 LOOP\n    IF r.sal < 2000 THEN CONTINUE; END IF;\n    DBMS_OUTPUT.PUT_LINE('Processing Sal: ' || r.sal);\n  END LOOP;\nEND;" 
    },
    { 
        q: "25. Write a PL/SQL block to exit loop when number reaches 5.", 
        ans: "DECLARE\n  i NUMBER := 1;\nBEGIN\n  LOOP\n    DBMS_OUTPUT.PUT_LINE(i);\n    EXIT WHEN i = 5;\n    i := i + 1;\n  END LOOP;\nEND;" 
    },
    { 
        q: "26. Write a PL/SQL block to print numbers until sum exceeds 50.", 
        ans: "DECLARE\n  s NUMBER := 0; i NUMBER := 1;\nBEGIN\n  LOOP\n    s := s + i;\n    DBMS_OUTPUT.PUT_LINE('i: ' || i || ' sum: ' || s);\n    EXIT WHEN s > 50;\n    i := i + 1;\n  END LOOP;\nEND;" 
    },
    { 
        q: "27. Write a PL/SQL block to exit loop when a negative number is encountered.", 
        ans: "DECLARE\n  n NUMBER;\n  CURSOR c1 IS SELECT EMPNO FROM EMP; -- Assuming mock check\nBEGIN\n  LOOP\n    n := -1; -- Logic trigger\n    EXIT WHEN n < 0;\n  END LOOP;\n  DBMS_OUTPUT.PUT_LINE('Exited negative');\nEND;" 
    },
    { 
        q: "28. Write a PL/SQL block using EXIT WHEN to stop loop.", 
        ans: "DECLARE\n  i NUMBER := 1;\nBEGIN\n  LOOP\n    DBMS_OUTPUT.PUT_LINE(i);\n    i := i + 2;\n    EXIT WHEN i > 10;\n  END LOOP;\nEND;" 
    },
    { 
        q: "29. Write a PL/SQL block using IF-ELSIF and CASE together.", 
        ans: "DECLARE\n  v_val NUMBER := 10;\nBEGIN\n  IF v_val > 0 THEN\n    CASE WHEN v_val > 5 THEN DBMS_OUTPUT.PUT_LINE('Positive and Large'); END CASE;\n  END IF;\nEND;" 
    },
    { 
        q: "30. Write a PL/SQL block to process salaries using LOOP, CONTINUE, and EXIT.", 
        ans: "DECLARE\n  i NUMBER := 0;\nBEGIN\n  LOOP\n    i := i + 1000;\n    IF i = 2000 THEN CONTINUE; END IF;\n    DBMS_OUTPUT.PUT_LINE('Salary: ' || i);\n    EXIT WHEN i >= 5000;\n  END LOOP;\nEND;" 
    },
    { 
        q: "31. Write a PL/SQL block to simulate a login system (user & pass).", 
        ans: "DECLARE\n  u VARCHAR2(10) := 'Mohan'; p VARCHAR2(10) := 'BCA123';\nBEGIN\n  IF u = 'Mohan' AND p = 'BCA123' THEN\n    DBMS_OUTPUT.PUT_LINE('Access Granted');\n  ELSE\n    DBMS_OUTPUT.PUT_LINE('Access Denied');\n  END IF;\nEND;" 
    }
];

const container = document.getElementById('question-list');

function renderControlFlow() {
    if(!container) return;
    container.innerHTML = "";
    
    plsqlControlData.forEach((item, index) => {
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
                        <div class="dots"><span class="r"></span><span class="y"></span><span class="g"></span>DBMS_CONSOLE</div>
                    </div>
                    <div class="output-placeholder">
                        <p>-- Block Execution Started --</p>
                        <img class="output-img" src="img/pl_ctrl_${index + 1}.png" alt="Execution Result" onerror="this.style.display='none'">
                        <p class="success-msg">>> Status: Completed.</p>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Re-using your logic for toggles
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-btn')) {
        const card = e.target.closest('.program-card');
        const isActive = card.classList.toggle('active');
        e.target.textContent = isActive ? 'Hide Output' : 'Show Output';
    }
});

renderControlFlow();














// const container = document.getElementById('question-list');

// function renderPLSQLBasics() {
//     if(!container) return;
    
//     plsqlBasicsData.forEach((item, index) => {
//         const card = document.createElement('div');
//         card.className = 'program-card';
//         card.innerHTML = `
//             <div class="question-header">
//                 <div>
//                     <p><span class="q-number">Q${item.q}</span> </p>
//                     <div class="ans-box">
//                         <pre><code>${item.ans}</code></pre>
//                     </div>
//                 </div>
//                 <button class="toggle-btn">Show Output</button>
//             </div>
//             <div class="expand-content">
//                 <div class="code-editor">
//                     <div class="editor-header">
//                         <div class="dots"><span class="r"></span><span class="y"></span><span class="g"></span>DBMS_OUTPUT</div>
//                     </div>
//                     <div class="output-placeholder">
//                         <p>-- Anonymous block completed --</p>
//                         <img class="output-img" src="img/pl_out_${index + 1}.png" alt="PL/SQL Execution Result" onerror="this.style.display='none'">
//                         <p class="success-msg">>> Procedure executed successfully.</p>
//                     </div>
//                 </div>
//             </div>
//         `;
//         container.appendChild(card);
//     });
// }

// // Global Toggle Script (Shared logic)
// container.addEventListener('click', (e) => {
//     if (e.target.classList.contains('toggle-btn')) {
//         const card = e.target.closest('.program-card');
//         const isActive = card.classList.toggle('active');
//         e.target.textContent = isActive ? 'Hide Output' : 'Show Output';
//     }
// });

// renderPLSQLBasics();