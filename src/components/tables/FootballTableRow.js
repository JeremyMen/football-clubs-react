import React from 'react'
import '../../stylesheets/FootballTableRow.css'

const FootballTableRow = ({ logo, position, team, played, won, draw, lost, point }) => {
  return (  
    <tr>
      <th scope="row">{ position } </th>
      <td>
        <img className="mr-4 maxw-20" src={logo} alt="logo"></img>
        { team }
      </td>
      <td>{ played }</td>
      <td>{ won }</td>
      <td>{ draw }</td>
      <td>{ lost }</td>
      <td><b>{ point }</b></td>
    </tr>
  );
}
 
export default FootballTableRow;