function init() {

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: "ime",
            lastname: "pregfhjzime",
            birthday: "03/25/2015",
            email: "bb@gmail.com",
            username: "bb",
            password: "bb",
            admin: true,
            moderator: false,
            student: false,
            facultyId: 2
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