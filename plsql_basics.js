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




const plsqlBasicsData = [
    { 
        q: "1. Write a PL/SQL block to print your name and city in two separate lines.", 
        ans: "BEGIN\n  DBMS_OUTPUT.PUT_LINE('Name: Mohan');\n  DBMS_OUTPUT.PUT_LINE('City: Chandigarh');\nEND;" 
    },
    { 
        q: "2. Write a PL/SQL block to display numbers from 1 to 5 using DBMS_OUTPUT.PUT_LINE.", 
        ans: "BEGIN\n  FOR i IN 1..5 LOOP\n    DBMS_OUTPUT.PUT_LINE(i);\n  END LOOP;\nEND;" 
    },
    { 
        q: "3. Write a PL/SQL block to print the current system date.", 
        ans: "BEGIN\n  DBMS_OUTPUT.PUT_LINE('Today is: ' || SYSDATE);\nEND;" 
    },
    { 
        q: "4. Write a PL/SQL block to display employee name and salary (use variables).", 
        ans: "DECLARE\n  v_ename VARCHAR2(20) := 'SMITH';\n  v_sal NUMBER := 2500;\nBEGIN\n  DBMS_OUTPUT.PUT_LINE('Emp: ' || v_ename || ' | Sal: ' || v_sal);\nEND;" 
    },
    { 
        q: "5. Write a PL/SQL block to declare a variable and assign your age, then display it.", 
        ans: "DECLARE\n  v_age NUMBER := 20;\nBEGIN\n  DBMS_OUTPUT.PUT_LINE('My Age is: ' || v_age);\nEND;" 
    },
    { 
        q: "6. Write a PL/SQL block to declare two variables and print their sum.", 
        ans: "DECLARE\n  num1 NUMBER := 50;\n  num2 NUMBER := 75;\n  v_sum NUMBER;\nBEGIN\n  v_sum := num1 + num2;\n  DBMS_OUTPUT.PUT_LINE('Total Sum: ' || v_sum);\nEND;" 
    },
    { 
        q: "7. Write a PL/SQL block to store employee name and salary in variables and display them.", 
        ans: "DECLARE\n  v_name EMP.ENAME%TYPE;\n  v_salary EMP.SAL%TYPE;\nBEGIN\n  SELECT ENAME, SAL INTO v_name, v_salary FROM EMP WHERE EMPNO = 7839;\n  DBMS_OUTPUT.PUT_LINE('Name: ' || v_name || ' Salary: ' || v_salary);\nEND;" 
    },
    { 
        q: "8. Write a PL/SQL block to swap two numbers using variables.", 
        ans: "DECLARE\n  a NUMBER := 10;\n  b NUMBER := 20;\n  temp NUMBER;\nBEGIN\n  temp := a;\n  a := b;\n  b := temp;\n  DBMS_OUTPUT.PUT_LINE('After Swap -> A: ' || a || ' B: ' || b);\nEND;" 
    },


    { 
        q: "9. Write a PL/SQL block to calculate area of a rectangle using variables.", 
        ans: "DECLARE\n  l NUMBER := 10;\n  b NUMBER := 5;\n  area NUMBER;\nBEGIN\n  area := l * b;\n  DBMS_OUTPUT.PUT_LINE('Area: ' || area);\nEND;" 
    },
    { 
        q: "10. Write a PL/SQL block to declare a constant value for PI and calculate area of a circle.", 
        ans: "DECLARE\n  pi CONSTANT NUMBER := 3.14;\n  r NUMBER := 7;\n  area NUMBER;\nBEGIN\n  area := pi * r * r;\n  DBMS_OUTPUT.PUT_LINE('Circle Area: ' || area);\nEND;" 
    },
    { 
        q: "11. Write a PL/SQL block to declare a constant tax rate and calculate total salary after tax.", 
        ans: "DECLARE\n  v_sal NUMBER := 5000;\n  tax_rate CONSTANT NUMBER := 0.10;\n  total NUMBER;\nBEGIN\n  total := v_sal - (v_sal * tax_rate);\n  DBMS_OUTPUT.PUT_LINE('Net Pay: ' || total);\nEND;" 
    },
    { 
        q: "12. Write a PL/SQL block where constant value cannot be changed.", 
        ans: "DECLARE\n  c_val CONSTANT NUMBER := 100;\nBEGIN\n  -- c_val := 200; -- Uncommenting this will cause Error\n  DBMS_OUTPUT.PUT_LINE('Constant is: ' || c_val);\nEND;" 
    },
    { 
        q: "13. Write a PL/SQL block to calculate simple interest using constant rate.", 
        ans: "DECLARE\n  p NUMBER := 10000; t NUMBER := 2;\n  roi CONSTANT NUMBER := 8.5;\n  si NUMBER;\nBEGIN\n  si := (p * t * roi) / 100;\n  DBMS_OUTPUT.PUT_LINE('Simple Interest: ' || si);\nEND;" 
    },
    { 
        q: "14. Write a PL/SQL block using different datatypes: NUMBER, VARCHAR2, DATE.", 
        ans: "DECLARE\n  v_num NUMBER := 1;\n  v_text VARCHAR2(10) := 'Hello';\n  v_date DATE := SYSDATE;\nBEGIN\n  DBMS_OUTPUT.PUT_LINE(v_num || ' ' || v_text || ' ' || v_date);\nEND;" 
    },
    { 
        q: "15. Write a PL/SQL block to declare a variable using %TYPE from EMP table.", 
        ans: "DECLARE\n  v_sal EMP.SAL%TYPE;\nBEGIN\n  SELECT SAL INTO v_sal FROM EMP WHERE EMPNO = 7839;\n  DBMS_OUTPUT.PUT_LINE('Salary: ' || v_sal);\nEND;" 
    },
    { 
        q: "16. Write a PL/SQL block to declare a record using %ROWTYPE.", 
        ans: "DECLARE\n  v_emp EMP%ROWTYPE;\nBEGIN\n  SELECT * INTO v_emp FROM EMP WHERE EMPNO = 7788;\n  DBMS_OUTPUT.PUT_LINE(v_emp.ENAME || ' works as ' || v_emp.JOB);\nEND;" 
    },
    { 
        q: "17. Write a PL/SQL block to store and display current date.", 
        ans: "DECLARE\n  v_now DATE := SYSDATE;\nBEGIN\n  DBMS_OUTPUT.PUT_LINE('Today: ' || TO_CHAR(v_now, 'DD-MON-YYYY'));\nEND;" 
    },
    { 
        q: "18. Write a PL/SQL block to convert number to string and display it.", 
        ans: "DECLARE\n  v_num NUMBER := 1234;\n  v_str VARCHAR2(10);\nBEGIN\n  v_str := TO_CHAR(v_num);\n  DBMS_OUTPUT.PUT_LINE('String version: ' || v_str);\nEND;" 
    },
    { 
        q: "19. Write a PL/SQL block using variables, constants, and output statement together.", 
        ans: "DECLARE\n  c_unit CONSTANT VARCHAR2(5) := 'USD';\n  v_amt NUMBER := 500;\nBEGIN\n  DBMS_OUTPUT.PUT_LINE('Balance: ' || v_amt || ' ' || c_unit);\nEND;" 
    },
    { 
        q: "20. Write a PL/SQL block with %ROWTYPE, constants, and comments.", 
        ans: "DECLARE\n  /* Record variable */\n  v_emp EMP%ROWTYPE;\n  c_dept CONSTANT NUMBER := 10;\nBEGIN\n  SELECT * INTO v_emp FROM EMP WHERE DEPTNO = c_dept AND ROWNUM = 1;\n  DBMS_OUTPUT.PUT_LINE('Employee: ' || v_emp.ENAME);\nEND;" 
    },
    { 
        q: "21. Write a PL/SQL block to calculate bonus (10% of salary) with comments.", 
        ans: "DECLARE\n  v_sal NUMBER := 3000;\n  v_bonus NUMBER;\nBEGIN\n  -- Calculate 10% bonus\n  v_bonus := v_sal * 0.10;\n  DBMS_OUTPUT.PUT_LINE('Bonus Amount: ' || v_bonus);\nEND;" 
    },
    { 
        q: "22. Write a PL/SQL block that uses all concepts: variable, constant, datatype.", 
        ans: "DECLARE\n  c_company CONSTANT VARCHAR2(10) := 'ABC Tech';\n  v_emp_count NUMBER := 50;\n  v_date DATE := SYSDATE;\nBEGIN\n  DBMS_OUTPUT.PUT_LINE(c_company || ' has ' || v_emp_count || ' staff as of ' || v_date);\nEND;" 
    }
];

const container = document.getElementById('question-list');

function renderPLSQLBasics() {
    if(!container) return;
    
    plsqlBasicsData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'program-card';
        card.innerHTML = `
            <div class="question-header">
                <div>
                    <p><span class="q-number">Q${item.q}</span> </p>
                    <div class="ans-box">
                        <pre><code>${item.ans}</code></pre>
                    </div>
                </div>
                <button class="toggle-btn">Show Output</button>
            </div>
            <div class="expand-content">
                <div class="code-editor">
                    <div class="editor-header">
                        <div class="dots"><span class="r"></span><span class="y"></span><span class="g"></span>DBMS_OUTPUT</div>
                    </div>
                    <div class="output-placeholder">
                        <p>-- Anonymous block completed --</p>
                        <img class="output-img" src="img/pl_out_${index + 1}.png" alt="PL/SQL Execution Result" onerror="this.style.display='none'">
                        <p class="success-msg">>> Procedure executed successfully.</p>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Global Toggle Script (Shared logic)
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-btn')) {
        const card = e.target.closest('.program-card');
        const isActive = card.classList.toggle('active');
        e.target.textContent = isActive ? 'Hide Output' : 'Show Output';
    }
});

renderPLSQLBasics();