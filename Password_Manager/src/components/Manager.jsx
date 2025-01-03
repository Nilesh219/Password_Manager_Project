import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();

  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    passwordRef.current.type = "text";
    // console.log(ref.current.src)
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      passwordRef.current.type = "text";
      ref.current.src = "icons/eyecross.png";
    }
  };

  const savePassword = () => {

    if(form.site.length >3 && form.username.length >3 &&form.password.length >3){
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      console.log([...passwordArray, form]);
      setform({ site: "", username: "", password: "" })
      toast("Your Password Successfull Saved", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    else{
      toast('Error: Password not saved!')
    }
      
    
  };

  const deletePassword = (id) => {
    console.log("the Passwrod id is ", id)
    let c = confirm("Do you really want to Delete this Password?");
    if(c){

      setPasswordArray(passwordArray.filter(item=>item.id !== id))
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
      toast("Your Password Succssefull Deleted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }
  // };
  const editPassword = (id) => {
    console.log("Editing password with id ", id);
    setform(passwordArray.filter((i) => i.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copText = (text) => {
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <div className=" p-2 md:p-0 md:mycontainer min-h-screen">
        <h1 className="text-center font-bold">
          <span className="text-lime-500 text-2xl ">&lt;%Pass</span>
          <span className="text-xl text-white">wordM&gt;</span>
        </h1>
        <p className=" text-center text-sm text-white">
          Your own Password Manager
        </p>
        <div className="flex flex-col  p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            type="text"
            placeholder="Enter Web URL"
            className="w-full rounded-sm p-4 py-1 border border-black flex"
            name="site"
            id="site"
          />

          <div className="flex flex-col md:flex-row justify-between w-full gap-7">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              type="text"
              className="w-full rounded-sm p-4 py-1 border border-black"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                type="password"
                className="w-full rounded-sm p-4 py-1 border border-black"
                name="password"
                id="password"
              />
              <span
                className="absolute right-[2px] top-[1px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-2"
                  width={32}
                  src="icons/eye.png"
                  alt="eye"
                  srcSet=""
                />
              </span>
            </div>
          </div>

          <button className="flex justify-center items-center gap-2 bg-green-500 hover:font-bold rounded-full px-8 py-2 w-fit border border-green-900">
            <lord-icon
              onClick={savePassword}
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className="password text-white flex flex-col justify-center items-center text-center">
          <h2 className="text-center font-bold text-lg py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div> No Passwords to show </div>}
          {passwordArray.length != 0 && (
            <table class="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-green-400">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-slate-100 text-black border border-black">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 text-center w-32 border border-black">
                        <div className="flex justify-center items-center text-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="loardiconcopy cursor-pointer size-7"
                            onClick={() => {
                              copText(item.site);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 text-center w-32 border border-black">
                        <div className="flex justify-center items-center text-center">
                          <span>{item.username}</span>
                          <div
                            className="loardiconcopy cursor-pointer size-7"
                            onClick={() => {
                              copText(item.username);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 text-center w-32 border border-black">
                        <div className="flex justify-center items-center text-center">
                          <span>{item.password}</span>
                          <div
                            className="loardiconcopy cursor-pointer size-7"
                            onClick={() => {
                              copText(item.password);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 text-center w-32 border border-black">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
