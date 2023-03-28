const get_data = function(){
    console.log("GHSGHJS");

    fetch("http://colormind.io/api/", {
    method:"POST",
    body: JSON.stringify(data)
})
  .then((response) => response.json())
  .then((data) => {console.log(data.result[0]);


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

