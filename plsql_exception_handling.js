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
 * PL/SQL Exception Handling: Predefined, User-defined, and Re-raising
 * Part of Mohan's DBMS Portfolio 2026
 */

const plsqlExceptionData = [
    { 
        q: "1. Write a PL/SQL block to handle NO_DATA_FOUND exception.", 
        ans: "DECLARE\n  v_name EMP.ENAME%TYPE;\nBEGIN\n  SELECT ENAME INTO v_name FROM EMP WHERE EMPNO = 9999;\nEXCEPTION\n  WHEN NO_DATA_FOUND THEN\n    DBMS_OUTPUT.PUT_LINE('Error: Employee ID not found.');\nEND;" 
    },
    { 
        q: "2. Write a PL/SQL block to handle TOO_MANY_ROWS exception.", 
        ans: "DECLARE\n  v_name EMP.ENAME%TYPE;\nBEGIN\n  SELECT ENAME INTO v_name FROM EMP;\nEXCEPTION\n  WHEN TOO_MANY_ROWS THEN\n    DBMS_OUTPUT.PUT_LINE('Error: Query returned more than one row.');\nEND;" 
    },
    { 
        q: "3. Write a PL/SQL block to handle ZERO_DIVIDE exception.", 
        ans: "DECLARE\n  v_num NUMBER := 10;\n  v_res NUMBER;\nBEGIN\n  v_res := v_num / 0;\nEXCEPTION\n  WHEN ZERO_DIVIDE THEN\n    DBMS_OUTPUT.PUT_LINE('Error: Division by zero is not allowed.');\nEND;" 
    },
    { 
        q: "4. Write a PL/SQL block to handle VALUE_ERROR exception.", 
        ans: "DECLARE\n  v_num NUMBER(2);\nBEGIN\n  v_num := 150; -- Precision error\nEXCEPTION\n  WHEN VALUE_ERROR THEN\n    DBMS_OUTPUT.PUT_LINE('Error: Numerical or value error occurred.');\nEND;" 
    },
    { 
        q: "5. Write a PL/SQL block with a generic WHEN OTHERS exception handler.", 
        ans: "BEGIN\n  -- Risky Database Operation\n  UPDATE EMP SET SAL = SAL * 1.1;\nEXCEPTION\n  WHEN OTHERS THEN\n    DBMS_OUTPUT.PUT_LINE('An unexpected error occurred.');\nEND;" 
    },
    { 
        q: "6. Write a PL/SQL block to display error code and message using SQLCODE and SQLERRM.", 
        ans: "BEGIN\n  INSERT INTO EMP (EMPNO) VALUES (NULL);\nEXCEPTION\n  WHEN OTHERS THEN\n    DBMS_OUTPUT.PUT_LINE('Code: ' || SQLCODE);\n    DBMS_OUTPUT.PUT_LINE('Message: ' || SQLERRM);\nEND;" 
    },
    { 
        q: "7. Capture error details when division by zero occurs.", 
        ans: "DECLARE\n  x NUMBER := 5; y NUMBER := 0; z NUMBER;\nBEGIN\n  z := x / y;\nEXCEPTION\n  WHEN ZERO_DIVIDE THEN\n    DBMS_OUTPUT.PUT_LINE('Details: ' || SQLERRM);\nEND;" 
    },
    { 
        q: "8. Write a PL/SQL block to log exception message into a variable.", 
        ans: "DECLARE\n  v_err_msg VARCHAR2(200);\nBEGIN\n  SELECT ENAME INTO v_err_msg FROM EMP WHERE 1=2;\nEXCEPTION\n  WHEN NO_DATA_FOUND THEN\n    v_err_msg := SQLERRM;\n    DBMS_OUTPUT.PUT_LINE('Logged: ' || v_err_msg);\nEND;" 
    },
    { 
        q: "9. Raise error if salary < 2000 using RAISE_APPLICATION_ERROR.", 
        ans: "DECLARE\n  v_sal NUMBER := 1500;\nBEGIN\n  IF v_sal < 2000 THEN\n    RAISE_APPLICATION_ERROR(-20001, 'Salary must be at least 2000');\n  END IF;\nEND;" 
    },
    { 
        q: "10. Validate employee age (age < 18) via RAISE_APPLICATION_ERROR.", 
        ans: "DECLARE\n  v_age NUMBER := 16;\nBEGIN\n  IF v_age < 18 THEN\n    RAISE_APPLICATION_ERROR(-20002, 'Minor employees not permitted.');\n  END IF;\nEND;" 
    },
    { 
        q: "11. Restrict update operation using RAISE_APPLICATION_ERROR.", 
        ans: "BEGIN\n  IF TO_CHAR(SYSDATE, 'HH24') NOT BETWEEN '09' AND '18' THEN\n    RAISE_APPLICATION_ERROR(-20003, 'Updates only allowed during office hours.');\n  END IF;\nEND;" 
    },
    { 
        q: "12. Raise error when invalid department number is entered.", 
        ans: "DECLARE\n  v_count NUMBER;\n  v_dept NUMBER := 99;\nBEGIN\n  SELECT COUNT(*) INTO v_count FROM DEPT WHERE DEPTNO = v_dept;\n  IF v_count = 0 THEN\n    RAISE_APPLICATION_ERROR(-20004, 'Department does not exist.');\n  END IF;\nEND;" 
    },
    { 
        q: "13. Write a PL/SQL block to declare and handle a user-defined exception.", 
        ans: "DECLARE\n  e_my_error EXCEPTION;\n  v_check NUMBER := 1;\nBEGIN\n  IF v_check = 1 THEN RAISE e_my_error; END IF;\nEXCEPTION\n  WHEN e_my_error THEN\n    DBMS_OUTPUT.PUT_LINE('Caught my custom exception.');\nEND;" 
    },
    { 
        q: "14. Raise a custom exception when salary exceeds limit.", 
        ans: "DECLARE\n  e_over_sal EXCEPTION;\n  v_sal NUMBER := 6000;\nBEGIN\n  IF v_sal > 5000 THEN RAISE e_over_sal; END IF;\nEXCEPTION\n  WHEN e_over_sal THEN\n    DBMS_OUTPUT.PUT_LINE('Salary exceeds management limits.');\nEND;" 
    },
    { 
        q: "15. Validate input and raise user-defined exception for invalid data.", 
        ans: "DECLARE\n  e_invalid_input EXCEPTION;\n  v_input VARCHAR2(10) := ' '; \nBEGIN\n  IF TRIM(v_input) IS NULL THEN RAISE e_invalid_input; END IF;\nEXCEPTION\n  WHEN e_invalid_input THEN\n    DBMS_OUTPUT.PUT_LINE('Input cannot be empty.');\nEND;" 
    },
    { 
        q: "16. Write a PL/SQL block to handle multiple user-defined exceptions.", 
        ans: "DECLARE\n  e_low EXCEPTION; e_high EXCEPTION;\n  v_n NUMBER := 15;\nBEGIN\n  IF v_n < 10 THEN RAISE e_low;\n  ELSIF v_n > 20 THEN RAISE e_high; END IF;\nEXCEPTION\n  WHEN e_low THEN DBMS_OUTPUT.PUT_LINE('Too low');\n  WHEN e_high THEN DBMS_OUTPUT.PUT_LINE('Too high');\nEND;" 
    },
    { 
        q: "17. Catch an exception and re-raise it using RAISE.", 
        ans: "BEGIN\n  DECLARE\n    e_fail EXCEPTION;\n  BEGIN\n    RAISE e_fail;\n  EXCEPTION\n    WHEN e_fail THEN\n      DBMS_OUTPUT.PUT_LINE('Handling locally...');\n      RAISE; -- Re-raising to outer block\n  END;\nEXCEPTION\n  WHEN OTHERS THEN\n    DBMS_OUTPUT.PUT_LINE('Caught re-raised error.');\nEND;" 
    },
    { 
        q: "18. Exception handled in inner block and re-raised to outer block.", 
        ans: "BEGIN\n  BEGIN\n    RAISE ZERO_DIVIDE;\n  EXCEPTION\n    WHEN ZERO_DIVIDE THEN\n      DBMS_OUTPUT.PUT_LINE('Inner handler.');\n      RAISE;\n  END;\nEXCEPTION\n  WHEN ZERO_DIVIDE THEN\n    DBMS_OUTPUT.PUT_LINE('Outer handler.');\nEND;" 
    },
    { 
        q: "19. Write a PL/SQL block to log error and then re-raise it.", 
        ans: "DECLARE\n  v_msg VARCHAR2(100);\nBEGIN\n  RAISE NO_DATA_FOUND;\nEXCEPTION\n  WHEN NO_DATA_FOUND THEN\n    v_msg := 'Attempted access at ' || SYSDATE;\n    DBMS_OUTPUT.PUT_LINE('Logging: ' || v_msg);\n    RAISE;\nEND;" 
    },
    { 
        q: "20. Fetch employee details and handle all possible exceptions.", 
        ans: "DECLARE\n  v_name VARCHAR2(20);\nBEGIN\n  SELECT ENAME INTO v_name FROM EMP WHERE DEPTNO = 10;\nEXCEPTION\n  WHEN NO_DATA_FOUND THEN DBMS_OUTPUT.PUT_LINE('No record');\n  WHEN TOO_MANY_ROWS THEN DBMS_OUTPUT.PUT_LINE('Many records');\n  WHEN OTHERS THEN DBMS_OUTPUT.PUT_LINE('Other error');\nEND;" 
    },
    { 
        q: "21. Use user-defined exception and RAISE_APPLICATION_ERROR together.", 
        ans: "DECLARE\n  e_bad_data EXCEPTION;\nBEGIN\n  -- Logic checks\n  RAISE e_bad_data;\nEXCEPTION\n  WHEN e_bad_data THEN\n    RAISE_APPLICATION_ERROR(-20500, 'Critical Data Failure');\nEND;" 
    },
    { 
        q: "22. Validate salary and raise appropriate exception.", 
        ans: "DECLARE\n  v_sal NUMBER := -50;\nBEGIN\n  IF v_sal < 0 THEN RAISE VALUE_ERROR; END IF;\nEXCEPTION\n  WHEN VALUE_ERROR THEN\n    DBMS_OUTPUT.PUT_LINE('Salary cannot be negative.');\nEND;" 
    },
    { 
        q: "23. Perform division and handle exception using SQLCODE & SQLERRM.", 
        ans: "DECLARE\n  a NUMBER := 1; b NUMBER := 0;\nBEGIN\n  a := a/b;\nEXCEPTION\n  WHEN OTHERS THEN\n    DBMS_OUTPUT.PUT_LINE(SQLCODE || ': ' || SQLERRM);\nEND;" 
    },
    { 
        q: "24. Simulate bank withdrawal with exception handling.", 
        ans: "DECLARE\n  v_bal NUMBER := 1000;\n  v_amt NUMBER := 1500;\n  e_insufficient_funds EXCEPTION;\nBEGIN\n  IF v_amt > v_bal THEN RAISE e_insufficient_funds; END IF;\n  v_bal := v_bal - v_amt;\nEXCEPTION\n  WHEN e_insufficient_funds THEN\n    DBMS_OUTPUT.PUT_LINE('Transaction Failed: Insufficient Balance.');\nEND;" 
    },
    { 
        q: "25. Validate data and raise different exceptions for different errors.", 
        ans: "DECLARE\n  v_id NUMBER := 0;\n  e_zero_id EXCEPTION;\nBEGIN\n  IF v_id = 0 THEN RAISE e_zero_id;\n  ELSIF v_id < 0 THEN RAISE_APPLICATION_ERROR(-20005, 'Negative ID'); END IF;\nEXCEPTION\n  WHEN e_zero_id THEN DBMS_OUTPUT.PUT_LINE('ID cannot be zero');\nEND;" 
    },
    { 
        q: "26. Write a PL/SQL block to log errors into a table using exception handling.", 
        ans: "BEGIN\n  -- Some failing SQL\n  NULL;\nEXCEPTION\n  WHEN OTHERS THEN\n    INSERT INTO ERROR_LOGS(ERR_CODE, ERR_MSG, LOG_DATE) \n    VALUES (SQLCODE, SQLERRM, SYSDATE);\n    COMMIT;\nEND;" 
    },
    { 
        q: "27. Implement nested exception blocks with re-raise mechanism.", 
        ans: "BEGIN\n  BEGIN\n    RAISE VALUE_ERROR;\n  EXCEPTION\n    WHEN VALUE_ERROR THEN\n      DBMS_OUTPUT.PUT_LINE('Inner check.');\n      RAISE NO_DATA_FOUND;\n  END;\nEXCEPTION\n  WHEN NO_DATA_FOUND THEN\n    DBMS_OUTPUT.PUT_LINE('Caught converted error in outer block.');\nEND;" 
    }
];

const container = document.getElementById('question-list');

function renderExceptions() {
    if(!container) return;
    container.innerHTML = "";
    
    plsqlExceptionData.forEach((item, index) => {
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
                        <p>-- Monitoring Stack Trace... --</p>
                        <img class="output-img" src="img/exc_out_${index + 1}.png" alt="Exception Result" onerror="this.style.display='none'">
                        <p class="success-msg">>> EXCEPTION Handled: Control passed to handler block.</p>
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
        e.target.textContent = isActive ? 'Clear Stack' : 'Trigger Block';
    }
});

renderExceptions();