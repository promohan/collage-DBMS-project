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
 * DCL Master Repository: Granting Privileges
 * Part of Mohan's DBMS Portfolio 2026
 */

const grantPrivilegesData = [
    { id: "Q", q: "1. Grant SELECT privilege on EMP table to USER1.", ans: "GRANT SELECT ON EMP TO USER1;" },
    { id: "Q", q: "2. Grant SELECT and INSERT privileges on EMP table to USER2.", ans: "GRANT SELECT, INSERT ON EMP TO USER2;" },
    { id: "Q", q: "3. Grant all privileges on DEPT table to USER3.", ans: "GRANT ALL ON DEPT TO USER3;" },
    { id: "Q", q: "4. Grant SELECT on EMP to USER4 with GRANT OPTION.", ans: "GRANT SELECT ON EMP TO USER4 WITH GRANT OPTION;" },
    { id: "Q", q: "5. Grant UPDATE privilege only on SAL column of EMP to USER5.", ans: "GRANT UPDATE (SAL) ON EMP TO USER5;" },
    { id: "Q", q: "6. Grant DELETE privilege on EMP table to USER6.", ans: "GRANT DELETE ON EMP TO USER6;" },
    { id: "Q", q: "7. Grant SELECT on both EMP and DEPT tables to USER7.", ans: "GRANT SELECT ON EMP, DEPT TO USER7;" },
    { id: "Q", q: "8. Grant privileges on EMP table to PUBLIC.", ans: "GRANT SELECT ON EMP TO PUBLIC;" },
    { id: "Q", q: "9. Grant INSERT on EMP to USER8 with ability to grant further.", ans: "GRANT INSERT ON EMP TO USER8 WITH GRANT OPTION;" },
    { id: "Q", cat: "DCL", q: "10. Grant UPDATE and DELETE privileges on EMP to USER9.", ans: "GRANT UPDATE, DELETE ON EMP TO USER9;" },
    { id: "Q", cat: "DCL", q: "11. Revoke SELECT privilege on EMP table from USER1.", ans: "REVOKE SELECT ON EMP FROM USER1;" },
    { id: "Q", cat: "DCL", q: "12. Revoke INSERT and UPDATE privileges on EMP table from USER2.", ans: "REVOKE INSERT, UPDATE ON EMP FROM USER2;" },
    { id: "Q", cat: "DCL", q: "13. Revoke ALL privileges on DEPT table from USER3.", ans: "REVOKE ALL ON DEPT FROM USER3;" },
    { id: "Q", cat: "DCL", q: "14. Revoke GRANT OPTION from USER4 on EMP table.", ans: "REVOKE GRANT OPTION FOR SELECT ON EMP FROM USER4;" },
    { id: "Q", cat: "DCL", q: "15. Revoke UPDATE privilege on SAL column from USER5.", ans: "REVOKE UPDATE ON EMP FROM USER5;" },
    { id: "Q", cat: "DCL", q: "16. Revoke DELETE privilege on EMP table from USER6.", ans: "REVOKE DELETE ON EMP FROM USER6;" },
    { id: "Q", cat: "DCL", q: "17. Revoke privileges granted to PUBLIC on EMP table.", ans: "REVOKE SELECT ON EMP FROM PUBLIC;" },
    { id: "Q", cat: "DCL", q: "18. Revoke all privileges on EMP table from USER9.", ans: "REVOKE ALL ON EMP FROM USER9;" },

    // --- TCL: COMMIT ---
    { id: "Q", cat: "TCL", q: "19. Insert record into EMP and commit changes.", ans: "INSERT INTO EMP (EMPNO, ENAME) VALUES (101, 'MOHAN'); COMMIT;" },
    { id: "Q", cat: "TCL", q: "20. Update salary in dept 10 and commit changes.", ans: "UPDATE EMP SET SAL = SAL + 500 WHERE DEPTNO = 10; COMMIT;" },
    { id: "Q", cat: "TCL", q: "21. Delete employees with SAL < 1000 and commit.", ans: "DELETE FROM EMP WHERE SAL < 1000; COMMIT;" },
    { id: "Q", cat: "TCL", q: "22. Insert multiple records into DEPT and commit together.", ans: "INSERT INTO DEPT VALUES (50,'IT','MUMBAI'); INSERT INTO DEPT VALUES (60,'HR','PUNE'); COMMIT;" },
    { id: "Q", cat: "TCL", q: "23. Update department location and commit.", ans: "UPDATE DEPT SET LOC = 'CHENNAI' WHERE DEPTNO = 40; COMMIT;" },

    // --- TCL: ROLLBACK ---
    { id: "Q", cat: "TCL", q: "24. Insert a new employee but rollback the transaction.", ans: "INSERT INTO EMP (EMPNO, ENAME) VALUES (102, 'ROHIT'); ROLLBACK;" },
    { id: "Q", cat: "TCL", q: "25. Update salary of employees and then rollback.", ans: "UPDATE EMP SET SAL = 9999; ROLLBACK;" },
    { id: "Q", cat: "TCL", q: "26. Delete records from EMP and rollback.", ans: "DELETE FROM EMP; ROLLBACK;" },
    { id: "Q", cat: "TCL", q: "27. Perform INSERT, UPDATE, DELETE and rollback all.", ans: "INSERT...; UPDATE...; DELETE...; ROLLBACK;" },
    { id: "Q", cat: "TCL", q: "28. Update dept location and rollback before commit.", ans: "UPDATE DEPT SET LOC = 'DELHI' WHERE DEPTNO = 10; ROLLBACK;" },

    // --- TCL: ADVANCED TRANSACTIONS & SAVEPOINTS ---
    { id: "Q", cat: "TCL", q: "29. Insert, update salary, and commit after verification.", ans: "INSERT INTO EMP...; UPDATE EMP SET SAL=3000; SELECT * FROM EMP; COMMIT;" },
    { id: "Q", cat: "TCL", q: "30. Rollback one operation using SAVEPOINT, then commit.", ans: "INSERT INTO EMP...; SAVEPOINT S1; INSERT INTO EMP...; ROLLBACK TO S1; COMMIT;" },
    { id: "Q", cat: "TCL", q: "31. Transaction with partial commit and partial rollback.", ans: "UPDATE EMP...; SAVEPOINT A; DELETE FROM EMP...; ROLLBACK TO A; COMMIT;" },
    { id: "Q", cat: "TCL", q: "32. Demonstrate use of SAVEPOINT in EMP table.", ans: "INSERT INTO EMP VALUES (...); SAVEPOINT SP1;" },
    { id: "Q", cat: "TCL", q: "33. Perform update and rollback to specific SAVEPOINT.", ans: "UPDATE EMP SET SAL = 5000; ROLLBACK TO SP1;" },
    { id: "Q", cat: "DCL-TCL", q: "34. Grant privileges, perform DML, and commit.", ans: "GRANT SELECT ON EMP TO USER1; INSERT INTO EMP...; COMMIT;" },
    { id: "Q", cat: "DCL-TCL", q: "35. Revoke privileges and verify access restrictions.", ans: "REVOKE SELECT ON EMP FROM USER1; SELECT * FROM EMP; -- (Access Denied)" }
];

const container = document.getElementById('question-list');

function renderGrantCards() {
    if (!container) return;
    container.innerHTML = "";

    grantPrivilegesData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'program-card security-theme';
        card.innerHTML = `
            <div class="question-header">
                <div class="q-content">

                    <p><strong>${item.id}</strong>${item.q}</p>
                    <div class="ans-box">
                        <p><strong>Ans:</strong>
                            <code>${item.ans}</code>
                        </p>
                    </div>
                </div>
                <button class="toggle-btn">Check Status</button>
            </div>
            <div class="expand-content">
                <div class="code-editor">
                    <div class="editor-header">
                        <div class="dots"><span class="r"></span><span class="y"></span><span class="g"></span>SYSTEM_LOG</div>
                    </div>
                    <div class="output-placeholder">
                        <p class="success-text">>> Statement processed.</p>
                        <p class="success-text">>> Grant Succeeded.</p>
                        <img src="img/grant_${item.id}.png" alt="Grant Output" onerror="this.style.display='none'">
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Initialize
renderGrantCards();

// Toggle Logic
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-btn')) {
        const card = e.target.closest('.program-card');
        card.classList.toggle('active');
        e.target.textContent = card.classList.contains('active') ? 'Close Log' : 'Check Status';
    }
});
