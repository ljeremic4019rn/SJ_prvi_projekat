function init() {

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            username: document.getElementById('name').value,
            password: document.getElementById('password').value
        };
        
        fetch('http://127.0.0.1:9000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg, 'ovo je error msg');
                } else {
                    document.cookie = `token=${el.token};SameSite=Lax`;
                    //  console.log('cookie',document.cookie);
                    // console.log('cookie',el.token);
                    window.location.href = 'index.html';
                }
            });
    });
}