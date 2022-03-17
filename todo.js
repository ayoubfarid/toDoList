const dragArea = document.querySelector(".wrapper");
new Sortable(dragArea, {
  animation: 350,
  onEnd: function () {
  
    updateTachStorage()
  }
});
function fetchTaches() {
  var taches = [];

  if (!localStorage.getItem("taches"))
    localStorage.setItem("taches", JSON.stringify(taches));

  if (localStorage.getItem("taches")) {
    taches = JSON.parse(localStorage.getItem("taches"));
    taches.forEach((tache) => {
      constructTache(tache);
      removeTacheAction();
    });
  }
  updateTachStorage()
}

function constructTache(tache) {
    
  //create a paragraph
  var p = document.createElement("p");
  //create a button
  var btn = document.createElement("button");
  //set an attribute class name
  btn.setAttribute("class", "test btn btn-link");
  
  var btnRemove=document.createElement("i");
  btnRemove.setAttribute("class","bi bi-trash-fill")
  btn.append(btnRemove)
  //create a span tag
  var span = document.createElement("span");
  //set an atribute class name
  span.setAttribute("class", "content");
  //create a text content for button
  var valBtn = document.createTextNode("");
  //apply some style
 
  p.setAttribute(
    "class",
    "p-2 border rounded d-flex justify-content-between align-items-center"
  );
  btn.style.marginLeft = "50px";

  btn.append(valBtn);

  // add check btn
  var checkBtn = document.createElement("input");
  checkBtn.type = "checkbox";
  checkBtn.checked=tache.isCompleted;
  checkBtn.setAttribute("class", "btnCheck form-check-input");
  checkBtn.style.marginRight = "15px";
  if (checkBtn.checked) {
        span.classList.add("inactive");
      } else span.classList.remove("inactive");
     
  var value = document.createTextNode(tache.name);
  span.append(value);

  var div = document.createElement("div");
  div.setAttribute("class","parent")
  div.append(checkBtn);
  div.append(span);
  p.append(div);
  p.append(btn);
  

  hereToadd.prepend(p);
}

function updateTachStorage() {
  let taches = [];
  let count=0;
  let list = document.querySelectorAll(".parent");
  
  let listArray = Array.prototype.slice.call(list);
  document.getElementById("nombreTask").innerHTML=listArray.length;

  listArray.forEach((e) => {
    let tacheObj= new Object();
    tacheObj.isCompleted= e.firstChild.checked;
    tacheObj.name= e.lastChild.textContent;
    if( tacheObj.isCompleted) count++
    console.log(tacheObj)
    taches.unshift(tacheObj);
  });
  localStorage.setItem("taches", JSON.stringify(taches));
  document.getElementById("nombreTasku").innerHTML=listArray.length-count;
  document.getElementById("nombreTaskc").innerHTML=count;

  console.log(taches);
}

function AddTach() {
  
  let tacheObj=new Object();

  let tache = document.getElementById("tache");
  tacheObj.name=tache.value
  tacheObj.isCompleted=false
  if(tacheObj.name != "")
  {
    constructTache(tacheObj);
  tache.value = "";
  updateTachStorage();
  removeTacheAction();
  }

  
}

function removeTacheAction() {
  //get all the tag with classname .test
  let ary = Array.prototype.slice.call(document.querySelectorAll(".test"));
  // Now, you can safely use .forEach()
  ary.forEach(function (el) {
    // Callbacks are passed a reference to the event object that triggered the handler
    el.addEventListener("click", function (evt) {
      // The this keyword will refer to the element that was clicked
      console.log(this.id, el);
      el.parentElement.remove();
      updateTachStorage();
      
    });
  });
  var checkboxElems = document.querySelectorAll("input[type='checkbox']");
  for (var i = 0; i < checkboxElems.length; i++) {
    checkboxElems[i].addEventListener("click", function (evt) {
      // The this keyword will refer to the element that was clicked
      console.log(this.parentElement);
      if (this.checked) {
        this.parentElement.lastChild.classList.add("inactive");
      } else this.parentElement.lastChild.classList.remove("inactive");
      updateTachStorage();
    });
  }


  
}