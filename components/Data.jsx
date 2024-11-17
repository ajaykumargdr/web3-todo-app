import React from 'react'
import { CiCircleCheck } from "react-icons/ci";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { AiFillLock } from "react-icons/ai";
import Style from '@/styles/index.module.css';

const Data = ({ allToDoList, currentAccount, change }) => {

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
                            allToDoList.map((user) => (
                                user[2].map((el, i) => (

                                    <div key={i + 1} className={user[0] == currentAccount ? Style.home_create_list_app_creator : Style.home_create_list_app}>

                                        <div className={Style.lock_list}>
                                            <AiFillLock className={Style.lock_color} /> {el}
                                        </div>

                                        {
                                            user[3][i] == false ? (
                                                <CiCircleCheck onClick={() => change(user[0], i)} className={Style.icon_close} />
                                            ) : (
                                                <IoCheckmarkDoneCircle onClick={() => change(user[0], i)} className={Style.done} />
                                            )
                                        }

                                    </div>
                                ))
                            ))
                        }
                    </div>

                )
            }
        </div>

    );
};

export default Data