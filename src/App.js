import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion"
import './App.css';
// import homes from './dataClean';
// import houseData from './dataClean'
import finalFetch from './dataClean';
// import finalFetch from './dataClean';
// let homes = await import ('./dataClean.js');
import axios from 'axios'
import fetch from 'node-fetch';
import DataGrid from 'react-data-grid'
import { Table, Column, HeaderCell, Cell } from 'rsuite-table'
import 'rsuite-table/dist/css/rsuite-table.css'


// let {PythonShell} = require('python-shell');


// let options = {
//   scriptPath: 'C:/Users/daniel.lavrentiev/Dropbox/Screen Project/Scraper',
//   pythonOptions: ['-u']
// }


// function handleRefresh () {
//   PythonShell.run('test_cleaner.py', options, function (err, results) {
//     if (err) throw err;
//     console.log('results: &j', results);
//   });
// }


// function ResetButton (props) {
//   return (
//     <button className='refresh'>Refresh</button>
//   )
// }



const updater = () => {

}




function TitleSection(props) {

  const hex = props.color

  return (
    <motion.div className='title-section'>
      <motion.div className='color-square' style={{ backgroundColor: hex }} ></motion.div>
      <motion.div className='title'>
        {props.streetAddress}
      </motion.div>
    </motion.div>
  );
}

function PillSection(props) { // This code looks like shit, but don't screw with it
  const pillList = [props.company,
  props.modelNumber,
  props.subdivisionAndPhase,
  props.lotNumber,
  props.city,
  props.projectManager,
  props.listingAgent,
  props.jobType]
  const ref = useRef(); // Don't not use useRef, using literally anything else will break this component
  // const [isOverflowed, setIsOverflowed] = useState(false);
  // const [testList, setTestList] = useState(pillList);
  // let filtered = testList.filter((pill, index) => index < testList.length - 1);



  // useEffect(() => {
  //   if (ref.current.clientWidth < ref.current.scrollWidth) {
  //     setIsOverflowed(true)
  //   } else {
  //     setIsOverflowed(false)
  //   }
  // }, [ref, isOverflowed])

  // useEffect(() =>
  //   !isOverflowed ? handleFilter : setIsOverflowed(false),
  //   [isOverflowed]// I have no idea why this works but don't touch it
  // )


  // const handleOverflowRender = (list) => {
  //   let overFlowVal = pillList.length - list.length
  //   if (list.length < pillList.length) {
  //     return <motion.li className='infopill-expand'>+{overFlowVal}</motion.li>
  //   } else {
  //   }
  // }

  // const handleFilter = () => {
  //   let filtered = testList.filter((pill, index) => index < testList.length - 1);
  //   setTestList(filtered)
  // }


  return (
    <motion.ul ref={ref} className={props.expandClass}  >
      {pillList.map((pill, i) =>
        <motion.li key={i} className='infopill'>{pill}</motion.li>
      )}
      {/* {handleOverflowRender(testList)} */}
    </motion.ul>
  )
}



function IndicatorGroup(props) {

  function assignColor(indicatorVal) {
    if (indicatorVal) {
      return 'rgb(122, 209, 106)'
    } else {
      return 'rgb(214, 79, 79)'
    }
  }

  return (
    <motion.div className='grouper' id={props.widthType}>
      <motion.div className='indicator' style={{ backgroundColor: assignColor(props.selections) }}>
        Selections
      </motion.div>
      <motion.div className='indicator' style={{ backgroundColor: assignColor(props.materials) }} >
        Materials
      </motion.div>
      <motion.div className='indicator' style={{ backgroundColor: assignColor(props.osb) }} >
        OSB
      </motion.div>
      <motion.div className='indicator' style={{ backgroundColor: assignColor(props.planReview) }} >
        Fee
      </motion.div>
      <motion.div className='indicator' style={{ backgroundColor: assignColor(props.floorJoists) }} >
        Joists
      </motion.div>
      <motion.div className='indicator' style={{ backgroundColor: assignColor(props.ccrs) }} >
        CCR
      </motion.div>
      <motion.div className='indicator' style={{ backgroundColor: assignColor(props.lumber) }} >
        Lumber
      </motion.div>
      <motion.div className='indicator' style={{ backgroundColor: assignColor(props.trusses) }} >
        Trusses
      </motion.div>
    </motion.div>
  );
}

function PermitGroup(props) {

  function yearChopper(date) {
    if (date !== null && date !== undefined) {
      let chopped = (date.slice(0, -5))
      // let choppedStr = chopped.toString()
      return chopped
    } else {
      return 'null'
    }
  }

  const utilNotifier = (value) => {
    if (value !== null && value !== undefined) {
      return <motion.div className='relational-value'>{yearChopper(value)}</motion.div>
    } else {
      return <motion.div className='relational-notification'>!</motion.div>
    }
  }
  const permitNotifier = (value) => {
    if (value !== null && value !== undefined) {
      return <motion.div className='relational-value'>{yearChopper(value)}</motion.div>
    } else {
      return <motion.div className='relational-notification' style={{ backgroundColor: 'rgb(235,190,65)' }}>-</motion.div>
    }
  }

  return (
    <motion.div className='grouper' id='permit-group'>
      <motion.div className='relational-container ' style={{ width: '45%' }}>
        <motion.div className='relational-key'>City</motion.div>
        <motion.div className='relational-line'></motion.div>
        <motion.div className='relational-value'>{yearChopper(props.citySub)}</motion.div>
      </motion.div>
      <motion.div className='relational-container ' style={{ width: '55%' }}>
        <motion.div className='relational-key'>Utils sent</motion.div>
        <motion.div className='relational-line'></motion.div>
        {utilNotifier(props.utilitiesSent)}
      </motion.div>
      <motion.div className='relational-container' style={{ width: '45%' }}>
        <motion.div className='relational-key'>Permit</motion.div>
        <motion.div className='relational-line'></motion.div>
        <motion.div className='relational-value'>{yearChopper(props.permit)}</motion.div>

      </motion.div>
      <motion.div className='relational-container' style={{ width: '55%' }}>
        <motion.div className='relational-key'>Utils payed</motion.div>
        <motion.div className='relational-line'></motion.div>
        {utilNotifier(props.utilitiesPaid)}
      </motion.div>
    </motion.div>
  )
}


function SqftGroup(props) {
  const sfAppender = (value) => {
    return `${value} SF`
  }

  return (
    <motion.div className='grouper' id='sf-group' >
      <motion.div className='relational-container' style={{ width: '100%' }} >
        <motion.div className='relational-key' >Garage</motion.div>
        <motion.div className='relational-line' ></motion.div>
        <motion.div className='relational-value'>{sfAppender(props.garage)}</motion.div>
      </motion.div>
      <motion.div className='relational-container' style={{ width: '100%' }} >
        <motion.div className='relational-key' >Covered</motion.div>
        <motion.div className='relational-line' ></motion.div>
        <motion.div className='relational-value'>{sfAppender(props.covered)}</motion.div>
      </motion.div>
    </motion.div>
  )
}


function LotGroup(props) {

  const parcelChecker = (value) => {
    if (!value) {
      return 'null'
    } else {
      return value
    }
  }

  return (
    <motion.div className='grouper' id='lot-group' >
      <motion.div className='relational-container' style={{ width: '100%' }} >
        <motion.div className='relational-key' >Lot Size</motion.div>
        <motion.div className='relational-line' ></motion.div>
        <motion.div className='relational-value'>{props.lotSize}</motion.div>
      </motion.div>
      <motion.div className='relational-container' style={{ width: '100%' }} >
        <motion.div className='relational-key' >Parcel</motion.div>
        <motion.div className='relational-line' ></motion.div>
        <motion.div className='relational-value'>{parcelChecker(props.parcel)}</motion.div>
      </motion.div>
    </motion.div>
  )
}

function ProgressGroup(props) {
  return (
    <motion.div className='grouper' id='progress-group'>
      <motion.div className='relational-container' style={{ width: '100%' }}>
        <motion.div className='relational-key' >Schedule</motion.div>
        <motion.progress max='100' value={props.progress} ></motion.progress>
        <motion.div className='progress-text' >{props.progress}%</motion.div>
      </motion.div>
    </motion.div>
  )
}

function CardList({ setIndex, items, setHomes, filter }) {

  // const filtered = items.filter(home => home.city === 'West Richland')

  const [cardUpdate, setCardUpdate] = useState(filter)



  

  // console.log(items);

  return (
    <ul className='cards-container'>
      {items.map((contentItem, i) => (
          <motion.li layout
            className='card'
            key={i}
            layoutId={i}
            onClick={() => setIndex(i)}
          >

            <motion.div layout layoutId={`${i}head`} className='head'>
              <TitleSection streetAddress={contentItem.streetAddress} color={contentItem.jobColor} />
              <PillSection expandClass='pill-container' modelNumber={contentItem.modelNumber} subdivisionAndPhase={contentItem.subdivisionAndPhase} lotNumber={contentItem.lotNumber} city={contentItem.city} projectManager={contentItem.projectManager} listingAgent={contentItem.listingAgent} jobType={contentItem.jobType} company={contentItem.company} />
            </motion.div>


            <motion.div className='body' layout layoutId={`${i}body`} >
              <IndicatorGroup widthType='indicator-group' ccrs={contentItem.ccRs} floorJoists={contentItem.floorJoists} lumber={contentItem.orderLumber} materials={contentItem.orderMaterial} osb={contentItem.orderOsb} planReview={contentItem.planReview} selections={contentItem.selections} trusses={contentItem.trusses} />
              <PermitGroup permit={contentItem.permit} utilitiesPaid={contentItem.utilitiesPaid} utilitiesSent={contentItem.utilitiesSent} citySub={contentItem.citySub} />
            </motion.div>
          </motion.li>
      ))}
    </ul>
  )
}

function ExpandedCard(props) {
  return (
    <div className='cards-container-unfolded' onClick={props.onClick}>
      <motion.div layout
        layoutId={props.index}
        className='card-expanded'
      >

        <motion.div layout layoutId={`${[props.index]}head`} className='head'>
          <TitleSection streetAddress={props.card.streetAddress} color={props.card.jobColor} />
          <PillSection expandClass='pill-container-expanded' modelNumber={props.card.modelNumber} subdivisionAndPhase={props.card.subdivisionAndPhase} lotNumber={props.card.lotNumber} city={props.card.city} projectManager={props.card.projectManager} listingAgent={props.card.listingAgent} jobType={props.card.jobType} company={props.card.company} />
        </motion.div>

        <motion.div layout layoutId={`${[props.index]}body`} className='body' style={{ flexWrap: 'wrap', alignContent: 'flex-start' }}>
          <IndicatorGroup widthType='indicator-group-expanded' ccrs={props.card.ccRs} floorJoists={props.card.floorJoists} lumber={props.card.orderLumber} materials={props.card.orderMaterial} osb={props.card.orderOsb} planReview={props.card.planReview} selections={props.card.selections} trusses={props.card.trusses} />
          <ProgressGroup progress={props.card.progress} />
          <PermitGroup permit={props.card.permit} utilitiesPaid={props.card.utilitiesPaid} utilitiesSent={props.card.utilitiesSent} citySub={props.card.citySub} />
          <SqftGroup garage={props.card.garageSf} covered={props.card.coveredAreaSf} />
          <LotGroup lotSize={'null'} parcel={props.card.parcelNumber} />
        </motion.div>

      </motion.div>
    </div>
  )
}





function FilterListItem({city, isPressed, setFilter }) {

  return (
    <motion.button layout
      className={!isPressed ? "dropdown-item" : "dropdown-item dropdown-item-selected"}
      aria-pressed={isPressed}
      onClick={() => setFilter(city)}
      >
        {city}
    </motion.button>
    );
}


function DropDownContent({ filter, setFilter, FILTER_NAMES }) {

  // let cities = ['Kennewick', 'Pasco', 'Richland', 'West Richland']

  return (
    <AnimateSharedLayout>
      <motion.div layout className='dropdown-content-container' >
        {FILTER_NAMES.map((city, i) => (
          <FilterListItem
            key={city}
            city={city}
            isPressed={city === filter}
            setFilter={setFilter}>
          </FilterListItem>
        ))}
      </motion.div>
    </AnimateSharedLayout>
  )
}

function DropDown({ filter, setFilter, FILTER_NAMES, dropDownName }) {
  const [dropped, setDropped] = useState(false)
  let dropHandler = () => {
    setDropped(!dropped)
  }
  return (
    <motion.li layout className="filter-item" >
    <motion.div layout style={{ width: "min-content" }} className="nav-item-title" onClick={dropHandler}>{dropDownName}</motion.div>
    {/* <br></br> */}
    {dropped ? <DropDownContent filter={filter} setFilter={setFilter} FILTER_NAMES={FILTER_NAMES} ></DropDownContent> : ''}
  </motion.li>
  )
}

function NavFilter({ filter, setFilter, testSubArray, homes }) {

  return (
    <AnimateSharedLayout type="crossfade">
      <motion.div layout className="filter-container">
        <motion.div layout className="nav-row-title">Filter:</motion.div>
        <motion.ul layout className="filter-list">
          <motion.li layout className="filter-item">Company</motion.li>
          <motion.li layout className="filter-item">Model number</motion.li>
          {/* <motion.li layout className="filter-item">Subdivision</motion.li> */}
          <DropDown filter={filter} setFilter={setFilter} FILTER_NAMES={getUnique(homes, 'subdivisionAndPhase')} dropDownName={'Subdivision'} />
          <DropDown filter={filter} setFilter={setFilter} FILTER_NAMES={CITY_FILTER_NAMES} dropDownName={'City'} />
          {/* <motion.li layout className="filter-item">Super</motion.li> */}
          <DropDown filter={filter} setFilter={setFilter} FILTER_NAMES={getUnique(homes, 'projectManager')} dropDownName={'Super'} />

          <motion.li layout className="filter-item">Realtor</motion.li>
          <motion.li layout className="filter-item">Sale</motion.li>
          <motion.li layout className="filter-item">Todos</motion.li>
          <motion.li layout className="filter-item">Sub to city</motion.li>
          <motion.li layout className="filter-item">Permit</motion.li>
          <motion.li layout className="filter-item">Utils sent</motion.li>
          <motion.li layout className="filter-item">Utils paid</motion.li>
          <motion.li layout className="filter-item">Progress</motion.li>
        </motion.ul>
      </motion.div>
    </AnimateSharedLayout>

  );
}


function NavBar({ handleForce, filter, setFilter, testSubArray, homes }) {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded)
  }

  const heightChanger = () => {
    if (expanded) {
      return 'nav-unfolded'
    }
  }

  const classNames = 'navbar ' + heightChanger()

  return (
    <nav layout className={classNames}>
      <h2 className="nav-title">BlackBoard</h2>
      <ul className="nav-container">
        <li className="navbar-item" onClick={handleClick}>
          Expand bar
              </li>
        <li className="navbar-item" onClick={handleForce}>
          Refresh screen
              </li>
        <li className="navbar-item">
          Move to another page
              </li>
      </ul>
      <div className="break"></div>
      { expanded ? <NavFilter filter={filter} setFilter={setFilter} testSubArray={testSubArray} homes={homes}></NavFilter> : null}
    </nav>
  );
}


const CITIES_MAP = {
  All: () => true,
  Kennewick: home => home.city === 'Kennewick',
  Pasco: home => home.city === 'Pasco',
  Richland: home => home.city === 'Richland',
  'West Richland': home => home.city === 'West Richland'
};


const CITY_FILTER_NAMES = Object.keys(CITIES_MAP);





function setColor(indicatorVal) {
  if (indicatorVal) {
    return 'rgb(122, 209, 106)'
  } else {
    return 'rgb(214, 79, 79)'
  }
}

function subMapper (sub, target) {
  let formattedSub = {[sub]: home => home.subdivisionAndPhase === sub}
  console.log(formattedSub)
  Object.assign(target, formattedSub)
  // return {[sub]: home => home.subdivisionAndPhase === `${sub}`}
  return formattedSub

}


function getUnique (array, key) {
  let arrayKeyValues = []
  for (let i = 0; i < array.length; i++) {
      const element = array[i][key];
      arrayKeyValues.push(element)
  }
  return arrayKeyValues.filter((v, i, a) => a.indexOf(v) === i)
}

function App() {

  const [index, setIndex] = useState(false);
  const [homes, setHomes] = useState([]);
  const [forceState, setForceState] = useState(false)
  const [filter, setFilter] = useState('All');
  
  // const [filteredHomes, setFilteredHomes] = useState([])
  // const [filteredHomes, setfilteredHomes] = useState(homes.filter(CITIES_MAP[filter]))

  useEffect(() => {
    async function fetchData() {
      const req = await finalFetch()
      setHomes(req)
    }
    fetchData();
  }, [setHomes])


  function handleForce() {
    setForceState(!forceState)
  }

  if (index !== false) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }

  // setTimeout(setHomes(finalFetch), 3000)

  // const filtered = homes.filter(home => home.city === 'West Richland')

  // const filteredHomes = homes.filter(CITIES_MAP[filter])

  const thing = undefined
  const specificThing = undefined
  const filteredHomes = homes.filter(home => home[thing] === specificThing)
  

  // useEffect(() => {
  //   setFilteredHomes([])
  //   setFilteredHomes(homes.filter(CITIES_MAP[filter]))
  // }, [filter, homes])

  const columns = [
    {key: 'streetAddress', name: 'Address'},
    {key: 'company', name: 'Company'},
    {key: 'subdivisionAndPhase', name: 'Subdivision'}
  ]




  let testSubArray = getUnique(homes, 'subdivisionAndPhase')

  console.log(testSubArray) 


  const SUBDIVISION_MAP = {}
  const SUBDIVISION_FILTER_NAMES = Object.keys(SUBDIVISION_MAP);

  for (let i = 0; i < testSubArray.length; i++) {
    const element = testSubArray[i];
    // console.log(subMapper(element, SUBDIVISION_MAP))
    subMapper(element, SUBDIVISION_MAP)
    // SUBDIVISION_MAP[element] = home => home.subdivisionAndPhase === element
  }

  console.log(CITIES_MAP)
  console.log(SUBDIVISION_MAP)
  


  return (
    <AnimateSharedLayout type="crossfade">
      <NavBar handleForce={handleForce} filter={filter} setFilter={setFilter} testSubArray={testSubArray} homes={homes}></NavBar>


    {/* <Table data={filteredHomes} height={800} style={{ backgroundColor: "rgb(46,46,52)" }} >
      <Column width={100} fixed resizable >
        <HeaderCell style={{ backgroundColor: 'rgb(46,46,52)', color: 'white' }} >Address</HeaderCell>
        <Cell dataKey="streetAddress" style={{ backgroundColor: "rgb(46,46,52)", fontFamily: 'Roboto, sans-serif', fontWeight: 500, color: 'white', border: '1px solid rgb(73,73,77)', borderRight: '0px solid white', borderLeft: '0px solid white'}}/>
      </Column>

      <Column width={100} resizable>
        <HeaderCell style={{ backgroundColor: 'rgb(46,46,52)', color: 'white' }} >Company</HeaderCell>
        <Cell dataKey="company" style={{ backgroundColor: "rgb(46,46,52)", border: '1px solid rgb(73,73,77)', borderRight: '0px solid white', borderLeft: '0px solid white' }} >
          {(rowData, rowIndex) => {
            return <div className='infopill' style={{width: 'min-content'}} >{rowData.company}</div>
          }}
        </Cell>
      </Column>

      <Column width={100} resizable>
        <HeaderCell style={{ backgroundColor: 'rgb(46,46,52)', color: 'white' }} >Subdivision</HeaderCell>
        <Cell dataKey="subdivisionAndPhase" style={{ backgroundColor: "rgb(46,46,52)", border: '1px solid rgb(73,73,77)', borderRight: '0px solid white', borderLeft: '0px solid white' }} >
        {(rowData, rowIndex) => {
            return <div className='infopill' style={{width: 'min-content'}} >{rowData.subdivisionAndPhase}</div>
          }}
        </Cell>
      </Column>

      <Column width={100} resizable>
        <HeaderCell style={{ backgroundColor: 'rgb(46,46,52)', color: 'white' }} >Indicators</HeaderCell>
          <Cell dataKey="indicator" style={{ backgroundColor: "rgb(46,46,52)", border: '1px solid rgb(73,73,77)', borderRight: '0px solid white', borderLeft: '0px solid white' }} >
          {(rowData, rowIndex) => {
              return ( 
              <div style={{ display: 'flex' }}>
                <div className='indicator' style={{ backgroundColor: setColor(rowData.selections), width: 'min-content' }}>Selections</div>
                <div className='indicator' style={{ backgroundColor: setColor(rowData.osb), width: 'min-content' }}>OSB</div>
                <div className='indicator' style={{ backgroundColor: setColor(rowData.planReview), width: 'min-content' }}>Fee</div>
                <div className='indicator' style={{ backgroundColor: setColor(rowData.floorJoists), width: 'min-content' }}>Joists</div>
                <div className='indicator' style={{ backgroundColor: setColor(rowData.ccrs), width: 'min-content' }}>CCR</div>
                <div className='indicator' style={{ backgroundColor: setColor(rowData.lumber), width: 'min-content' }}>Lumber</div>
                <div className='indicator' style={{ backgroundColor: setColor(rowData.trusses), width: 'min-content' }}>Trusses</div>
              </div>
              )
            }}
          </Cell>
        </Column>

      <Column width={100} resizable>
        <HeaderCell style={{ backgroundColor: 'rgb(46,46,52)', color: 'white' }} >Progress</HeaderCell>
        <Cell dataKey="progress" style={{ backgroundColor: "rgb(46,46,52)", border: '1px solid rgb(73,73,77)', borderRight: '0px solid white', borderLeft: '0px solid white' }} >
        {(rowData, rowIndex) => {
            return (
              <div className='grouper oof'>
                <progress max='100' value={rowData.progress} ></progress>
                <div className='progress-text' >{rowData.progress}%</div>
              </div>
            )
          }}
        </Cell>
      </Column>
    </Table> */}

      {/* <TestButton fetchData={fetchData} anotherVal={homes}></TestButton> */}
      {/* <button onClick={handleForce}></button> */}
      {homes.length > 0 ?
        <CardList
          items={filteredHomes}
          setHomes={setHomes}
          setIndex={setIndex}
          filter={filter}
        /> : setTimeout(() => handleForce(), 1000)}
      <AnimatePresence>
        {index !== false && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key='modal'
            className='modal'
            onClick={() => setIndex(false)}
          >

          </motion.div>
        )}

        {index !== false && (
          <ExpandedCard
            key='expandedCard'
            index={index}
            card={filteredHomes[index]}
            setIndex={setIndex}
            onClick={() => setIndex(false)}
          >
          </ExpandedCard>
        )}

      </AnimatePresence>


    </AnimateSharedLayout>

  );
}


// const content = ['this is a test', 'this is another test', 'another testing thing', 'yet another testing thing', 'Lorem enim proident adipisicing sunt aute esse qui aliqua est tempor minim elit exercitation incididunt.', 'lorem12Sit sint excepteur in sint dolor mollit duis ea magna culpa.'];

export default App;
