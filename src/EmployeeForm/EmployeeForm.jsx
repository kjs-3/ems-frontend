import React, { useEffect, useState } from 'react'

const EmployeeForm = ({ employee, departments, onSave, onCancel }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [salaryy, setSalary] = useState("");
    const [depId, setdepId] = useState("");
    console.log(employee);
    useEffect(() => {
        if (employee) {
            setName(employee.empName);
            setEmail(employee.empEmail);
            setSalary(employee.salary);
            setdepId(employee.depId);
        }

        else {
            setName("");
            setEmail("");
            setSalary("");
            if (departments.length > 0) {
                setdepId(departments[0].depId); //setting just def id u can change later
            }
            else{
                setdepId("");
        }
    }, [employee,departments])
    function handleSubmit(e) {
        e.preventDefault();
        const empData = {
            empId: employee ? employee.empId : null,
            empName: name,
            empEmail: email,
            salary: Number(salaryy),
            depId: Number(depId)
        }
        onSave(empData);
        setName("");
        setEmail("");
        setSalary("")
    }
    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)} className="employee-form">
                <h3>{employee ? "Edit Employee" : "Add Employee"}</h3>
                <input type="text" placeholder='Name' value={name}
                    onChange={(e) => setName(e.target.value)} required />
                <input type="text" placeholder='Email' value={email}
                    onChange={(e) => setEmail(e.target.value)} required />
                <input type="text" placeholder='Salary' value={salaryy}
                    onChange={(e) => setSalary(e.target.value)} required />
                <select value={depId} onChange={(e) => setdepId(e.target.value)}>
                    {departments.map((dep) => {
                        return (
                            <>
                                <option key={dep.depId}
                                    value={dep.depId}>{dep.depName}</option>
                            </>
                        )
                    })}
                </select>
                <div className='employee-form-buttons'>
                    <button type="submit" className='save-btn'>Save</button>
                    <button type="button" className='cancel-btn' onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </>
    )
}

export default EmployeeForm
