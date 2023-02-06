import React,{useState,useEffect} from "react";
import Chart from 'react-google-charts'

const CsvChart = (props) => 
{
    const {csvData} = props
    const dataArr = [['Name','Time']]
    csvData.forEach((ele) => 
    {
      let arr = []
      arr.push(ele.N,Number(ele.T))
      dataArr.push(arr)
    })
    //console.log('dataArr',dataArr)

    return(
      <div>
          <Chart
            width='900px'
            height='400px'
            chartType="ColumnChart"
            data = {dataArr}
            options={{
              bar:{groupWidth:'55%'},
              title:'Time of each student in the meeting',
              chartArea : {width : '50%'},
              hAxis : {
                title: 'Student names'
              },
              vAxis : {
                title: 'Minutes attended (mins)',
                minValue:0
              }
            }}/>
      </div>
    )
}

export default CsvChart