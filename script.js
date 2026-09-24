document.addEventListener("DOMContentLoaded", function () {

    /* MOBILE MENU */

    const menuBtn = document.getElementById("menuBtn");
    const navigation = document.getElementById("navigation");

    if (menuBtn && navigation) {

        menuBtn.addEventListener("click", function () {

            navigation.classList.toggle("active");

        });

    }


    /* COMPLAINT FORM */

    const complaintForm = document.getElementById("complaintForm");
    const result = document.getElementById("result");

    if (complaintForm) {

        complaintForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const studentName =
                document.getElementById("studentName").value.trim();

            const roomNumber =
                document.getElementById("roomNumber").value.trim();

            const category =
                document.getElementById("category").value;

            const description =
                document.getElementById("description").value.trim();


            if (
                studentName === "" ||
                roomNumber === "" ||
                category === "" ||
                description === ""
            ) {

                result.innerHTML = `
                    <div class="error">
                        Please fill all the fields.
                    </div>
                `;

                return;

            }


            const issueId =
                "HF" + Math.floor(10000 + Math.random() * 90000);


            const complaint = {

                issueId: issueId,

                studentName: studentName,

                roomNumber: roomNumber,

                category: category,

                description: description,

                status: "Submitted",

                date: new Date().toLocaleDateString()

            };


            let complaints =
                JSON.parse(localStorage.getItem("hostelFixComplaints")) || [];


            complaints.push(complaint);


            localStorage.setItem(
                "hostelFixComplaints",
                JSON.stringify(complaints)
            );


            result.innerHTML = `

                <div class="success">

                    <h3>✅ Complaint Submitted Successfully!</h3>

                    <p>
                        Your Issue ID is:
                        <strong>${issueId}</strong>
                    </p>

                    <p>
                        Please save this ID to track your complaint.
                    </p>

                </div>

            `;


            complaintForm.reset();

        });

    }


    /* ADMIN PANEL */

    const complaintList =
        document.getElementById("complaintList");

    const refreshBtn =
        document.getElementById("refreshBtn");

    const clearBtn =
        document.getElementById("clearBtn");


    function loadComplaints() {

        if (!complaintList) {
            return;
        }


        const complaints =
            JSON.parse(
                localStorage.getItem("hostelFixComplaints")
            ) || [];


        if (complaints.length === 0) {

            complaintList.innerHTML = `

                <div class="empty">

                    <h3>No Complaints Found</h3>

                    <p>
                        No hostel complaints have been submitted yet.
                    </p>

                </div>

            `;

            return;

        }


        complaintList.innerHTML = "";


        complaints.forEach(function (complaint) {

            const card =
                document.createElement("div");

            card.className = "complaint-card";


            card.innerHTML = `

                <h3>
                    Issue ID: ${complaint.issueId}
                </h3>

                <p>
                    <strong>Student:</strong>
                    ${complaint.studentName}
                </p>

                <p>
                    <strong>Room:</strong>
                    ${complaint.roomNumber}
                </p>

                <p>
                    <strong>Category:</strong>
                    ${complaint.category}
                </p>

                <p>
                    <strong>Problem:</strong>
                    ${complaint.description}
                </p>

                <p>
                    <strong>Date:</strong>
                    ${complaint.date}
                </p>

                <span class="status">
                    ${complaint.status}
                </span>

            `;


            complaintList.appendChild(card);

        });

    }


    if (refreshBtn) {

        refreshBtn.addEventListener(
            "click",
            loadComplaints
        );

    }


    if (clearBtn) {

        clearBtn.addEventListener("click", function () {

            const confirmClear =
                confirm(
                    "Are you sure you want to clear all demo complaints?"
                );


            if (confirmClear) {

                localStorage.removeItem(
                    "hostelFixComplaints"
                );

                loadComplaints();

            }

        });

    }


    loadComplaints();

});