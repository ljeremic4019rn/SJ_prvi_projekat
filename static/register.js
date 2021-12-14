function init() {

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: document.getElementById('first_name').value,
            lastname: document.getElementById('last_name').value,
            birthday: document.getElementById('birth_date').value,
            email: document.getElementById('email').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            admin: document.getElementById('admin').value,
            moderator: document.getElementById('moderator').value,
            student: document.getElementById('student').value,
            facultyId:  document.getElementById('facultyid').value

        };

        fetch('http://127.0.0.1:9000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                document.cookie = `token=${el.token};SameSite=Lax`;
                // console.log('cookie',el.token);
                window.location.href = 'index.html';
            });
    });
}