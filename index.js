const btnSubmit = document.querySelector(".btnsubmit")
const mainReport = document.querySelector(".maintenance-report")
var infillLevels = {
    "location 1": 42,
    "location 2": 43,
    "location 3": 41,
    "location 4": 42,
    "location 5": 43,
    "location 6": 45,
    "location 7": 40,
    "location 8": 39,
    "location 9": 42,
    "location 10": 41
};


const numberOfInfill = Object.entries(infillLevels).length
console.log(Object.entries(infillLevels));
let infillData = {};
let totalInfill = 0
let max = infillLevels["location 1"]
let min = infillLevels["location 1"]
for (const [key, value] of Object.entries(infillLevels)) {
    totalInfill = totalInfill + value
    if (infillLevels[key] > max)
        max = infillLevels[key];
    if (infillLevels[key] < min)
        min = infillLevels[key];
    if (value > 42) {
        infillData = {
            ...infillData,
            [key]: value
        }
    }
}
infillData = {
    ...infillData,
    averageInfil: totalInfill / numberOfInfill,
    min,
    max
}
console.log(infillData);
if (btnSubmit) {
    btnSubmit.addEventListener("click", () => {
        let files = document.querySelector('#file').files;
        if (files.length > 0) {
            mainReport.classList.remove("hide")
            // Selected file
            let file = files[0];
            let reader = new FileReader();
console.log(reader,'readerreader');
            reader.onload = function (e) {
                let data = e.target.result;
                let workbook = XLSX.read(data, {
                    type: 'binary'
                });

                const tablebody = document.querySelectorAll(".table-body");
                if (tablebody) {
                    tablebody.forEach((el) => {
                        console.log(el, "eeeeee");
                    })
                }
                workbook.SheetNames.forEach(function (sheetName, index) {
                    // Here is your object
                    let tableData = ''
                    let XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                    console.log(XL_row_object);
                    XL_row_object.map((cv) => {
                        const firstValue = Object.keys(cv)[0];
                        const secondvalue = Object.keys(cv)[1]; //fetched the key at second index
                        tableData = tableData + `   <tr>
                    <th>${cv[firstValue]}</th>
                    <td  data-value="${cv[firstValue] == "site name" && cv[secondvalue]}"
                    data-label="${cv[firstValue] == "surface" && cv[secondvalue]}"
                     class = " ${cv[firstValue] == "site name" && "site_name"}"
                     >
                     ${cv[firstValue] == "infill distribution" ? infillData["averageInfil"] :
                                cv[firstValue] == "infill levels - high use" ? infillData["max"] : cv[secondvalue]
                            }
                     </td>
                </tr>`
                    })
                    if (tablebody[index]) {
              
                        tablebody[index].innerHTML =tableData
                    }

                })

            };
            
            reader.onerror = function (ex) {
                console.log(ex);
            };
            reader.readAsBinaryString(file);
            if(reader.DONE == 2){
                debugger
                console.log(document.querySelector(".site_name"));
            }
            
        } else {
            alert("Please select a file.");

        }


    })
}


