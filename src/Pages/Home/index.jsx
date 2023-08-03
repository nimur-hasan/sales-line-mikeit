import React, {useContext, useEffect, useState} from 'react'
import {toast} from 'react-toastify';
import {Post} from '../../Adapters/xhr';
import {UserContext} from '../../App';
import DataTable from '../../components/DataTable/MUITable';

export default function Home() {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [allUsers, setAllUsers] = useState([]);

    const getAllUsers = async () => {
        try {

            const response = await Post("getAllUsers", {token: loggedInUser.user_token})

            const filteredList = []
            response.data.map((data) => {
                if (data.isAdmin) {
                    filteredList.push({...data, status: 'Admin'})
                } else {
                    filteredList.push({...data, status: 'User'})
                }
            })
            setAllUsers(filteredList)

        } catch (error) {
            toast.warn("Try Again")
        }
    }

    useEffect(() => {
        getAllUsers()
    }, [])


    const columns = [
        {field: 'username', title: 'Username', width: 70},
        {field: 'email', title: 'Email', width: 70},
        {field: 'status', title: 'Status', width: 70},
    ]

    return (
        <div>

            <DataTable tableTitle="All Users" columns={columns} rows={allUsers}/>
        </div>
    )
}
