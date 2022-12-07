// import React from "react";
// import ClassCard from "../components/ClassCard";

// function ClassSearchBar() {
//   return(
//     <div className="col-10 col-md-8 col-lg-7 mx-auto">
//       <form>
//         <div className="input-group">
//           <input
//             type="text"
//             placeholder="Enter a class name"
//             className="form-control"
//             autoFocus
//           />
//           <button type="submit" className="btn btn-primary">
//             Search
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// function ClassSearchPage() {
  
//   return(
//       <div>
//         <ClassSearchBar />
//         <ClassCard id={1}/>
//       </div>
//   );
// }

import React, {useState} from "react";



function ClassSearchPage() {
  const dataList = [
    {
      "id" : 1,
      "className" : "Advanced Math",
      "SchoolId" : "CCNY",
      "SubjectId" : "Math"
    },

    {
      "id" : 2,
      "className" : "Bridge to Applied Science",
      "SchoolId" : "CCNY",
      "SubjectId" : "Science"
    } 
  ];
  
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(dataList);

  // exclude column list from filter
  const excludeColumns = ["SchoolId", "SubjectId"];

  // handle change event of search input
  const handleChange = value => {
    setSearchText(value);
    filterData(value);
  };

  // filter records by search text
  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === "") setData(dataList);
    else {
      const filteredData = dataList.filter(item => {
        return Object.keys(item).some(key =>
          excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });
      setData(filteredData);
    }
  }

  return (
    <div>
      <div className="row mt-5">
		<div className="col">
		  <label htmlFor="className">Class Name:</label>
		</div>
		<div>
		  <input type="text" className="form-control" onChange={e => handleChange(e.target.value)} placeholder="Enter a class name"></input>
		</div>
	  </div>
      <div className="row mt-5 mb-5">
        {data.map((d, i) => {
          return <div key={i} className="mt-3">

            <b>Class Name: </b>{d.className}<br />
            <b>School: </b>{d.SchoolId}<br />
            <b>Subject: </b>{d.SubjectId}<br />
            
          </div>
        })}
        
        {data.length === 0 && <span>No results found</span>}
      </div>
    </div>
  );
}














// function Class(props) {
// 	return (
// 	  <div className ="row mt-5 mb-5">
// 		<div className ="col border rounded">
// 		  <div>
// 			{props.info.className}
// 		  </div>
// 		  <div className="mt-3">
// 			<ul>
// 			  <li>School Name: {props.info.SchoolId}</li>
// 			  <li>Subject Name: {props.info.SubjectId}</li>
// 			</ul>
// 		  </div>
// 		</div>
// 	  </div>
// 	);
  
// }

// function ClassSearchField(props) {
// 	return(
// 	  <div className="row mt-5">
// 		<div className="col">
// 		  <label htmlFor="className">Class Name:</label>
// 		</div>
// 		<div>
// 		  <input type="text" className="form-control" placeholder="Enter a class name" onChange={props.handleChange}></input>
// 		</div>
// 	  </div>
  
// 	);
// }

// function ClassSearchPage() {
// 	const [query, setQuery] = useState(null);
// 	const [results, setResult] = useState([]);
  
// 	function handleChange(event) {
// 	  const classesName = event.target.value;
// 	  setQuery(classesName);
  
// 	  if(classesName.length > 1){
// 		fetch(`http://localhost:8080/api/classes/${query}`)
// 		.then((res) => res.json())
// 		.then((data) => {
// 		  const classes  = data.map((classesName) => {
// 			return <Class key={data} info ={classesName}/>
// 		  })
// 		  setResult(classes);
// 		})
// 		.catch((error) => {
// 		  setResult([]);
// 		})
// 	  } else {  
// 		setResult([]);
// 	  }
// 	}
  
// 	return (
// 	  <div className="App">
		
// 		<div className="mx-auto" style={{ maxWidth: 400 }}>
// 		  <ClassSearchField handleChange = {handleChange}/>
// 		  { results.length !== 0 ? results : <div className="mt-4"><strong>No results found</strong></div> }
// 		</div>
// 	  </div>
// 	);
//   }


export default ClassSearchPage;