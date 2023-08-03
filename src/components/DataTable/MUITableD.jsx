import * as React from 'react';
import {forwardRef, useEffect} from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Print from '@material-ui/icons/Print';
import MaterialTable from 'material-table';
import {UserContext} from '../../App';
import {Skeleton} from '@mui/material';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};
export default function DataTable({
                                      showEdit = true,
                                      loading,
                                      tableTitle,
                                      columns,
                                      rows,
                                      handleEdit,
                                      handleDelete,
                                      handlePrint = false
                                  }) {

    const [loggedInUser, setLoggedInUser] = React.useContext(UserContext);

    const [tableData, setTableData] = React.useState([])
    const [tableColumns, setTableColumns] = React.useState([])

    useEffect(() => {
        const newData = [];
        rows?.map(data => {
            newData.push({...data, date_time: new Date(data.date_time).toDateString()})
        })


        setTableColumns([...columns, {field: 'date_time', title: 'Date/Time', width: 70}])
        setTableData(newData)

        console.log("Table Data: ", newData)

    }, [rows, columns])


    return (
        <div>
            {
                loading ?
                    <Skeleton variant='rectangular' width="100%">
                        <MaterialTable
                            style={{backgroundColor: "#F6C88D"}}
                            icons={tableIcons}
                            title={tableTitle}
                            columns={tableColumns}
                            data={tableData}
                            options={{
                                exportButton: true
                            }}


                        />
                    </Skeleton> :
                    <MaterialTable
                        style={{backgroundColor: "#F6C88D"}}
                        icons={tableIcons}
                        title={tableTitle}
                        columns={tableColumns}
                        data={tableData}
                        options={{
                            exportButton: true
                        }}


                        actions={loggedInUser.user.isAdmin && [
                            showEdit && {
                                icon: Edit,
                                tooltip: 'Edit',
                                onClick: (event, rowData) => handleEdit(rowData)
                            },
                            {
                                icon: DeleteOutline,
                                tooltip: 'Delete',
                                onClick: (event, rowData) => handleDelete(rowData)
                            },
                            handlePrint && {
                                icon: Print,
                                tooltip: 'Print',
                                onClick: (event, rowData) => {
                                    handlePrint(rowData)
                                }
                            },
                        ]}

                    />
            }

        </div>
    );
}