let openManual = () =>{
    location.href='manual.html';
}

let openMenu = () => {
    location.href='index.html';
}

let openEdit = () => {
    location.href='editGrades.html';
}


//Functions for manual

let getFileLocation = () =>{
    eel.fileLocation()((f)=>{
        let ansTxt = document.getElementById('ansTxt');
        ansTxt.style.display = "none";
        let answerPannel = document.getElementById('answer');
        let answer = document.createElement("p");
        answer.id = 'rAns';    
        answer.className = 'container code';    
    
        answerPannel.appendChild(document.createElement('br'));
        answerPannel.appendChild(answer);
        let txtAns = document.getElementById('rAns');

        txtAns.innerHTML = f;  
        
    });
}

let getMarkingGuide = () =>{

    eel.readMarkingScheme()((data)=>{
        let markingGuide = document.getElementById('marking');
        let markingText = document.getElementById('markTxt');
        markingText.style.display = "none";
        let markMe = document.createElement("form");//Form
        markMe.className = "text-center border border-light p-5";
        markMe.id = 'markMe';
        markMe.action = "#";

        let formHeading = document.createElement("p");
        formHeading.className = "h4 mb-4";
        formHeading.innerHTML = "Marking Scheme";
        markMe.appendChild(formHeading);        

        //Add component here
        let formElements = (item, index) =>{
            let  markElement = document.createElement("input");
            markElement.type = "text";
            markElement.id = "ms"+index;
            markElement.className = "form-control mb-4";
            markElement.placeholder = item;
            markMe.appendChild(markElement);
        }

        data.forEach(formElements);
        //read elements          

        let markSubmit = document.createElement("button");
        markSubmit.type = "button";
        markSubmit.className = "btn btn-info btn-block";
        markSubmit.innerHTML = "Submit Marks";
        //markSubmit.onclick = getFormValues();

        markSubmit.addEventListener ("click", function() {
            getFormValues();
        });

        markMe.appendChild(markSubmit);       
        markingGuide.appendChild(markMe);

        // let edtMarkMe = document.getElementById('markMe');
        // edtMarkMe.innerHTML = data;

    });
}

let getFormValues = () =>{
    let formVals = document.getElementById('markMe');
    let marks = [];

    for(let i =0; i<(formVals.length -1);i++){
        marks.push(formVals.elements[i].value);
    }  
    eel.writeMarkingScheme(marks)(()=>{
        alert(marks)
    });
}

//Functions for edit grades
let zipPath;
let zipFiles;

let showAnswer = (codes) =>{    
    let answerPannel = document.getElementById('answer');
    let answer = document.createElement("p");
    answer.id = 'rAns';    
    answer.className = 'container code';
    answerPannel.appendChild(document.createElement('br'));
    answerPannel.appendChild(answer);
    let txtAns = document.getElementById('rAns');

    txtAns.innerHTML = codes;

}

let createMarkingGuide = (data, values) =>{
    let markingGuide = document.getElementById('marking');
    markingGuide.innerHTML = '';
        
    let markMe = document.createElement("form");//Form
    markMe.className = "text-center border border-light p-5";
    markMe.id = 'markMe';
    markMe.action = "#";

    let formHeading = document.createElement("p");
    formHeading.className = "h4 mb-4";
    formHeading.innerHTML = "Marking Scheme";
    markMe.appendChild(formHeading);        

    //Add component here
    let formElements = (item, index) =>{
        let  markElement = document.createElement("input");
        markElement.type = "text";
        markElement.id = "ms"+index;
        markElement.className = "form-control mb-4";
        markElement.placeholder = item;
        markElement.value = values[index];
        //alert(values[index]);
        markMe.appendChild(markElement);
        
    }

    data.forEach(formElements);
    //read elements          

    let markSubmit = document.createElement("button");
    markSubmit.type = "button";
    markSubmit.className = "btn btn-info btn-block";
    markSubmit.innerHTML = "Submit Marks";
    //markSubmit.onclick = getFormValues();

    markSubmit.addEventListener ("click", function() {
        //getFormValues();
    });

    markMe.appendChild(markSubmit);       
    markingGuide.appendChild(markMe);
}

let updatePath = (path,uvalue) =>{
    path = path.split('/');
    path.pop();
    path.push(uvalue);
    let newPath ="";

    path.forEach(element => newPath = newPath.concat(element).concat('/'));

    newPath = newPath.slice(0, -1)
    return newPath;
}


let edtOpenAnswers = () =>{
    eel.openAnswers()((path)=>{
        zipPath = path[0];
        zipFiles = path.slice(1,path.length);
        let ansNav = document.getElementById("answerNav");
        ansNav.style.display = "block";
        
        let fileName = document.getElementById("fileName");
        let currentPosition = document.getElementById("currentName");
        
       
        zipFiles = zipFiles.toString().split(',');

        fileName.innerHTML = zipFiles[0];
        currentPosition.innerHTML = "0";

        eel.readFromZip(zipPath,zipFiles[0])((data)=>{
            showAnswer(data);

        })

        
        eel.readAllcsv(updatePath(zipPath.toString(),"marking-scheme.csv"),0)((data)=>{
            //alert(data[0]);
            createMarkingGuide(data[0],data[1][1]);

        });

        
        // alert(zipPath);
        // alert(zipFiles);
    })
}

//Go to next answer
let nextAns = () =>{
    cp = document.getElementById("currentName").textContent; //Current Possition   
    if(cp < zipFiles.length){
        eel.readFromZip(zipPath,zipFiles[parseInt(cp)+1])((data)=>{
            document.getElementById("fileName").innerHTML = zipFiles[parseInt(cp)+1]
            document.getElementById("currentName").innerHTML = parseInt(cp)+1;
            showAnswer(data);
            eel.readAllcsv(updatePath(zipPath.toString(),"marking-scheme.csv"),0)((data)=>{
               // alert(data[0]);
                createMarkingGuide(data[0],data[1][parseInt(cp)+1+1]);
    
            });

        })
    }
}
//Go to previous answer
let previousAns = () =>{
    cp = document.getElementById("currentName").textContent; //Current Possition   
    if(cp >0){
        eel.readFromZip(zipPath,zipFiles[parseInt(cp)-1])((data)=>{
            document.getElementById("fileName").innerHTML = zipFiles[parseInt(cp)-1]
            document.getElementById("currentName").innerHTML = parseInt(cp)-1;
            showAnswer(data);
            eel.readAllcsv(updatePath(zipPath.toString(),"marking-scheme.csv"),0)((data)=>{
                //alert(data[0]);
                createMarkingGuide(data[0],data[1][parseInt(cp)+1-1]);
    
            });
        })
    }

}

