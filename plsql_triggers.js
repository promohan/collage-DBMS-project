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
 * PL/SQL Triggers: Row-level, Statement-level, and Audit Logging
 * Part of Mohan's DBMS Portfolio 2026
 */

const plsqlTriggerData = [
    {
        q: "1. Trigger to display a message whenever a record is inserted into EMP table.",
        ans: "CREATE OR REPLACE TRIGGER trg_ins_msg\nAFTER INSERT ON EMP\nBEGIN\n  DBMS_OUTPUT.PUT_LINE('Record successfully inserted.');\nEND;"
    },
    {
        q: "2. Trigger that fires before inserting data into EMP table.",
        ans: "CREATE OR REPLACE TRIGGER trg_bef_ins\nBEFORE INSERT ON EMP\nBEGIN\n  DBMS_OUTPUT.PUT_LINE('Starting insertion process...');\nEND;"
    },
    {
        q: "3. Trigger that fires after deleting a record from EMP table.",
        ans: "CREATE OR REPLACE TRIGGER trg_aft_del\nAFTER DELETE ON EMP\nBEGIN\n  DBMS_OUTPUT.PUT_LINE('Record removed from EMP.');\nEND;"
    },
    {
        q: "4. Trigger to prevent deletion from EMP table.",
        ans: "CREATE OR REPLACE TRIGGER stop_del\nBEFORE DELETE ON EMP\nBEGIN\n  RAISE_APPLICATION_ERROR(-20001, 'Deletion is prohibited on this table.');\nEND;"
    },
    {
        q: "5. Trigger to display message when employee salary is updated.",
        ans: "CREATE OR REPLACE TRIGGER trg_sal_upd\nAFTER UPDATE OF SAL ON EMP\nBEGIN\n  DBMS_OUTPUT.PUT_LINE('Salary column updated.');\nEND;"
    },
    {
        q: "6. Row-level trigger to display old and new salary when updated.",
        ans: "CREATE OR REPLACE TRIGGER trg_sal_diff\nAFTER UPDATE OF SAL ON EMP FOR EACH ROW\nBEGIN\n  DBMS_OUTPUT.PUT_LINE('Old: ' || :OLD.sal || ' New: ' || :NEW.sal);\nEND;"
    },
    {
        q: "7. Restrict salary update if new salary is less than old salary.",
        ans: "CREATE OR REPLACE TRIGGER check_sal_drop\nBEFORE UPDATE OF SAL ON EMP FOR EACH ROW\nBEGIN\n  IF :NEW.sal < :OLD.sal THEN\n    RAISE_APPLICATION_ERROR(-20002, 'Salary cannot be decreased.');\n  END IF;\nEND;"
    },
    {
        q: "8. Automatically set hiredate while inserting employee record.",
        ans: "CREATE OR REPLACE TRIGGER set_hiredate\nBEFORE INSERT ON EMP FOR EACH ROW\nBEGIN\n  :NEW.hiredate := SYSDATE;\nEND;"
    },
    {
        q: "9. Trigger to increase salary by 5% before updating.",
        ans: "CREATE OR REPLACE TRIGGER auto_hike\nBEFORE UPDATE OF SAL ON EMP FOR EACH ROW\nBEGIN\n  :NEW.sal := :NEW.sal * 1.05;\nEND;"
    },
    {
        q: "10. Copy deleted records into another table (audit table).",
        ans: "CREATE OR REPLACE TRIGGER log_deletion\nAFTER DELETE ON EMP FOR EACH ROW\nBEGIN\n  INSERT INTO EMP_AUDIT(EMPNO, ENAME, DEL_DATE) \n  VALUES (:OLD.empno, :OLD.ename, SYSDATE);\nEND;"
    },
    {
        q: "11. Statement-level trigger to display message when any insert occurs.",
        ans: "CREATE OR REPLACE TRIGGER trg_stmt_ins\nAFTER INSERT ON EMP\nBEGIN\n  DBMS_OUTPUT.PUT_LINE('Insert operation completed.');\nEND;"
    },
    {
        q: "12. Statement-level trigger to log update operations.",
        ans: "CREATE OR REPLACE TRIGGER log_stmt_upd\nAFTER UPDATE ON EMP\nBEGIN\n  INSERT INTO OPERATION_LOGS(OP_TYPE, OP_TIME) VALUES ('UPDATE', SYSDATE);\nEND;"
    },
    {
        q: "13. Trigger that fires once for DELETE regardless of number of rows.",
        ans: "CREATE OR REPLACE TRIGGER trg_del_once\nBEFORE DELETE ON EMP\nBEGIN\n  DBMS_OUTPUT.PUT_LINE('Delete statement detected.');\nEND;"
    },
    {
        q: "14. BEFORE trigger to validate salary before inserting.",
        ans: "CREATE OR REPLACE TRIGGER valid_ins_sal\nBEFORE INSERT ON EMP FOR EACH ROW\nBEGIN\n  IF :NEW.sal < 800 THEN\n    RAISE_APPLICATION_ERROR(-20003, 'Salary below minimum wage.');\n  END IF;\nEND;"
    },
    {
        q: "15. AFTER trigger to log inserted employee records.",
        ans: "CREATE OR REPLACE TRIGGER log_new_emp\nAFTER INSERT ON EMP FOR EACH ROW\nBEGIN\n  INSERT INTO INS_LOGS VALUES(:NEW.empno, SYSDATE);\nEND;"
    },
    {
        q: "16. Compare BEFORE and AFTER triggers for UPDATE.",
        ans: "-- BEFORE: Validates data before change happens.\n-- AFTER: Audits data after change is confirmed."
    },
    {
        q: "17. Trigger that fires only when salary > 5000.",
        ans: "CREATE OR REPLACE TRIGGER high_sal_trg\nAFTER UPDATE ON EMP FOR EACH ROW\nWHEN (NEW.sal > 5000)\nBEGIN\n  DBMS_OUTPUT.PUT_LINE('High salary updated for ' || :NEW.ename);\nEND;"
    },
    {
        q: "18. Trigger to allow insert only during working hours.",
        ans: "CREATE OR REPLACE TRIGGER office_hours_only\nBEFORE INSERT ON EMP\nBEGIN\n  IF TO_CHAR(SYSDATE, 'HH24') NOT BETWEEN '09' AND '17' THEN\n    RAISE_APPLICATION_ERROR(-20005, 'Off-hours entry prohibited.');\n  END IF;\nEND;"
    },
    {
        q: "19. Trigger to prevent update on weekends.",
        ans: "CREATE OR REPLACE TRIGGER no_weekend_upd\nBEFORE UPDATE ON EMP\nBEGIN\n  IF TO_CHAR(SYSDATE, 'DY') IN ('SAT', 'SUN') THEN\n    RAISE_APPLICATION_ERROR(-20006, 'System updates locked on weekends.');\n  END IF;\nEND;"
    },
    {
        q: "20. Maintain audit table for INSERT, UPDATE, DELETE.",
        ans: "CREATE OR REPLACE TRIGGER trg_audit_all\nAFTER INSERT OR UPDATE OR DELETE ON EMP FOR EACH ROW\nDECLARE\n  v_op VARCHAR2(10);\nBEGIN\n  IF INSERTING THEN v_op := 'INS';\n  ELSIF UPDATING THEN v_op := 'UPD';\n  ELSE v_op := 'DEL'; END IF;\n  INSERT INTO MASTER_AUDIT(OP, T_STAMP) VALUES (v_op, SYSDATE);\nEND;"
    },
    {
        q: "21. Trigger to generate automatic employee ID.",
        ans: "CREATE OR REPLACE TRIGGER auto_id\nBEFORE INSERT ON EMP FOR EACH ROW\nBEGIN\n  SELECT emp_seq.NEXTVAL INTO :NEW.empno FROM DUAL;\nEND;"
    },
    {
        q: "22. Trigger to enforce referential integrity manually.",
        ans: "CREATE OR REPLACE TRIGGER check_dept\nBEFORE INSERT ON EMP FOR EACH ROW\nDECLARE\n  v_cnt NUMBER;\nBEGIN\n  SELECT COUNT(*) INTO v_cnt FROM DEPT WHERE DEPTNO = :NEW.deptno;\n  IF v_cnt = 0 THEN RAISE_APPLICATION_ERROR(-20007, 'Dept missing'); END IF;\nEND;"
    },
    {
        q: "23. Trigger to calculate bonus after salary update.",
        ans: "CREATE OR REPLACE TRIGGER calc_bonus_aft\nAFTER UPDATE OF SAL ON EMP FOR EACH ROW\nBEGIN\n  UPDATE BONUS_TABLE SET AMT = :NEW.sal * 0.1 WHERE EMPNO = :NEW.empno;\nEND;"
    },
    {
        q: "24. Trigger to track number of rows affected.",
        ans: "-- Note: Requires a package variable to count rows across events.\n-- Increment in Row trigger, print in Statement trigger."
    },
    {
        q: "25. Trigger to prevent duplicate employee names.",
        ans: "CREATE OR REPLACE TRIGGER no_dup_names\nBEFORE INSERT OR UPDATE ON EMP FOR EACH ROW\nDECLARE\n  v_cnt NUMBER;\nBEGIN\n  SELECT COUNT(*) INTO v_cnt FROM EMP WHERE ENAME = :NEW.ename;\n  IF v_cnt > 0 THEN RAISE_APPLICATION_ERROR(-20008, 'Duplicate name.'); END IF;\nEND;"
    },
    {
        q: "26. Log user activity (who and when updated).",
        ans: "CREATE OR REPLACE TRIGGER log_user\nAFTER UPDATE ON EMP FOR EACH ROW\nBEGIN\n  INSERT INTO USER_LOGS(UNAME, U_TIME) VALUES (USER, SYSDATE);\nEND;"
    },
    {
        q: "27. Restrict salary update beyond 20%.",
        ans: "CREATE OR REPLACE TRIGGER limit_hike\nBEFORE UPDATE OF SAL ON EMP FOR EACH ROW\nBEGIN\n  IF :NEW.sal > :OLD.sal * 1.20 THEN\n    RAISE_APPLICATION_ERROR(-20009, 'Hike exceeds 20% limit.');\n  END IF;\nEND;"
    },
    {
        q: "28. Trigger that calls a procedure from a package.",
        ans: "CREATE OR REPLACE TRIGGER trg_pkg_call\nAFTER INSERT ON EMP FOR EACH ROW\nBEGIN\n  pkg_emp_logic.validate_record(:NEW.empno);\nEND;"
    },
    {
        q: "29. Maintain history table for salary changes.",
        ans: "CREATE OR REPLACE TRIGGER sal_history\nAFTER UPDATE OF SAL ON EMP FOR EACH ROW\nBEGIN\n  INSERT INTO SAL_HIST(EMPNO, OLD_SAL, NEW_SAL, CHANGE_DATE) \n  VALUES (:OLD.empno, :OLD.sal, :NEW.sal, SYSDATE);\nEND;"
    },
    {
        q: "30. Compound trigger (advanced Oracle feature).",
        ans: "CREATE OR REPLACE TRIGGER cmp_trg\nFOR INSERT ON EMP\nCOMPOUND TRIGGER\n  BEFORE STATEMENT IS BEGIN NULL; END BEFORE STATEMENT;\n  AFTER EACH ROW IS BEGIN NULL; END AFTER EACH ROW;\nEND cmp_trg;"
    }
];

const container = document.getElementById('question-list');

function renderTriggers() {
    if (!container) return;
    container.innerHTML = "";

    plsqlTriggerData.forEach((item, index) => {
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
                <button class="toggle-btn">Enable Trigger</button>
            </div>
            <div class="expand-content">
                <div class="code-editor">
                    <div class="editor-header">
                        <div class="dots"><span class="r"></span><span class="y"></span><span class="g"></span>OUTPUT</div>
                    </div>
                    <div class="output-placeholder">
                        <p>-- Attaching to Metadata... --</p>
                        <img class="output-img" src="img/trg_out_${index + 1}.png" alt="Trigger Result" onerror="this.style.display='none'">
                        <p class="success-msg">>> Status: Trigger is active. Listening for events.</p>
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
        e.target.textContent = isActive ? 'Disable Trigger' : 'Enable Trigger';
    }
});

renderTriggers();