var inputImg = document.getElementById("inputImg");
var fullname = document.getElementById("fullname");
var phonenum = document.getElementById("phonenum");
var email = document.getElementById("email");
var address = document.getElementById("address");
var group = document.getElementById("group");
var notes = document.getElementById("notes");
var check1 = document.getElementById("check1");
var check2 = document.getElementById("check2");
var saveBtn = document.getElementsByClassName("savebtn")[0];
var contactROW = document.getElementsByClassName("contact-row")[0];
var favRow = document.querySelector(".fav .outer");
var emgRow = document.querySelector(".emg .outer");
var total = document.querySelector(".each .name span");
var favnum = document.querySelector(".each .favtotal span");
var emgnum = document.querySelector(".each .emgtotal span");
var search = document.querySelector(".search-input input");
var validations = document.querySelectorAll(".validations");
var updatedIndex;
var isUpdate = false;
var contactList = [];

if (localStorage.getItem("contactList") != null) {
  contactList = JSON.parse(localStorage.getItem("contactList"));
  displayAllContacts(contactList);
}
var bins = document.querySelectorAll("footer .bin");

// add contact
function addContact() {
  var contact = {
    fullname: fullname.value,
    email: email.value,
    phonenum: phonenum.value,
    address: address.value,
    notes: notes.value,
    group: group.value,
    check1: check1.checked,
    check2: check2.checked,
  };
  contactList.push(contact);
  localStorage.setItem("contactList", JSON.stringify(contactList));

  displayLastContact(contact);

  if (contact.check1) {
    displayLastFav(contact);
    favnum.innerHTML = countFav("check1");
  }

  if (contact.check2) {
    displayLastEmg(contact);
    emgnum.innerHTML = countFav("check2");
  }

  total.innerHTML = contactList.length;

  clearForm();
}

saveBtn.addEventListener("click", function () {
  if (isUpdate) {
    updateContact();
  } else {
    addContact();
  }
  if( !validateContact(fullname)){
       Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Name should contain only letters and spaces (2-50 characters)",
});


  } else if(!validateContact(phonenum)){
       Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Please enter a valid Egyptian phone number",
});
  }
  
  

});

// count fav-emg
function countFav(property) {
  var count = 0;
  for (var i = 0; i < contactList.length; i++) {
    if (contactList[i][property]) {
      count++;
    }
  }
  return count;
}
// display last contact
function displayLastContact(contact) {
  var row = `
     <div class="outer mb-3 col-md-6">
                  <div class="added-contact rounded-4 bg-white">
                    <div class="p-3">
                      <div class="contact-info d-flex column-gap-3">
                        <div
                          class="initial position-relative border-rad12 d-flex align-items-center justify-content-center"
                        >
                          <span class="text-white">M</span>
                          <div
                            class="star position-absolute top-0 end-0 d-flex align-items-center justify-content-center bg-warning img-thumbnail rounded-circle"
                          >
                            <i class="fa-solid fa-star text-white"></i>
                          </div>
                          <div
                            class="heart d-flex align-items-center position-absolute bottom-0 end-0 justify-content-center bg-danger img-thumbnail rounded-circle"
                          >
                            <i class="fa-solid fa-heart-pulse text-white"></i>
                          </div>
                        </div>
                        <div class="name">
                          <h3>${contact.fullname}</h3>
                          <div class="phone d-flex column-gap-2">
                            <div
                              class="icon d-flex align-items-center justify-content-center rounded-2"
                            >
                              <i class="fa-solid fa-phone"></i>
                            </div>
                            <span class="grey-color">${contact.phonenum}</span>
                          </div>
                        </div>
                      </div>
                      <div class="contact-details mb-3 mt-3">
                        <div
                          class="email mb-3 d-flex column-gap-2 align-items-center"
                        >
                          <div
                            class="icon d-flex justify-content-center align-items-center rounded-3"
                          >
                            <i class="fa-solid fa-envelope"></i>
                          </div>
                          <p class="grey-color m-0">${contact.email}</p>
                        </div>
                        <div
                          class="email address mb-3 d-flex column-gap-2 align-items-center"
                        >
                          <div
                            class="icon d-flex justify-content-center align-items-center rounded-3"
                          >
                            <i class="fa-solid fa-location-dot"></i>
                          </div>
                          <address class="grey-color m-0">${contact.address}</address>
                        </div>
                        <div class="gp-emg d-flex column-gap-2">
                          <div class="group px-2 py-1 rounded-3">
                            <span class="fw-medium">${contact.group}</span>
                          </div>
                          <div class="emg text-danger px-2 py-1 rounded-3">
                            <i class="fa-solid fa-heart-pulse"></i>
                            <span class="fw-medium">Emergency</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <footer
                      class="border-top p-3 pb-2 rounded-bottom-4 d-flex justify-content-between"
                    >
                      <div class="left d-flex column-gap-2">
                        <div class="call main light-greenBg border-rad12">
                          <i class="fa-solid fa-phone green-color"></i>
                        </div>
                        <div class="mail main light-purpleBg border-rad12">
                          <i class="fa-solid fa-envelope purple-col"></i>
                        </div>
                      </div>
                      <div class="right d-flex column-gap-2">
                        <div
                          onclick="updateFav(${contactList.length - 1})" class="fav main border-rad12 light-orangeBg text-warning"
                        >
                          <i class="fa-solid d-none fa-star"></i>
                          <i class="fa-regular fa-star "></i>
                        </div>
                        <div
                           onclick="updateEmg(${contactList.length - 1})" class="emg main border-rad12 text-danger light-pinkBg"
                        >
                          <i class="fa-regular fa-heart d-none"></i>
                          <i class="fa-solid fa-heart-pulse"></i>
                        </div>
                        <div data-bs-toggle="modal"
                data-bs-target="#exampleModal" onclick="setFormForUpdate(${contactList.length - 1}) class="edit main border-rad12">
                          <i class="fa-solid fa-pen"></i>
                        </div>
                        <div onclick="deleteContact(${contactList.length - 1})" class="bin main border-rad12">
                          <i class="fa-solid fa-trash"></i>
                        </div>
                      </div>
                    </footer>
                  </div>
                </div>
    `;
  contactROW.innerHTML += row;
}
// clear form
function clearForm() {
  inputImg.value = null;
  email.value = null;
  phonenum.value = null;
  fullname.value = null;
  group.value = null;
  notes.value = null;
  check1.checked = false;
  check2.checked = false;
}
// display last fav
function displayLastFav(contact) {
  var fav = `
                 <div class="repeated-info mb-2 rounded-3 p-2 d-flex column-gap-1 align-items-center ">
                  <div class="img-initial rounded-3 d-flex align-items-center justify-content-center">
                    <img src="imgs/avatar-4.jpg" class="w-100 h-100 rounded-3 d-none object-fit-cover" alt="profile">
                    <span class="text-white ">MM</span>
                  </div>
                  <div class="about">
                    <h4 class="m-0 fw-bold">${contact.fullname}</h4>
                    <p class="grey-color m-0">${contact.phonenum}</p>
                  </div>
                  <div class="call-icon ms-auto rounded-3 d-flex align-items-center justify-content-center">
                      <i class="fa-solid fa-phone green-color"></i>
                  </div>
                </div>`;

  favRow.innerHTML += fav;
}
// display last emergency
function displayLastEmg(contact) {
  var emg = ` <div class="repeated-info mb-2 rounded-3 p-2 d-flex column-gap-1 align-items-center ">
                  <div class="img-initial rounded-3 d-flex align-items-center justify-content-center">
                    <img src="imgs/avatar-4.jpg" class="w-100 h-100 rounded-3 d-none object-fit-cover" alt="profile">
                    <span class="text-white ">MM</span>
                  </div>
                  <div class="about">
                    <h4 class="m-0 fw-bold">${contact.fullname}</h4>
                    <p class="grey-color m-0">${contact.phonenum}</p>
                  </div>
                  <div class="call-icon ms-auto  rounded-3 d-flex align-items-center justify-content-center">
                      <i class="fa-solid fa-phone text-danger"></i>
                  </div>
                </div>`;
  emgRow.innerHTML += emg;
}

// display all contacts
function displayAllContacts(list) {
  var container = "";
  var fav = "";
  var emg = "";
  for (var i = 0; i < list.length; i++) {
    container += `  <div class="outer mb-3 col-md-6">
                  <div class="added-contact rounded-4 bg-white">
                    <div class="p-3">
                      <div class="contact-info d-flex column-gap-3">
                        <div
                          class="initial position-relative border-rad12 d-flex align-items-center justify-content-center"
                        >
                          <span class="text-white">M</span>
                          <div
                            class="star position-absolute top-0 end-0 d-flex align-items-center justify-content-center bg-warning img-thumbnail rounded-circle"
                          >
                            <i class="fa-solid fa-star text-white"></i>
                          </div>
                          <div
                            class="heart d-flex align-items-center position-absolute bottom-0 end-0 justify-content-center bg-danger img-thumbnail rounded-circle"
                          >
                            <i class="fa-solid fa-heart-pulse text-white"></i>
                          </div>
                        </div>
                        <div class="name">
                          <h3>${list[i].fullname}</h3>
                          <div class="phone d-flex column-gap-2">
                            <div
                              class="icon d-flex align-items-center justify-content-center rounded-2"
                            >
                              <i class="fa-solid fa-phone"></i>
                            </div>
                            <span class="grey-color">${list[i].phonenum}</span>
                          </div>
                        </div>
                      </div>
                      <div class="contact-details mb-3 mt-3">
                        <div
                          class="email mb-3 d-flex column-gap-2 align-items-center"
                        >
                          <div
                            class="icon d-flex justify-content-center align-items-center rounded-3"
                          >
                            <i class="fa-solid fa-envelope"></i>
                          </div>
                          <p class="grey-color m-0">${list[i].email}</p>
                        </div>
                        <div
                          class="email address mb-3 d-flex column-gap-2 align-items-center"
                        >
                          <div
                            class="icon d-flex justify-content-center align-items-center rounded-3"
                          >
                            <i class="fa-solid fa-location-dot"></i>
                          </div>
                          <address class="grey-color m-0">${list[i].address}</address>
                        </div>
                        <div class="gp-emg d-flex column-gap-2">
                          <div class="group px-2 py-1 rounded-3">
                            <span class="fw-medium">${list[i].group}</span>
                          </div>
                          <div class="emg text-danger px-2 py-1 rounded-3">
                            <i class="fa-solid fa-heart-pulse"></i>
                            <span class="fw-medium">Emergency</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <footer
                      class="border-top p-3 pb-2 rounded-bottom-4 d-flex justify-content-between"
                    >
                      <div class="left d-flex column-gap-2">
                        <div class="call main light-greenBg border-rad12">
                          <i class="fa-solid fa-phone green-color"></i>
                        </div>
                        <div class="mail main light-purpleBg border-rad12">
                          <i class="fa-solid fa-envelope purple-col"></i>
                        </div>
                      </div>
                      <div class="right d-flex column-gap-2">
                        <div
                          onclick="updateFav(${i})" class="fav main border-rad12 light-orangeBg text-warning"
                        >
                          <i  class="fa-solid  d-none fa-star"></i>
                          <i  class="fa-regular fa-star"></i>
                        </div>
                        <div
                         onclick="updateEmg(${i})" class="emg main border-rad12 text-danger light-pinkBg"
                        >
                          <i class="fa-regular fa-heart d-none"></i>
                          <i class="fa-solid fa-heart-pulse"></i>
                        </div>
                        <div onclick="setFormForUpdate(${i})" data-bs-toggle="modal"
                data-bs-target="#exampleModal" class="edit main border-rad12">
                          <i class="fa-solid fa-pen"></i>
                        </div>
                        <div onclick="deleteContact(${i})" class="bin main border-rad12">
                          <i class="fa-solid fa-trash"></i>
                        </div>
                      </div>
                    </footer>
                  </div>
                </div>`;

    if (contactList[i].check1) {
      fav += `
                 <div class="repeated-info mb-2 rounded-3 p-2 d-flex column-gap-1 align-items-center ">
                  <div class="img-initial rounded-3 d-flex align-items-center justify-content-center">
                    <img src="imgs/avatar-4.jpg" class="w-100 h-100 rounded-3 d-none object-fit-cover" alt="profile">
                    <span class="text-white ">MM</span>
                  </div>
                  <div class="about">
                    <h4 class="m-0 fw-bold">${list[i].fullname}</h4>
                    <p class="grey-color m-0">${list[i].phonenum}</p>
                  </div>
                  <div class="call-icon ms-auto rounded-3 d-flex align-items-center justify-content-center">
                      <i class="fa-solid fa-phone green-color"></i>
                  </div>
                </div>`;
    }

    if (contactList[i].check2) {
      emg += ` <div class="repeated-info mb-2 rounded-3 p-2 d-flex column-gap-1 align-items-center ">
                  <div class="img-initial rounded-3 d-flex align-items-center justify-content-center">
                    <img src="imgs/avatar-4.jpg" class="w-100 h-100 rounded-3 d-none object-fit-cover" alt="profile">
                    <span class="text-white ">MM</span>
                  </div>
                  <div class="about">
                    <h4 class="m-0 fw-bold">${list[i].fullname}</h4>
                    <p class="grey-color m-0">${list[i].phonenum}</p>
                  </div>
                  <div class="call-icon ms-auto  rounded-3 d-flex align-items-center justify-content-center">
                      <i class="fa-solid fa-phone text-danger"></i>
                  </div>
                </div>`;
    }
  }
  contactROW.innerHTML = container;
  favRow.innerHTML = fav;
  emgRow.innerHTML = emg;
  favnum.innerHTML = countFav("check1");
  emgnum.innerHTML = countFav("check2");
  total.innerHTML = contactList.length;
}
// update fav
function updateFav(index) {
  contactList[index].check1 = !contactList[index].check1;
  localStorage.setItem("contactList", JSON.stringify(contactList));
  displayAllContacts(contactList);
}
// update emg
function updateEmg(index) {
  contactList[index].check2 = !contactList[index].check2;
  localStorage.setItem("contactList", JSON.stringify(contactList));
  displayAllContacts(contactList);
}

// delete contact
function deleteContact(index) {
  contactList.splice(index, 1);
  localStorage.setItem("contactList", JSON.stringify(contactList));
  displayAllContacts(contactList);
}

// set form for update
function setFormForUpdate(index) {
  isUpdate = true;
  updatedIndex = index;
  fullname.value = contactList[index].fullname;
  email.value = contactList[index].email;
  address.value = contactList[index].address;
  phonenum.value = contactList[index].phonenum;
  notes.value = contactList[index].notes;
  group.value = contactList[index].group;
  if (contactList[index].check1) {
    check1.checked = true;
  } else check1.checked = false;

  if (contactList[index].check2) {
    check2.checked = true;
  } else check2.checked = false;
}
// update contact
function updateContact() {
  contactList[updatedIndex].fullname = fullname.value;
  contactList[updatedIndex].email = email.value;
  contactList[updatedIndex].address = address.value;
  contactList[updatedIndex].phonenum = phonenum.value;
  contactList[updatedIndex].notes = notes.value;
  contactList[updatedIndex].group = group.value;
  contactList[updatedIndex].check1 = check1.checked;
  contactList[updatedIndex].check2 = check2.checked;
    localStorage.setItem("contactList", JSON.stringify(contactList));
  displayAllContacts(contactList);

  clearForm();

  isUpdate = false;
}

// search contact
function searchContact(){
  var searchList = [];
  for(var i=0; i<contactList.length; i++){
    if(contactList[i].fullname.toLowerCase().includes(search.value.toLowerCase())){
      searchList.push(contactList[i]);
    }else if(contactList[i].phonenum.includes(search.value)){
  searchList.push(contactList[i]);
    }else if(contactList[i].email.toLowerCase().includes(search.value.toLowerCase())){
searchList.push(contactList[i]);
    }
  }
  displayAllContacts(searchList)
}

search.addEventListener("input", function(){
  searchContact();
})

// validations
function validateContact(element){
  var regex = {
    fullname :     /^[A-Za-z ]{2,50}$/,
    phonenum : /^(?:\+20|0020|0)?1[0125]\d{8}$/, 
    email : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  }

  var id = element.getAttribute("id");
  if(regex[id].test(element.value)){
    if( element.nextElementSibling.classList.contains("d-block")){
       element.nextElementSibling.classList.replace("d-block" , "d-none")
    }
    return true;
  }else if(element.value==""){
     if( element.nextElementSibling.classList.contains("d-block")){
       element.nextElementSibling.classList.replace("d-block" , "d-none")
    }
    return false;
  }
  else if(!regex[id].test(element.value)){

    element.nextElementSibling.classList.replace("d-none" , "d-block")
    return false;
  }
}

for(var i=0; i<validations.length;i++){
  validations[i].addEventListener("input" , function(e){
    validateContact(e.target);
  })
}
