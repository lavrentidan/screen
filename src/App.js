import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion"
import './App.css';
import homes from './dataClean';

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
  const [isOverflowed, setIsOverflowed] = useState(false);
  const [testList, setTestList] = useState(pillList);
  let filtered = testList.filter((pill, index) => index < testList.length - 1);
  

      
  useEffect(() => {
    if (ref.current.clientWidth < ref.current.scrollWidth) {
      setIsOverflowed(true)
    } else {
      setIsOverflowed(false)
    }
  }, [ref, isOverflowed])

  useEffect(() =>
  !isOverflowed ? handleFilter : setIsOverflowed(false),
  [isOverflowed]// I have no idea why this works but don't touch it
)


const handleOverflowRender = (list) => {
  let overFlowVal = pillList.length - list.length
  if (list.length < pillList.length) {
    return <motion.li className='infopill-expand'>+{overFlowVal}</motion.li>
  } else {
  }
}

  const handleFilter = () => {
    let filtered = testList.filter((pill, index) => index < testList.length - 1);
    setTestList(filtered)
  }
  

  return (
    <motion.ul ref={ref} className='pill-container'  >
      {testList.map((pill, i) => 
        <motion.li key={i} className='infopill'>{pill}</motion.li>
      )}
      {handleOverflowRender(testList)}
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

function PermitGroup (props) {

  function yearChopper (date) {
    if (date !== null && date !== undefined) {
      let chopped = date.slice(0, -5)
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


function SqftGroup (props) {
  const sfAppender = (value) => {
    return `${value} SF`
  }

  return (
    <motion.div className='grouper' id='sf-group' >
      <motion.div className='relational-container' style={{ width:'100%' }} >
        <motion.div className='relational-key' >Garage</motion.div>
        <motion.div className='relational-line' ></motion.div>
        <motion.div className='relational-value'>{sfAppender(props.garage)}</motion.div>
      </motion.div>
      <motion.div className='relational-container' style={{ width:'100%' }} >
        <motion.div className='relational-key' >Covered</motion.div>
        <motion.div className='relational-line' ></motion.div>
        <motion.div className='relational-value'>{sfAppender(props.covered)}</motion.div>
      </motion.div>
    </motion.div>
  )
}


function LotGroup (props) {

  const parcelChecker = (value) => {
    if (!value) {
      return 'null'
    } else {
      return value
    }
  }

  return (
    <motion.div className='grouper' id='lot-group' >
      <motion.div className='relational-container' style={{ width:'100%' }} >
        <motion.div className='relational-key' >Lot Size</motion.div>
        <motion.div className='relational-line' ></motion.div>
        <motion.div className='relational-value'>{props.lotSize}</motion.div>
      </motion.div>
      <motion.div className='relational-container' style={{ width:'100%' }} >
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

function CardList({ items, setIndex }) {

  return (
    <ul className='cards-container'>
      {items.map((contentItem, i) => (
        contentItem.streetAddress ?
        <motion.li layout
          className='card'
          key={i}
          onClick={() => setIndex(i)}
          layoutId={contentItem.id}
        >

            <motion.div layout layoutId={`${contentItem.id}head`} className='head'>
              <TitleSection streetAddress={contentItem.streetAddress} color={contentItem.jobColor} />
              <PillSection modelNumber={contentItem.modelNumber} subdivisionAndPhase={contentItem.subdivisionAndPhase} lotNumber={contentItem.lotNumber} city={contentItem.city} projectManager={contentItem.projectManager} listingAgent={contentItem.listingAgent} jobType={contentItem.jobType} company={contentItem.company} />
            </motion.div>


          <motion.div className='body' layout layoutId={`${contentItem.id}body`} >
            <IndicatorGroup widthType='indicator-group' ccrs={contentItem.ccRs} floorJoists={contentItem.floorJoists} lumber={contentItem.orderLumber} materials={contentItem.orderMaterial} osb={contentItem.orderOsb} planReview={contentItem.planReview} selections={contentItem.selections} trusses={contentItem.trusses} />
            <PermitGroup permit={contentItem.permit} utilitiesPaid={contentItem.utilitiesPaid} utilitiesSent={contentItem.utilitiesSent} citySub={contentItem.citySub} />
          </motion.div>
        </motion.li> : console.log('something')
      ))}
    </ul>
  )
}

function ExpandedCard(props) {
  return (
    <div className='cards-container-unfolded' onClick={props.onClick}>
      <motion.div layout
        layoutId={props.card.id}
        className='card-expanded'
      >
        
          <motion.div layout layoutId={`${props.card.id}head`} className='head'>
            <TitleSection streetAddress={props.card.streetAddress} color={props.card.jobColor} />
            <PillSection modelNumber={props.card.modelNumber} subdivisionAndPhase={props.card.subdivisionAndPhase} lotNumber={props.card.lotNumber} city={props.card.city} projectManager={props.card.projectManager} listingAgent={props.card.listingAgent} jobType={props.card.jobType} company={props.card.company}/>
          </motion.div>

          <motion.div layout layoutId={`${props.card.id}body`}  className='body' style={{ flexWrap:'wrap', alignContent:'flex-start' }}>
            <IndicatorGroup widthType='indicator-group-expanded' ccrs={props.card.ccRs} floorJoists={props.card.floorJoists} lumber={props.card.orderLumber} materials={props.card.orderMaterial} osb={props.card.orderOsb} planReview={props.card.planReview} selections={props.card.selections} trusses={props.card.trusses} />
            <ProgressGroup progress={props.card.progress} />
            <PermitGroup permit={props.card.permit} utilitiesPaid={props.card.utilitiesPaid} utilitiesSent={props.card.utilitiesSent} citySub={props.card.citySub} />
            <SqftGroup garage={props.card.garageSf} covered={props.card.coveredAreaSf} />
            <LotGroup  lotSize={'null'} parcel={props.card.parcelNumber} />
          </motion.div>
        
      </motion.div>
    </div>
  )
}



function App() {

  const [index, setIndex] = useState(false);
  return (
    <AnimateSharedLayout type="crossfade">
      <CardList items={homes} setIndex={setIndex}/>
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
            card={homes[index]}
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
