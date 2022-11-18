import React from "react";
import GroupCard from "../components/GroupCard";

function MyGroupsPage() {
  return(
      <div>
        <p>This is the My Groups page</p>
        <GroupCard id={1} />
      </div>
  );
}

export default MyGroupsPage;