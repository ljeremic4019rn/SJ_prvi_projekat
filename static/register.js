function init() {

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: "ime",
            lastname: "pregfhjzime",
            birthday: "03/25/2015",
            email: "imeunika@gmail.com",
            username: "uni2",
            password: "uni2",
            admin: true,
            moderator: false,
            student: false,
            facultyId: 2
        };
        console.log("pre fetch");

        fetch('http://127.0.0.1:9000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json(),console.log("zavirsili smo fetch") )
            .then( el => {
                document.cookie = `token=${el.token};SameSite=Lax`;
                window.location.href = 'index.html';
            });
    });
}