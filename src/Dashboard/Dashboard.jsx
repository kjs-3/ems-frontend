import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/AuthContext'
import { createDepartment, createEmployee, deleteEmployee, getallDepartments, getallEmployees, updateEmployee }
    from '../Apis/Api';
import Navbar from '../Navbar/Navbar';
import EmployeeForm from '../EmployeeForm/EmployeeForm';
import EmployeeTable from '../EmployeeTable/EmployeeTable';
const Dashboard = () => {
    const auth = useAuth();
    const [employees, setemployees] = useState([]);
    const [departments, setdepartments] = useState([]);
    const [editemp, seteditemp] = useState(null);
    const [showform, setshowform] = useState(false);
    const [err, seterr] = useState("");
    const [newdepname, setnewdepname] = useState("");
    //read
    async function loaddata() {
        try {
            const emplist = await getallEmployees(auth.token);
            const deplist = await getallDepartments(auth.token);
            setemployees(emplist);
            setdepartments(deplist);
            // loaddata();
        }
        catch (err) {
            seterr(err.message);
        }
    }
    useEffect(() => {
        loaddata();
    }, [])
    const handleAddClick = () => {
        seteditemp(null);
        setshowform(true);
    }
    const handleEditClick = (employee) => {
        seteditemp(employee);
        setshowform(true);
    }
    async function handleSave(employeeData) {
        try {
            if (editemp) {
                await updateEmployee(editemp.empId, employeeData, auth.token);
            }
            else {
                await createEmployee(employeeData, auth.token);
            }
            loaddata();
            setshowform(false);

        }
        catch (err) {
            seterr(err.message);
        }
    }
    async function handleAddDepartment(e) {
        e.preventDefault();
        try {
            await createDepartment({ depName: newdepname }, auth.token);
            setnewdepname("");
            
            // const updatelist = await getallDepartments(auth.token);
            // setdepartments(updatelist);
            loaddata();
        }
        catch (err) {
            seterr(err.message);
        }
    }
    async function handleDelete(id) {
        const confirmed = window.confirm("Delete this Employee?");
        if (!confirmed) return;
        try {
            await deleteEmployee(id, auth.token);
            loaddata();
        }
        catch (err) {
            seterr(err.message);
        }
    }

    return (
        <>
            <div>
                <Navbar />
                <div className="dashboard-content">
                    <h2>EMPLOYEES</h2>
                    {err && <p className='error-text'>{err}</p>}
                    {auth.isAdmin && (
                        <form className="department-form" onSubmit={handleAddDepartment}>
                            <input type="text"
                                placeholder='Department Name'
                                value={newdepname}
                                onChange={(e) => setnewdepname(e.target.value)} />
                            <button type="submit">Add Department</button>

                        </form>
                    )}
                    {auth.isAdmin && !showform && (
                        <button className="add-button" onClick={handleAddClick}>
                            Add Employee</button>
                    )}
                    {showform && (
                        <EmployeeForm employee={editemp} departments={departments}
                            onSave={handleSave}
                            onCancel={() => setshowform(false)} />
                    )}
                    <EmployeeTable employee={employees}
                        onEdit={handleEditClick} onDelete={handleDelete} />
                </div>
            </div>
        </>
    )
}

export default Dashboard