import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Badge,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Progress,
  Table,
  UncontrolledTooltip
} from "reactstrap";
export default function UserRank (props) {
 const userR = props.userR;
 const rank=props.userR.rank
 let image = "/rank/";


if (rank.divisions){
  
     image=image+rank.divisions+".png"
    }
   
  

//}

  return (
   
       
      
       
            <tr>
             
              <th scope="row">
                <Media className="align-items-center">
                  <a
                    className="avatar rounded-circle mr-3"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    <img
                      alt="..."
                      src="/rank/nouser.png"  width="60" height="60" 
                    />
                  </a>
                  <Media>
                    <span className="mb-0 text-sm">
                  {    userR.firstName   }  
                                    </span>
                  </Media>
                </Media>
              </th>
              <td>{rank.rankScore}</td>
              <td>
                {rank.divisions}
              </td>
              <td>
                <div className="avatar-group">
                  <a
                    className="avatar avatar-sm"
                    href="#pablo"
                    id="tooltip742438047"
                    onClick={e => e.preventDefault()}
                  >
                    <img
                      alt="..."
                      className="rounded-circle"
                      src={image}  width="60" height="60" 
                    />
                  </a>
                 
                  <a
                    className="avatar avatar-sm"
                    href="#pablo"
                    id="tooltip941738690"
                    onClick={e => e.preventDefault()}
                  >
                   
                  </a>
                  <UncontrolledTooltip
                    delay={0}
                    target="tooltip941738690"
                  >
                    Romina Hadid
                  </UncontrolledTooltip>
                  <a
                    className="avatar avatar-sm"
                    href="#pablo"
                    id="tooltip804044742"
                    onClick={e => e.preventDefault()}
                  >
                   
                  </a>
                  <UncontrolledTooltip
                    delay={0}
                    target="tooltip804044742"
                  >
                    Alexander Smith
                  </UncontrolledTooltip>
                  <a
                    className="avatar avatar-sm"
                    href="#pablo"
                    id="tooltip996637554"
                    onClick={e => e.preventDefault()}
                  >
                   
                  </a>
                  <UncontrolledTooltip
                    delay={0}
                    target="tooltip996637554"
                  >
                    Jessica Doe
                  </UncontrolledTooltip>
                </div>
              </td>
             
              <td className="text-right">
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="btn-icon-only text-light"
                    href="#pablo"
                    role="button"
                    size="sm"
                    color=""
                    onClick={e => e.preventDefault()}
                  >
                    <i className="fas fa-ellipsis-v" />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-arrow" right>
                    <DropdownItem
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      Action
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      Another action
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      Something else here
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </td>
            </tr>
           
       
   
  )
}