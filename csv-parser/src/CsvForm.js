import React,{useState} from 'react'
import Papa from 'papaparse'

const CsvForm = (props) => 
{
    const {addData} = props
    const handleFile = (e) => 
    {
        const input = e.target.files[0]
        console.log('file',input)
        Papa.parse(input,{
            header:true,
            // transformHeader:function(h) {
            // return h.replace(/\s/g, '')
            // },
            transformHeader:function(h) {
                return h[0]
            },
            skipEmptyLines: true,
            complete: function (results) {
            console.log('results',results.data)
            addData(results.data)
            }
            
        })
        
    }
    return(
        <div>
            <form>
                <input type='file' accept='.csv' onChange={handleFile}/>
                
            </form>
        </div>
    )
}
export default CsvForm