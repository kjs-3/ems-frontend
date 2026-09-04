const BASE_URL = "http://localhost:8080"; //our server area
//func which will talk to the backend where every comp will  call this func and pass
// url
//after login or before login this func will be called 
//url will be passed 
//path-->/api/auth/** 
//method-->GET<PUT<POST<DELETE
//body-->content json 
//token -->before login token is null after login token is sent along with path
async function sendRequest(path,  method, body, token) {
    //how we use to fetch
    //http://localhost:8080/api/auth/register,{method:GET,headers:{},body:JSON.STRINGFY()}
    //same way we are going to do here
    const headers = {};
    headers["Content-Type"] = "application/json";
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    const options = {};
    options.method = method;
    options.headers = headers;
    if (body) {
        options.body = JSON.stringify(body); //jsobj to json data
    }
    //call backend
    //register /api/auth/** 
    const response = await fetch(BASE_URL + path, options);
    //{method,headers:{},body}
    if (!response.ok) {
        //there is some error data but not real data that time ok will be false
        let errorMessage = `Request failed with status${response.status}`;
        try {
            const errorData = await response.json(); //json-->js obj

            errorMessage = errorData.error || errorData.message || errorMessage;

        } catch (error) {

        }
        throw new Error(errorMessage);
    }
    //if backend del data so no body will be returned status 204
    if (response.status === 204) {
        return null;
    }
    //now if u have original data then send json to js obj
    const data = await response.json();
    return data;
}
//Making Auth calls --->register,login,employee,department
//Auth Calls
export async function loginUser(username, userpassword) {
    return sendRequest("/api/auth/login", "POST",
        { userName: username, userPassword: userpassword }, null)
}
export async function registerUser(username, userpassword, userrole) {
    return sendRequest("/api/auth/register", "POST",
        {
            userName: username,
            userPassword: userpassword,
            role: userrole,
        }, null)
}
//Employeecalls
export async function getallEmployees(token) {
    return sendRequest("/api/employees/getallemployess", "GET", null, token);
}
export async function createEmployee(employeeData, token) {
    return sendRequest("/api/employees/addemployee", "POST", employeeData, token);
}
export async function updateEmployee(id, employeeData, token) {
    return sendRequest("/api/employees/updateemp/" + id, "PUT", employeeData, token);
}
export async function deleteEmployee(id, token) {
    return sendRequest("/api/employees/deleteemp/" + id, "DELETE", null, token);
}
//DepartmentCalls
export async function getallDepartments(token) {
    return sendRequest("/api/departments/getalldepartments", "GET", null, token);
}
export async function createDepartment(departmentData, token) {
    return sendRequest("/api/departments/adddep", "POST", departmentData, token);
}