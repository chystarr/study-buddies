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


import React, {useState, useEffect} from 'react';

function ClassSearchPage() {
  

  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [initialData, setInitialData] = useState([]);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        let response = await fetch("/api/classes");
        let allClasses = await response.json();
        setData(allClasses);
        setInitialData(allClasses);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching all classes", error);
        setError(true);
      }
    }

    getData();

  }, []);
  
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
    if (lowercasedValue === "") setData(initialData);
    // if(lowercasedValue === "") setInitialData(initialData);
    else {
      const filteredData = data.filter(item => {
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
   
export default ClassSearchPage;