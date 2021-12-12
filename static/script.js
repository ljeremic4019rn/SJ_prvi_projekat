let elementType

function getAllBooks() {
    fetch('http://127.0.0.1:8000/admin/book/all',{
        method: 'GET'
    })
        .then( res => res.json() )
        .then( data => displayFields(data, 'book'))
        elementType = "book"
}

function getAllUsers() {
    fetch('http://127.0.0.1:8000/admin/user/all',{
        method: 'GET'
    })
    .then( res => res.json() )
    .then( data => displayFields(data, 'user'))
    elementType = "user"
}

function getAllFaculties() {
    fetch('http://127.0.0.1:8000/admin/faculty/all',{
        method: 'GET'
    })
    .then( res => res.json() )
    .then( data => displayFields(data, 'faculty'))
    elementType = "faculty"
}

function getAllLibraries() {
    fetch('http://127.0.0.1:8000/admin/library/all',{
        method: 'GET'
    })
    .then( res => res.json() )
    .then( data => displayFields(data, 'library'))
    elementType = "library"
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

    fetch('http://127.0.0.1:8000/admin/' + elementType + '/'+ id,{
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

    fetch('http://127.0.0.1:8000/admin/' + elementType + '/'+ id,{
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
    let id = 0
    let counter = 0
    let counterFix = 0
    let tmp
    
    for (let [key, value] of data.entries()){//uzimamo id
        if (key == 'id'){
            id = value
        }
    }
    console.log("id je", id)

    for (let [key, value] of data.entries()){//brojim koliko polja ima u elementu
        counterFix ++;
    }
    console.log('counter',counterFix);
   
    tmp = "{"
    for (let [key, value] of data.entries()){//RETARDIRAN SAM tako da ne umem da uzmem da ta, pa sam manuelno napravio json objkat od stringa
        tmp += "\"" + key + "\":" + "\"" + value + "\"";
        if (counter != counterFix-1){
        tmp += ", "
        }
        counter ++
    }

    tmp += "}"
    const jsonData = JSON.parse(tmp);

    //console.log(jsonData)
    const stringifiedData = JSON.stringify(jsonData)//mora u const da se stavi inace ne radi
    //console.log(stringifiedData)

    fetch('http://127.0.0.1:8000/admin/' + elementType + '/'+ id,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: stringifiedData
    })
    .then( res => res.json() )
    .then(result => {
        console.log('Success:', result);
      })
      .catch(error => {
        console.error('Error:', error);
      });
}

function formAdd(){//todo 
    const form = document.getElementById('addView')
    const data = new FormData(form)
    let id = 0
    let counter = 0
    let counterFix = 0
    let tmp

    for (let [key, value] of data.entries()){//brojim koliko polja ima u elementu
        counterFix ++;
    }
    //console.log('counter',counterFix);
   
    tmp = "{"
    for (let [key, value] of data.entries()){//RETARDIRAN SAM tako da ne umem da uzmem da ta, pa sam manuelno napravio json objkat od stringa
        tmp += "\"" + key + "\":" + "\"" + value + "\"";
        if (counter != counterFix-1){
        tmp += ", "
        }
        counter ++
    }

    tmp += "}"
    const jsonData = JSON.parse(tmp);
    //console.log(jsonData)

    const stringifiedData = JSON.stringify(jsonData)

    fetch('http://127.0.0.1:8000/admin/' + elementType, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: stringifiedData
    })
        .then( res => res.json() )
        .then(result => {
            console.log('Success:', result);
          })
          .catch(error => {
            console.error('Error:', error);
          });
}

function updateListForOne(element, checker){
    const lst = document.getElementById('elementList');
    lst.innerHTML = "";//praznimo listu pre ponovnog loadovanja
    let index = 1
    console.log('data = ', element)

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
    const lst = document.getElementById('elementList');
    lst.innerHTML = "";//praznimo listu pre ponovnog loadovanja
    let index = 1
    data.forEach(element => {//el = json obj (1 book)

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

        li.onclick = event => {
            const view = document.getElementById("formView")
            const addView = document.getElementById("addView")
            const addBtn = document.getElementById("addbtn")


            while(view.lastElementChild){//ocistimo polja od prethodnog elementa
                view.removeChild(view.lastElementChild)
            }
            while(addView.lastElementChild){//ocistimo polja od prethodnog elementa
                addView.removeChild(addView.lastElementChild)
            }
            view.hidden = false//jer su helper elementi id onda ih kopiramo i kazemo da vise nisu hidden
            addBtn.hidden = false

            const viewForm = document.getElementById("bookRowForm").cloneNode(true)
            viewForm.id = 'actualView'
            viewForm.action = `/book/${element.id}`//ovo je za put metodu
            viewForm.hidden = false

            const submit = viewForm.lastElementChild//zasto je ovo potretno ne znam, saznaj
            viewForm.removeChild(submit)

            for (let [key, value] of Object.entries(element)){//upisujemo polja iz baze
                const name = document.createElement('span')//ime levo od input polja
                name.innerHTML = `${key}: `//stavimo text u name polja
                const tag = document.createElement('input')//input polje
                tag.name = key
                tag.value = value
                viewForm.appendChild(name)
                viewForm.appendChild(tag)
                viewForm.appendChild(document.createElement('br'))
            }
            // viewForm.childNodes[1].value = element.name //get element by id (key is )
            viewForm.appendChild(submit)
            view.appendChild(viewForm)

            //todo napravi tmp input filed i uradi clonenode na njemu tako da izgleda lepo ako ti se da
            for (let [key] of Object.entries(element)){//upisujemo polja iz baze 
                if (key != "id" && key != "createdAt" && key != "updatedAt"){
                    const name = document.createElement('span')//ime levo od input polja
                    name.innerHTML = `${key}: `//stavimo text u name polja
                    const tag = document.createElement('input')//input polje
                    tag.name = key
                    //tag.value = value
                    addView.appendChild(name)
                    addView.appendChild(tag)
                }
            }
            addView.appendChild(addBtn)
            
        }
        lst.append(li)
        index += 1
    }); 
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


