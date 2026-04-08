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



const dqlQuestions = [
    { q: "Display all columns of the EMP table.", ans: "SELECT * FROM EMP;" },
    { q: "Display EMPNO, ENAME, and SAL of all employees.", ans: "SELECT EMPNO, ENAME, SAL FROM EMP;" },
    { q: "Display unique job titles from the EMP table.", ans: "SELECT DISTINCT JOB FROM EMP;" },
    { q: "Display employee names along with their department numbers.", ans: "SELECT ENAME, DEPTNO FROM EMP;" },
    { q: "Display all department details from the DEPT table.", ans: "SELECT * FROM DEPT;" },
    { q: "Display distinct department numbers from the EMP table.", ans: "SELECT DISTINCT DEPTNO FROM EMP;" },
    { q: "Display employee name and annual salary (SAL × 12).", ans: "SELECT ENAME, SAL * 12 AS ANNUAL_SALARY FROM EMP;" },
    { q: "Display employee name, salary, and commission.", ans: "SELECT ENAME, SAL, COMM FROM EMP;" },
    { q: "Display job and salary of all employees.", ans: "SELECT JOB, SAL FROM EMP;" },
    { q: "Display employees along with their manager numbers.", ans: "SELECT ENAME, MGR FROM EMP;" }
];

const container = document.getElementById('question-list');

function renderDQL() {
    if(!container) return;
    container.innerHTML = ""; 

    dqlQuestions.forEach((item, index) => {
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
                    <img class="output-img" src="img/dql_output${index + 1}.png" alt="Query Result">
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

renderDQL();

// Toggle Logic
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-btn')) {
        const card = e.target.closest('.program-card');
        card.classList.toggle('active');
        e.target.textContent = card.classList.contains('active') ? 'Hide Output' : 'Show Output';
    }
});