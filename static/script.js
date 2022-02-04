let elementType
let globalAdd = null
const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];


function getAllBooks() {
    fetch('http://127.0.0.1:8500/admin/book/all',{
        headers: {
            'authorization': `Bearer ${token}`
        },
        method: 'GET'
    })
        .then( res => res.json() )
        .then( data => displayFields(data, 'book'))

        elementType = "book"
        globalAdd = "addBook"
        const view = document.getElementById("formView")
        clearFields(view)
}

function getAllUsers() {
    fetch('http://127.0.0.1:8500/admin/user/all',{
        headers: {
            'authorization': `Bearer ${token}`
        },
        method: 'GET'
    })
        .then( res => res.json() )
        .then( data => displayFields(data, 'user'))

        elementType = "user"
        globalAdd = "addUser"
        const view = document.getElementById("formView")
        clearFields(view)
}

function getAllFaculties() {
    fetch('http://127.0.0.1:8500/admin/faculty/all',{
        headers: {
            'authorization': `Bearer ${token}`
        },
        method: 'GET'
    })
    .then( res => res.json() )
    .then( data => displayFields(data, 'faculty'))

    elementType = "faculty"
    globalAdd = "addFaculty"
    const view = document.getElementById("formView")
    clearFields(view)
}

function getAllLibraries() {
    fetch('http://127.0.0.1:8500/admin/library/all',{
        headers: {
            'authorization': `Bearer ${token}`
        },
        method: 'GET'
    })
    .then( res => res.json() )
    .then( data => displayFields(data, 'library'))

    elementType = "library"
    globalAdd = "addLibrary"
    const view = document.getElementById("formView")
    clearFields(view)
}

function formDelete(){
    const form = document.getElementById('actualView')
    const data = new FormData(form)
    let id = 0
    for (let [key, value] of data.entries()){// logging the form
        if (key == 'id'){
            id = value
        }
    }

    fetch('http://127.0.0.1:8500/admin/' + elementType + '/'+ id,{
        headers: {
            'authorization': `Bearer ${token}`
        },
        method: 'DELETE',
    })
    .then( res => res.json() )
    .then(result => {
        console.log('Success:', updateList(elementType)); //todo promeni da ne bude book
      })
      .catch(error => {
        console.error('Error:', error);
      });
}

function findOneForm(){
    const id = document.getElementById('searchBar').value//!ovde moda da bude int
    //todo proveri da li je int

    fetch('http://127.0.0.1:8500/admin/' + elementType + '/'+ id,{
        headers: {
            'authorization': `Bearer ${token}`
        },
        method: 'GET',
    })
    .then( res => res.json() )
    .then(result => {
        console.log("success: ") //todo promeni da ne bude book
        updateListForOne(result ,elementType)
        
      })
      .catch(error => {
        console.error('Error:', error);
      });
}

function formUpdate(){//TODO popravi kasnije
    const form = document.getElementById('actualView')
    const data = new FormData(form)

    let obj = {}
    for (let [key, value] of data.entries()){
        obj[key] = value
    }

    const stringifiedData = JSON.stringify(obj)//mora u const da se stavi inace ne radi

    fetch('http://127.0.0.1:8500/admin/' + elementType + '/'+ obj.id,{
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json' ,
            'authorization': `Bearer ${token}`
        },
        body: stringifiedData
    })
    .then( res => res.json() )
    // .then(result => {
    //     console.log('Success:', result);
    //     updateList(elementType)
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //   });
    .then( el => {
        if (el.msg) {
            alert(el.msg, 'ovo je error msg');
        } else {
            updateList(elementType)
            
        }
    });
}

function formAdd(elem,formName){
    const form = document.getElementById(formName)
    const data = new FormData(form)

    console.log(elem);
    console.log(formName);

    let obj = {}
    for (let [key, value] of data.entries()){
        obj[key] = value
         console.log("kay",key);
         console.log("val",value);
    }

    if (elem == 'user'){
        globalAdd = "addUser"
    }
    else if(elem == 'book'){
        globalAdd = "addBook"
    }
    else if(elem == 'library'){
        globalAdd = "addLibrary"
    }
    else if(elem == 'faculty'){
        globalAdd = "addFaculty"
    }


    const stringifiedData = JSON.stringify(obj)//mora u const da se stavi inace ne radi

    fetch('http://127.0.0.1:8500/admin/' + elem,{
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' ,
            'authorization': `Bearer ${token}`
        },
        body: stringifiedData
    })
    // .then( res => res.json() )
    // .then(result => {
    //     console.log('Success:', result);
    //     updateList(elementType)
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //   });

    .then( res => res.json() )
    .then( el => {
        if (el.msg) {
            alert(el.msg, 'ovo je error msg');
        } else {
            updateList(elementType)
            showAddFields(1)
        }
    });
}



function updateListForOne(element, checker){
    const lst = document.getElementById('elementList');
    lst.innerHTML = "";//praznimo listu pre ponovnog loadovanja
    let index = 1
    // console.log('data = ', element)

    let parameters; //parametri iz elementa
    if (checker == 'book'){
        parameters = `Id: ${element.id}: Name: ${element.name} Writer:${element.writer} Genre: ${element.genre} Publisher: ${element.publisher} `
    }
    else if (checker == 'user'){            
        parameters = `Id: ${element.id}: Cred: [${element.name} ${element.lastname}] Username: ${element.username}`
    }
    else if (checker == 'faculty'){
        parameters = `Id: ${element.id}: Name: ${element.name} Dean: ${element.dean} Street: ${element.street} `
    }
    else if (checker == 'library'){
        parameters = `Id: ${element.id}: Librarian: ${element.librarian} Opens at: ${element.opentime} Floor: ${element.floor} Currently open: ${element.working}   `
    }

    const li = document.getElementById("row").cloneNode(true);
    li.id = index
    li.hidden = false
    li.innerHTML = parameters

    lst.append(li)
    index += 1
    
}

function displayFields(data, checker){
    console.log(data)
    const lst = document.getElementById('elementList');
    lst.innerHTML = "";//praznimo listu pre ponovnog loadovanja
    let index = 1;
    data.forEach(element => {//el = json obj (1 book)

        let parameters; //parametri iz elementa
        if (checker == 'book'){
            parameters = `Id: ${element.id}: Name: ${element.name} Writer:${element.writer} Genre: ${element.genre} Publisher: ${element.publisher} `
        }
        else if (checker == 'user'){            
            parameters = `Id: ${element.id}: Credentials:  -${element.name} ${element.lastname}- Username: ${element.username}`
        }
        else if (checker == 'faculty'){
            parameters = `Id: ${element.id}: Name: ${element.name} Dean: ${element.dean} Street: ${element.street} `
        }
        else if (checker == 'library'){
            parameters = `Id: ${element.id}: Librarian: ${element.librarian} Opens at: ${element.opentime} Floor: ${element.floor} Currently open: ${element.working}   `
        }


        const li = document.getElementById("row").cloneNode(true);
        li.id = index
        li.hidden = false
        li.innerHTML = parameters

        li.onclick = event => {

            const view = document.getElementById("formView")
            clearFields(view)

            view.hidden = false//jer su helper elementi id onda ih kopiramo i kazemo da vise nisu hidden

            const viewForm = document.getElementById("bookRowForm").cloneNode(true)
            viewForm.id = 'actualView'
            viewForm.action = `/book/${element.id}`//ovo je za put metodu
            viewForm.hidden = false

            const submit = viewForm.lastElementChild//zasto je ovo potretno ne znam, saznaj
            viewForm.removeChild(submit)

            for (let [key, value] of Object.entries(element)){//upisujemo polja iz baze
                const row = document.getElementById('even').cloneNode(true)
                row.id = `row ${index}`
                const name = row.children[0]
                const inputWrapper = row.children[1]
                // const name = document.createElement('span')//ime levo od input polja
                name.innerHTML = `${key}: `//stavimo text u name polja
                name.id = `name ${index}`
                inputWrapper.id = `wrapper ${index}`
                const inputValue = document.createElement('input')//input polje
                inputValue.name = key
                inputValue.value = value
                inputWrapper.appendChild(inputValue)
                viewForm.appendChild(row)
                // viewForm.appendChild(document.createElement('br'))
            }
            // viewForm.childNodes[1].value = element.name //get element by id (key is )
            viewForm.appendChild(submit)
            view.appendChild(viewForm)

        }
        lst.append(li)
        index += 1
    }); 
}

function clearFields(view){
                while(view.lastElementChild){//ocistimo polja od prethodnog elementa
                view.removeChild(view.lastElementChild)
            }
}

function showAddFields(int){
    if (globalAdd == null){
        alert("Please select a database element");
    }
    else if (int == 1){
        console.log("herf ",window.location.href)
        window.location.href = globalAdd + '.html'
    }
    else{
        console.log("herf ",window.location.href)
        window.location.href = 'addGui/'+ globalAdd + '.html'
    }
}

function updateList(checker){
    if (checker == 'book'){
        getAllBooks()
    }
    else if (checker == 'user'){    
        getAllUsers()        
    }
    else if (checker == 'faculty'){
        getAllFaculties()
    }
    else if (checker == 'library'){
         getAllLibraries() 
    }
}


