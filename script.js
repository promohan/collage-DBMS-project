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




const dbmsQuestions = [
    { q: "Create a table called STUDENT with columns: SID (NUMBER), SNAME (VARCHAR2(30)), AGE (NUMBER), COURSE (VARCHAR2(20))", ans: "CREATE TABLE STUDENT (SID NUMBER, SNAME VARCHAR2(30), AGE NUMBER, COURSE VARCHAR2(20));" },
    { q: "Create a table EMPLOYEE with columns: EID NUMBER, ENAME VARCHAR2(40), SALARY NUMBER(8,2), DEPTNO NUMBER", ans: "CREATE TABLE EMPLOYEE (EID NUMBER, ENAME VARCHAR2(40), SALARY NUMBER(8,2), DEPTNO NUMBER);" },
    { q: "Create a table DEPARTMENT with columns: DEPTNO NUMBER, DNAME VARCHAR2(30), LOCATION VARCHAR2(30)", ans: "CREATE TABLE DEPARTMENT (DEPTNO NUMBER, DNAME VARCHAR2(30), LOCATION VARCHAR2(30));" },
    { q: "Create a table BOOK with columns: BOOK_ID NUMBER, TITLE VARCHAR2(50), AUTHOR VARCHAR2(40), PRICE NUMBER", ans: "CREATE TABLE BOOK (BOOK_ID NUMBER, TITLE VARCHAR2(50), AUTHOR VARCHAR2(40), PRICE NUMBER);" },
    { q: "Create a table COURSE with columns: CID NUMBER, CNAME VARCHAR2(40), DURATION NUMBER", ans: "CREATE TABLE COURSE (CID NUMBER, CNAME VARCHAR2(40), DURATION NUMBER);" },
    { q: "Create a table PROJECT with columns: PID NUMBER, PNAME VARCHAR2(50), START_DATE DATE, END_DATE DATE", ans: "CREATE TABLE PROJECT (PID NUMBER, PNAME VARCHAR2(50), START_DATE DATE, END_DATE DATE);" },
    { q: "Create a table CUSTOMER with columns: CID NUMBER, CNAME VARCHAR2(40), CITY VARCHAR2(30), PHONE NUMBER", ans: "CREATE TABLE CUSTOMER (CID NUMBER, CNAME VARCHAR2(40), CITY VARCHAR2(30), PHONE NUMBER);" },
    { q: "Create a table SALES with columns: SALE_ID NUMBER, PRODUCT_NAME VARCHAR2(50), QUANTITY NUMBER, PRICE NUMBER", ans: "CREATE TABLE SALES (SALE_ID NUMBER, PRODUCT_NAME VARCHAR2(50), QUANTITY NUMBER, PRICE NUMBER);" },
    { q: "Create a table EMP_COPY from the existing EMP table (structure only)", ans: "CREATE TABLE EMP_COPY AS SELECT * FROM EMP WHERE 1=0;" },
    { q: "Create a table EMP_BACKUP from EMP including data", ans: "CREATE TABLE EMP_BACKUP AS SELECT * FROM EMP;" },
    { q: "Add a column EMAIL VARCHAR2(50) to the STUDENT table", ans: "ALTER TABLE STUDENT ADD (EMAIL VARCHAR2(50));" },
    { q: "Add a column PHONE NUMBER to the EMPLOYEE table", ans: "ALTER TABLE EMPLOYEE ADD (PHONE NUMBER);" },
    { q: "Modify the column SNAME in STUDENT table to VARCHAR2(50)", ans: "ALTER TABLE STUDENT MODIFY (SNAME VARCHAR2(50));" },
    { q: "Modify the column SALARY in EMPLOYEE table to NUMBER(10,2)", ans: "ALTER TABLE EMPLOYEE MODIFY (SALARY NUMBER(10,2));" },
    { q: "Add two columns CITY VARCHAR2(30) and PINCODE NUMBER to CUSTOMER table", ans: "ALTER TABLE CUSTOMER ADD (CITY VARCHAR2(30), PINCODE NUMBER);" },
    { q: "Rename the column SNAME to STUDENT_NAME in STUDENT table", ans: "ALTER TABLE STUDENT RENAME COLUMN SNAME TO STUDENT_NAME;" },
    { q: "Drop the column AGE from STUDENT table", ans: "ALTER TABLE STUDENT DROP COLUMN AGE;" },
    { q: "Set the column SALARY in EMPLOYEE table to NOT NULL", ans: "ALTER TABLE EMPLOYEE MODIFY (SALARY NOT NULL);" },
    { q: "Increase the size of column TITLE in BOOK table to VARCHAR2(100)", ans: "ALTER TABLE BOOK MODIFY (TITLE VARCHAR2(100));" },
    { q: "Add a column MANAGER_ID NUMBER to EMPLOYEE table", ans: "ALTER TABLE EMPLOYEE ADD (MANAGER_ID NUMBER);" },
    { q: "Drop the table STUDENT", ans: "DROP TABLE STUDENT;" },
    { q: "Drop the table CUSTOMER from the database", ans: "DROP TABLE CUSTOMER;" },
    { q: "Drop the table PROJECT permanently", ans: "DROP TABLE PROJECT;" },
    { q: "Remove the table SALES", ans: "DROP TABLE SALES;" },
    { q: "Drop the table COURSE", ans: "DROP TABLE COURSE;" },
    { q: "Rename the table STUDENT to STUDENTS", ans: "RENAME STUDENT TO STUDENTS;" },
    { q: "Rename the table EMPLOYEE to EMP_MASTER", ans: "RENAME EMPLOYEE TO EMP_MASTER;" },
    { q: "Rename the table CUSTOMER to CLIENT", ans: "RENAME CUSTOMER TO CLIENT;" },
    { q: "Rename the table BOOK to BOOK_DETAILS", ans: "RENAME BOOK TO BOOK_DETAILS;" },
    { q: "Rename the table PROJECT to PROJECT_INFO", ans: "RENAME PROJECT TO PROJECT_INFO;" },
    { q: "Remove all records from the STUDENT table", ans: "TRUNCATE TABLE STUDENT;" },
    { q: "Delete all rows from EMPLOYEE table using TRUNCATE", ans: "TRUNCATE TABLE EMPLOYEE;" },
    { q: "Empty the CUSTOMER table quickly", ans: "TRUNCATE TABLE CUSTOMER;" },
    { q: "Remove all data from SALES table but keep structure", ans: "TRUNCATE TABLE SALES;" },
    { q: "Clear the PROJECT table", ans: "TRUNCATE TABLE PROJECT;" },
    { q: "Create a table TRAINING with columns TID, TNAME, DURATION", ans: "CREATE TABLE TRAINING (TID NUMBER, TNAME VARCHAR2(40), DURATION NUMBER);" },
    { q: "Add column TRAINER_NAME VARCHAR2(40) to TRAINING", ans: "ALTER TABLE TRAINING ADD (TRAINER_NAME VARCHAR2(40));" },
    { q: "Modify TNAME column size to VARCHAR2(60)", ans: "ALTER TABLE TRAINING MODIFY (TNAME VARCHAR2(60));" },
    { q: "Rename the TRAINING table to TRAINING_PROGRAM", ans: "RENAME TRAINING TO TRAINING_PROGRAM;" },
    { q: "Truncate the TRAINING_PROGRAM table", ans: "TRUNCATE TABLE TRAINING_PROGRAM;" },
    { q: "Drop the TRAINING_PROGRAM table", ans: "DROP TABLE TRAINING_PROGRAM;" },
    { q: "Create table EMP_PROJECT and modify ROLE/add STATUS", ans: "CREATE TABLE EMP_PROJECT (EMP_ID NUMBER, PROJECT_ID NUMBER, START_DATE DATE, END_DATE DATE, ROLE VARCHAR2(30)); ALTER TABLE EMP_PROJECT MODIFY (ROLE VARCHAR2(50)); ALTER TABLE EMP_PROJECT ADD (STATUS VARCHAR2(20));" },
    { q: "Create table PRODUCT, rename PNAME and change PRICE type", ans: "CREATE TABLE PRODUCT (PID NUMBER, PNAME VARCHAR2(50), PRICE NUMBER, CATEGORY VARCHAR2(30)); ALTER TABLE PRODUCT RENAME COLUMN PNAME TO PRODUCT_NAME; ALTER TABLE PRODUCT MODIFY (PRICE NUMBER(10,2));" },
    { q: "Create table ORDERS, add STATUS, drop TOTAL_AMOUNT, add back as NUMBER(10,2)", ans: "CREATE TABLE ORDERS (ORDER_ID NUMBER, CUSTOMER_ID NUMBER, ORDER_DATE DATE, TOTAL_AMOUNT NUMBER); ALTER TABLE ORDERS ADD (STATUS VARCHAR2(20)); ALTER TABLE ORDERS DROP COLUMN TOTAL_AMOUNT; ALTER TABLE ORDERS ADD (TOTAL_AMOUNT NUMBER(10,2));" },
    { q: "Create EMP_TEMP for Sal > 2000, rename, truncate, and drop", ans: "CREATE TABLE EMP_TEMP AS SELECT * FROM EMP WHERE SAL > 2000; RENAME EMP_TEMP TO EMP_HIGH_SALARY; TRUNCATE TABLE EMP_HIGH_SALARY; DROP TABLE EMP_HIGH_SALARY;" },
    { q: "Create STUDENT_RECORD, add GRADE, modify MARKS, rename COURSE", ans: "CREATE TABLE STUDENT_RECORD (SID NUMBER, SNAME VARCHAR2(40), COURSE VARCHAR2(30), MARKS NUMBER); ALTER TABLE STUDENT_RECORD ADD (GRADE CHAR(1)); ALTER TABLE STUDENT_RECORD MODIFY (MARKS NUMBER(5,2)); ALTER TABLE STUDENT_RECORD RENAME COLUMN COURSE TO COURSE_NAME;" },
    { q: "Create EMP_ARCHIVE (structure only), add ARCHIVE_DATE, rename to EMP_HISTORY", ans: "CREATE TABLE EMP_ARCHIVE AS SELECT * FROM EMP WHERE 1=0; ALTER TABLE EMP_ARCHIVE ADD (ARCHIVE_DATE DATE); RENAME EMP_ARCHIVE TO EMP_HISTORY;" },
    { q: "Create DEPT_BACKUP from DEPT, drop LOC, add LOCATION", ans: "CREATE TABLE DEPT_BACKUP AS SELECT * FROM DEPT; ALTER TABLE DEPT_BACKUP DROP COLUMN LOC; ALTER TABLE DEPT_BACKUP ADD (LOCATION VARCHAR2(40));" },
    { q: "Create SALES_DATA, add REGION, modify AMOUNT, rename table", ans: "CREATE TABLE SALES_DATA (SALE_ID NUMBER, PRODUCT_ID NUMBER, SALE_DATE DATE, AMOUNT NUMBER); ALTER TABLE SALES_DATA ADD (REGION VARCHAR2(30)); ALTER TABLE SALES_DATA MODIFY (AMOUNT NUMBER(12,2)); RENAME SALES_DATA TO REGIONAL_SALES_DATA;" },
    { q: "Create LOG_TABLE, truncate, rename to SYSTEM_LOG, and drop", ans: "CREATE TABLE LOG_TABLE (LOG_ID NUMBER, USER_NAME VARCHAR2(30), ACTION VARCHAR2(50), LOG_DATE DATE); TRUNCATE TABLE LOG_TABLE; RENAME LOG_TABLE TO SYSTEM_LOG; DROP TABLE SYSTEM_LOG;" }
];


const container = document.getElementById('question-list');

// Generate cards
dbmsQuestions.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'program-card';
    card.innerHTML = `
        <div class="question-header">
            <div>
                <p><span class="q-number">Q${index + 1}.</span> ${item.q}</p>
                <p><span class="q-number">Ans></span> <code>${item.ans}</code></p>
            </div>
            <button class="toggle-btn">Show Output</button>
        </div>
        <div class="expand-content">
            <div class="code-editor">
                <div class="editor-header">
                    <div class="dots"><span class="r"></span><span class="y"></span><span class="g"></span>OUTPUT</div>
                    <span class="file-name">mohan${index + 1}.sql</span>
                </div>
                <img class="output-img" src="img/output${index + 1}.png" alt="SQL Output for Q${index + 1}">
            </div>
        </div>
    `;
    container.appendChild(card);
});

// Logic for Show/Hide buttons
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-btn')) {
        const card = e.target.closest('.program-card');
        card.classList.toggle('active');
        e.target.textContent = card.classList.contains('active') ? 'Hide Output' : 'Show Output';
    }
});