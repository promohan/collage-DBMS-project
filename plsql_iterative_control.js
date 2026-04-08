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
 * PL/SQL Iterative Structures Master Repository
 * Part of Mohan's DBMS Portfolio 2026
 */

const plsqlLoopData = [
    { 
        q: "1. Write a PL/SQL block to print numbers from 1 to 5 using SIMPLE LOOP.", 
        ans: "DECLARE\n  i NUMBER := 1;\nBEGIN\n  LOOP\n    DBMS_OUTPUT.PUT_LINE(i);\n    EXIT WHEN i = 5;\n    i := i + 1;\n  END LOOP;\nEND;" 
    },
    { 
        q: "2. Write a PL/SQL block to display numbers from 10 to 1 in reverse order.", 
        ans: "DECLARE\n  i NUMBER := 10;\nBEGIN\n  LOOP\n    DBMS_OUTPUT.PUT_LINE(i);\n    i := i - 1;\n    EXIT WHEN i < 1;\n  END LOOP;\nEND;" 
    },
    { 
        q: "3. Write a PL/SQL block to calculate the sum of numbers from 1 to 10.", 
        ans: "DECLARE\n  i NUMBER := 1;\n  v_sum NUMBER := 0;\nBEGIN\n  LOOP\n    v_sum := v_sum + i;\n    i := i + 1;\n    EXIT WHEN i > 10;\n  END LOOP;\n  DBMS_OUTPUT.PUT_LINE('Total Sum: ' || v_sum);\nEND;" 
    },
    { 
        q: "4. Write a PL/SQL block to print multiplication table of a number.", 
        ans: "DECLARE\n  n NUMBER := 5;\n  i NUMBER := 1;\nBEGIN\n  LOOP\n    DBMS_OUTPUT.PUT_LINE(n || ' x ' || i || ' = ' || (n*i));\n    i := i + 1;\n    EXIT WHEN i > 10;\n  END LOOP;\nEND;" 
    },
    { 
        q: "5. Write a PL/SQL block to print even numbers between 1 and 20.", 
        ans: "DECLARE\n  i NUMBER := 2;\nBEGIN\n  LOOP\n    DBMS_OUTPUT.PUT_LINE(i);\n    i := i + 2;\n    EXIT WHEN i > 20;\n  END LOOP;\nEND;" 
    },
    { 
        q: "6. Write a PL/SQL block that exits when a number becomes > 50.", 
        ans: "DECLARE\n  n NUMBER := 10;\nBEGIN\n  LOOP\n    n := n + 15;\n    DBMS_OUTPUT.PUT_LINE('Value: ' || n);\n    EXIT WHEN n > 50;\n  END LOOP;\nEND;" 
    },
    { 
        q: "7. Write a PL/SQL block to print numbers from 1 to 10 using WHILE LOOP.", 
        ans: "DECLARE\n  i NUMBER := 1;\nBEGIN\n  WHILE i <= 10 LOOP\n    DBMS_OUTPUT.PUT_LINE(i);\n    i := i + 1;\n  END LOOP;\nEND;" 
    },
    { 
        q: "8. Write a PL/SQL block to calculate factorial using WHILE LOOP.", 
        ans: "DECLARE\n  n NUMBER := 5; f NUMBER := 1;\nBEGIN\n  WHILE n > 0 LOOP\n    f := f * n;\n    n := n - 1;\n  END LOOP;\n  DBMS_OUTPUT.PUT_LINE('Factorial: ' || f);\nEND;" 
    },
    { 
        q: "9. Write a PL/SQL block to display sum of digits using WHILE LOOP.", 
        ans: "DECLARE\n  n NUMBER := 123; s NUMBER := 0;\nBEGIN\n  WHILE n > 0 LOOP\n    s := s + MOD(n, 10);\n    n := TRUNC(n / 10);\n  END LOOP;\n  DBMS_OUTPUT.PUT_LINE('Sum of digits: ' || s);\nEND;" 
    },
    { 
        q: "10. Write a PL/SQL block to reverse a number using WHILE LOOP.", 
        ans: "DECLARE\n  n NUMBER := 456; r NUMBER := 0;\nBEGIN\n  WHILE n > 0 LOOP\n    r := (r * 10) + MOD(n, 10);\n    n := TRUNC(n / 10);\n  END LOOP;\n  DBMS_OUTPUT.PUT_LINE('Reversed: ' || r);\nEND;" 
    },
    { 
        q: "11. Write a PL/SQL block to check for palindrome using WHILE LOOP.", 
        ans: "DECLARE\n  n NUMBER := 121; temp NUMBER; r NUMBER := 0;\nBEGIN\n  temp := n;\n  WHILE temp > 0 LOOP\n    r := (r * 10) + MOD(temp, 10);\n    temp := TRUNC(temp / 10);\n  END LOOP;\n  IF n = r THEN DBMS_OUTPUT.PUT_LINE('Palindrome');\n  ELSE DBMS_OUTPUT.PUT_LINE('Not Palindrome'); END IF;\nEND;" 
    },
    { 
        q: "12. Write a PL/SQL block to print Fibonacci series using WHILE LOOP.", 
        ans: "DECLARE\n  a NUMBER := 0; b NUMBER := 1; c NUMBER; n NUMBER := 5; i NUMBER := 1;\nBEGIN\n  WHILE i <= n LOOP\n    DBMS_OUTPUT.PUT_LINE(a);\n    c := a + b; a := b; b := c; i := i + 1;\n  END LOOP;\nEND;" 
    },
    { 
        q: "13. Write a PL/SQL block to print 1 to 10 using FOR LOOP.", 
        ans: "BEGIN\n  FOR i IN 1..10 LOOP\n    DBMS_OUTPUT.PUT_LINE(i);\n  END LOOP;\nEND;" 
    },
    { 
        q: "14. Write a PL/SQL block to print reverse order using FOR LOOP.", 
        ans: "BEGIN\n  FOR i IN REVERSE 1..10 LOOP\n    DBMS_OUTPUT.PUT_LINE(i);\n  END LOOP;\nEND;" 
    },
    { 
        q: "15. Write a PL/SQL block to calculate sum of first 10 natural numbers.", 
        ans: "DECLARE\n  s NUMBER := 0;\nBEGIN\n  FOR i IN 1..10 LOOP\n    s := s + i;\n  END LOOP;\n  DBMS_OUTPUT.PUT_LINE('Sum: ' || s);\nEND;" 
    },
    { 
        q: "16. Write a PL/SQL block to display table of 5 using FOR LOOP.", 
        ans: "BEGIN\n  FOR i IN 1..10 LOOP\n    DBMS_OUTPUT.PUT_LINE('5 x ' || i || ' = ' || (5*i));\n  END LOOP;\nEND;" 
    },
    { 
        q: "17. Write a PL/SQL block to print squares of numbers 1 to 10.", 
        ans: "BEGIN\n  FOR i IN 1..10 LOOP\n    DBMS_OUTPUT.PUT_LINE(i || ' sq = ' || (i*i));\n  END LOOP;\nEND;" 
    },
    { 
        q: "18. Write a PL/SQL block to display odd numbers between 1 and 50.", 
        ans: "BEGIN\n  FOR i IN 1..50 LOOP\n    IF MOD(i, 2) != 0 THEN\n      DBMS_OUTPUT.PUT_LINE(i);\n    END IF;\n  END LOOP;\nEND;" 
    },
    { 
        q: "19. Write a PL/SQL block to print a star pattern using nested loops.", 
        ans: "BEGIN\n  FOR i IN 1..4 LOOP\n    FOR j IN 1..i LOOP\n      DBMS_OUTPUT.PUT('*');\n    END LOOP;\n    DBMS_OUTPUT.NEW_LINE;\n  END LOOP;\nEND;" 
    },
    { 
        q: "20. Write a PL/SQL block to print tables from 1 to 5.", 
        ans: "BEGIN\n  FOR i IN 1..5 LOOP\n    DBMS_OUTPUT.PUT_LINE('Table of ' || i);\n    FOR j IN 1..10 LOOP\n      DBMS_OUTPUT.PUT_LINE(i || 'x' || j || '=' || (i*j));\n    END LOOP;\n  END LOOP;\nEND;" 
    },
    { 
        q: "21. Write a PL/SQL block to display a number pattern (1, 12, 123).", 
        ans: "BEGIN\n  FOR i IN 1..4 LOOP\n    FOR j IN 1..i LOOP\n      DBMS_OUTPUT.PUT(j);\n    END LOOP;\n    DBMS_OUTPUT.NEW_LINE;\n  END LOOP;\nEND;" 
    },
    { 
        q: "22. Write a PL/SQL block to print 1 to 20 skip multiples of 4.", 
        ans: "BEGIN\n  FOR i IN 1..20 LOOP\n    CONTINUE WHEN MOD(i, 4) = 0;\n    DBMS_OUTPUT.PUT_LINE(i);\n  END LOOP;\nEND;" 
    },
    { 
        q: "23. Write a PL/SQL block to stop when sum exceeds 100.", 
        ans: "DECLARE\n  s NUMBER := 0;\nBEGIN\n  FOR i IN 1..100 LOOP\n    s := s + i;\n    EXIT WHEN s > 100;\n    DBMS_OUTPUT.PUT_LINE('Added ' || i || ' Sum: ' || s);\n  END LOOP;\nEND;" 
    },
    { 
        q: "24. Write a PL/SQL block to exit when number divisible by 7 is found.", 
        ans: "BEGIN\n  FOR i IN 1..20 LOOP\n    DBMS_OUTPUT.PUT_LINE(i);\n    EXIT WHEN MOD(i, 7) = 0;\n  END LOOP;\nEND;" 
    },
    { 
        q: "25. Write a PL/SQL block to loop through employee IDs from EMP table.", 
        ans: "BEGIN\n  FOR r IN (SELECT EMPNO FROM EMP) LOOP\n    DBMS_OUTPUT.PUT_LINE('ID: ' || r.EMPNO);\n  END LOOP;\nEND;" 
    },
    { 
        q: "26. Write a PL/SQL block to increase salary by 10% using loop.", 
        ans: "BEGIN\n  FOR r IN (SELECT EMPNO FROM EMP) LOOP\n    UPDATE EMP SET SAL = SAL * 1.10 WHERE EMPNO = r.EMPNO;\n  END LOOP;\n  COMMIT;\nEND;" 
    },
    { 
        q: "27. Write a PL/SQL block to display employees with SAL > 3000.", 
        ans: "BEGIN\n  FOR r IN (SELECT ENAME, SAL FROM EMP) LOOP\n    IF r.SAL > 3000 THEN\n      DBMS_OUTPUT.PUT_LINE(r.ENAME || ' has high sal');\n    END IF;\n  END LOOP;\nEND;" 
    },
    { 
        q: "28. Write a PL/SQL block to count total employees using loop.", 
        ans: "DECLARE\n  c NUMBER := 0;\nBEGIN\n  FOR r IN (SELECT * FROM EMP) LOOP\n    c := c + 1;\n  END LOOP;\n  DBMS_OUTPUT.PUT_LINE('Total: ' || c);\nEND;" 
    },
    { 
        q: "29. Write a PL/SQL block using all three loop types.", 
        ans: "BEGIN\n  -- FOR loop\n  FOR i IN 1..1 LOOP DBMS_OUTPUT.PUT_LINE('FOR'); END LOOP;\n  -- WHILE loop\n  WHILE 1=0 LOOP NULL; END LOOP;\n  -- SIMPLE loop\n  LOOP EXIT; END LOOP;\nEND;" 
    },
    { 
        q: "30. Write a PL/SQL block to generate prime numbers between 1 and 50.", 
        ans: "DECLARE\n  j NUMBER; flag NUMBER;\nBEGIN\n  FOR i IN 2..50 LOOP\n    flag := 1; j := 2;\n    FOR j IN 2..TRUNC(i/2) LOOP\n      IF MOD(i, j) = 0 THEN flag := 0; EXIT; END IF;\n    END LOOP;\n    IF flag = 1 THEN DBMS_OUTPUT.PUT_LINE(i); END IF;\n  END LOOP;\nEND;" 
    },
    { 
        q: "31. Write a PL/SQL block to simulate ATM withdrawal attempts (3 attempts).", 
        ans: "DECLARE\n  pin NUMBER := 1234; input_pin NUMBER := 0; tries NUMBER := 1;\nBEGIN\n  LOOP\n    -- Mock input check\n    IF input_pin = pin THEN EXIT;\n    ELSIF tries = 3 THEN DBMS_OUTPUT.PUT_LINE('Blocked'); EXIT;\n    END IF;\n    tries := tries + 1;\n  END LOOP;\nEND;" 
    },
    { 
        q: "32. Write a PL/SQL block to calculate sum of even and odd separately.", 
        ans: "DECLARE\n  se NUMBER := 0; so NUMBER := 0;\nBEGIN\n  FOR i IN 1..10 LOOP\n    IF MOD(i, 2) = 0 THEN se := se + i; ELSE so := so + i; END IF;\n  END LOOP;\n  DBMS_OUTPUT.PUT_LINE('Even sum: ' || se || ' Odd sum: ' || so);\nEND;" 
    }
];

const container = document.getElementById('question-list');

function renderLoops() {
    if(!container) return;
    container.innerHTML = "";
    
    plsqlLoopData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'program-card';
        card.innerHTML = `
            <div class="question-header">
                <div>
                    <p><span class="q-number"> ${item.q}</span></p>
                    <div class="ans-box">
                        <pre><code>${item.ans}</code></pre>
                    </div>
                </div>
                <button class="toggle-btn">Check Logic</button>
            </div>
            <div class="expand-content">
                <div class="code-editor">
                    <div class="editor-header">
                        <div class="dots"><span class="r"></span><span class="y"></span><span class="g"></span>LOOP_TERMINAL</div>
                    </div>
                    <div class="output-placeholder">
                        <p>-- Initializing Iteration --</p>
                        <img class="output-img" src="img/loop_out_${index + 1}.png" alt="Loop Output" onerror="this.style.display='none'">
                        <p class="success-msg">>> Result generated in DBMS_OUTPUT.</p>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Event delegation for the toggle button
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-btn')) {
        const card = e.target.closest('.program-card');
        const isActive = card.classList.toggle('active');
        e.target.textContent = isActive ? 'Close Terminal' : 'Check Logic';
    }
});

renderLoops();