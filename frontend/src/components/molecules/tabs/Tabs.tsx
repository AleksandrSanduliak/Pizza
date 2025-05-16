import React from 'react';

import { Button } from 'atoms/Buttons/Button';

import cl from './Tabs.module.scss';

const Tabs = ({ tabsArray, activeTab, setActiveTab }) => {
  return (
    <div className={cl.wrapper}>
      {/* {tabsArray.map((el, indx) => (
        // <Button
        //   key={el}
        //   onClick={(e) => setActiveTab(indx)}
        //   primary={activeTab === indx ? true : false}>
        //   <span className={cl.text}>{el}</span>
        // </Button>
      ))} */}
    </div>
  );
};

export default Tabs;
