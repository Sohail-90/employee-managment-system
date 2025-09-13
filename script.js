 document.getElementById('btn1').addEventListener('click', function () {
            const fullname = document.getElementById('fname').value + ' ' + document.getElementById('lname').value;
            const department = document.getElementById('dept').value;
            const salary = document.getElementById('salary').value;

            const employee = {
                fullname: fullname,
                department: department,
                salary: salary
            };

            const employees = JSON.parse(localStorage.getItem('employees')) || [];
            employees.push(employee);
            localStorage.setItem('employees', JSON.stringify(employees));
            alert('Employee data saved successfully!');
            populatedata();
        });
        // populatedata in html page
        function populatedata() {
            const employees = JSON.parse(localStorage.getItem('employees')) || [];
            const tableBody = document.getElementById('table-body');
            tableBody.innerHTML = '';
            employees.forEach((employee, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
            <td>${index + 1}</td>
            <td>${employee.fullname}</td>
            <td>${employee.department}</td>
            <td>${employee.salary}</td>
            <td>
                <button class="btn1" onclick="editEmployee(${index})">Edit</button>
                <button class="btn2" onclick="deleteEmployee(${index})">Delete</button>
            </td>
        `;
                tableBody.appendChild(row);
                document.getElementById('fname').value = '';
                document.getElementById('lname').value = '';
                document.getElementById('dept').value = '';
                document.getElementById('salary').value = '';
            });
        }
        // Edit employee
        function editEmployee(index) {
            const employees = JSON.parse(localStorage.getItem('employees')) || [];
            const employee = employees[index];
            document.getElementById('fname').value = employee.fullname.split(' ')[0];
            document.getElementById('lname').value = employee.fullname.split(' ')[1];
            document.getElementById('dept').value = employee.department;
            document.getElementById('salary').value = employee.salary;
            // Remove the employee from the list
            employees.splice(index, 1);
            localStorage.setItem('employees', JSON.stringify(employees));
            populatedata();
        }
        // Delete employee
        function deleteEmployee(index) {
            const ok = confirm('Are you sure you want to delete this employee?');
            if (ok) {
                const employees = JSON.parse(localStorage.getItem('employees')) || [];
                employees.splice(index, 1);
                localStorage.setItem('employees', JSON.stringify(employees));
                populatedata();
            }
            else {
                return;
            }

        }
        // Populate data on page load
        window.onload = populatedata;