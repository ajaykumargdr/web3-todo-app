import React from 'react'
import { CiCircleCheck } from "react-icons/ci";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
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
                                            <CiCircleCheck onClick={() => change(el[0])} className={Style.icon_close} />
                                        ) : (
                                            <IoCheckmarkDoneCircle onClick={() => change(el[0])} className={Style.icon_close} />
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