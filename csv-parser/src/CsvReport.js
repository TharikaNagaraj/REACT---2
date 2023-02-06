// import React from 'react'
// import { useState } from 'react'
// import CsvChart from './CsvChart'

// const CsvReport = (props) => 
// {
//     const {csvData} = props
//     console.log('report data',csvData)
    // const [name,setName] = useState('')
    // const [duration,setDuration] = useState(0)
   
    // const result = csvData.filter((ele) => 
    // {
    //     return (ele.G == "No")
    // })
    // //console.log('result',result)

    // let hostName 
    // let hostDuration = 0
    // let mins 

    // result.forEach(ele => {
    //     hostName = ele.N
    //     console.log(hostName)
    //     setName(hostName)
    //     hostDuration += Number(ele.T)
    //     if(hostDuration > 60)
    //     {
    //         //Doing a set state of setHostName gives an error of too many re-renders
    //         const diff = hostDuration - 60
    //         if(diff < 60)
    //         {
    //             mins = `1 hour ${diff} minutes`
    //             setDuration(mins)
    //             console.log(hostDuration)
    //         }
    //         else
    //         {
    //             const remainder = diff/60
    //             const time = 1 + Number(remainder)
    //             const hours = Math.trunc(time)
    //             mins = `${hours} hours and ${remainder} minutes`
    //             setDuration(mins)
    //             console.log(hostDuration)
    //         }
        
    //     }
    //     else
    //     {
    //         mins = `${hostDuration} minutes`
    //         setDuration(mins)
    //         console.log(hostDuration)
    //     }
    
    //     });
        
    //     // console.log('hostname',hostName)
    //     // console.log('duration',hostDuration)
  
    // return (
    //     <div>
    //         {(csvData.length > 0) && (
                // <div>
                // <br />
                // <hr />
                // <h2>Report</h2>
                // <h3>Host -{hostName} </h3>
                // <h3>Total Participants - {csvData.length}</h3>
                // <h3>Duration - {duration} </h3>
                // <table border = '5'>
                //     <thead>
                //         <tr>
                //             <th>Name</th>
                //             <th>Email</th>
                //             <th>Duration</th>
                //         </tr>
                //     </thead>
                //     <tbody>
                //         {csvData.map((ele,i) => 
                //         {
                //             return(
                //                 <tr key={i}>
                //                     <td>{ele.N}</td>
                //                     <td>{ele.U}</td>
                //                     <td>{ele.T}</td>
                //                 </tr>
                //             )
                //         })}
                //     </tbody>
                // </table>
                // <CsvChart csvData={csvData}/>
                // </div>
//             )}
            
//         </div>
//     )
// }
// export default CsvReport