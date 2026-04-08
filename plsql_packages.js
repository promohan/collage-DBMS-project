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
 * PL/SQL Packages: Specifications, Bodies, and Overloading
 * Part of Mohan's DBMS Portfolio 2026
 */

const plsqlPackageData = [
    { 
        q: "1. Write a package specification and body to display 'Hello Oracle'.", 
        ans: "CREATE OR REPLACE PACKAGE pkg_hello AS\n  PROCEDURE say_hello;\nEND pkg_hello;\n/\nCREATE OR REPLACE PACKAGE BODY pkg_hello AS\n  PROCEDURE say_hello IS\n  BEGIN\n    DBMS_OUTPUT.PUT_LINE('Hello Oracle');\n  END;\nEND pkg_hello;" 
    },
    { 
        q: "2. Create a package with one procedure to display employee details.", 
        ans: "CREATE OR REPLACE PACKAGE pkg_emp AS\n  PROCEDURE show_emp(p_id NUMBER);\nEND pkg_emp;\n/\nCREATE OR REPLACE PACKAGE BODY pkg_emp AS\n  PROCEDURE show_emp(p_id NUMBER) IS\n    v_name VARCHAR2(20);\n  BEGIN\n    SELECT ENAME INTO v_name FROM EMP WHERE EMPNO = p_id;\n    DBMS_OUTPUT.PUT_LINE('Name: ' || v_name);\n  END;\nEND pkg_emp;" 
    },
    { 
        q: "3. Create a package containing a function to return square of a number.", 
        ans: "CREATE OR REPLACE PACKAGE pkg_math AS\n  FUNCTION get_sq(n NUMBER) RETURN NUMBER;\nEND pkg_math;\n/\nCREATE OR REPLACE PACKAGE BODY pkg_math AS\n  FUNCTION get_sq(n NUMBER) RETURN NUMBER IS\n  BEGIN\n    RETURN n * n;\n  END;\nEND pkg_math;" 
    },
    { 
        q: "4. Write a package with both procedure and function.", 
        ans: "CREATE OR REPLACE PACKAGE pkg_dual AS\n  PROCEDURE p1; \n  FUNCTION f1 RETURN NUMBER;\nEND pkg_dual;" 
    },
    { 
        q: "5. Create a package to group employee-related operations.", 
        ans: "CREATE OR REPLACE PACKAGE pkg_hr AS\n  PROCEDURE add_emp(p_id NUMBER, p_name VARCHAR2);\n  PROCEDURE del_emp(p_id NUMBER);\nEND pkg_hr;" 
    },
    { 
        q: "6. Create a package with a global variable and display its value.", 
        ans: "CREATE OR REPLACE PACKAGE pkg_var AS\n  v_global NUMBER := 100;\nEND pkg_var;\n/\n-- Access using pkg_var.v_global" 
    },
    { 
        q: "7. Write a package to store company name as constant and display it.", 
        ans: "CREATE OR REPLACE PACKAGE pkg_const AS\n  c_company CONSTANT VARCHAR2(20) := 'ORACLE CORP';\nEND pkg_const;" 
    },
    { 
        q: "8. Create a package that uses a variable to count number of procedure calls.", 
        ans: "CREATE OR REPLACE PACKAGE pkg_counter AS\n  v_count NUMBER := 0;\n  PROCEDURE hit;\nEND pkg_counter;\n/\nCREATE OR REPLACE PACKAGE BODY pkg_counter AS\n  PROCEDURE hit IS\n  BEGIN\n    v_count := v_count + 1;\n    DBMS_OUTPUT.PUT_LINE('Call #' || v_count);\n  END;\nEND pkg_counter;" 
    },
    { 
        q: "9. Write a package with a global variable used in multiple procedures.", 
        ans: "CREATE OR REPLACE PACKAGE pkg_state AS\n  v_state VARCHAR2(10);\n  PROCEDURE set_up; PROCEDURE show_up;\nEND pkg_state;" 
    },
    { 
        q: "10. Create a package procedure to fetch employee details using empno.", 
        ans: "CREATE OR REPLACE PACKAGE BODY pkg_emp_ops AS\n  PROCEDURE fetch_data(p_id NUMBER) IS\n    v_rec EMP%ROWTYPE;\n  BEGIN\n    SELECT * INTO v_rec FROM EMP WHERE EMPNO = p_id;\n    DBMS_OUTPUT.PUT_LINE(v_rec.ENAME);\n  END;\nEND pkg_emp_ops;" 
    },
    { 
        q: "11. Create a package procedure to insert employee record.", 
        ans: "PROCEDURE ins_emp(p_id NUMBER, p_name VARCHAR2) IS\nBEGIN\n  INSERT INTO EMP(EMPNO, ENAME) VALUES (p_id, p_name);\nEND;" 
    },
    { 
        q: "12. Create a package procedure to update employee salary.", 
        ans: "PROCEDURE upd_sal(p_id NUMBER, p_sal NUMBER) IS\nBEGIN\n  UPDATE EMP SET SAL = p_sal WHERE EMPNO = p_id;\nEND;" 
    },
    { 
        q: "13. Create a package procedure to delete employee record.", 
        ans: "PROCEDURE rem_emp(p_id NUMBER) IS\nBEGIN\n  DELETE FROM EMP WHERE EMPNO = p_id;\nEND;" 
    },
    { 
        q: "14. Create a package procedure to increase salary by 10%.", 
        ans: "PROCEDURE bulk_hike IS\nBEGIN\n  UPDATE EMP SET SAL = SAL * 1.10;\nEND;" 
    },
    { 
        q: "15. Create a package function to return employee salary.", 
        ans: "FUNCTION get_val(p_id NUMBER) RETURN NUMBER IS\n  v_s NUMBER;\nBEGIN\n  SELECT SAL INTO v_s FROM EMP WHERE EMPNO = p_id;\n  RETURN v_s;\nEND;" 
    },
    { 
        q: "16. Create a package function to return total employees.", 
        ans: "FUNCTION count_all RETURN NUMBER IS\n  c NUMBER;\nBEGIN\n  SELECT COUNT(*) INTO c FROM EMP;\n  RETURN c;\nEND;" 
    },
    { 
        q: "17. Create a package function to return maximum salary.", 
        ans: "FUNCTION get_max_sal RETURN NUMBER IS\n  m NUMBER;\nBEGIN\n  SELECT MAX(SAL) INTO m FROM EMP;\n  RETURN m;\nEND;" 
    },
    { 
        q: "18. Create a package function to calculate bonus (10% of salary).", 
        ans: "FUNCTION calc_bonus(p_id NUMBER) RETURN NUMBER IS\nBEGIN\n  RETURN get_val(p_id) * 0.10;\nEND;" 
    },
    { 
        q: "19. Create a package that uses cursor to display all employees.", 
        ans: "CREATE OR REPLACE PACKAGE pkg_cur AS\n  CURSOR c1 IS SELECT ENAME FROM EMP;\n  PROCEDURE show_names;\nEND pkg_cur;" 
    },
    { 
        q: "20. Create a package with parameterized cursor.", 
        ans: "CURSOR c_dept(p_d NUMBER) IS SELECT ENAME FROM EMP WHERE DEPTNO = p_d;" 
    },
    { 
        q: "21. Create a package procedure that loops using cursor FOR LOOP.", 
        ans: "PROCEDURE loop_emp IS\nBEGIN\n  FOR r IN (SELECT ENAME FROM EMP) LOOP\n    DBMS_OUTPUT.PUT_LINE(r.ENAME);\n  END LOOP;\nEND;" 
    },
    { 
        q: "22. Create a package with private procedure.", 
        ans: "-- Specification: Only public_proc;\n-- Body: Contains private_proc AND public_proc (calls private)." 
    },
    { 
        q: "23. Create a package with overloaded procedures.", 
        ans: "PROCEDURE find_emp(p_id NUMBER);\nPROCEDURE find_emp(p_name VARCHAR2);" 
    },
    { 
        q: "24. Create a package with function overloading.", 
        ans: "FUNCTION calc(a NUMBER) RETURN NUMBER;\nFUNCTION calc(a NUMBER, b NUMBER) RETURN NUMBER;" 
    },
    { 
        q: "25. Create a package to maintain employee audit logs.", 
        ans: "PROCEDURE log_action(p_msg VARCHAR2) IS\nBEGIN\n  INSERT INTO AUDIT_LOGS VALUES (p_msg, SYSDATE);\nEND;" 
    },
    { 
        q: "26. Create a package with initialization block.", 
        ans: "CREATE OR REPLACE PACKAGE BODY pkg_init IS\n  -- Procedures here\nBEGIN\n  DBMS_OUTPUT.PUT_LINE('Package Loaded at ' || SYSDATE);\nEND pkg_init;" 
    },
    { 
        q: "27. Create a package to perform all CRUD operations on EMP table.", 
        ans: "PACKAGE pkg_crud IS\n  PROCEDURE create_e; PROCEDURE read_e; \n  PROCEDURE update_e; PROCEDURE delete_e;\nEND;" 
    },
    { 
        q: "28. Package calculates salary, bonus, and tax using multiple functions.", 
        ans: "FUNCTION get_tax(p_id NUMBER) RETURN NUMBER IS\nBEGIN\n  RETURN get_val(p_id) * 0.05;\nEND;" 
    },
    { 
        q: "29. Create a package to validate employee data before insert/update.", 
        ans: "FUNCTION is_valid(p_sal NUMBER) RETURN BOOLEAN IS\nBEGIN\n  RETURN p_sal > 0;\nEND;" 
    },
    { 
        q: "30. Create a package that interacts with multiple tables (EMP, DEPT).", 
        ans: "PROCEDURE join_data IS\nBEGIN\n  FOR r IN (SELECT E.ENAME, D.DNAME FROM EMP E, DEPT D WHERE E.DEPTNO=D.DEPTNO) LOOP\n    NULL;\n  END LOOP;\nEND;" 
    },
    { 
        q: "31. Create a package to simulate banking operations.", 
        ans: "PROCEDURE deposit(acct NUMBER, amt NUMBER);\nPROCEDURE withdraw(acct NUMBER, amt NUMBER);" 
    },
    { 
        q: "32. Create a package that uses exception handling for all operations.", 
        ans: "PROCEDURE safe_op IS\nBEGIN\n  -- Logic\nEXCEPTION\n  WHEN OTHERS THEN DBMS_OUTPUT.PUT_LINE('Logged Error');\nEND;" 
    }
];

const container = document.getElementById('question-list');

function renderPackages() {
    if(!container) return;
    container.innerHTML = "";
    
    plsqlPackageData.forEach((item, index) => {
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
                <button class="toggle-btn">Initialize Package</button>
            </div>
            <div class="expand-content">
                <div class="code-editor">
                    <div class="editor-header">
                        <div class="dots"><span class="r"></span><span class="y"></span><span class="g"></span>PACKAGE_SPEC_BODY</div>
                    </div>
                    <div class="output-placeholder">
                        <p>-- Loading Package into SGA... --</p>
                        <img class="output-img" src="img/pkg_out_${index + 1}.png" alt="Package Result" onerror="this.style.display='none'">
                        <p class="success-msg">>> Status: Package Specification & Body compiled.</p>
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
        e.target.textContent = isActive ? 'Drop Package' : 'Initialize Package';
    }
});

renderPackages();