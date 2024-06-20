import React, { useEffect, useState } from "react";
import HomeNav from "../Components/HomeNav";
import Footer from "../Components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = ({ token }) => {
  const [responsedata, setResponsedata] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios
      .get("https://jwt-auth-backend-9vjo.onrender.com/api/user/get-user", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        //console.log(res);
        setResponsedata(res.data.data);
        toast.success(res.data.Message);
      })
      .catch((error) => {
        toast.error(error.response.data.Message);
      });
  };
  return (
    <div>
      <HomeNav />
      <div className="container profile">
        <br />
        <h3>Profile</h3>
        <br />
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>User Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {responsedata.map((element, index) => {
                return (
                  <tr key={index}>
                    <td>{element._id}</td>
                    <td>{element.username}</td>
                    <td>{element.email}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
