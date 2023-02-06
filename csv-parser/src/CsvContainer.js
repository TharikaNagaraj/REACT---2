import React,{useState} from 'react'
import CsvForm from './CsvForm'
import CsvChart from './CsvChart'


const CsvContainer = (props) => 
{
    const [csvData,setCsvData] = useState([])
    const [name,setName] = useState('')
    const [duration,setDuration] = useState(0)
    let hostDuration = 0
    let mins 
    const addData = (data) => 
    {
        setCsvData(data)
        console.log('length',data.length)
        const result = data.filter((ele) => 
        {
            return (ele.G == "No")
        })
        result.forEach(ele => 
        {
            setName(ele.N)
            hostDuration += Number(ele.T)
            if(hostDuration > 60)
            {
                //Doing a set state of setHostName gives an error of too many re-renders
                const remainder = Number (hostDuration/60)
                console.log('remainder',remainder)
                const hours = Math.trunc(remainder)
                console.log('hours',hours)
                const minutes = Math.round((remainder - Math.trunc(hours)) * 60)
                console.log('minutes',minutes)
                mins = `${hours} hours and ${minutes} minutes`
                setDuration(mins)
            
            }
            else
            {
                mins = `${hostDuration} minutes`
                setDuration(mins)
                console.log(hostDuration)
            }
    
        });
        
        // console.log('hostname',hostName)
        // console.log('duration',hostDuration)
    }
    return(
        <div>
            <h1>File Upload + CSV Parser App</h1>
            <CsvForm addData = {addData}/>
            {(csvData.length > 0) && (
                <div>
                <br />
                <hr />
                <h2>Report</h2>
                <h3>Host -{name} </h3>
                <h3>Total Participants - {csvData.length}</h3>
                <h3>Duration - {duration} </h3>
                <table border = '5'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {csvData.map((ele,i) => 
                        {
                            return(
                                <tr key={i}>
                                    <td>{ele.N}</td>
                                    <td>{ele.U}</td>
                                    <td>{ele.T}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <CsvChart csvData={csvData}/>
                </div>
            )
            }     
        </div>
    )
}
export default CsvContainer