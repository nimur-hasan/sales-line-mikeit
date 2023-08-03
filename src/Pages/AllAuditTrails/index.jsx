import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import Swal from 'sweetalert2';
import {Delete, Post} from '../../Adapters/xhr';
import {UserContext} from '../../App';
import DataTable from '../../components/DataTable/MUITableD';

export default function AllAuditTrails() {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true)

    const history = useHistory()

    useEffect(() => {
        if (!loggedInUser.user.isAdmin) {
            history.push('/login')
        }
    }, [])

    const getAllAuditTrails = async () => {
        try {
            const response = await Post("auditTrail", {token: loggedInUser.user_token})
            if (!response.data === false){
                const filteredList = []
                response.data.map((data) => {
                    if (data.isAdmin) {
                        filteredList.push({...data, status: 'Admin' })
                    } else {
                        filteredList.push({...data, status: 'User'})
                    }
                })
                setAllUsers(filteredList)
                setLoading(false);
            }

        } catch (error) {
            toast.warn("Try Again")
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllAuditTrails().then(function (r) {
        })
    }, [getAllAuditTrails])


    const columns = [
        {field: 'user_id.username', title: 'Username', width: 70},
        {field: 'user_id.email', title: 'Email', width: 70},
        {field: 'organisation', title: 'Organisation', width: 70},
        {field: 'userType', title: 'Type', width: 70},
        {field: 'created_date', title: 'created', width: 70},
    ]

    const handleDelete = async (rowData) => {
        console.log("hit")
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this! ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {


                Delete(`deleteUser/${rowData._id}`).then(result => {
                    setAllUsers(result.data)
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }).catch(error => {
                    console.log(error)
                    toast.warn("Try Again!")
                })

            }
        })
    }


    return (
        <div>
            {!loading &&
            <DataTable showEdit={false} loading={loading} tableTitle="Audit Trail" columns={columns} rows={allUsers}
                       handleDelete={handleDelete}/>}
            {loading
                &&
                <p> Loading..<br/> &nbsp;<br/>  &nbsp;<br/>  &nbsp;<br/>  &nbsp;<br/>  &nbsp;<br/>  &nbsp;<br/>  &nbsp;
                    <br/> &nbsp;<br/>  &nbsp;<br/>  &nbsp;<br/>  &nbsp;<br/>  &nbsp;<br/>  &nbsp;<br/>  &nbsp;</p>
            }
        </div>
    )
}
