import React, { useEffect, useState } from 'react'
import './VolunteerProfileNominations.css'
import VolunteerNeedsNominated from '../../assets/needsNominated.png';
import VolunteerNeedsApproved from '../../assets/needsApproved.png';
import VolunteerNeedsInProgress from '../../assets/needsInProgress.png';
import VolunteerPlansDelivered from '../../assets/plansDelivered.png';
import VolunteerHrs from '../../assets/volunteerHrs.png';
import axios from 'axios'
import NeedsImage from '../../assets/tempNeedsImage.png'
import VolunteerProfileDeliverable from '../VolunteerProfileDeliverables/VolunteerProfileDeliverable';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import { useSelector, useDispatch } from 'react-redux'
import configData from '../../configData.json'

function VPNominations() {
  //get userId
  const userId = useSelector((state)=> state.user.data.osid)
  console.log(userId)
  //get nominations by nominated userId
  const [nominations,setNominations] = useState([])
  useEffect(()=> {
    axios.get(`${configData.NOMINATIONS_GET}/${userId}?page=0&size=10`).then(
    response => setNominations(Object.values(response.data))
   ).catch(function (error) {
     console.log(error)
  })
  },[userId])
  console.log(nominations)

  //create needId-name map
  const needsList = useSelector((state) => state.need.data);
  const needById = {};
  needsList.forEach(item => {
    if (item && item.need) {
      const { id, name } = item.need;
      needById[id] = name;
    }
  })

  //hadle view nomination details
  const [fullDetails, setFullDetails] = useState(false)
  const [needId, setNeedId ] = useState(null)
  const handleDetail = (needid) => {
    setFullDetails(!fullDetails)
    setNeedId(needid)
  }
  console.log(needId)

  ///
  
  const [activeTab, setActiveTab] = useState('tabN');
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  }
  const [nomsFiltered, setNomsFiltered] = useState(null)
  useEffect(() => {
    if (activeTab === 'tabN') {
      setNomsFiltered(nominations.filter(item => item.nominationStatus === "Nominated"))
    }
    else if (activeTab === 'tabA') {
      setNomsFiltered(nominations.filter(item => item.nominationStatus === "Approved"))
    }
    else {
      setNomsFiltered(nominations)
    }
  }, [nominations,activeTab])
  console.log(nomsFiltered)



  const [selectedDateOption, setSelectedDateOption] = useState('');
  const [isDateSelectOpen, setIsDateSelectOpen] = useState(false);
  const [selectedNeedOption, setSelectedNeedOption] = useState('');
  const [isNeedSelectOpen, setIsNeedSelectOpen] = useState(false);
  const handleDateOptionChange = (option) => {
    setSelectedDateOption(option);
  };
  const toggleDateSelect = () => {
    setIsDateSelectOpen(!isDateSelectOpen);
    setIsNeedSelectOpen(false); // Close the need select when opening date select
  };
  
  const toggleNeedSelect = () => {
    setIsNeedSelectOpen(!isNeedSelectOpen);
    setIsDateSelectOpen(false); // Close the date select when opening need select
  };
  
  const closeSelect = () => {
    setIsDateSelectOpen(false);
    setIsNeedSelectOpen(false);
  };
  const handleNeedOptionChange = (option) => {
    setSelectedNeedOption(option);
  };


  

  

  return (
    <div>
      {/* NOMINATIONS by VOLUNTEER */}
      {!fullDetails &&<div>
        {/* Title */}
        <div className="headerVPNoms">
          <div className="titleVPNoms"> Nominations</div>
          <div className="tagVPNoms">Check your nominations and metrics</div>
        </div>
        {/* stats */}
        <div className="statsVPNoms">
          <div className="statsVPNomsItem">
            <div className="statsVPNomsCount">
              <img src={VolunteerNeedsNominated} alt="Nominated Needs" height="35px" />
              <span>{nominations.filter(item => item.nominationStatus === "Nominated").length}</span>
            </div>
            <div className="statsVPNomsName">Needs Nominated</div>
          </div>
          <div className="statsVPNomsItem">
            <div className="statsVPNomsCount">
              <img src={VolunteerNeedsApproved} alt="Approved Needs" height="35px" />
              <span>{nominations.filter(item => item.nominationStatus === "Approved").length}</span>
            </div>
            <div className="statsVPNomsName">Needs Approved</div>
          </div>
          {/* <div className="statsVPNomsItem">
            <div className="statsVPNomsCount">
              <img src={VolunteerNeedsInProgress} alt="Needs In Progress" height="35px" />
              <span>00</span>
            </div>
            <div className="statsVPNomsName">Needs In Progress</div>
          </div> */}
          <div className="statsVPNomsItem">
            <div className="statsVPNomsCount">
              <img src={VolunteerPlansDelivered} alt="Nominated Needs" height="35px" />
              <span>00</span>
            </div>
            <div className="statsVPNomsName">Total Volunteer Hrs</div>
          </div>
          <div className="statsVPNomsItem">
            <div className="statsVPNomsCount">
              <img src={VolunteerHrs} alt="Nominated Needs" height="35px" />
              <span>00</span>
            </div>
            <div className="statsVPNomsName">Total Plans Delivered</div>
          </div>
        </div>
        {/* Tabs */}
        <div className="vnomTabs">
          <div className={`${activeTab === 'tabN' ? 'VNomTabN selectedVNomTab' : 'VNomTabN'}`} onClick={() => handleTabClick('tabN')}>Nominated</div>
          <div className={`${activeTab === 'tabA' ? 'VNomTabA selectedVNomTab' : 'VNomTabA'}`} onClick={() => handleTabClick('tabA')}>Approved</div>
        </div>
    
        <div className="selectDateAndNeed">
        <div className="selectDate">
          <div className="custom-select date-select" onClick={toggleDateSelect} onBlur={closeSelect}>
            <CalendarTodayIcon className="calendar-icon" />
            <span className="selected-option">{selectedDateOption ? selectedDateOption : 'Date'}</span>
            <span className="dropdown-indicator">{isDateSelectOpen ? '^' : '^'}</span>
            {isDateSelectOpen && (
              <div className="options">
                <div onClick={() => handleDateOptionChange('Recent')}>Recent</div>
                <div onClick={() => handleDateOptionChange('Oldest')}>Oldest</div>
              </div>
            )}
          </div>
        </div>

        <div className="selectNeed">
          <div className="custom-select  need-select" onClick={toggleNeedSelect} onBlur={closeSelect}>
            <StickyNote2OutlinedIcon className="note-icon" />
            <span className="selected-option">{selectedNeedOption ? selectedNeedOption : 'Need Type'}</span>
            <span className="dropdown-indicator">{isNeedSelectOpen ? '^' : '^'}</span>
            {isNeedSelectOpen && (
              <div className="optionss">
             
                <div onClick={() => handleNeedOptionChange('Offline Teaching')}>Offline Teaching</div>
                <div onClick={() => handleNeedOptionChange('Road Cleaning')}>Road Cleaning</div>
                <div onClick={() => handleNeedOptionChange('River Cleaning')}>River Cleaning</div>
                <div onClick={() => handleNeedOptionChange('Online Teaching')}>Online Teaching</div>
                <div onClick={() => handleNeedOptionChange('Lake Cleaning')}>Lake Cleaning</div>
              </div>
            )}
          </div>
        </div>
        </div>

        {/* Nominations Display */}
        <div className="nomination-grid">
          {nomsFiltered && nomsFiltered.map(nomination => (
            <div key={nomination.id} className="nomination-item">
              <img src={NeedsImage} alt="Nominated Needs" height="120px" />
              <div className="needItemVolunteer">
                <p className="needNameVP">{needById[nomination.needId]}</p> 
                <button className="viewFull" onClick={() => handleDetail(nomination.needId)}>View full details</button>
              </div>
            </div>
          ))}
        </div>
        
      </div> }

      {/* DETAILS OF A NOMINATION */}
      {fullDetails && <div>
        <button className="backBtnVDeliverable" onClick={() => handleDetail()}>
          <ArrowBackIcon /> Back
        </button>
        <VolunteerProfileDeliverable needId={needId} />
      </div>
      }
    </div>
  )
}

export default VPNominations