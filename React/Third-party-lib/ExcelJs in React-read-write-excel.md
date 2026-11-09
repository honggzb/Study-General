[ExcelJs in React- read/write excel to React](#top)

- [Basic Export Excel component](#basic-export-excel-component)
- [Advanced Export Excel component](#advanced-export-excel-component)
- [Dynamic Table Headers](#dynamic-table-headers)


## Basic Export Excel component

```ts
import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
const ExportToExcel = ({ data, fileName }) => {
  const exportExcel = async () => {
    // 1. Create a new workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data Report');
    // 2. Define the table headers
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Join Date', key: 'joinDate', width: 20 },
    ];
    // 3. Insert data into the worksheet
    data.forEach((item) => {
      worksheet.addRow({
        id: item.id,
        name: item.name,
        email: item.email,
        joinDate: item.joinDate,
      });
    });
    // 4. Style the header
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { horizontal: 'center' };
    });
    // 5. Save the workbook as an Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `${fileName}.xlsx`);
  };
  return (
    <button onClick={exportExcel}>Download Excel</button>
  );
};
// Use the ExportToExcel Component
const App = () => {
  const data = [
    { id: 1, name: 'Name 1', email: 'Name1@example.com', joinDate: '2023-01-15' },
    { id: 2, name: 'Name 2', email: 'Name2@example.com', joinDate: '2023-02-20' },
  ];
  return (
    <div>
      <h1>Export Data to Excel</h1>
      <ExportToExcel data={data} fileName="Data_Report"/>
    </div>
  );
};
```

[⬆ back to top](#top)

## Advanced Export Excel component

```typescript
import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
class ExcelExport extends React.Component {
    const exportToExcel = async (e) => {
        e.preventDefault();
        try {
            if (getSelectedRows.length == 0) {
                alert('Please select cart Item')
                return false;
            }
            const customSheet = getSelectedRows.map(item => ({
                "User No": item ? .USER_NUMBER,
                "Carats": item ? .CHK_CARATS,
                "Cert": item ? .CERT,
                "Cert No": item ? .CERT_NO,
                "Color": item ? .COLOR_CODE,
                "Rap $": item ? .BASE,
                "Calc. Rap": '',
                "Dis %": item ? .DISCOUNT
                "Price/Ct '000": '',
                "Total": '',
            }));
            console.log("custom sheet ==> ", customSheet);
            // Create a new workbook and worksheet
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Product');
            // Define the columns
            worksheet.columns = Object.keys(customSheet[0]).map(key => ({
                header: key,
                key: key,
                width: 20
            }));
            // Add rows
            customSheet.forEach(item => { worksheet.addRow(item);});
            // Apply formulas to the appropriate columns
            worksheet.eachRow((row, rowNumber) => {
                if (rowNumber > 1) { // Skip the header row
                    // Formula for "Calc. Rap" column - Multiplies Carats by Rap $
                    const caratsCell = row.getCell('Carats');
                    const baseCell = row.getCell('Rap $');
                    const calcRapCell = row.getCell('Calc. Rap');
                    calcRapCell.value = {
                      formula: `${caratsCell.address}*${baseCell.address}`,
                      result: caratsCell.value * baseCell.value
                    };
                    // Formula for "Price/Ct '000" column  - Calculates the price per carat with a discount
                    const disCell = row.getCell('Dis %');
                    const priceCtCell = row.getCell("Price/Ct '000");
                    priceCtCell.value = {
                      formula: `${disCell.address}*${baseCell.address}`,
                      result: disCell.value * baseCell.value
                    };
                    // Formula for "Total" column   -  Calculates the total value based on base price, discount, and carats
                    const totalCell = row.getCell('Total');
                    totalCell.value = {
                      formula: `(${baseCell.address}*${disCell.address})*${caratsCell.address}`,
                      result: (baseCell.value * disCell.value) * caratsCell.value
                    };
                    //Hyper link on cell  -  generate URLs based on the value of Cert No
                    const certCell = row.getCell('Cert');
                    const certCellValue = row.getCell('Cert');
                    const certNoValue = row.getCell('Cert No');
                    if(certCellValue.value == 'first'){     //condition based on current value
                      certCell.value = {
                        formula: `HYPERLINK("https://www.abc.com/?r=${certNoValue.value}", "${certCellValue.value}")`
                      };
                    }
                    if(certCellValue.value == 'second'){ //condition based on current value
                      certCell.value = {
                        formula: `HYPERLINK("https://www.def.com/?r=${certNoValue.value}", "${certCellValue.value}")`
                      };
                    }
                    // Display Cert cell text in the cell
                    certCell.style = { font: { color: { argb: 'FF0000FF' }, size: 12, name: 'inter'  } }; // Blue text color
                    // row bg color
                    // Apply background color to the row based on the Cert value
                    if (certCell.value.formula.includes('"first"')) {
                      row.eachCell({ includeEmpty: true }, (cell) => {
                        cell.fill = {
                          type: 'pattern',
                          pattern: 'solid',
                          fgColor: { argb: 'FFCCCCFF' } // Light purple background for first
                        };
                        cell.font = { size: 12, name: 'inter' };
                      });
                    } else if (certCell.value.formula.includes('"second"')) {
                      row.eachCell({ includeEmpty: true }, (cell) => {
                        cell.fill = {
                          type: 'pattern',
                          pattern: 'solid',
                          fgColor: { argb: 'FFFFFFCC' } // Light yellow background for second
                        };
                      });
                    } else {
                      row.eachCell({ includeEmpty: true }, (cell) => {
                        cell.fill = {
                          type: 'pattern',
                          pattern: 'solid',
                          fgColor: { argb: 'FFCCFFCC' } // Light green background for others
                        };
                      });
                    }
                    // Apply border
                    row.eachCell({ includeEmpty: true }, (cell) => {
                      cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                      };
                    });

                  }
            });
            // Apply styles to the header row
            const headerRow = worksheet.getRow(1);
            headerRow.eachCell((cell) => {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: '451020' }, // voilet background
                    bgColor: { argb: '451020' } // voilet background
                };
                cell.font = {
                    bold: true,
                    color: { argb: 'FFFFFFFF' } // white text
                    size: 12, // Font size 14 for header
                    name: 'inter' // Custom font family for header
                };
            });
            // Generate Excel file buffer
            const buffer = await workbook.xlsx.writeBuffer();
            // Save the Excel file
            saveAs(new Blob([buffer]), 'cart.xlsx');
        } catch (error) {
            console.error('Error exporting data to Excel:', error);
        }

    };

    render() {
        return ( <div><button onClick={this.exportToExcel}>Export to Excel</button></div> );
    }
}
export default ExcelExport;
```

[⬆ back to top](#top)

## Dynamic Table Headers

```
Dynamically build headers: Qty May, % May, Qty Jun, Qty Jul, etc
[
   {"Product_Code":"CC0110102","Product_Name":"Lorem","Start_Month":5,"End_Month":7,"V1":".00","P1":"0","V2":".00","P2":"0","V3":".00","P3":"0","V4":".00","P4":"0","V5":"213.00","P5":"-.2159624413145","V6":"167.00","P6":"-.0179640718562","V7":"164.00","P7":"-10","V8":".00","P8":"0","V9":".00","P9":"0","V10":".00","P10":"0","V11":".00","P11":"0","V12":".00","Total_Qty":"544.00"},
   {"Product_Code":"CC0110102","Product_Name":"Lorem","Start_Month":5,"End_Month":7,"V1":".00","P1":"0","V2":".00","P2":"0","V3":".00","P3":"0","V4":".00","P4":"0","V5":"213.00","P5":"-.2159624413145","V6":"167.00","P6":"-.0179640718562","V7":"164.00","P7":"-10","V8":".00","P8":"0","V9":".00","P9":"0","V10":".00","P10":"0","V11":".00","P11":"0","V12":".00","Total_Qty":"544.00"},
   {"Product_Code":"CC0110102","Product_Name":"Lorem","Start_Month":5,"End_Month":7,"V1":".00","P1":"0","V2":".00","P2":"0","V3":".00","P3":"0","V4":".00","P4":"0","V5":"213.00","P5":"-.2159624413145","V6":"167.00","P6":"-.0179640718562","V7":"164.00","P7":"-10","V8":".00","P8":"0","V9":".00","P9":"0","V10":".00","P10":"0","V11":".00","P11":"0","V12":".00","Total_Qty":"544.00"},
   {"Product_Code":"CC0110102","Product_Name":"Lorem","Start_Month":5,"End_Month":7,"V1":".00","P1":"0","V2":".00","P2":"0","V3":".00","P3":"0","V4":".00","P4":"0","V5":"213.00","P5":"-.2159624413145","V6":"167.00","P6":"-.0179640718562","V7":"164.00","P7":"-10","V8":".00","P8":"0","V9":".00","P9":"0","V10":".00","P10":"0","V11":".00","P11":"0","V12":".00","Total_Qty":"544.00"}
]
```

```typescript
const ExportToExcel = ({ data, fileName }) => {
    const exportExcel = async () => {
        // 1. Create a new workbook
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Data Report');
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        // 2. Define the table headers
        let header = []
        let startMonth = data[0].Start_Month
        let endMonth = data[0].End_Month
        let firstData = data[0];
        header.push({ name: '#', filterButton: false })
        header.push({ name: 'Product Name', filterButton: false })
        for (let index = startMonth; index <= endMonth; index++) {
            const key1 = `V${index}`
            const key2 = `P${index}`
            if (has(firstData, key1)) {
                header.push({
                    name: `${month[index - 1]}`,
                    key: key1,
                    style: {
                        alignment: { vertical: 'middle', horizontal: 'right', wrapText: true },
                    },
                    filterButton: true,
                })

                if (index !== endMonth) {
                    if (has(firstData, key2)) {
                        header.push({
                            name: `${month[index - 1]} (+/-)%`,
                            key: key2,
                            style: {
                                alignment: { vertical: 'middle', horizontal: 'right', wrapText: true },
                            },
                            filterButton: true,
                        })
                    }
                }
            }
        }
        header.push({ name: 'Total', filterButton: false })
        // 3. generate data
        let dataArray = []
        data.forEach((data, index) => {
            let temp = []
            temp.push(index + 1)
            temp.push(data?.Product_Name)
            let total = 0;
            for (let index = startMonth; index <= endMonth; index++) {
                const key1 = `V${index}`
                const key2 = `P${index}`
                if (has(data, key1)) {
                    if (data[key1] === ".00") {
                        temp.push(0)
                    } else {
                        temp.push(parseInt(data[key1]))
                        total = total + parseInt(data[key1]);
                    }
                    if (index !== endMonth) {
                        if (has(data, key2)) {
                            temp.push(parseFloat(data[key2]))
                        }
                    }
                }
            }
            temp.push(total)
            dataArray.push(temp)
        })
        worksheet.addTable({
            name: 'headerName',
            ref: `A3`,
            headerRow: true,
            totalsRow: false,
            style: {
                theme: 'TableStyleMedium2',
                showRowStripes: true,
                // @ts-ignore: Unreachable code error
                width: 200,
            },
            columns: header ? header : [{ name: '' }],
            rows: dataArray.map((e) => {
                let arr = []
                for (let i in e) {
                    arr.push(e[i])
                }
                return arr
            }),
        })
        // 5. Save the workbook as an Excel file
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `${fileName}.xlsx`);
    };
    return (
        <button onClick={exportExcel}>Download Excel</button>
    );
};
```

[⬆ back to top](#top)

> reference
- [Excel js + React JS](https://dev.to/ramadhan002/excel-js-react-js-gck)
- [How to use ExcelJs in React with Hyperlinks and Formulas: A Complete Code Guide](https://medium.com/@shaikh.nadeem/how-to-implement-conditional-hyperlinks-and-formulas-in-excel-with-exceljs-a-complete-code-guide-f5f849b00781)
- [Building Dynamic Table Headers in React + ExcelJS](https://dev.to/ramadhan002/building-dynamic-table-headers-in-react-exceljs-2enk)
- [Guide to Exporting HTML Tables to Excel in React with exceljs](https://ajinkyap.hashnode.dev/guide-to-exporting-html-tables-to-excel-in-react-with-exceljs)
