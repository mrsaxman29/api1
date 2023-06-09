const get_data = function(){
    console.log("GHSGHJS");

    fetch("http://colormind.io/api/", {
    method:"POST",
    body: JSON.stringify({ model: 'default' })
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data.result[0]);
    data.result.forEach((color, index)=>{
        var color_str = "rgb(";
        color.forEach((element, index) => {
            color_str += element.toString();
            if (index<2){
                color_str += ", ";
                console.log(index);
            };
        });
    console.log(color_str);
    div_list[index].style.backgroundColor=color_str;
    })
});
}

/*

The palette consists of a light color, a dark color, main brand color and two highlight colors. 
The main color is in the center of the palette and has the largest impact on the overall look.

Light shades
Use this color as the background for your dark-on-light designs, or the text color of an inverted design.


Light accent
Accent colors can be used to bring attention to design elements by contrasting with the rest of the palette.


Main brand color
This color should be eye-catching but not harsh. It can be liberally applied to your layout as its main identity.


Dark accent
Another accent color to consider. Not all colors have to be used - sometimes a simple color scheme works best.


Dark shades
Use as the text color for dark-on-light designs, or as the background for inverted designs.

*/

const button = document.getElementById("button");
button.onclick = get_data;

const data_area = document.getElementById("data");
const data_area1 = document.getElementById("data1");
const data_area2 = document.getElementById("data2");
const data_area3 = document.getElementById("data3");
const data_area4 = document.getElementById("data4");

const div_list = [data_area, data_area1, data_area2, data_area3, data_area4]


function api_call(){
    console.log("Calling API");

}

var data = {
	model : "default",
	//input : [[44,43,44],[90,83,82],"N","N","N"]
}













// SPACE TRADERS






//token: b1e819b4-1fc6-48e5-9ca7-e7cb741f0bae    un: playerzero


function logObject(obj) {
    if (obj instanceof Object) {
        create_table(obj);
        Object.entries(obj).forEach(([key, value]) => {
            console.log(`${key}: ${value} type: ${typeof(value)}`);
            logObject(value);
        });
    } else if (Array.isArray(obj)) {
        create_table(obj);
        obj.forEach((value, index) => {
            console.log(`${index}: ${value}`);
            logObject(value);
        });
    }
  }
  
async function view_ships(token){
    var credentials = `Bearer ${token}`
    var response = await fetch('api.spacetraders.io/systems/OE/ship-listings', {
        headers: {
            'Authorization': credentials
        }
    })

    var data = await response.json();
    logObject(data);

}


function space_trade(){     //https://api.spacetraders.io/game/leaderboard/net-worth
    fetch("https://api.spacetraders.io/game/status")
    .then((res)=> res.json())
    .then((data)=>{
        console.log(data);
    });
}

function new_user(un){ 
    console.log(un);   
    fetch(`https://api.spacetraders.io/users/${un}/claim`, {method: "POST"})
    .then((res)=> {
        console.log(res);
        return res.json();
        })
    .then((data)=>{
        console.log(data);
        token_div.innerText=data.token;
        
    });
}

const ui_logged_in = document.getElementById("ui_wrapper_logged_in");
const ui_wrapper = document.getElementById("ui_wrapper");


// LOGIN
async function check_account(tk = 'bbd8ceea-4436-4b90-9fc2-dadab58e5551'){
    const credentials = `Bearer ${tk}`;
    console.log(credentials);
    const response = await fetch('https://api.spacetraders.io/my/account', {
        headers: {
            'Authorization': credentials,
        }
})
    console.log(response);
    stuff = await response.json();
    console.log(stuff);
    if (stuff){
        ui_wrapper.classList.remove("active");
        ui_wrapper.classList.add("inactive");
        ui_logged_in.classList.remove("inactive");
        ui_logged_in.classList.add("active");
    }
    var user = stuff.user;
    console.log(user);
    create_table(user);
}

function create_table(object){
    var new_table = document.createElement("table");
    var new_row = new_table.insertRow();
    var second_row = new_table.insertRow();
    var obj_keys = Object.keys(object);
    var obj_values = Object.values(object);

    for (key in obj_keys){
        var cell = new_row.insertCell();
        cell.innerHTML = obj_keys[key];
        cell.style.border = '1px solid black';
        cell.style.fontSize = "large";

        var cell2 = second_row.insertCell();
        cell2.innerHTML = obj_values[key];
        

    }
    token_div.appendChild(new_table);


}

function display_loan(object){
    console.log(object);
    for (let index in object.loans){
        //console.log(`ZZ: ${Object.entries(object.loans[index])}`);
        var new_table = document.createElement("table");
        var new_row = new_table.insertRow();
        var second_row = new_table.insertRow();
        var obj_keys = Object.keys(object.loans[index]);
        var obj_values = Object.values(object.loans[index]);

        for (key in obj_keys){
            var cell = new_row.insertCell();
            cell.innerHTML = obj_keys[key];
            cell.style.border = '1px solid black';
            cell.style.fontSize = "large";

            var cell2 = second_row.insertCell();
            cell2.innerHTML = obj_values[key];
            

        }
        //new_div.innerHTML = Object.entries( object.loans[index]);
        token_div.appendChild(new_table);
    }
}


// CHECK LOANS
async function check_loans(tk = 'bbd8ceea-4436-4b90-9fc2-dadab58e5551'){
    const credentials = `Bearer ${tk}`;
    console.log(credentials);
    const response = await fetch("https://api.spacetraders.io/types/loans", {
        headers: {
            'Authorization': credentials,
        }
    });
    console.log(response);
    resp_obj = await response.json();
    //display_loan(resp_obj);
    logObject(resp_obj);
    
}

// TAKE OUT LOAN 

async function take_loan(token){
    const authorization = `Bearer ${token}`;
    const response_object = await fetch("https://api.spacetraders.io/my/loans",{
        method: "POST",
        headers: {
            'Authorization': authorization,
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({type: "STARTUP"})
        
        });
    
    console.log(response_object);
    const data = await response_object.json();
    console.log(data);
    create_table(data);


}






/// DEFINING DOM OBJECTS AND ADDING EVENT LISTENERS 

var login_token = '';

const ship_btn = document.getElementById('ships');
ship_btn.addEventListener('click', ()=>{
    console.log("CHECKING SHIPS");
    view_ships(login_token);
});

const loanb = document.getElementById("loans");
loanb.addEventListener("click", ()=>{
    console.log(token_div.innerText);
    check_loans(login_token);
    token_div.scrollTop = token_div.scrollHeight;

});

const sb = document.getElementById("space_button");
sb.onclick=space_trade;

const user_name = document.getElementById("username");
const login_field = document.getElementById("username_old");
const login_btn = document.getElementById("login");

login_btn.addEventListener("click", (e)=>{
    e.preventDefault();
    token_div.innerText = `YOUR TOKEN IS: ${login_field.value}`;
    check_account(login_field.value);
    login_token = login_field.value;
    login_field.value="";
})

const check_btn = document.getElementById("check");
check_btn.addEventListener("click", ()=>{
    check_account(login_token);
    token_div.scrollTop = token_div.scrollHeight;
});

const token_div = document.getElementById("token");
const input_button = document.getElementById("submit");

input_button.addEventListener('click', (e)=>{
    if(user_name.value==""){
        console.log('NOTHING');
        return;}
    e.preventDefault();
    console.log(e.target);
    console.log(user_name.value);
    new_user(user_name.value);
    user_name.value="";
});

const take_loan_btn = document.getElementById("take_loan");
take_loan_btn.addEventListener("click", ()=>{
    take_loan(login_token);
})