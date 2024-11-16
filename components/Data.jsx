import React from 'react'
import { RiCloseFill } from "react-icons/ri";
import { AiFillLock } from "react-icons/ai";
import Style from '@/styles/index.module.css';

const Data = ({ allToDoList, allAddress, myList, change }) => {

    return (
        <div className={Style.home_create_list}>
            {
                allToDoList.length === 0 ? (
                    <div className={Style.noData}>
                        No Data
                    </div>
                ) : (
                    <div>
                        {
                            allToDoList.map((el, i) => (
                                <div key={i + 1} className={Style.home_create_list_app}>

                                    <div className={Style.lock_list}>
                                        <AiFillLock className={Style.lock_color} /> {el[2]}
                                    </div>

                                    {
                                        el[3] == false ? (
                                            <RiCloseFill onClick={() => change(el[0])} className={Style.icon_close} />
                                        ) : (
                                            <p className={Style.down}>Down</p>
                                        )
                                    }

                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>

    );
};

export default Data