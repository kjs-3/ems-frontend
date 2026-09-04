import React from 'react'
import { useAuth } from '../Context/AuthContext'

const EmployeeTable = ({ employee, onEdit, onDelete }) => {
    const auth = useAuth();
    if (employee.length === 0) {
        return <p>No Employees yet....</p>
    }
    return (
        <>
            <table className='employee-table'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                         <th>Salary</th>
                        <th>Department</th>
                       
                        {auth.isAdmin && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {employee.map((emp) => {
                        return (
                            <>
                                <tr key={emp.empId}>
                                    <td>{emp.empId}</td>
                                    <td>{emp.empName}</td>
                                    <td>{emp.empEmail}</td>
                                    <td>{emp.salary}</td>
                                    <td>{emp.depName}</td>
                                    {auth.isAdmin && (
                                        <td>
                                            <button className='edit-btn'
                                                onClick={() => onEdit(emp)}>Edit</button>
                                            <button className='delete-btn'
                                                onClick={() => onDelete(emp.empId)}>Delete</button>
                                        </td>
                                    )}
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default EmployeeTable