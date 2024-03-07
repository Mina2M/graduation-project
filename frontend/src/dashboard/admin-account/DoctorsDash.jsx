import { Outlet, useNavigate } from "react-router-dom";
import { AdminHeaders, PrimaryButton } from "./CommonStyled";

const DoctorsDash = () => {
    const navigate = useNavigate();

    return (
        <>
            <AdminHeaders>
                <h2>Doctors</h2>
                <PrimaryButton
                    onClick={() => navigate("/admin-dashboard/doctors/create-doctor")}
                // onClick={() => navigate("/doctors/profile/me")}

                >
                    Create
                </PrimaryButton>
            </AdminHeaders >
            <Outlet />
        </>
    );
};

export default DoctorsDash;